import { Point } from './point';

export class Direction {
  x: number;
  y: number;

  constructor(a: number, b: number) {
    this.x = a;
    this.y = b;
  }

  getPoints(): Point[] {
    const points = [];
    if (this.x === 1 && this.y === 1) {
      for (let i = -8; i < 9; i++) {
        points.push(new Point(i, i));
        points.push(new Point(-i, i));
      }
    } else if (this.x === 1) {
      for (let i = -8; i < 9; i++) {
        points.push(new Point(i, 0));
      }
    } else {
      for (let i = -8; i < 9; i++) {
        points.push(new Point(0, i));
      }
    }
    return points;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}
