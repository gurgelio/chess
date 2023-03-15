import { create } from 'zustand'

enum WhitePiece {
  Pawn = 'white pawn',
  Knight = 'white knight',
  Bishop = 'white bishop',
  Rook = 'white rook',
  Queen = 'white queen',
  King = 'white king'
}

enum BlackPiece {
  Pawn = 'black pawn',
  Knight = 'black knight',
  Bishop = 'black bishop',
  Rook = 'black rook',
  Queen = 'black queen',
  King = 'black king'
}

// following UCI
type Row = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
type Column = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type Square = `${Row}${Column}`
type Promotion = 'b' | 'n' | 'r' | 'q'
type Move = `${Square}${Square}` | `${Square}${Square}${Promotion}`

export default class Board {
  selected?: [number, number]
  board = [
    [WhitePiece.Rook, WhitePiece.Knight, WhitePiece.Bishop, WhitePiece.Queen, WhitePiece.King, WhitePiece.Bishop, WhitePiece.Knight, WhitePiece.Rook],
    [WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn, WhitePiece.Pawn],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn, BlackPiece.Pawn],
    [BlackPiece.Rook, BlackPiece.Knight, BlackPiece.Bishop, BlackPiece.Queen, BlackPiece.King, BlackPiece.Bishop, BlackPiece.Knight, BlackPiece.Rook]
  ]

  serialize() {
    return this.board.reverse().flat()
  }

  select(row: number, column: number) {
    if (this.selected != null) {
      this.board[row][column] = this.board[this.selected[0]][this.selected[1]]
      this.selected = undefined
      return
    }

    this.selected = [row, column]
  }

  move(move: Move) {
    const first = move.slice(0, 3) as Square
    const second = move.slice(3, 5) as Square
    const promotion = move.slice(5) as Promotion | undefined

    if (first === second) return false
  }
}

export const useBoard = create(() => ({
  board: new Board()
}))
