import { Point } from './point';
import { Color } from './constants';

export class Piece {
  name: string;
  color: Color;

  constructor(name: string, color: Color) {
    this.name = name;
    this.color = color;
  }
}

