import { useEffect } from "react";
import Square from "./Square";
import useGame from "./useGame";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function Board() {
	const [board, gameStore] = useGame();

	useEffect(() => {
		gameStore.loadFen(defaultFen);
	}, [gameStore]);

	return (
		<main className="board">
			{board.map((content, index) => (
				<Square
					row={Math.floor(index / 8)}
					column={index % 8}
					// biome-ignore lint/suspicious/noArrayIndexKey: o array nunca muda de ordem
					key={index}
					piece={content}
					select={gameStore.select}
				/>
			))}
		</main>
	);
}

export default Board;
