import Piece from "../backend/piece";

export enum Castle {
  WhiteKingSide = 0,
  WhiteQueenSide = 1,
  BlackKingSide = 2,
  BlackQueenSide = 3,
}

export interface SquareInfo {
  square: number;
  piece: Piece;
}
