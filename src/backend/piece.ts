enum Piece {
	None = 0,
	WhitePawn = 1,
	BlackPawn = 2,
	WhiteKnight = 3,
	BlackKnight = 4,
	WhiteBishop = 5,
	BlackBishop = 6,
	WhiteRook = 7,
	BlackRook = 8,
	WhiteQueen = 9,
	BlackQueen = 10,
	WhiteKing = 11,
	BlackKing = 12,
}

export function pieceIsWhite(piece: Piece) {
	if (piece === Piece.None) return false;
	return piece % 2 === 1;
}

export function pieceIsBlack(piece: Piece) {
	if (piece === Piece.None) return false;
	return piece % 2 === 0;
}

export default Piece;
