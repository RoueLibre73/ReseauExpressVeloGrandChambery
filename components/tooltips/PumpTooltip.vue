<template>
  <div class="max-w-48">
    <div class="px-3 py-2 bg-velocite-green-5 flex flex-col items-center">
      <div class="text-center text-white text-lg font-medium">
        Pied atelier
      </div>
    </div>
<img :src="feature.properties.imgUrl" class="my-0">
    <div class="px-3 py-2 text-center text-base font-medium">
      {{ feature.properties.name }}
    </div>

    <div class="px-3">
      <hr class="px-3 h-px bg-gray-200 border-0">
    </div>

    <div class="bg-gray-100">
      <div class="px-3 py-2 text-center italic leading-normal">
        {{ feature.properties.danger }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DangerFeature } from '~/types';

const { feature } = defineProps<{
  feature: DangerFeature
}>();

</script>
