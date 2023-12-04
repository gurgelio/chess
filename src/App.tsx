import '../styles/index.scss'
import { useBoard } from './board'
import Square from './square'

function App() {
  const { board } = useBoard()

  return <main className='board'>
    {board.serialize().map(
      (content, index) => <Square row={index % 8} column={Math.floor(index / 8)} key={index} piece={content ?? undefined} />
    )}
  </main>
}

export default App
