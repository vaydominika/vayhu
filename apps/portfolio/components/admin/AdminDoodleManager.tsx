"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw, Search, Trash2, UserX, XCircle } from "lucide-react";
import type { DoodleStroke } from "@/lib/doodle-wall";
import { cn } from "@/lib/utils";

type Props = {
  initialStrokes: DoodleStroke[];
};

const drawPreview = (canvas: HTMLCanvasElement, stroke: DoodleStroke) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const [firstPoint, ...restPoints] = stroke.points;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFCF6";
  ctx.fillRect(0, 0, width, height);

  if (!firstPoint) return;

  const points = stroke.coordinateSpace === "normalized"
    ? stroke.points.map((point) => ({ x: point.x * width, y: point.y * height }))
    : normalizePixelPoints(stroke.points, width, height);

  const [firstDrawPoint, ...restDrawPoints] = points;

  ctx.save();
  ctx.strokeStyle = stroke.mode === "erase" ? "#8f8a83" : stroke.color;
  ctx.lineWidth = Math.max(2, Math.min(stroke.size, 14));
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (stroke.mode === "erase") {
    ctx.setLineDash([6, 4]);
  }

  ctx.beginPath();
  ctx.moveTo(firstDrawPoint.x, firstDrawPoint.y);

  if (restPoints.length === 0) {
    ctx.lineTo(firstDrawPoint.x + 0.1, firstDrawPoint.y + 0.1);
  } else {
    restDrawPoints.forEach((point) => ctx.lineTo(point.x, point.y));
  }

  ctx.stroke();
  ctx.restore();
};

const normalizePixelPoints = (points: DoodleStroke["points"], width: number, height: number) => {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeX = Math.max(maxX - minX, 1);
  const rangeY = Math.max(maxY - minY, 1);
  const padding = 10;

  return points.map((point) => ({
    x: padding + ((point.x - minX) / rangeX) * (width - padding * 2),
    y: padding + ((point.y - minY) / rangeY) * (height - padding * 2),
  }));
};

const StrokePreview = ({ stroke }: { stroke: DoodleStroke }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawPreview(canvas, stroke);
  }, [stroke]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={72}
      className="h-[72px] w-[120px] border border-charcoal/10 bg-[#FFFCF6] shadow-inner"
      aria-label={`Preview of stroke ${stroke.id}`}
    />
  );
};

const formatDate = (createdAt: number) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(createdAt));

export const AdminDoodleManager: React.FC<Props> = ({ initialStrokes }) => {
  const [strokes, setStrokes] = useState(initialStrokes);
  const [query, setQuery] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  const userCount = useMemo(() => new Set(strokes.map((stroke) => stroke.authorId)).size, [strokes]);

  const filteredStrokes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sortedStrokes = [...strokes].sort((a, b) => b.createdAt - a.createdAt);

    if (!normalizedQuery) return sortedStrokes;

    return sortedStrokes.filter((stroke) =>
      stroke.authorId.toLowerCase().includes(normalizedQuery) ||
      stroke.id.toLowerCase().includes(normalizedQuery) ||
      stroke.mode.toLowerCase().includes(normalizedQuery)
    );
  }, [query, strokes]);

  const refresh = async () => {
    setIsBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/doodle/strokes", { cache: "no-store" });
      const payload = (await response.json()) as { strokes?: DoodleStroke[]; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Could not refresh strokes.");
      }

      setStrokes(payload.strokes ?? []);
      setMessage("Updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not refresh strokes.");
    } finally {
      setIsBusy(false);
    }
  };

  const deleteStroke = async (strokeId: string) => {
    setIsBusy(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/doodle/strokes/${encodeURIComponent(strokeId)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Could not delete stroke.");
      }

      setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.id !== strokeId));
      setMessage("Stroke deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete stroke.");
    } finally {
      setIsBusy(false);
    }
  };

  const deleteUserStrokes = async (authorId: string) => {
    if (!window.confirm(`Delete every stroke from user ${authorId}?`)) return;

    setIsBusy(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/doodle/users/${encodeURIComponent(authorId)}/strokes`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Could not delete user strokes.");
      }

      setStrokes((currentStrokes) => currentStrokes.filter((stroke) => stroke.authorId !== authorId));
      setMessage("User strokes deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete user strokes.");
    } finally {
      setIsBusy(false);
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Clear the entire doodle wall?")) return;

    setIsBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/doodle/clear", { method: "POST" });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Could not clear doodles.");
      }

      setStrokes([]);
      setMessage("Doodle wall cleared.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not clear doodles.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="border border-charcoal/10 bg-white p-4 shadow-scrapbook-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">strokes</div>
          <div className="mt-1 font-serif text-3xl font-bold">{strokes.length}</div>
        </div>
        <div className="border border-charcoal/10 bg-white p-4 shadow-scrapbook-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">users</div>
          <div className="mt-1 font-serif text-3xl font-bold">{userCount}</div>
        </div>
        <div className="border border-charcoal/10 bg-white p-4 shadow-scrapbook-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">showing</div>
          <div className="mt-1 font-serif text-3xl font-bold">{filteredStrokes.length}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border border-charcoal/10 bg-white p-4 shadow-scrapbook-sm md:flex-row md:items-center md:justify-between">
        <label className="flex min-w-0 flex-1 items-center gap-2 border border-charcoal/10 bg-offwhite/70 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-charcoal/45" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="filter by user id, stroke id, or tool"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-charcoal/35"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={refresh}
            disabled={isBusy}
            className="inline-flex h-10 items-center gap-2 border border-charcoal/20 bg-white px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-sage/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", isBusy && "animate-spin")} />
            Refresh
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={isBusy || strokes.length === 0}
            className="inline-flex h-10 items-center gap-2 border border-pink/50 bg-pink/30 px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-pink/45 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XCircle className="h-4 w-4" />
            Clear all
          </button>
        </div>
      </div>

      {message && (
        <div className="border border-charcoal/10 bg-white px-3 py-2 text-sm text-charcoal/60 shadow-scrapbook-sm">
          {message}
        </div>
      )}

      <div className="overflow-hidden border border-charcoal/10 bg-white shadow-scrapbook-sm">
        {filteredStrokes.length === 0 ? (
          <div className="p-8 text-center text-sm text-charcoal/45">No doodles here right now.</div>
        ) : (
          <div className="divide-y divide-charcoal/10">
            {filteredStrokes.map((stroke) => (
              <div key={stroke.id} className="grid gap-4 p-4 lg:grid-cols-[140px_1fr_auto] lg:items-center">
                <StrokePreview stroke={stroke} />

                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border border-charcoal/10 bg-offwhite px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-charcoal/55">
                      {stroke.mode}
                    </span>
                    <span className="font-mono text-xs text-charcoal/55">{formatDate(stroke.createdAt)}</span>
                    <span
                      className="h-4 w-4 border border-charcoal/15"
                      style={{ backgroundColor: stroke.color }}
                      aria-label={`Color ${stroke.color}`}
                    />
                    <span className="font-mono text-xs text-charcoal/55">{stroke.size}px</span>
                  </div>
                  <div className="min-w-0 font-mono text-xs text-charcoal/70">
                    <div className="truncate">user: {stroke.authorId}</div>
                    <div className="truncate text-charcoal/40">stroke: {stroke.id}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => deleteStroke(stroke.id)}
                    disabled={isBusy}
                    className="inline-flex h-9 items-center gap-2 border border-charcoal/20 bg-white px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-sage/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUserStrokes(stroke.authorId)}
                    disabled={isBusy}
                    className="inline-flex h-9 items-center gap-2 border border-pink/50 bg-pink/25 px-3 text-xs font-semibold shadow-scrapbook-sm transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-pink/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <UserX className="h-4 w-4" />
                    User
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
