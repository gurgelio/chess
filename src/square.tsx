import { type PropsWithoutRef } from 'react'
import { useBoard } from './board'

interface SquareProps {
  piece?: string
  row: number
  column: number
}

export default function Square({ row, column, piece = '' }: PropsWithoutRef<SquareProps>) {
  const { board } = useBoard()

  return <span
    className={`square ${piece}`}
    onClick={() => {
      if (piece === '') return
      board.select(row, column)
    }}
  />
}
