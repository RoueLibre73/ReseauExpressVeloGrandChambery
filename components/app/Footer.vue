<template>
<footer class="bg-white border-t border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <!-- LINKS -->
    <nav
      class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center"
      aria-label="Footer"
    >
      <NuxtLink
        v-for="item in links"
        :key="item.name"
        :to="item.path"
        class="text-sm font-medium text-gray-500 hover:text-gray-900 transition"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>

    <!-- subtle separator -->
    <div class="mt-8 flex justify-center">
      <div class="h-px w-24 bg-gray-100"></div>
    </div>

    <!-- SOCIALS -->
    <div class="mt-6 flex justify-center space-x-5">
      <a
        v-for="item in socials"
        :key="item.name"
        :href="item.href"
        target="_blank"
        class="text-gray-400 hover:text-gray-900 transition transform hover:scale-110"
      >
        <span class="sr-only">{{ item.name }}</span>
        <Icon :name="item.icon" class="h-5 w-5" />
      </a>
    </div>

    <!-- BRAND / SIGNATURE -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-400">
        <a
          href="https://rouelibre.net"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-gray-400 hover:text-gray-900 font-medium transition"
        >
          {{ getAssoName() }}
        </a>
      </p>
    </div>
</footer>
</template>

<script setup lang="ts">
const { getAssoName } = useConfig();

const links = [
  { name: 'Méthodologie', path: '/blog/methodo' },
  { name: 'Historique', path: '/historique' },
  { name: 'Réseau Cyclable à Haut Niveau de Service', path: '/blog/reseauchns' },
  { name: 'Sites partenaires', path: '/sites-partenaires' },
  { name: 'Mentions légales', path: '/mentions-legales' }
];

const socials = [
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/rouelibresavoie.bsky.social',
    icon: 'fa6-brands:bluesky'
  },
    {
      name: 'Mastodon',
      href: 'https://masto.bike/deck/@RoueLibreSavoie',
      icon: 'mdi:mastodon'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/RoueLibreSavoie/',
      icon: 'mdi:facebook'
    },
    {
      name: 'Site web',
      href: 'https://rouelibre.net',
      icon: 'mdi:link'
    },
    {
      name: 'Email',
      href: 'mailto:contact_at_rouelibre.net',
      icon: 'mdi:email-outline'
    },
        {
      name: 'Github',
      href: 'https://github.com/benoitdemaegdt/voieslyonnaises',
      icon: 'mdi:github'
    }
  ]
</script>
