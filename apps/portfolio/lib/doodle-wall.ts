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

export type DoodleUser = {
  id: string;
  name: string;
  color: string;
};

export type DoodleCursor = {
  user: DoodleUser;
  point: DoodlePoint;
  isDrawing: boolean;
  updatedAt: number;
};

export type DoodleClientMessage =
  | { type: "stroke"; stroke: DoodleStroke }
  | { type: "undo"; strokeId: string }
  | { type: "clear-own" }
  | { type: "cursor"; user: DoodleUser; point: DoodlePoint; isDrawing: boolean }
  | { type: "cursor-leave"; userId: string };

export type DoodleServerMessage =
  | { type: "init"; strokes: DoodleStroke[]; users: number }
  | { type: "stroke"; stroke: DoodleStroke }
  | { type: "undo"; strokeId: string }
  | { type: "clear-own"; authorId: string }
  | { type: "delete-stroke"; strokeId: string }
  | { type: "clear-all" }
  | { type: "cursor"; cursor: DoodleCursor }
  | { type: "cursor-leave"; userId: string }
  | { type: "presence"; users: number; activeUsers?: DoodleUser[] };

export const DOODLE_ROOM_ID = "vay-doodle-wall";
export const MAX_DOODLE_STROKES = 250;
