import { Color, Piece } from "./types";

export default class Board {
  bitboards: bigint[] = [];
  squares: Piece[] = new Array(64).fill(Piece.None);

  constructor() {
    this.bitboards[Color.White | Piece.Pawn] = 0n;
    this.bitboards[Color.White | Piece.Knight] = 0n;
    this.bitboards[Color.White | Piece.Bishop] = 0n;
    this.bitboards[Color.White | Piece.Rook] = 0n;
    this.bitboards[Color.White | Piece.Queen] = 0n;
    this.bitboards[Color.White | Piece.King] = 0n;
    this.bitboards[Color.Black | Piece.Pawn] = 0n;
    this.bitboards[Color.Black | Piece.Knight] = 0n;
    this.bitboards[Color.Black | Piece.Bishop] = 0n;
    this.bitboards[Color.Black | Piece.Rook] = 0n;
    this.bitboards[Color.Black | Piece.Queen] = 0n;
    this.bitboards[Color.Black | Piece.King] = 0n;
  }

  whiteBitBoard() {
    return (
      this.bitboards[Color.White + Piece.Pawn] |
      this.bitboards[Color.White + Piece.Knight] |
      this.bitboards[Color.White + Piece.Bishop] |
      this.bitboards[Color.White + Piece.Rook] |
      this.bitboards[Color.White + Piece.Queen] |
      this.bitboards[Color.White + Piece.King]
    );
  }

  blackBitBoard() {
    return (
      this.bitboards[Color.Black + Piece.Pawn] |
      this.bitboards[Color.Black + Piece.Knight] |
      this.bitboards[Color.Black + Piece.Bishop] |
      this.bitboards[Color.Black + Piece.Rook] |
      this.bitboards[Color.Black + Piece.Queen] |
      this.bitboards[Color.Black + Piece.King]
    );
  }
}
