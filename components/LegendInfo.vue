<template>
  <div class="relative z-50" v-show="isExpanded">
    <div class="fixed p-2 bottom-5">
      <div class="relative p-4 w-full max-w-sm rounded-xl bg-white">
        <button
          type="button"
          class="absolute top-1 right-1 bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          @click="reduceLegend"
        >
          <Icon name="mdi:close" class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="text-lg font-medium leading-6 text-gray-900">
          Légende
        </div>
        <div class="mt-2">
          <div v-if="true">
          </div>

          <div v-if="layerDisplayed==0">
            <div class="grid grid-cols-[64px_1fr] gap-x-4">
              <div>Qualité</div>
              <br>

           <!--  Piste verte -->
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-green-2" />
              </div>
              <div>
                parc d'apprentissage
              </div>

           <!--  Piste bleue -->
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-lvv-blue-600" />
              </div>
              <div>
                satisfaisante
              </div>

           <!--  Piste rouge -->
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-red-3" />
              </div>
              <div>
                à améliorer
              </div>

           <!--  Piste noire -->
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-dark-4" />
              </div>
              <div>
                non satisfaisante
              </div>

           <!-- Ligne Qualité - hors piste -->
          <div class="my-auto rounded-md border-gray-500 border">
            <div class="h-1 relative">
              <div class="absolute h-full w-full">
                <div class="h-full bg-[repeating-linear-gradient(45deg,_yellow_0,_yellow_5px,_black_5px,_black_10px)]"></div>
              </div>
            </div>
          </div>
          <div>non balisée</div>

          <!-- Points noirs / danger -->
          <div class="my-auto flex justify-center">
            <div class="danger-icon h-5 w-5 bg-contain bg-no-repeat bg-center"></div>
          </div>
          <div>
            points noirs
          </div>
          
            </div>
          </div>

          <div v-if="layerDisplayed==1">
            <div class="grid grid-cols-[64px_1fr] gap-x-4">

              <div>Réseau</div>
              <br>
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-yellow-5" />
              </div>
              <div>
                terminé
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 relative">
                  <div class="h-full w-full">
                    <div class="myrelative h-full w-full">
                      <div class="myabsolute h-full w-full bg-velocite-yellow-5 dashed-line" />
                      <div class="myabsolute h-full w-full bg-velocite-yellow-5 animated-opacity" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                en travaux
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 relative">
                  <div class="absolute h-full w-full">
                    <div class="h-full bg-velocite-yellow-5 dashed-line" />
                  </div>
                </div>
              </div>
              <div>
                à l'étude
              </div>

              <div class="my-auto rounded-md border-gray-500 border relative">
                <div class="h-1 bg-white" />
                <div class="myabsolute h-full w-full bg-velocite-yellow-5 dashed-line opacity-60 animated-opacity-slow" />
              </div>
              <div>
                souhaité
              </div>
            </div>
          </div>

          <div v-if="layerDisplayed==2">
            <div class="grid grid-cols-[64px_1fr] gap-x-4">
              <div>Types principaux</div>
              <br>
              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-bidirectionnelle" />
              </div>
              <div>
                bidirectionnelle
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-bilaterale" />
              </div>
              <div>
                unidirectionnelle
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-voie-verte" />
              </div>
              <div>
                voie verte
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-voie-bus" />
              </div>
              <div>
                voie bus
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-bandes-cyclables" />
              </div>
              <div>
                bandes cyclables
              </div>

              <div class="my-auto rounded-md border-gray-500 border">
                <div class="h-1 bg-velocite-aucun" />
              </div>
              <div>
                aucun
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const isExpanded = ref(false);

function reduceLegend() {
  isExpanded.value = false;
}
function expandLegend() {
  isExpanded.value = true;
}

function toggleLegend() {
  isExpanded.value = !isExpanded.value;
}

const layerDisplayed = ref(0);

function setWhichLayerIsDisplayed(newLayerDisplayed: number) {
  layerDisplayed.value = newLayerDisplayed;
}

defineExpose({
  expandLegend,
  reduceLegend,
  toggleLegend,
  setWhichLayerIsDisplayed
});
</script>

<style>
.dashed-line {
  background-image: linear-gradient(to right, transparent 50%, white 50%);
  background-position: 0 0;
  background-repeat: repeat-x;
  background-size: 10px 0.25rem;
}

.animated-opacity {
  animation: blinker 1s linear infinite;
}

.animated-opacity-slow {
  animation: blinker 5s linear infinite;
}

.myrelative {
  position:relative;
}

.myabsolute {
  position: absolute;
  top: 0px;
  left: 0px;
}

.button-corner-top-right {
  position: absolute;
  top: 5px;
  right: 5px;
}

.font-size-small {
  background-color: rgba(255, 255, 255, 0.1);
  font-size: x-small;
  position: absolute;
  top: -5px;
  left: 15px;
  animation: halfblinker 5s linear infinite;
}

@keyframes halfblinker {
  50% {
    opacity: 0.5;
  }
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

@keyframes dash-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 12px 0;
  }
}
</style>
