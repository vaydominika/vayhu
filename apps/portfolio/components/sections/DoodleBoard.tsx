"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Brush, Eraser, PencilLine, RotateCcw, Trash2, UsersRound, WifiOff } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { Doodle } from "@/components/ui/Doodle";
import {
  DoodleCursor,
  DoodleServerMessage,
  DoodleStroke,
  DoodleUser,
  MAX_DOODLE_STROKES,
} from "@/lib/doodle-wall";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "charcoal", value: "#3A3A3A" },
  { name: "pink", value: "#DDBCC7" },
  { name: "sage", value: "#B8C8B0" },
  { name: "teal", value: "#AFCFC9" },
  { name: "sunny", value: "#E5B94E" },
];

const PRESENCE_COLORS = ["#DDBCC7", "#B8C8B0", "#AFCFC9", "#E5B94E", "#C7B8EA", "#E6A6A6"];
const NAME_ADJECTIVES = ["Tiny", "Sparkly", "Jelly", "Zippy", "Cosmic", "Sunny", "Velvet", "Lucky"];
const NAME_NOUNS = ["Pencil", "Comet", "Pickle", "Sticker", "Moon", "Button", "Doodle", "Pebble"];
const CURSOR_SEND_INTERVAL = 50;
const CURSOR_STALE_AFTER = 4500;
const LOCAL_CURSOR_FALLBACK: DoodleUser = {
  id: "local-cursor",
  name: "Your doodle",
  color: COLORS[0].value,
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const hashString = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

const createDoodleUser = (id: string): DoodleUser => {
  const hash = hashString(id);

  return {
    id,
    name: `${NAME_ADJECTIVES[hash % NAME_ADJECTIVES.length]} ${NAME_NOUNS[(hash >> 3) % NAME_NOUNS.length]}`,
    color: PRESENCE_COLORS[hash % PRESENCE_COLORS.length],
  };
};

const DOODLE_USER_COOKIE = "vay_doodle_user_id";
const DOODLE_USER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return "";

  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1] ?? "";
};

const getOrCreateDoodleUserId = () => {
  const existingId = decodeURIComponent(getCookieValue(DOODLE_USER_COOKIE));
  if (existingId) return existingId;

  const nextId = createId();
  document.cookie = `${DOODLE_USER_COOKIE}=${encodeURIComponent(nextId)}; max-age=${DOODLE_USER_COOKIE_MAX_AGE}; path=/; samesite=lax`;

  return nextId;
};

const getDoodleWebSocketUrl = (clientId: string) => {
  const configuredHost = process.env.NEXT_PUBLIC_DOODLE_WS_HOST;
  let host = configuredHost || "";

  if (!host && typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    host = "ws://127.0.0.1:1999";
  }

  if (!host) return "";

  const isFullUrl = host.startsWith("ws://") || host.startsWith("wss://");
  const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1");
  const url = new URL(isFullUrl ? host : `${isLocalHost ? "ws" : "wss"}://${host}`);
  url.searchParams.set("clientId", clientId);

  return url.toString();
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const denormalizePoint = (point: DoodleStroke["points"][number], width: number, height: number) => ({
  x: point.x * width,
  y: point.y * height,
});

const CursorMarkerBody = ({ user }: { user: DoodleCursor["user"] }) => (
  <div className="relative h-5 w-4">
    <div
      className="absolute bottom-6 left-0 w-max -translate-x-1 border bg-white/95 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal shadow-scrapbook-sm"
      style={{ borderColor: user.color }}
    >
      {user.name}
    </div>
    <div
      className="absolute left-0 top-0 h-5 w-4 drop-shadow-sm"
      style={{
        backgroundColor: user.color,
        clipPath: "polygon(0 0, 0 16px, 5px 12px, 8px 19px, 10px 18px, 7px 11px, 15px 11px)",
      }}
    />
  </div>
);

const hasCanvasInk = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (width === 0 || height === 0) return false;

  const { data } = ctx.getImageData(0, 0, width, height);

  for (let index = 3; index < data.length; index += 4) {
    if (data[index] > 0) return true;
  }

  return false;
};

const drawStroke = (
  ctx: CanvasRenderingContext2D,
  stroke: DoodleStroke,
  width: number,
  height: number
) => {
  const [firstPoint, ...restPoints] = stroke.points;
  if (!firstPoint) return;
  const shouldScalePoint = stroke.coordinateSpace === "normalized";
  const firstDrawPoint = shouldScalePoint ? denormalizePoint(firstPoint, width, height) : firstPoint;

  ctx.save();
  ctx.globalCompositeOperation = stroke.mode === "erase" ? "destination-out" : "source-over";
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(firstDrawPoint.x, firstDrawPoint.y);

  if (restPoints.length === 0) {
    ctx.lineTo(firstDrawPoint.x + 0.1, firstDrawPoint.y + 0.1);
  } else {
    restPoints.forEach((point) => {
      const drawPoint = shouldScalePoint ? denormalizePoint(point, width, height) : point;
      ctx.lineTo(drawPoint.x, drawPoint.y);
    });
  }

  ctx.stroke();
  ctx.restore();
};

const drawLatestStrokeSegment = (
  ctx: CanvasRenderingContext2D,
  stroke: DoodleStroke,
  width: number,
  height: number
) => {
  const lastPoint = stroke.points.at(-1);
  if (!lastPoint) return;
  const previousPoint = stroke.points.at(-2) ?? lastPoint;
  const shouldScalePoint = stroke.coordinateSpace === "normalized";
  const from = shouldScalePoint ? denormalizePoint(previousPoint, width, height) : previousPoint;
  const to = shouldScalePoint ? denormalizePoint(lastPoint, width, height) : lastPoint;

  ctx.save();
  ctx.globalCompositeOperation = stroke.mode === "erase" ? "destination-out" : "source-over";
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x + (from.x === to.x && from.y === to.y ? 0.1 : 0), to.y + (from.x === to.x && from.y === to.y ? 0.1 : 0));
  ctx.stroke();
  ctx.restore();
};

type CanvasLayer = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  hasInk: boolean;
};

const createLayer = (canvas: HTMLCanvasElement): CanvasLayer | null => {
  const layer = document.createElement("canvas");
  layer.width = canvas.width;
  layer.height = canvas.height;

  const layerCtx = layer.getContext("2d", { willReadFrequently: true });
  if (!layerCtx) return null;

  const ratio = canvas.clientWidth > 0 ? canvas.width / canvas.clientWidth : 1;
  layerCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

  return { canvas: layer, ctx: layerCtx, hasInk: false };
};

export const DoodleBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const clientIdRef = useRef("");
  const currentUserRef = useRef<DoodleUser | null>(null);
  const lastCursorSentAtRef = useRef(0);
  const latestCursorPayloadRef = useRef<{ point: DoodleStroke["points"][number]; isDrawing: boolean } | null>(null);
  const cursorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redrawFrameRef = useRef<number | null>(null);
  const activeStrokeRef = useRef<DoodleStroke | null>(null);
  const strokesRef = useRef<DoodleStroke[]>([]);
  const layersRef = useRef<Map<string, CanvasLayer>>(new Map());
  const boardRectRef = useRef<DOMRect | null>(null);
  const remoteCursorsRef = useRef<Record<string, DoodleCursor>>({});
  const remoteCursorElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const hasVisibleInkRef = useRef(false);
  const hasOwnVisibleInkRef = useRef(false);
  const [strokes, setStrokes] = useState<DoodleStroke[]>([]);
  const [hasVisibleInk, setHasVisibleInk] = useState(false);
  const [hasOwnVisibleInk, setHasOwnVisibleInk] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"draw" | "erase">("draw");
  const [connectionState, setConnectionState] = useState<"local" | "connecting" | "live">("local");
  const [userCount, setUserCount] = useState(1);
  const [remoteCursorUsers, setRemoteCursorUsers] = useState<DoodleUser[]>([]);
  const [activeUsers, setActiveUsers] = useState<DoodleUser[]>([]);
  const localCursorRef = useRef<HTMLDivElement | null>(null);
  const [currentUser, setCurrentUser] = useState<DoodleUser | null>(null);

  const getClientId = useCallback(() => {
    if (!clientIdRef.current && typeof document !== "undefined") {
      clientIdRef.current = getOrCreateDoodleUserId();
    }

    if (!clientIdRef.current) {
      clientIdRef.current = createId();
    }

    return clientIdRef.current;
  }, []);

  const getCurrentUser = useCallback(() => {
    if (!currentUserRef.current) {
      currentUserRef.current = createDoodleUser(getClientId());
    }

    return currentUserRef.current;
  }, [getClientId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setCurrentUser(getCurrentUser()), 0);
    return () => window.clearTimeout(timeout);
  }, [getCurrentUser]);

  const sendMessage = useCallback((message: object) => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }, []);

  const flushCursor = useCallback(() => {
    const payload = latestCursorPayloadRef.current;
    if (!payload) return;

    latestCursorPayloadRef.current = null;
    lastCursorSentAtRef.current = Date.now();
    sendMessage({
      type: "cursor",
      user: getCurrentUser(),
      point: payload.point,
      isDrawing: payload.isDrawing,
    });
  }, [getCurrentUser, sendMessage]);

  const sendCursor = useCallback((point: DoodleStroke["points"][number], isDrawing: boolean) => {
    latestCursorPayloadRef.current = { point, isDrawing };
    const elapsed = Date.now() - lastCursorSentAtRef.current;

    if (elapsed >= CURSOR_SEND_INTERVAL) {
      if (cursorTimerRef.current) {
        clearTimeout(cursorTimerRef.current);
        cursorTimerRef.current = null;
      }
      flushCursor();
      return;
    }

    if (!cursorTimerRef.current) {
      cursorTimerRef.current = setTimeout(() => {
        cursorTimerRef.current = null;
        flushCursor();
      }, CURSOR_SEND_INTERVAL - elapsed);
    }
  }, [flushCursor]);

  const sendCursorLeave = useCallback(() => {
    if (cursorTimerRef.current) {
      clearTimeout(cursorTimerRef.current);
      cursorTimerRef.current = null;
    }

    latestCursorPayloadRef.current = null;
    if (localCursorRef.current) {
      localCursorRef.current.style.opacity = "0";
    }
    sendMessage({ type: "cursor-leave", userId: getClientId() });
  }, [getClientId, sendMessage]);

  const publishInkState = useCallback(() => {
    let nextHasVisibleInk = false;
    let nextHasOwnVisibleInk = false;

    layersRef.current.forEach((layer, authorId) => {
      nextHasVisibleInk ||= layer.hasInk;
      nextHasOwnVisibleInk ||= authorId === clientIdRef.current && layer.hasInk;
    });

    if (hasVisibleInkRef.current !== nextHasVisibleInk) {
      hasVisibleInkRef.current = nextHasVisibleInk;
      setHasVisibleInk(nextHasVisibleInk);
    }
    if (hasOwnVisibleInkRef.current !== nextHasOwnVisibleInk) {
      hasOwnVisibleInkRef.current = nextHasOwnVisibleInk;
      setHasOwnVisibleInk(nextHasOwnVisibleInk);
    }
  }, []);

  const refreshLayerInk = useCallback((authorIds?: Iterable<string>) => {
    const ids = authorIds ? Array.from(authorIds) : Array.from(layersRef.current.keys());
    ids.forEach((authorId) => {
      const layer = layersRef.current.get(authorId);
      if (!layer) return;
      layer.hasInk = hasCanvasInk(layer.ctx, layer.canvas.width, layer.canvas.height);
    });
    publishInkState();
  }, [publishInkState]);

  const getOrCreateLayer = useCallback((authorId: string) => {
    const existingLayer = layersRef.current.get(authorId);
    if (existingLayer) return existingLayer;
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const layer = createLayer(canvas);
    if (!layer) return null;
    layersRef.current.set(authorId, layer);
    return layer;
  }, []);

  const compositeLayers = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layersRef.current.forEach((layer) => {
      ctx.drawImage(layer.canvas, 0, 0);
    });
    ctx.restore();
  }, []);

  const drawStrokeIntoCache = useCallback((stroke: DoodleStroke, latestSegmentOnly = false) => {
    const canvas = canvasRef.current;
    const layer = getOrCreateLayer(stroke.authorId);
    if (!canvas || !layer) return null;
    if (latestSegmentOnly) {
      drawLatestStrokeSegment(layer.ctx, stroke, canvas.clientWidth, canvas.clientHeight);
    } else {
      drawStroke(layer.ctx, stroke, canvas.clientWidth, canvas.clientHeight);
    }
    if (stroke.mode === "draw") layer.hasInk = true;
    return layer;
  }, [getOrCreateLayer]);

  const rebuildLayers = useCallback((nextStrokes: DoodleStroke[] = strokesRef.current) => {
    layersRef.current.clear();
    const strokesToRender = activeStrokeRef.current ? [...nextStrokes, activeStrokeRef.current] : nextStrokes;
    strokesToRender.forEach((stroke) => drawStrokeIntoCache(stroke));
    compositeLayers();
    refreshLayerInk();
  }, [compositeLayers, drawStrokeIntoCache, refreshLayerInk]);

  const rebuildAuthorLayer = useCallback((authorId: string, nextStrokes: DoodleStroke[]) => {
    layersRef.current.delete(authorId);
    nextStrokes
      .filter((stroke) => stroke.authorId === authorId)
      .forEach((stroke) => drawStrokeIntoCache(stroke));
    if (activeStrokeRef.current?.authorId === authorId) {
      drawStrokeIntoCache(activeStrokeRef.current);
    }
    compositeLayers();
    refreshLayerInk([authorId]);
  }, [compositeLayers, drawStrokeIntoCache, refreshLayerInk]);

  const storeStrokes = useCallback((nextStrokes: DoodleStroke[]) => {
    strokesRef.current = nextStrokes;
    setStrokes(nextStrokes);
  }, []);

  const appendStroke = useCallback((stroke: DoodleStroke, alreadyDrawn = false) => {
    const didTrimHistory = strokesRef.current.length >= MAX_DOODLE_STROKES;
    const nextStrokes = [...strokesRef.current, stroke].slice(-MAX_DOODLE_STROKES);
    storeStrokes(nextStrokes);

    if (didTrimHistory) {
      rebuildLayers(nextStrokes);
      return;
    }
    const layer = alreadyDrawn ? layersRef.current.get(stroke.authorId) : drawStrokeIntoCache(stroke);
    if (stroke.mode === "draw" && layer) layer.hasInk = true;
    compositeLayers();
    if (stroke.mode === "erase") {
      refreshLayerInk([stroke.authorId]);
    } else {
      publishInkState();
    }
  }, [compositeLayers, drawStrokeIntoCache, publishInkState, rebuildLayers, refreshLayerInk, storeStrokes]);

  const positionRemoteCursor = useCallback((cursor: DoodleCursor) => {
    const element = remoteCursorElementsRef.current.get(cursor.user.id);
    const rect = boardRectRef.current;
    if (!element || !rect) return;
    element.style.transform = `translate3d(${cursor.point.x * rect.width}px, ${cursor.point.y * rect.height}px, 0)`;
    element.style.opacity = cursor.isDrawing ? "1" : "0.82";
  }, []);

  const positionLocalCursor = useCallback((point: DoodleStroke["points"][number], opacity: string) => {
    const rect = boardRectRef.current;
    const element = localCursorRef.current;
    if (!rect || !element) return;
    element.style.transform = `translate3d(${point.x * rect.width}px, ${point.y * rect.height}px, 0)`;
    element.style.opacity = opacity;
  }, []);

  const scheduleLiveRedraw = useCallback(() => {
    if (redrawFrameRef.current !== null) return;
    redrawFrameRef.current = requestAnimationFrame(() => {
      redrawFrameRef.current = null;
      compositeLayers();
    });
  }, [compositeLayers]);

  useEffect(() => () => {
    if (redrawFrameRef.current !== null) {
      cancelAnimationFrame(redrawFrameRef.current);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const board = boardRef.current;
    if (!canvas || !board) return;

    let boundsFrame: number | null = null;

    const updateBoardBounds = () => {
      boardRectRef.current = canvas.getBoundingClientRect();
    };

    const scheduleBoardBoundsUpdate = () => {
      if (boundsFrame !== null) return;
      boundsFrame = requestAnimationFrame(() => {
        boundsFrame = null;
        updateBoardBounds();
      });
    };

    const resizeCanvas = () => {
      const rect = board.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(rect.width * ratio);
      const height = Math.round(rect.height * ratio);

      if (canvas.width === width && canvas.height === height) {
        updateBoardBounds();
        Object.values(remoteCursorsRef.current).forEach(positionRemoteCursor);
        return;
      }

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      updateBoardBounds();
      rebuildLayers();
      Object.values(remoteCursorsRef.current).forEach(positionRemoteCursor);
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(board);
    window.addEventListener("scroll", scheduleBoardBoundsUpdate, { capture: true, passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleBoardBoundsUpdate, true);
      if (boundsFrame !== null) cancelAnimationFrame(boundsFrame);
    };
  }, [positionRemoteCursor, rebuildLayers]);

  useEffect(() => {
    const socketUrl = getDoodleWebSocketUrl(getClientId());
    if (!socketUrl) {
      setConnectionState("local");
      return;
    }

    setConnectionState("connecting");

    const socket = new WebSocket(socketUrl);

    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionState("live");
    });

    socket.addEventListener("close", () => {
      setConnectionState("connecting");
    });

    socket.addEventListener("error", () => {
      setConnectionState("connecting");
    });

    socket.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return;

      let message: DoodleServerMessage;
      try {
        message = JSON.parse(event.data) as DoodleServerMessage;
      } catch {
        return;
      }

      if (message.type === "init") {
        storeStrokes(message.strokes);
        rebuildLayers(message.strokes);
        setUserCount(message.users);
        return;
      }

      if (message.type === "stroke") {
        appendStroke(message.stroke);
        return;
      }

      if (message.type === "undo") {
        const removedStroke = strokesRef.current.find((stroke) => stroke.id === message.strokeId);
        const nextStrokes = strokesRef.current.filter((stroke) => stroke.id !== message.strokeId);
        storeStrokes(nextStrokes);
        if (removedStroke) rebuildAuthorLayer(removedStroke.authorId, nextStrokes);
        return;
      }

      if (message.type === "clear-own") {
        const nextStrokes = strokesRef.current.filter((stroke) => stroke.authorId !== message.authorId);
        storeStrokes(nextStrokes);
        rebuildAuthorLayer(message.authorId, nextStrokes);
        return;
      }

      if (message.type === "delete-stroke") {
        const removedStroke = strokesRef.current.find((stroke) => stroke.id === message.strokeId);
        const nextStrokes = strokesRef.current.filter((stroke) => stroke.id !== message.strokeId);
        storeStrokes(nextStrokes);
        if (removedStroke) rebuildAuthorLayer(removedStroke.authorId, nextStrokes);
        return;
      }

      if (message.type === "clear-all") {
        storeStrokes([]);
        rebuildLayers([]);
        return;
      }

      if (message.type === "cursor") {
        if (message.cursor.user.id === clientIdRef.current) return;

        const userId = message.cursor.user.id;
        const isNewCursor = !remoteCursorsRef.current[userId];
        remoteCursorsRef.current[userId] = message.cursor;
        if (isNewCursor) {
          setRemoteCursorUsers((currentUsers) => [...currentUsers, message.cursor.user]);
        }
        positionRemoteCursor(message.cursor);
        return;
      }

      if (message.type === "cursor-leave") {
        delete remoteCursorsRef.current[message.userId];
        remoteCursorElementsRef.current.delete(message.userId);
        setRemoteCursorUsers((currentUsers) => currentUsers.filter((user) => user.id !== message.userId));
        setActiveUsers((currentUsers) => currentUsers.filter((user) => user.id !== message.userId));
        return;
      }

      if (message.type === "presence") {
        setUserCount(message.users);
        setActiveUsers((message.activeUsers ?? []).filter((user) => user.id !== clientIdRef.current));
      }
    });

    return () => {
      sendCursorLeave();
      socket.close();
      socketRef.current = null;
    };
  }, [appendStroke, getClientId, positionRemoteCursor, rebuildAuthorLayer, rebuildLayers, sendCursorLeave, storeStrokes]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();

      const staleUserIds = Object.entries(remoteCursorsRef.current)
        .filter(([, cursor]) => now - cursor.updatedAt >= CURSOR_STALE_AFTER)
        .map(([userId]) => userId);
      if (staleUserIds.length === 0) return;
      staleUserIds.forEach((userId) => {
        delete remoteCursorsRef.current[userId];
        remoteCursorElementsRef.current.delete(userId);
      });
      setRemoteCursorUsers((currentUsers) => currentUsers.filter((user) => !staleUserIds.includes(user.id)));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const getPoint = (
    event: Pick<React.PointerEvent<HTMLCanvasElement>, "clientX" | "clientY" | "currentTarget">
  ) => {
    const rect = boardRectRef.current ?? event.currentTarget.getBoundingClientRect();
    boardRectRef.current = rect;

    return {
      x: rect.width > 0 ? clamp((event.clientX - rect.left) / rect.width) : 0,
      y: rect.height > 0 ? clamp((event.clientY - rect.top) / rect.height) : 0,
    };
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLCanvasElement>) => {
    boardRectRef.current = event.currentTarget.getBoundingClientRect();
    const point = getPoint(event);
    positionLocalCursor(point, activeStrokeRef.current ? "1" : "0.82");
    sendCursor(point, Boolean(activeStrokeRef.current));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    boardRectRef.current = event.currentTarget.getBoundingClientRect();
    const point = getPoint(event);
    const clientId = getClientId();
    getCurrentUser();

    positionLocalCursor(point, "1");

    sendCursor(point, true);
    setIsDrawing(true);
    const activeStroke: DoodleStroke = {
      id: createId(),
      authorId: clientId,
      coordinateSpace: "normalized",
      color: selectedColor,
      size: tool === "erase" ? Math.max(brushSize * 2, 14) : brushSize,
      mode: tool,
      points: [point],
      createdAt: Date.now(),
    };
    activeStrokeRef.current = activeStroke;
    drawStrokeIntoCache(activeStroke, true);
    scheduleLiveRedraw();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "mouse" && !activeStrokeRef.current) return;

    const point = getPoint(event);

    positionLocalCursor(point, activeStrokeRef.current ? "1" : "0.82");

    sendCursor(point, Boolean(activeStrokeRef.current));
    if (!activeStrokeRef.current) return;

    activeStrokeRef.current.points.push(point);
    drawStrokeIntoCache(activeStrokeRef.current, true);
    scheduleLiveRedraw();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeStrokeRef.current) return;

    const point = getPoint(event);
    positionLocalCursor(point, "0.82");
    sendCursor(point, false);
  };

  const finishStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const activeStroke = activeStrokeRef.current;
    if (!activeStroke) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const endPoint = activeStroke.points.at(-1) ?? getPoint(event);
    activeStrokeRef.current = null;
    setIsDrawing(false);
    positionLocalCursor(endPoint, "0.82");
    sendCursor(endPoint, false);
    appendStroke(activeStroke, true);
    sendMessage({ type: "stroke", stroke: activeStroke });
  };

  const handlePointerLeaveBoard = (event: React.PointerEvent<HTMLCanvasElement>) => {
    finishStroke(event);
    sendCursorLeave();
  };

  const undo = () => {
    setIsDrawing(false);
    activeStrokeRef.current = null;
    const ownStrokeIndex = strokesRef.current.findLastIndex((stroke) => stroke.authorId === clientIdRef.current);
    if (ownStrokeIndex === -1) return;

    const removedStrokeId = strokesRef.current[ownStrokeIndex].id;

    const nextStrokes = strokesRef.current.filter((stroke) => stroke.id !== removedStrokeId);
    storeStrokes(nextStrokes);
    rebuildAuthorLayer(clientIdRef.current, nextStrokes);
    sendMessage({ type: "undo", strokeId: removedStrokeId });
  };

  const clear = () => {
    setIsDrawing(false);
    activeStrokeRef.current = null;
    const nextStrokes = strokesRef.current.filter((stroke) => stroke.authorId !== clientIdRef.current);
    storeStrokes(nextStrokes);
    rebuildAuthorLayer(clientIdRef.current, nextStrokes);
    sendMessage({ type: "clear-own" });
  };

  const hasOwnUndoHistory = currentUser ? strokes.some((stroke) => stroke.authorId === currentUser.id) : false;
  const activePreviewSize = tool === "erase" ? Math.max(brushSize * 2, 14) : brushSize;
  return (
    <section className="relative">
      <Doodle
        src="/assets/spiral-2.svg"
        className="absolute -left-6 top-8 h-24 w-24 -rotate-12 opacity-15"
        color="bg-teal"
      />
      <Doodle
        src="/assets/star-8.svg"
        className="absolute -right-4 bottom-12 h-20 w-20 rotate-12 opacity-20"
        color="bg-pink"
      />
      <Doodle
        src="/assets/shine-3.svg"
        className="absolute right-[18%] top-24 h-14 w-14 -rotate-6 opacity-20"
        color="bg-sage"
      />
      <Doodle
        src="/assets/strawberry-2.svg"
        className="absolute left-[8%] bottom-4 h-16 w-16 rotate-12 opacity-15"
        color="bg-pink"
      />

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
            <PencilLine className="h-3.5 w-3.5" />
            tiny guestbook
          </div>
          <h2 className="font-serif text-4xl font-bold leading-tight text-charcoal md:text-5xl">
            Leave a doodle
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-charcoal/60 md:text-right">
          Draw something small before you go.
        </p>
      </div>

      <PaperCard
        variant={["default", "dotted"]}
        rotation="none"
        tape="none"
        className="relative overflow-visible border-[#DED8CA] bg-white/95 hover:translate-y-0 hover:rotate-0"
      >
        <div className="pointer-events-none absolute -top-8 left-5 z-30 h-14 w-32 -rotate-8 select-none md:left-10 md:w-36">
          <Image src="/assets/tape-2.png" alt="" fill sizes="144px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute -top-7 right-5 z-30 h-14 w-32 rotate-8 select-none md:right-10 md:w-36">
          <Image src="/assets/tape-5.png" alt="" fill sizes="144px" className="object-contain" />
        </div>
        <Doodle
          src="/assets/leaf-1-mask.png"
          className="absolute -right-5 top-1/3 h-16 w-16 rotate-12 opacity-25"
          color="bg-sage"
        />
        <Doodle
          src="/assets/spiral-1-mask.png"
          className="absolute -left-4 bottom-10 h-14 w-14 -rotate-12 opacity-20"
          color="bg-teal"
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_190px] lg:items-stretch">
          <div
            ref={boardRef}
            className="relative h-[360px] min-h-[320px] overflow-hidden border border-charcoal/10 bg-[#FFFCF6] shadow-inner md:h-[430px]"
          >
            <canvas
              ref={canvasRef}
              className="block h-full w-full touch-none cursor-none"
              aria-label="Drawing canvas"
              onPointerEnter={handlePointerEnter}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onMouseMove={handleMouseMove}
              onPointerUp={finishStroke}
              onPointerCancel={handlePointerLeaveBoard}
              onPointerLeave={handlePointerLeaveBoard}
            />
            {remoteCursorUsers.map((user) => (
              <div
                key={user.id}
                ref={(element) => {
                  if (!element) {
                    remoteCursorElementsRef.current.delete(user.id);
                    return;
                  }
                  remoteCursorElementsRef.current.set(user.id, element);
                  const cursor = remoteCursorsRef.current[user.id];
                  if (cursor) positionRemoteCursor(cursor);
                }}
                className="pointer-events-none absolute left-0 top-0 z-20 transition-[transform,opacity] duration-100"
              >
                <CursorMarkerBody user={user} />
              </div>
            ))}
            <div
              ref={localCursorRef}
              className="pointer-events-none absolute left-0 top-0 z-20 opacity-0"
            >
              <CursorMarkerBody user={currentUser ?? LOCAL_CURSOR_FALLBACK} />
            </div>
            {!hasVisibleInk && !isDrawing && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-handwriting text-2xl text-charcoal/25">
                draw something tiny
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-5 border border-charcoal/10 bg-offwhite/70 p-4 shadow-scrapbook-sm">
            <div className="space-y-5">
              <div
                className={cn(
                  "inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]",
                  connectionState === "live"
                    ? "border-sage/60 bg-sage/25 text-emerald-900/70"
                    : "border-charcoal/10 bg-white text-charcoal/45"
                )}
              >
                {connectionState === "live" ? <UsersRound className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
                {connectionState === "live" ? `${userCount} online` : connectionState === "connecting" ? "connecting" : "local only"}
                {activeUsers.length > 0 && (
                  <span className="ml-1 hidden items-center gap-1 sm:inline-flex">
                    {activeUsers.slice(0, 4).map((user) => (
                      <span
                        key={user.id}
                        className="h-2 w-2 rounded-full border border-white/70"
                        style={{ backgroundColor: user.color }}
                        title={user.name}
                      />
                    ))}
                  </span>
                )}
              </div>

              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                  tool
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTool("draw")}
                    className={cn(
                      "inline-flex h-10 items-center justify-center gap-2 border px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,border-color,color] hover:-translate-y-0.5 active:scale-95",
                      tool === "draw"
                        ? "border-charcoal/30 bg-sage/35 text-charcoal"
                        : "border-charcoal/15 bg-white text-charcoal/60 hover:bg-sage/15"
                    )}
                    aria-pressed={tool === "draw"}
                  >
                    <PencilLine className="h-4 w-4" />
                    Pen
                  </button>
                  <button
                    type="button"
                    onClick={() => setTool("erase")}
                    className={cn(
                      "inline-flex h-10 items-center justify-center gap-2 border px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,border-color,color] hover:-translate-y-0.5 active:scale-95",
                      tool === "erase"
                        ? "border-pink/60 bg-pink/35 text-charcoal"
                        : "border-charcoal/15 bg-white text-charcoal/60 hover:bg-pink/15"
                    )}
                    aria-pressed={tool === "erase"}
                  >
                    <Eraser className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                    Rubber
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                  ink
                </div>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.value);
                        setTool("draw");
                      }}
                      className={cn(
                        "h-9 w-9 border border-charcoal/15 shadow-scrapbook-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal",
                        selectedColor === color.value && "ring-2 ring-charcoal/50 ring-offset-2 ring-offset-offwhite"
                      )}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Use ${color.name} ink`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="brush-size" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                  size
                </label>
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                  <Brush className="h-4 w-4 text-charcoal/45" />
                  <div className="min-w-0 px-1">
                    <input
                      id="brush-size"
                      type="range"
                      min="2"
                      max="18"
                      value={brushSize}
                      onChange={(event) => setBrushSize(Number(event.target.value))}
                      className="block h-[18px] w-full cursor-pointer appearance-none bg-transparent accent-[var(--size-color)] [&::-moz-range-progress]:h-2 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[var(--size-color)] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--size-color)] [&::-moz-range-thumb]:shadow-scrapbook-sm [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--size-muted)] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--size-color)_0%,var(--size-color)_var(--size-progress),var(--size-muted)_var(--size-progress),var(--size-muted)_100%)] [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[var(--size-color)] [&::-webkit-slider-thumb]:shadow-scrapbook-sm"
                      style={{
                        "--size-color": tool === "erase" ? "#3A3A3A" : selectedColor,
                        "--size-muted": `${tool === "erase" ? "#3A3A3A" : selectedColor}55`,
                        "--size-progress": `${((brushSize - 2) / 16) * 100}%`,
                      } as React.CSSProperties}
                    />
                  </div>
                  <div className="flex shrink-0 items-center justify-end gap-0">
                    <div className="flex h-7 w-5 items-center justify-end">
                      <span
                        className={cn("block rounded-full", tool === "erase" ? "bg-charcoal/20" : "border border-charcoal/15")}
                        style={{
                          width: `${Math.min(activePreviewSize, 22)}px`,
                          height: `${Math.min(activePreviewSize, 22)}px`,
                          backgroundColor: tool === "erase" ? undefined : selectedColor,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-7 text-right font-mono text-xs text-charcoal/55">
                      {brushSize}px
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={!hasOwnUndoHistory}
                className="inline-flex h-10 items-center justify-center gap-2 border border-charcoal/20 bg-white px-3 text-xs font-semibold text-charcoal shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-sage/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <RotateCcw className="h-4 w-4" />
                Undo
              </button>
              <button
                type="button"
                onClick={clear}
                disabled={!hasOwnVisibleInk}
                className="inline-flex h-10 items-center justify-center gap-2 border border-pink/50 bg-pink/30 px-3 text-xs font-semibold text-charcoal shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-pink/45 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>
      </PaperCard>
    </section>
  );
};
