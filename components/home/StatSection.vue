<template>
  <div class="bg-white pt-12 sm:pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Les {{ getRevName() }}, c'est quoi ?
        </h2>
        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
          C'est le nom du projet de réseau structurant lancé en 2024 par la Communauté d'agglomération de Grand Chambéry.
          <br> Concrètement, une {{ getRevName('singular') }} est un itinéraire cyclable suffisamment large (3 à 4 mètres), sécurisée, efficace, attractive et confortable, souvent sous forme de piste bidirectionnelle et séparée du trafic routier conformément aux recommandations du CEREMA. L'ensemble doit créer un maillage cyclable sans discontinuités qui connecte l'ensemble des territoires de l'agglomération de Grand Chambéry.
        </p>
      </div>
    </div>

</div>
    <div class="mt-10 bg-white">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-white" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
              <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Lignes
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-lvv-blue-600">
                  11
                </dd>
              </div>
              <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Distance
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-lvv-blue-600">
                  63km
                </dd>
              </div>
              <div class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l" id=ou-on-en-est>
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Budget
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-lvv-blue-600">
                  Inconnu
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>

      <!-- Nouveau bloc -->
<div class="mt-16 max-w-5xl mx-auto px-4 sm:px-6">
  <h2 class="text-2xl font-bold text-gray-900 text-center">
    Pistes bleues, rouges noires ou hors pistes ?
  </h3>

  <div class="mt-4 text-lg text-gray-600 text-center space-y-4">
    <p>
      Pour chaque tronçon de Piste Bleue, Roue Libre observe s'il était conforme aux caractéristiques
      d'un Réseau Cyclable à Haut Niveau de Service tel que préconisé par le <a
  href="https://observatoire.rouelibre.net/blog/reseauchns"
  target="_blank"
  rel="noopener noreferrer"
  class="text-blue-600 hover:text-blue-800 underline font-medium"
>
  CEREMA
</a>
      (Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement).
    </p>

    <p>
      Si le tronçon est globalement conforme à ces qualités, il est classé comme
      <span class="font-semibold text-blue-600">Satisfaisant</span> de couleur "Bleue".
      Si un tronçon a un aménagement pour les cycles mais que celui-ci ne correspond pas au standard
      de qualité du CEREMA, il est classé comme
      <span class="font-semibold text-red-600">À améliorer</span> de couleur "Rouge".
      S'il n'y a pas d'aménagement cyclable ou un aménagement inadapté, il est classé comme
      <span class="font-semibold text-gray-900">Non satisfaisant</span> de couleur "Noire".
      Le détail de l'aménagement présent (ou non) est souvent précisé dans les pages décrivant les lignes
      tronçon par tronçon.
    </p>

    <p>
      Enfin, nous avons ajouté un
      <span class="font-semibold text-gray-900">Hors Piste</span> pour les itinéraires qui ne sont pas
      référencés "Pistes Bleues" par Grand Chambéry mais qui mériteraient de l'être selon les usagers cyclistes.
      Ces itinéraires hors pistes ne sont pas balisés et sont en général pas ou peu aménagés selon les
      caractéristiques attendues d'un <a
  href="https://observatoire.rouelibre.net/blog/reseauchns"
  target="_blank"
  rel="noopener noreferrer"
  class="text-blue-600 hover:text-blue-800 underline font-medium"
>
  réseau cyclable à Haut Niveau de Service
</a>.
    </p>
  </div>

  <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <a
      href="https://rouelibre.net/2026/05/21/21-mai-roue-libre-deroule-une-piste-bleue-pour-une-politique-cyclable-ambitieuse/"
      target="_blank"
      class="block group"
    >
      <img
        src="https://rouelibre.net/wp-content/uploads/2026/05/image2recadr-768x576.jpg"
        alt="Piste Bleue déroulée par Roue Libre"
        class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition"
      />
      <p class="text-xs text-center text-gray-500">
        21 mai 2026
      </p>
      <p class="mt-2 text-sm text-center text-blue-600 font-medium">
        Piste Bleue déroulée par Roue Libre
      </p>
    </a>

    <a
      href="https://rouelibre.net/2024/10/15/15-oct-2024-roue-libre-inaugure-la-piste-rouge-n8-cognin-chambery/"
      target="_blank"
      class="block group"
    >
      <img
        src="https://rouelibre.net/wp-content/uploads/2024/10/IMG_3605r-768x576.jpg"
        alt="Piste Rouge inaugurée par Roue Libre"
        class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition"
      />
      <p class="text-xs text-center text-gray-500">
        15 octobre 2024
      </p>
      <p class="mt-2 text-sm text-center text-red-600 font-medium">
        Piste Rouge inaugurée par Roue Libre
      </p>
    </a>

    <a
      href="https://rouelibre.net/2025/03/20/14-janvier-roue-libre-inaugure-la-piste-noire-n3-hauts-de-chambery/"
      target="_blank"
      class="block group"
    >
      <img
        src="https://rouelibre.net/wp-content/uploads/2025/01/IMG_5195-768x576.jpg"
        alt="Piste Noire inaugurée par Roue Libre"
        class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition"
      />
      <p class="text-xs text-center text-gray-500">
        14 janvier 2025
      </p>
      <p class="mt-2 text-sm text-center text-gray-900 font-medium">
        Piste Noire inaugurée par Roue Libre
      </p>
    </a>

    <a
      href="https://rouelibre.net/2026/03/06/6-mars-2026-roue-libre-ouvre-le-hors-piste-trousse-challes-les-eaux/"
      target="_blank"
      class="block group"
    >
      <img
        src="https://rouelibre.net/wp-content/uploads/2026/03/IMG_2603-768x576.jpg"
        alt="Roue Libre ouvre un Hors Piste"
        class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition"
      />
      <p class="mt-2 text-sm text-center text-gray-900 font-medium">
        Roue Libre ouvre un Hors Piste
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const { getRevName, getNbVoiesCyclables } = useConfig();
</script>
