import "../styles/index.css";
import Square from "./frontend/square";
import useGame from "./frontend/useGame";

function App() {
  const { game } = useGame();

  return (
    <main className="board">
      {game.board.squares.map((content, index) => (
        <Square
          row={index % 8}
          column={Math.floor(index / 8)}
          key={index}
          piece={content ?? undefined}
        />
      ))}
    </main>
  );
}

export default App;
