<template>
  <div class="max-w-2xl mx-auto bg-gray-200 rounded-full flex overflow-hidden my-8">
    <div
      class="bg-lvv-blue-800 text-xs font-medium text-white text-center p-1 leading-none"
      :style="`width: ${stats.alreadyExisting.percent}%`"
    >
      {{ displayPercent(stats.alreadyExisting.percent) }}
    </div>
    <div
      class="bg-velocite-yellow-5 text-xs font-medium text-white text-center p-1 leading-none"
      :style="`width: ${stats.done.percent}%`"
    >
      {{ displayPercent(stats.done.percent) }}
    </div>
    <div
      v-if="stats.wip.distance"
      class="bg-lvv-blue-400 text-xs font-medium text-white text-center p-1 leading-none"
      :style="`width: ${stats.wip.percent}%`"
    />
    <div
      v-if="stats.planned.distance"
      class="bg-lvv-blue-300 text-xs font-medium text-white text-center p-1 leading-none"
      :style="`width: ${stats.planned.percent}%`"
    >
     <span v-if="stats.planned.percent > 5">{{ displayPercent(stats.planned.percent) }}</span>
    </div>
    <div
      v-if="stats.postponed.distance"
      class="bg-lvv-pink text-xs font-medium text-white text-center p-1 leading-none ml-auto"
      :style="`width: ${stats.postponed.percent}%`"
    >
      <span v-if="stats.postponed.percent > 5">{{ displayPercent(stats.postponed.percent) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Geojson } from '~/types';
const { getStats, displayPercent } = useStats();

const { voies } = defineProps<{
  voies: Geojson[];
}>();

const stats = getStats(voies);
</script>
