import { Point } from '@nodescript/core/types';

export type Box = [Point, Point];

export function pointsEqual(a: Point, b: Point, threshold = 0) {
    return Math.abs(a.x - b.x) <= threshold && Math.abs(a.y - b.y) <= threshold;
}
