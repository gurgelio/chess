<script setup lang="ts">
import Piece from "../models/piece";
import gameStore from "./store/gameStore";
import uiStore, { DebugMode } from "./store/uiStore";

defineProps<{
  piece: Piece;
  row: number;
  column: number;
}>();

function getDebugContent(row: number, column: number) {
  switch (uiStore.debugMode) {
    case DebugMode.Off:
      return "";
    case DebugMode.Index:
      return row * 8 + column;
    default:
      return "";
  }
}
</script>

<template>
  <span
    class="w-full aspect-square bg-cover will-change-transform cursor-grab"
    :class="[
      {
        'bg-[#b58863]': (row + column) % 2 === 0,
        'bg-[#f0d9b5]': (row + column) % 2 === 1,
        'cursor-grab': piece !== Piece.None,
      },
      `piece-${piece}`,
    ]"
    @click="gameStore.select({ square: row * 8 + column, piece })"
  >
    {{ getDebugContent(row, column) }}
  </span>
</template>
