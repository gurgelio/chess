import { describe, expect, it } from "vitest";
import Piece, { pieceIsBlack, pieceIsWhite } from "./piece";

describe("pieceIsWhite", () => {
	it("returns true when piece is white", () => {
		expect(pieceIsWhite(Piece.WhitePawn)).toBe(true);
	});

	it("returns false when piece is black", () => {
		expect(pieceIsWhite(Piece.BlackKnight)).toBe(false);
	});

	it("returns false when piece is none", () => {
		expect(pieceIsWhite(Piece.None)).toBe(false);
	});
});

describe("pieceIsBlack", () => {
	it("returns false when piece is white", () => {
		expect(pieceIsBlack(Piece.WhiteBishop)).toBe(false);
	});

	it("returns true when piece is black", () => {
		expect(pieceIsBlack(Piece.BlackRook)).toBe(true);
	});

	it("returns false when piece is none", () => {
		expect(pieceIsBlack(Piece.None)).toBe(false);
	});
});
