<script setup lang="ts">
import { onMounted } from "vue";
import Square from "./Square.vue";
import gameStore from "./gameStore";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

onMounted(() => {
  gameStore.loadFen(defaultFen);
})

</script>


<template>
  <main className="board">
    <template v-for="(piece, index) in gameStore.game.board.squares">
      <Square :row="Math.floor(index / 8)" :column="index % 8" :piece="piece" />
    </template>
  </main>
</template>

