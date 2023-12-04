import { create } from "zustand";
import loadPosition from "../backend/loadFen";

export default create(() => ({
  game: loadPosition(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  ),
}));
