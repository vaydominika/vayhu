export type DoodlePoint = {
  x: number;
  y: number;
};

export type DoodleStroke = {
  id: string;
  authorId: string;
  coordinateSpace?: "normalized";
  color: string;
  size: number;
  mode: "draw" | "erase";
  points: DoodlePoint[];
  createdAt: number;
};

export type DoodleClientMessage =
  | { type: "stroke"; stroke: DoodleStroke }
  | { type: "undo"; strokeId: string }
  | { type: "clear-own" };

export type DoodleServerMessage =
  | { type: "init"; strokes: DoodleStroke[]; users: number }
  | { type: "stroke"; stroke: DoodleStroke }
  | { type: "undo"; strokeId: string }
  | { type: "clear-own"; authorId: string }
  | { type: "presence"; users: number };

export const DOODLE_ROOM_ID = "vay-doodle-wall";
export const MAX_DOODLE_STROKES = 250;
