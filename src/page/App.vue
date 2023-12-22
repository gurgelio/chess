<script setup lang="ts">
import "./styles/index.css";
import ChessBoard from "./ChessBoard.vue";
import DebugMenu from "./DebugMenu.vue";
</script>

<template>
  <div class="flex flex-row items-center w-screen h-screen">
    <ChessBoard />
    <DebugMenu />
  </div>
</template>
