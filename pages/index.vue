<template>
  <div>
    <HomeHeroSection />
    <HomeStatSection />
    <div class="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8 lg:mt-24">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Où en est le projet ?
          </h2>
          <p class="text-xl text-gray-500">
            Grand Chambéry a inauguré le mercredi 5 juin 2024 les « pistes bleues » de son réseau cyclable. Pour l’association Roue Libre, ce jalonnement de 9 itinéraires identifiés comme “pistes” par Grand Chambéry avec des panneaux et un futur marquage en peinture au sol est prématuré au vu du manque de sécurisation et de continuité de ces itinéraires pour toutes les usagères et usagers et tous les types d’usages. Ce réseau de “pistes” doit donc être considéré comme une indication des secteurs prioritaires à aménager, et la réalisation d’aménagements cyclables continus et sécurisés pour toutes et tous doit être une urgente priorité.<br> Roue Libre se mobilise pour la réalisation d'un réseau cyclable continue, capacité, lisible et sécurisé sur l'ensemble de l'agglomération.
          </p>
        </div>
      </div>
      <ProgressBar :voies="voies" class="mt-8 md:mt-10" />
      <Stats :voies="voies" class="mt-8" />
      <Typology :voies="voies" class="mt-8 max-w-2xl mx-auto" />
    </div>
    <div class="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8 lg:mt-24">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Avancement par ligne
          </h2>
          <p class="text-xl text-gray-500">
            Choisissez une ligne du {{ getRevName('singular') }} pour connaître la découvrir et voir son niveau d'avancement.
          </p>
        </div>
        <HomeLinesSection class="mt-5" />
      </div>
    </div>
    <div class="py-16">
      <LvvCta />
    </div>
  </div>
</template>

<script setup>
const { getRevName } = useConfig();

const { data: voies } = await useAsyncData(() => {
  return queryContent('voies-cyclables').where({ _type: 'json' }).find();
});
</script>
