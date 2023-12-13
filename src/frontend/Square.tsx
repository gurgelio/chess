import Piece from "../backend/piece";

interface SquareProps {
	piece: Piece;
	row: number;
	column: number;
	select: (piece: { square: number; piece: Piece }) => void;
}

export default function Square({ row, column, piece, select }: SquareProps) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: vai ser estranho usar com teclado
		<span
			className={`square ${
				(row + column) % 2 === 0 ? "even" : "odd"
			} row-${row} column-${column} piece-${piece}`}
			onClick={() => select({ square: row * 8 + column, piece })}
		/>
	);
}
