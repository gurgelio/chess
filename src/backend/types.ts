import Piece from "./piece";

export interface Move {
	from: number;
	to: number;
	piece: Piece;
}
