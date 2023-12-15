import { reactive } from "vue";
import Game from "../backend/game";
import { SquareInfo } from "./types";

interface Store {
  game: Game;
  lastSelected: SquareInfo | null;
  select(selected: SquareInfo): void;
  loadFen(fen: string): void;
}

export default reactive<Store>({
  game: new Game(),
  lastSelected: null,

  select(selected) {
    if (this.lastSelected == null) {
      this.lastSelected = selected;
      return;
    }
    this.game.move(this.lastSelected, selected);
    this.lastSelected = null;
  },

  loadFen(fen) {
    this.game = Game.fromFen(fen);
  },
});
