import Piece from "./piece";

export default interface Move {
	from: number;
	to: number;
	piece: Piece;
}
