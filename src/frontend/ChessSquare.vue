<script setup lang="ts">
import Piece from "../backend/piece";
import gameStore from "./gameStore";

defineProps<{
  piece: Piece
  row: number
  column: number
}>()
</script>


<template>
  <span class="square" :class="[{ even: (row + column) % 2 === 0, odd: (row + column) % 2 === 1 }, `piece-${piece}`]"
    @click="gameStore.select({ square: row * 8 + column, piece })" />
</template>