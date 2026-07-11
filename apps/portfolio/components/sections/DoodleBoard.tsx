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

const CursorMarker = ({ cursor }: { cursor: DoodleCursor }) => (
  <div
    className="pointer-events-none absolute z-20 transition-[left,top,opacity] duration-100"
    style={{
      left: `${cursor.point.x * 100}%`,
      top: `${cursor.point.y * 100}%`,
      opacity: cursor.isDrawing ? 1 : 0.82,
    }}
  >
    <div className="-translate-x-1 -translate-y-8">
      <div
        className="mb-1 w-max border bg-white/95 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal shadow-scrapbook-sm"
        style={{ borderColor: cursor.user.color }}
      >
        {cursor.user.name}
      </div>
      <div className="relative h-5 w-5">
        <div
          className="absolute left-0 top-0 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent drop-shadow-sm"
          style={{ borderLeftColor: cursor.user.color }}
        />
      </div>
    </div>
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

const createLayer = (canvas: HTMLCanvasElement) => {
  const layer = document.createElement("canvas");
  layer.width = canvas.width;
  layer.height = canvas.height;

  const layerCtx = layer.getContext("2d", { willReadFrequently: true });
  if (!layerCtx) return null;

  const ratio = canvas.clientWidth > 0 ? canvas.width / canvas.clientWidth : 1;
  layerCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

  return { layer, layerCtx };
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
  const [remoteCursors, setRemoteCursors] = useState<Record<string, DoodleCursor>>({});
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
    setCurrentUser(getCurrentUser());
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

  const redraw = useCallback((nextStrokes: DoodleStroke[] = strokesRef.current, updateInkState = true) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const layers = new Map<string, { layer: HTMLCanvasElement; layerCtx: CanvasRenderingContext2D }>();

    [...nextStrokes, activeStrokeRef.current].forEach((stroke) => {
      if (!stroke) return;

      let authorLayer = layers.get(stroke.authorId);
      if (!authorLayer) {
        const createdLayer = createLayer(canvas);
        if (!createdLayer) return;

        authorLayer = createdLayer;
        layers.set(stroke.authorId, authorLayer);
      }

      drawStroke(authorLayer.layerCtx, stroke, canvas.clientWidth, canvas.clientHeight);
    });

    layers.forEach(({ layer, layerCtx }, authorId) => {
      ctx.drawImage(layer, 0, 0);
    });

    ctx.restore();

    if (!updateInkState) return;

    let nextHasVisibleInk = false;
    let nextHasOwnVisibleInk = false;

    layers.forEach(({ layer, layerCtx }, authorId) => {
      const layerHasInk = hasCanvasInk(layerCtx, layer.width, layer.height);
      nextHasVisibleInk = nextHasVisibleInk || layerHasInk;
      nextHasOwnVisibleInk = nextHasOwnVisibleInk || (authorId === clientIdRef.current && layerHasInk);
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

  const scheduleLiveRedraw = useCallback(() => {
    if (redrawFrameRef.current !== null) return;

    redrawFrameRef.current = requestAnimationFrame(() => {
      redrawFrameRef.current = null;
      redraw(strokesRef.current, false);
    });
  }, [redraw]);

  useEffect(() => {
    strokesRef.current = strokes;
    redraw(strokes);
  }, [redraw, strokes]);

  useEffect(() => () => {
    if (redrawFrameRef.current !== null) {
      cancelAnimationFrame(redrawFrameRef.current);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const board = boardRef.current;
    if (!canvas || !board) return;

    const resizeCanvas = () => {
      const rect = board.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      redraw();
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(board);

    return () => observer.disconnect();
  }, [redraw]);

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
        setStrokes(message.strokes);
        setUserCount(message.users);
        return;
      }

      if (message.type === "stroke") {
        setStrokes((currentStrokes) => [...currentStrokes, message.stroke].slice(-MAX_DOODLE_STROKES));
        return;
      }

      if (message.type === "undo") {
        setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.id !== message.strokeId));
        return;
      }

      if (message.type === "clear-own") {
        setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.authorId !== message.authorId));
        return;
      }

      if (message.type === "delete-stroke") {
        setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.id !== message.strokeId));
        return;
      }

      if (message.type === "clear-all") {
        setStrokes([]);
        return;
      }

      if (message.type === "cursor") {
        if (message.cursor.user.id === clientIdRef.current) return;

        setRemoteCursors((currentCursors) => ({
          ...currentCursors,
          [message.cursor.user.id]: message.cursor,
        }));
        return;
      }

      if (message.type === "cursor-leave") {
        setRemoteCursors((currentCursors) => {
          const nextCursors = { ...currentCursors };
          delete nextCursors[message.userId];
          return nextCursors;
        });
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
  }, [getClientId, sendCursorLeave]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();

      setRemoteCursors((currentCursors) => {
        const entries = Object.entries(currentCursors).filter(([, cursor]) => now - cursor.updatedAt < CURSOR_STALE_AFTER);
        if (entries.length === Object.keys(currentCursors).length) return currentCursors;

        return Object.fromEntries(entries);
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: rect.width > 0 ? clamp((event.clientX - rect.left) / rect.width) : 0,
      y: rect.height > 0 ? clamp((event.clientY - rect.top) / rect.height) : 0,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    const clientId = getClientId();
    getCurrentUser();

    if (localCursorRef.current) {
      localCursorRef.current.style.left = `${point.x * 100}%`;
      localCursorRef.current.style.top = `${point.y * 100}%`;
      localCursorRef.current.style.opacity = "1";
    }

    sendCursor(point, true);
    setIsDrawing(true);
    activeStrokeRef.current = {
      id: createId(),
      authorId: clientId,
      coordinateSpace: "normalized",
      color: selectedColor,
      size: tool === "erase" ? Math.max(brushSize * 2, 14) : brushSize,
      mode: tool,
      points: [point],
      createdAt: Date.now(),
    };
    scheduleLiveRedraw();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);

    if (localCursorRef.current) {
      localCursorRef.current.style.left = `${point.x * 100}%`;
      localCursorRef.current.style.top = `${point.y * 100}%`;
      localCursorRef.current.style.opacity = activeStrokeRef.current ? "1" : "0.82";
    }

    sendCursor(point, Boolean(activeStrokeRef.current));
    if (!activeStrokeRef.current) return;

    activeStrokeRef.current.points.push(point);
    scheduleLiveRedraw();
  };

  const finishStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const activeStroke = activeStrokeRef.current;
    if (!activeStroke) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activeStrokeRef.current = null;
    setIsDrawing(false);

    const endPoint = activeStroke.points.at(-1) ?? getPoint(event);
    if (localCursorRef.current) {
      localCursorRef.current.style.left = `${endPoint.x * 100}%`;
      localCursorRef.current.style.top = `${endPoint.y * 100}%`;
      localCursorRef.current.style.opacity = "0.82";
    }

    sendCursor(endPoint, false);
    setStrokes((currentStrokes) => [...currentStrokes, activeStroke].slice(-MAX_DOODLE_STROKES));
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

    setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.id !== removedStrokeId));
    sendMessage({ type: "undo", strokeId: removedStrokeId });
  };

  const clear = () => {
    setIsDrawing(false);
    activeStrokeRef.current = null;
    setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.authorId !== clientIdRef.current));
    sendMessage({ type: "clear-own" });
  };

  const hasOwnUndoHistory = strokes.some((stroke) => stroke.authorId === clientIdRef.current);
  const activePreviewSize = tool === "erase" ? Math.max(brushSize * 2, 14) : brushSize;
  const visibleCursors = Object.values(remoteCursors);

  return (
    <section id="doodle" className="relative scroll-mt-24">
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
          src="/assets/leaf-1.svg"
          className="absolute -right-5 top-1/3 h-16 w-16 rotate-12 opacity-25"
          color="bg-sage"
        />
        <Doodle
          src="/assets/spiral-1.svg"
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
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishStroke}
              onPointerCancel={handlePointerLeaveBoard}
              onPointerLeave={handlePointerLeaveBoard}
            />
            {visibleCursors.map((cursor) => (
              <CursorMarker key={cursor.user.id} cursor={cursor} />
            ))}
            {currentUser && (
              <div
                ref={localCursorRef}
                className="pointer-events-none absolute z-20 opacity-0"
                style={{
                  left: "0%",
                  top: "0%",
                }}
              >
                <div className="-translate-x-1 -translate-y-8">
                  <div
                    className="mb-1 w-max border bg-white/95 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal shadow-scrapbook-sm"
                    style={{ borderColor: currentUser.color }}
                  >
                    {currentUser.name}
                  </div>
                  <div className="relative h-5 w-5">
                    <div
                      className="absolute left-0 top-0 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent drop-shadow-sm"
                      style={{ borderLeftColor: currentUser.color }}
                    />
                  </div>
                </div>
              </div>
            )}
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
