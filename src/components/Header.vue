<template>
  <header class="sticky top-0 z-40 border-b-line border-ink bg-white">
    <a
      href="#konten"
      class="fixed left-4 top-[-100px] z-50 rounded-sm border-line border-ink bg-gold px-4 py-2 font-bold shadow-lift-sm focus:top-3"
    >
      Langsung ke konten
    </a>
    <div class="wrap flex min-h-[68px] items-center justify-between gap-4">
      <RouterLink to="/" class="inline-flex min-h-[44px] items-center" aria-label="Info ASN GASCPNS, beranda blog">
        <img src="/logo-gascpns-biru-480.png" alt="GASCPNS" width="132" height="38" class="h-auto w-[132px]" />
        <span class="ml-3 hidden border-l-line border-ink pl-3 text-[0.95rem] font-extrabold sm:inline" style="font-stretch: 106%">
          Info ASN
        </span>
      </RouterLink>

      <button
        type="button"
        class="inline-flex min-h-[44px] items-center gap-2 rounded-control border-line border-ink bg-white px-3.5 font-bold hover:bg-sky lg:hidden"
        :aria-expanded="open"
        aria-controls="menu-utama"
        @click="open = !open"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="2" />
        </svg>
        {{ open ? "Tutup" : "Menu" }}
      </button>

      <nav
        id="menu-utama"
        aria-label="Navigasi utama"
        :class="[
          open ? 'absolute inset-x-0 top-full block border-b-line border-ink bg-white px-4 pb-5 pt-2' : 'hidden',
          'lg:static lg:flex lg:items-center lg:gap-6 lg:border-0 lg:p-0',
        ]"
      >
        <ul class="lg:flex lg:gap-1">
          <li v-for="link in links" :key="link.label">
            <RouterLink
              v-if="link.to"
              :to="link.to"
              class="flex min-h-[48px] items-center border-b border-hairline font-semibold hover:text-blue lg:min-h-[44px] lg:rounded-sm lg:border-0 lg:px-2.5 lg:text-[0.97rem] lg:hover:bg-sky lg:hover:text-ink"
            >
              {{ link.label }}
            </RouterLink>
            <a
              v-else
              :href="link.href"
              class="flex min-h-[48px] items-center border-b border-hairline font-semibold hover:text-blue lg:min-h-[44px] lg:rounded-sm lg:border-0 lg:px-2.5 lg:text-[0.97rem] lg:hover:bg-sky lg:hover:text-ink"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="mt-4 flex items-center gap-4 lg:mt-0">
          <a
            :href="`${APP}/login?${utm('header_login')}`"
            class="inline-flex min-h-[44px] items-center px-1 font-bold underline decoration-2 underline-offset-4"
          >
            Masuk
          </a>
          <a :href="`${APP}/register?${utm('header_register')}`" class="btn btn-gold min-h-[44px] px-4 text-[0.95rem]">
            Daftar gratis
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { APP, LANDING, utm } from "../lib/blog";

const open = ref(false);
const route = useRoute();

const links = [
  { label: "Artikel", to: "/" },
  { label: "Simulasi Kilat", href: `${LANDING}/?${utm("header")}#simulasi-kilat` },
  { label: "Kalkulator SKD", href: `${LANDING}/?${utm("header")}#kalkulator-skd` },
  { label: "Paket tryout", href: `${LANDING}/?${utm("header")}#tryout` },
];

const onKey = (e) => {
  if (e.key === "Escape") open.value = false;
};

watch(() => route.fullPath, () => (open.value = false));
onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>
