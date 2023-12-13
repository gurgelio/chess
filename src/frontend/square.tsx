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
		// biome-ignore lint/a11y/useKeyWithClickEvents: vai ser estranho usar com teclado
		<span
			className={`square row-${row} column-${column} piece-${piece}`}
			onClick={() => {
				if (piece === Piece.None) return;
				// todo
			}}
		/>
	);
}
