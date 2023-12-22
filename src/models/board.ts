import SquareInfo from "./squareInfo";
import Piece from "./piece";

export default class Board {
	bitboards = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
	squares: Piece[];

	constructor(squares = new Array<Piece>(64).fill(Piece.None)) {
		this.squares = squares;
		this.buildBitboards();
	}

	whiteBitBoard() {
		return (
			this.bitboards[Piece.WhitePawn] |
			this.bitboards[Piece.WhiteKnight] |
			this.bitboards[Piece.WhiteBishop] |
			this.bitboards[Piece.WhiteRook] |
			this.bitboards[Piece.WhiteQueen] |
			this.bitboards[Piece.WhiteKing]
		);
	}

	blackBitBoard() {
		return (
			this.bitboards[Piece.BlackPawn] |
			this.bitboards[Piece.BlackKnight] |
			this.bitboards[Piece.BlackBishop] |
			this.bitboards[Piece.BlackRook] |
			this.bitboards[Piece.BlackQueen] |
			this.bitboards[Piece.BlackKing]
		);
	}

	move(from: SquareInfo, to: SquareInfo) {
		this.updateBitboards(from, to);
		this.updateSquares(from, to);
	}

	private buildBitboards() {
		for (let position = 0; position < 64; position++) {
			this.bitboards[this.squares[position]] |= 1n << BigInt(position);
		}
	}

	private updateSquares(from: SquareInfo, to: SquareInfo) {
		this.squares[to.square] = this.squares[from.square];
		this.squares[from.square] = Piece.None;
		this.squares = [...this.squares];
	}

	private updateBitboards(from: SquareInfo, to: SquareInfo) {
		this.bitboards[from.piece] ^=
			(1n << BigInt(from.square)) | (1n << BigInt(to.square));
		if (to.piece !== Piece.None) {
			this.bitboards[to.piece] ^= BigInt(1 << to.square);
		}
	}
}
