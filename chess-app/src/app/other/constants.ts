import { Point } from './point';
import { Direction } from './direction';
export enum Color {
  LIGHT,
  DARK,
}

export const SquareSize = 50;
export const ValidMoves = {
  pawn: [ new Point(0, 1) ],
  bishop: [ new Direction(1, 1) ],
  queen: [ new Direction(1, 1), new Direction(0, 1), new Direction(1, 0) ],
  rook: [ new Direction(0, 1), new Direction(1, 0) ],
  knight: [ new Point(1, 2), new Point(2, 1), new Point(-1, 2), new Point(1, -2),
            new Point(-1, -2), new Point(-2, -1), new Point(-2, 1), new Point(2, -1) ],
  king: [ new Point(0, 1), new Point(0, -1), new Point(1, 0), new Point(-1, 0),
          new Point(1, 1), new Point(-1, -1), new Point(-1, 1), new Point(1, -1) ]
};
export const PiecePositions = {
  _8: {
    a: { piece: 'rook', color: Color.DARK }, b: { piece: 'knight', color: Color.DARK }, c: { piece: 'bishop', color: Color.DARK },
    d: { piece: 'king', color: Color.DARK }, e: { piece: 'queen', color: Color.DARK }, f: { piece: 'bishop', color: Color.DARK },
    g: { piece: 'knight', color: Color.DARK }, h: { piece: 'rook', color: Color.DARK }
  },
  _7: {
    a: { piece: 'pawn', color: Color.DARK }, b: { piece: 'pawn', color: Color.DARK }, c: { piece: 'pawn', color: Color.DARK },
    d: { piece: 'pawn', color: Color.DARK }, e: { piece: 'pawn', color: Color.DARK }, f: { piece: 'pawn', color: Color.DARK },
    g: { piece: 'pawn', color: Color.DARK }, h: { piece: 'pawn', color: Color.DARK }
  },
  _6: {
    a: { piece: null, color: null }, b: { piece: null, color: null  }, c: { piece: null, color: null  },
    d: { piece: null, color: null  }, e: { piece: null, color: null  }, f: { piece: null, color: null  },
    g: { piece: null, color: null  }, h: { piece: null, color: null  }
  },
  _5: {
    a: { piece: null, color: null  }, b: { piece: null, color: null  }, c: { piece: null, color: null  },
    d: { piece: null, color: null  }, e: { piece: null, color: null  }, f: { piece: null, color: null  },
    g: { piece: null, color: null  }, h: { piece: null, color: null  }
  },
  _4: {
    a: { piece: null, color: null  }, b: { piece: null, color: null  }, c: { piece: null, color: null  },
    d: { piece: null, color: null  }, e: { piece: null, color: null  }, f: { piece: null, color: null  },
    g: { piece: null, color: null  }, h: { piece: null, color: null  }
  },
  _3: {
    a: { piece: null, color: null  }, b: { piece: null, color: null  }, c: { piece: null, color: null  },
    d: { piece: null, color: null  }, e: { piece: null, color: null  }, f: { piece: null, color: null  },
    g: { piece: null, color: null  }, h: { piece: null, color: null  }
  },
  _2: {
    a: { piece: 'pawn', color: Color.LIGHT }, b: { piece: 'pawn', color: Color.LIGHT }, c: { piece: 'pawn', color: Color.LIGHT },
    d: { piece: 'pawn', color: Color.LIGHT }, e: { piece: 'pawn', color: Color.LIGHT }, f: { piece: 'pawn', color: Color.LIGHT },
    g: { piece: 'pawn', color: Color.LIGHT }, h: { piece: 'pawn', color: Color.LIGHT }
  },
  _1: {
    a: { piece: 'rook', color: Color.LIGHT }, b: { piece: 'knight', color: Color.LIGHT }, c: { piece: 'bishop', color: Color.LIGHT },
    d: { piece: 'king', color: Color.LIGHT }, e: { piece: 'queen', color: Color.LIGHT }, f: { piece: 'bishop', color: Color.LIGHT },
    g: { piece: 'knight', color: Color.LIGHT }, h: { piece: 'rook', color: Color.LIGHT }
  }
};

