import { SquareInfo } from "../frontend/types";
import Board from "./board";
import loadFen from "./fen";
import Piece from "./piece";

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
  capturedPieces: Piece[];
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
  capturedPieces: [],
};

export default class Game {
  board: Board;
  isWhiteToMove: boolean;
  availableCastle: Castle[];
  fiftyMoveRuleCount: number;
  moveCount: number;
  enPassant?: bigint;
  capturedPieces: Piece[] = [];

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

  static fromFen(fen: string) {
    return new Game(loadFen(fen));
  }

  move(from: SquareInfo, to: SquareInfo) {
    this.board.move(from, to);

    if (this.isBlackToMove) {
      this.moveCount++;
      this.fiftyMoveRuleCount++;
    }

    if (from.piece === Piece.BlackPawn || from.piece === Piece.WhitePawn) {
      this.fiftyMoveRuleCount = 0;
    }

    if (to.piece !== Piece.None) {
      this.fiftyMoveRuleCount = 0;
      this.capturedPieces.push(to.piece);
    }

    this.isWhiteToMove = this.isBlackToMove;
  }
}
