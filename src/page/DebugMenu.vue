<script setup lang="ts">
import uiStore, { debugModes, debugModeNames } from "./store/uiStore";
</script>

<template>
  <aside class="h-full flex flex-col gap-3 justify-center">
    <template :key="mode" v-for="mode in debugModes">
      <button
        class="bg-slate-400"
        :class="{ 'bg-green-500': mode === uiStore.debugMode }"
        @click="uiStore.selectDebugMode(mode)"
      >
        {{ debugModeNames[mode] }}
      </button>
    </template>
  </aside>
</template>
