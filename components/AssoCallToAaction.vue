<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-6 px-6 bg-velocite-green-3 rounded-3xl sm:py-10 sm:px-12 lg:px-12 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1 text-center lg:text-left">
          <h2 class="text-3xl font-extrabold tracking-tight text-white">
            Rejoignez {{ getAssoName() }}
          </h2>
          <p class="mt-4 max-w-3xl text-lg text-indigo-100">
            Soutenez la promotion et l'usage du vélo en Savoie, ainsi que le développement d'infrastructures cyclables continues et sécurisées en adhérant à l'association.
          </p>
        </div>
        <div class="sm:flex justify-center lg:justify-end mt-6 lg:mt-0 lg:ml-8 lg:flex-1">
          <a
            href="https://rouelibre.net/adherer/"
            target="_blank"
            class="mt-3 w-full flex items-center justify-center px-5 py-3 rounded-md text-base font-medium text-white bg-velocite-green-1 transition transform hover:scale-105 sm:w-auto sm:ml-3"
          >
            Adhérer
          </a>
          <a
            href="https://rouelibre.net/"
            target="_blank"
            class="mt-3 w-full flex items-center justify-center px-5 py-3 rounded-md text-base font-medium text-velocite-green-1 bg-white transition transform hover:scale-105 sm:w-auto sm:ml-3"
          >
            En savoir +
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAssoName } = useConfig();
</script>
