export class Point {
  x: number;
  y: number;

  constructor(a: number, b: number) {
    this.x = a;
    this.y = b;
  }

  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  differenceBetweenTwoPoints(from: Point, to: Point): Point {
    return new Point(to.x - from.x, to.y - from.y);
  }

}
