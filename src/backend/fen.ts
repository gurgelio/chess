import z from "zod";
import { Castle } from "../frontend/types";
import Board from "./board";
import Piece from "./piece";

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

export default function loadFen(fen: string) {
	console.log("loading fen...");
	const [board, whoIsToPlay, castle, enPassant, fiftyMoveRuleCount, moveCount] =
		fen.split(" ");

	return {
		board: parseBoard(board),
		isWhiteToMove: parseIsWhiteToMove(whoIsToPlay),
		availableCastle: parseCastle(castle),
		enPassant: parseEnPassant(enPassant),
		fiftyMoveRuleCount: fiftyMoveRuleCountValidator.parse(fiftyMoveRuleCount),
		moveCount: moveCountValidator.parse(moveCount),
	};
}

const bitboardsKey = {
	P: Piece.WhitePawn,
	N: Piece.WhiteKnight,
	B: Piece.WhiteBishop,
	R: Piece.WhiteRook,
	Q: Piece.WhiteQueen,
	K: Piece.WhiteKing,
	p: Piece.BlackPawn,
	n: Piece.BlackKnight,
	b: Piece.BlackBishop,
	r: Piece.BlackRook,
	q: Piece.BlackQueen,
	k: Piece.BlackKing,
};

const castleKey = {
	k: Castle.BlackKingSide,
	q: Castle.BlackQueenSide,
	K: Castle.WhiteKingSide,
	Q: Castle.WhiteQueenSide,
};

function parseBoard(boardStr: string) {
	boardValidator.parse(boardStr);
	const board = new Board();
	let position = 0;
	for (const char of boardStr) {
		if (char === "/") continue;

		const number = parseInt(char);
		if (!Number.isNaN(number)) {
			position += number;
			continue;
		}

		const key = bitboardsKey[char as keyof typeof bitboardsKey]; // se o board for válido podemos assumir isto
		board.bitboards[key] |= 1n << BigInt(position);
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
	// podemos dar esse cast já que validamos com regex
	return (castle.split("") as Array<keyof typeof castleKey>).map(
		(a) => castleKey[a],
	) as Castle[];
}

function parseEnPassant(enPassant: string) {
	enPassantValidator.parse(enPassant);
	if (enPassant === "-") return;
	const [file, rank] = enPassant.split("");
	return BigInt(files.indexOf(file) * 8 + parseInt(rank));
}
