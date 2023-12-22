import { reactive } from "vue";

export enum DebugMode {
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
	Index = 13,
	Off = 14,
}

export const debugModes = [
	DebugMode.None,
	DebugMode.WhitePawn,
	DebugMode.BlackPawn,
	DebugMode.WhiteKnight,
	DebugMode.BlackKnight,
	DebugMode.WhiteBishop,
	DebugMode.BlackBishop,
	DebugMode.WhiteRook,
	DebugMode.BlackRook,
	DebugMode.WhiteQueen,
	DebugMode.BlackQueen,
	DebugMode.WhiteKing,
	DebugMode.BlackKing,
	DebugMode.Index,
	DebugMode.Off,
];

export const debugModeNames = [
	"None",
	"WhitePawn",
	"BlackPawn",
	"WhiteKnight",
	"BlackKnight",
	"WhiteBishop",
	"BlackBishop",
	"WhiteRook",
	"BlackRook",
	"WhiteQueen",
	"BlackQueen",
	"WhiteKing",
	"BlackKing",
	"Index",
	"Off",
];

interface UiStore {
	debugMode: DebugMode;
	selectDebugMode(mode: DebugMode): void;
}

export default reactive<UiStore>({
	debugMode: DebugMode.Off,
	selectDebugMode(mode) {
		this.debugMode = mode;
	},
});
