export enum Color {
  Black = 0,
  White = 8,
}

export enum Piece {
  None = 0,
  Pawn = 1,
  Knight = 2,
  Bishop = 3,
  Rook = 4,
  Queen = 5,
  King = 6,
}

export interface Move {
  from: bigint;
  to: bigint;
  piece: Piece;
  color: Color;
}
