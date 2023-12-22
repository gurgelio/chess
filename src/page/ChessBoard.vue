<script setup lang="ts">
import { onMounted } from "vue";
import ChessSquare from "./ChessSquare.vue";
import gameStore from "./store/gameStore";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

onMounted(() => {
  gameStore.loadFen(defaultFen);
});
</script>

<template>
  <main className="grid aspect-square gap-0 grid-cols-8 h-full">
    <template
      v-for="(piece, index) in gameStore.game.board.squares"
      :key="index"
    >
      <ChessSquare
        :row="Math.floor(index / 8)"
        :column="index % 8"
        :piece="piece"
      />
    </template>
  </main>
</template>
