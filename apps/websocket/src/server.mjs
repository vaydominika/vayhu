import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || 1999);
const STORAGE_FILE = process.env.DOODLE_STORAGE_FILE || path.join(process.cwd(), "data", "doodle-strokes.json");
const MAX_DOODLE_STROKES = 250;
const MAX_STROKE_POINTS = 600;
const ALLOWED_ORIGINS = (process.env.DOODLE_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {Array<import("./types.js").DoodleStroke>} */
let strokes = [];
const clients = new Map();
let saveTimer = null;

const isAllowedOrigin = (origin) => {
  if (ALLOWED_ORIGINS.length === 0) return true;
  if (!origin) return false;

  return ALLOWED_ORIGINS.includes(origin);
};

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

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
    if (socket.readyState === socket.OPEN) {
      socket.send(payload);
    }
  }
};

const broadcastPresence = () => {
  broadcast({ type: "presence", users: clients.size });
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
  }
};

await loadStrokes();

const server = createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: true, users: clients.size, strokes: strokes.length }));
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
    broadcastPresence();
  });
});

server.listen(PORT, () => {
  console.log(`Doodle websocket listening on ${PORT}`);
});
