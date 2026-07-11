import type * as Party from "partykit/server";
import {
  DoodleClientMessage,
  DoodleServerMessage,
  DoodleStroke,
  MAX_DOODLE_STROKES,
} from "@/lib/doodle-wall";

const STORAGE_KEY = "strokes";

const isStroke = (stroke: unknown): stroke is DoodleStroke => {
  if (!stroke || typeof stroke !== "object") return false;

  const candidate = stroke as DoodleStroke;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.authorId === "string" &&
    (candidate.coordinateSpace === undefined || candidate.coordinateSpace === "normalized") &&
    typeof candidate.color === "string" &&
    typeof candidate.size === "number" &&
    (candidate.mode === "draw" || candidate.mode === "erase") &&
    typeof candidate.createdAt === "number" &&
    Array.isArray(candidate.points) &&
    candidate.points.length > 0 &&
    candidate.points.length <= 1500 &&
    candidate.points.every(
      (point) =>
        typeof point?.x === "number" &&
        typeof point?.y === "number" &&
        Number.isFinite(point.x) &&
        Number.isFinite(point.y) &&
        (candidate.coordinateSpace !== "normalized" ||
          (point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1))
    )
  );
};

const encode = (message: DoodleServerMessage) => JSON.stringify(message);

export default class DoodleParty implements Party.Server {
  private strokes: DoodleStroke[] = [];

  constructor(readonly room: Party.Room) {}

  async onStart() {
    const savedStrokes = (await this.room.storage.get<DoodleStroke[]>(STORAGE_KEY)) ?? [];
    this.strokes = savedStrokes.filter(isStroke);
  }

  onConnect(connection: Party.Connection) {
    connection.send(
      encode({
        type: "init",
        strokes: this.strokes,
        users: this.getUserCount(),
      })
    );
    this.broadcastPresence();
  }

  onClose() {
    this.broadcastPresence();
  }

  onError() {
    this.broadcastPresence();
  }

  async onMessage(message: string, sender: Party.Connection) {
    let parsed: DoodleClientMessage;

    try {
      parsed = JSON.parse(message) as DoodleClientMessage;
    } catch {
      return;
    }

    if (parsed.type === "stroke" && isStroke(parsed.stroke)) {
      const stroke = {
        ...parsed.stroke,
        authorId: sender.id,
      };
      this.strokes = [...this.strokes, stroke].slice(-MAX_DOODLE_STROKES);
      await this.room.storage.put(STORAGE_KEY, this.strokes);
      this.room.broadcast(encode({ type: "stroke", stroke }), [sender.id]);
      return;
    }

    if (parsed.type === "undo" && typeof parsed.strokeId === "string") {
      const nextStrokes = this.strokes.filter((stroke) => stroke.id !== parsed.strokeId || stroke.authorId !== sender.id);
      if (nextStrokes.length === this.strokes.length) return;

      this.strokes = nextStrokes;
      await this.room.storage.put(STORAGE_KEY, this.strokes);
      this.room.broadcast(encode({ type: "undo", strokeId: parsed.strokeId }), [sender.id]);
      return;
    }

    if (parsed.type === "clear-own") {
      this.strokes = this.strokes.filter((stroke) => stroke.authorId !== sender.id);
      await this.room.storage.put(STORAGE_KEY, this.strokes);
      this.room.broadcast(encode({ type: "clear-own", authorId: sender.id }), [sender.id]);
    }
  }

  private getUserCount() {
    return Array.from(this.room.getConnections()).length;
  }

  private broadcastPresence() {
    this.room.broadcast(encode({ type: "presence", users: this.getUserCount() }));
  }
}

DoodleParty satisfies Party.Worker;
