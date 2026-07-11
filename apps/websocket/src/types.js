/**
 * @typedef {{ x: number, y: number }} DoodlePoint
 * @typedef {{
 *   id: string,
 *   authorId: string,
 *   coordinateSpace?: "normalized",
 *   color: string,
 *   size: number,
 *   mode: "draw" | "erase",
 *   points: DoodlePoint[],
 *   createdAt: number
 * }} DoodleStroke
 */

export {};
