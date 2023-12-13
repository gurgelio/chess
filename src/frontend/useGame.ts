import { useSyncExternalStore } from "react";
import Game from "../backend/game";
import { SquareInfo } from "./types";

let game = new Game();
let listeners: (() => void)[] = [];
let lastSelected: SquareInfo | null = null;

export const gameStore = {
	loadFen(fen: string) {
		game = Game.fromFen(fen);
		emitChange();
	},
	select(selected: SquareInfo) {
		if (lastSelected == null) {
			lastSelected = selected;
			emitChange();
			return;
		}
		game.move(lastSelected, selected);
		lastSelected = null;
		emitChange();
	},
	subscribe(listener: () => void) {
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	},
	getSnapshot() {
		return game.board.squares;
	},
};

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}

export default function useGame() {
	const board = useSyncExternalStore(
		gameStore.subscribe,
		gameStore.getSnapshot,
	);

	return [board, gameStore] as const;
}
