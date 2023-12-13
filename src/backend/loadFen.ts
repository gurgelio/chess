import z from "zod";
import Board from "./board";
import Game, { Castle } from "./game";
import { Color, Piece } from "./types";

const boardValidator = z
	.string()
	.regex(/^(?:(?:[PNBRQK]+|[1-8])\/){7}(?:[PNBRQK]+|[1-8])$/gim);
const moveCountValidator = z
	.number({ coerce: true })
	.int()
	.nonnegative()
	.finite();
const fiftyMoveRuleCountValidator = z
	.number({ coerce: true })
	.int()
	.nonnegative()
	.lte(50);
const enPassantValidator = z.string().regex(/(-|[abcdefgh][1-8])/);
const whoIsToPlayValidator = z.string().length(1).regex(/(w|b)/);
const castleValidator = z.string().regex(/(-|K?Q?k?q?)/);
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function loadPosition(fen: string) {
	const [board, whoIsToPlay, castle, enPassant, fiftyMoveRuleCount, moveCount] =
		fen.split(" ");

	return new Game({
		board: parseBoard(board),
		isWhiteToMove: parseIsWhiteToMove(whoIsToPlay),
		availableCastle: parseCastle(castle),
		enPassant: parseEnPassant(enPassant),
		fiftyMoveRuleCount: fiftyMoveRuleCountValidator.parse(fiftyMoveRuleCount),
		moveCount: moveCountValidator.parse(moveCount),
	});
}

const bitboardsKey = {
	p: Color.White | Piece.Pawn,
	n: Color.White | Piece.Knight,
	b: Color.White | Piece.Bishop,
	r: Color.White | Piece.Rook,
	q: Color.White | Piece.Queen,
	k: Color.White | Piece.King,
	P: Color.Black | Piece.Pawn,
	N: Color.Black | Piece.Knight,
	B: Color.Black | Piece.Bishop,
	R: Color.Black | Piece.Rook,
	Q: Color.Black | Piece.Queen,
	K: Color.Black | Piece.King,
};

function parseBoard(boardStr: string) {
	boardValidator.parse(boardStr);
	const board = new Board();
	let position = 0;
	for (const char of boardStr) {
		const number = parseInt(char);
		if (!Number.isNaN(number)) {
			position += number;
			continue;
		}
		if (char === "/") continue;

		const key = bitboardsKey[char as keyof typeof bitboardsKey]; // se o board for válido podemos assumir isto
		board.bitboards[key] |= 2n ** BigInt(position);
		board.squares[position] = key ?? Piece.None;
		position += 1;
	}
	return board;
}

function parseIsWhiteToMove(whoIsToPlay: string) {
	whoIsToPlayValidator.parse(whoIsToPlay);
	return whoIsToPlay === "w";
}

function parseCastle(castle: string) {
	castleValidator.parse(castle);
	if (castle === "-") return [];
	return castle.split("") as Castle[];
}

function parseEnPassant(enPassant: string) {
	enPassantValidator.parse(enPassant);
	if (enPassant === "-") return;
	const [file, rank] = enPassant.split("");
	return BigInt(files.indexOf(file) * 8 + parseInt(rank));
}
