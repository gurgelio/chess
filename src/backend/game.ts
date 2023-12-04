import Board from "./board";

export enum Castle {
  WhiteKingSide = "k",
  WhiteQueenSide = "q",
  BlackKingSide = "K",
  BlackQueenSide = "Q",
}

interface GameOptions {
  board: Board;
  isWhiteToMove: boolean;
  availableCastle: Castle[];
  fiftyMoveRuleCount: number;
  moveCount: number;
  enPassant?: bigint;
}

const defaultOptions: GameOptions = {
  board: new Board(),
  isWhiteToMove: true,
  availableCastle: [
    Castle.BlackKingSide,
    Castle.BlackQueenSide,
    Castle.WhiteKingSide,
    Castle.WhiteKingSide,
    Castle.WhiteQueenSide,
  ],
  fiftyMoveRuleCount: 0,
  moveCount: 0,
};

export default class Game {
  board: Board;
  isWhiteToMove: boolean;
  availableCastle: Castle[];
  fiftyMoveRuleCount: number;
  moveCount: number;
  enPassant?: bigint;

  get isBlackToMove() {
    return !this.isWhiteToMove;
  }

  constructor(options: Partial<GameOptions> = defaultOptions) {
    const calculatedOptions = { ...defaultOptions, ...options };
    this.board = calculatedOptions.board;
    this.isWhiteToMove = calculatedOptions.isWhiteToMove;
    this.availableCastle = calculatedOptions.availableCastle;
    this.moveCount = calculatedOptions.moveCount;
    this.fiftyMoveRuleCount = calculatedOptions.fiftyMoveRuleCount;
    this.enPassant = calculatedOptions.enPassant;
  }
}
