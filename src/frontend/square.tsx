import { type PropsWithoutRef } from "react";
import { Piece } from "../backend/types";

interface SquareProps {
  piece: Piece;
  row: number;
  column: number;
}

export default function Square({
  row,
  column,
  piece,
}: PropsWithoutRef<SquareProps>) {
  return (
    <span
      className={`square row-${row} column-${column} piece-${piece}`}
      onClick={() => {
        if (piece === Piece.None) return;
      }}
    />
  );
}
