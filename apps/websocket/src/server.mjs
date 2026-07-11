import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { WebSocket, WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || 1999);
const STORAGE_FILE = process.env.DOODLE_STORAGE_FILE || path.join(process.cwd(), "data", "doodle-strokes.json");
const ADMIN_TOKEN = process.env.DOODLE_ADMIN_TOKEN || "";
const MAX_DOODLE_STROKES = 250;
const MAX_STROKE_POINTS = 600;
const ALLOWED_ORIGINS = (process.env.DOODLE_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {Array<import("./types.js").DoodleStroke>} */
let strokes = [];
const clients = new Map();
const cursors = new Map();
let saveTimer = null;

const isAllowedOrigin = (origin) => {
  if (ALLOWED_ORIGINS.length === 0) return true;
  if (!origin) return false;

  return ALLOWED_ORIGINS.includes(origin);
};

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

const isValidUser = (user, authorId) => {
  if (!user || typeof user !== "object") return false;
  if (user.id !== authorId) return false;
  if (typeof user.name !== "string" || user.name.length < 2 || user.name.length > 40) return false;
  if (typeof user.color !== "string" || !/^#[0-9a-f]{6}$/i.test(user.color)) return false;

  return true;
};

const isValidPoint = (point, coordinateSpace) => {
  if (!point || !isFiniteNumber(point.x) || !isFiniteNumber(point.y)) return false;

  if (coordinateSpace === "normalized") {
    return point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1;
  }

  return point.x >= 0 && point.y >= 0 && point.x <= 2400 && point.y <= 1800;
};

const isValidStroke = (stroke, authorId) => {
  if (!stroke || typeof stroke !== "object") return false;
  if (typeof stroke.id !== "string" || stroke.id.length > 120) return false;
  if (stroke.authorId !== authorId) return false;
  if (stroke.coordinateSpace && stroke.coordinateSpace !== "normalized") return false;
  if (typeof stroke.color !== "string" || !/^#[0-9a-f]{6}$/i.test(stroke.color)) return false;
  if (!isFiniteNumber(stroke.size) || stroke.size < 1 || stroke.size > 80) return false;
  if (stroke.mode !== "draw" && stroke.mode !== "erase") return false;
  if (!Array.isArray(stroke.points) || stroke.points.length === 0 || stroke.points.length > MAX_STROKE_POINTS) return false;
  if (!isFiniteNumber(stroke.createdAt)) return false;

  return stroke.points.every((point) => isValidPoint(point, stroke.coordinateSpace));
};

const broadcast = (message) => {
  const payload = JSON.stringify(message);

  for (const socket of clients.keys()) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(payload);
    }
  }
};

const broadcastPresence = () => {
  const activeUsers = [...cursors.values()].map((cursor) => cursor.user);
  broadcast({ type: "presence", users: clients.size, activeUsers });
};

const queueSave = () => {
  if (saveTimer) return;

  saveTimer = setTimeout(async () => {
    saveTimer = null;

    try {
      await mkdir(path.dirname(STORAGE_FILE), { recursive: true });
      const tempFile = `${STORAGE_FILE}.${process.pid}.tmp`;
      await writeFile(tempFile, JSON.stringify(strokes, null, 2));
      await rename(tempFile, STORAGE_FILE);
    } catch (error) {
      console.error("Failed to save doodles", error);
    }
  }, 150);
};

const loadStrokes = async () => {
  try {
    const file = await readFile(STORAGE_FILE, "utf8");
    const parsed = JSON.parse(file);
    strokes = Array.isArray(parsed) ? parsed.slice(-MAX_DOODLE_STROKES) : [];
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.error("Failed to load doodles", error);
    }
  }
};

const json = (response, status, body) => {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
};

const hasAdminAccess = (request) => {
  if (!ADMIN_TOKEN) return false;

  const authorization = request.headers.authorization || "";
  return authorization === `Bearer ${ADMIN_TOKEN}`;
};

const deleteStroke = (strokeId) => {
  const nextStrokes = strokes.filter((stroke) => stroke.id !== strokeId);
  if (nextStrokes.length === strokes.length) return false;

  strokes = nextStrokes;
  broadcast({ type: "delete-stroke", strokeId });
  queueSave();

  return true;
};

const deleteUserStrokes = (authorId) => {
  const nextStrokes = strokes.filter((stroke) => stroke.authorId !== authorId);
  const deleted = strokes.length - nextStrokes.length;
  if (deleted === 0) return 0;

  strokes = nextStrokes;
  broadcast({ type: "clear-own", authorId });
  queueSave();

  return deleted;
};

const clearAllStrokes = () => {
  const deleted = strokes.length;
  strokes = [];
  broadcast({ type: "clear-all" });
  queueSave();

  return deleted;
};

const handleAdminRequest = (request, response, url) => {
  if (!hasAdminAccess(request)) {
    json(response, 401, { error: "Unauthorized" });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/admin/strokes") {
    json(response, 200, { strokes });
    return true;
  }

  const strokeMatch = url.pathname.match(/^\/admin\/strokes\/([^/]+)$/);
  if (request.method === "DELETE" && strokeMatch) {
    const strokeId = decodeURIComponent(strokeMatch[1]);
    const deleted = deleteStroke(strokeId);
    json(response, deleted ? 200 : 404, deleted ? { ok: true } : { error: "Stroke not found" });
    return true;
  }

  const userMatch = url.pathname.match(/^\/admin\/users\/([^/]+)\/strokes$/);
  if (request.method === "DELETE" && userMatch) {
    const authorId = decodeURIComponent(userMatch[1]);
    const deleted = deleteUserStrokes(authorId);
    json(response, 200, { ok: true, deleted });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/admin/clear") {
    const deleted = clearAllStrokes();
    json(response, 200, { ok: true, deleted });
    return true;
  }

  json(response, 404, { error: "Not found" });
  return true;
};

const handleMessage = (socket, authorId, rawMessage) => {
  let message;

  try {
    message = JSON.parse(String(rawMessage));
  } catch {
    return;
  }

  if (message.type === "stroke" && isValidStroke(message.stroke, authorId)) {
    strokes = [...strokes, message.stroke].slice(-MAX_DOODLE_STROKES);
    broadcast({ type: "stroke", stroke: message.stroke });
    queueSave();
    return;
  }

  if (message.type === "undo" && typeof message.strokeId === "string") {
    const nextStrokes = strokes.filter(
      (stroke) => !(stroke.id === message.strokeId && stroke.authorId === authorId)
    );

    if (nextStrokes.length !== strokes.length) {
      strokes = nextStrokes;
      broadcast({ type: "undo", strokeId: message.strokeId });
      queueSave();
    }
    return;
  }

  if (message.type === "clear-own") {
    const nextStrokes = strokes.filter((stroke) => stroke.authorId !== authorId);

    if (nextStrokes.length !== strokes.length) {
      strokes = nextStrokes;
      broadcast({ type: "clear-own", authorId });
      queueSave();
    }
    return;
  }

  if (message.type === "cursor" && isValidUser(message.user, authorId) && isValidPoint(message.point, "normalized")) {
    const cursor = {
      user: message.user,
      point: message.point,
      isDrawing: Boolean(message.isDrawing),
      updatedAt: Date.now(),
    };

    cursors.set(authorId, cursor);
    broadcast({ type: "cursor", cursor });
    return;
  }

  if (message.type === "cursor-leave" && message.userId === authorId) {
    cursors.delete(authorId);
    broadcast({ type: "cursor-leave", userId: authorId });
    broadcastPresence();
  }
};

await loadStrokes();

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", "http://localhost");

  if (url.pathname === "/health") {
    json(response, 200, { ok: true, users: clients.size, strokes: strokes.length });
    return;
  }

  if (url.pathname.startsWith("/admin/")) {
    handleAdminRequest(request, response, url);
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

const websocketServer = new WebSocketServer({ server });

websocketServer.on("connection", (socket, request) => {
  if (!isAllowedOrigin(request.headers.origin)) {
    socket.close(1008, "Origin not allowed");
    return;
  }

  const authorId = new URL(request.url || "/", "ws://localhost").searchParams.get("clientId") || randomUUID();
  clients.set(socket, authorId);

  socket.send(JSON.stringify({ type: "init", strokes, users: clients.size }));
  broadcastPresence();

  socket.on("message", (message) => handleMessage(socket, authorId, message));
  socket.on("close", () => {
    clients.delete(socket);
    cursors.delete(authorId);
    broadcast({ type: "cursor-leave", userId: authorId });
    broadcastPresence();
  });
});

server.listen(PORT, () => {
  console.log(`Doodle websocket listening on ${PORT}`);
});
