<template>
  <main id="konten" tabindex="-1" class="focus:outline-none">
    <section class="wrap grid gap-8 pb-10 pt-10 md:pb-14 md:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
      <div>
      <h1 class="headline max-w-[16ch] text-[clamp(2.3rem,1.3rem+3.6vw,4rem)]">
        Info ASN dan persiapan <span class="mark">CPNS 2027</span>.
      </h1>
      <p class="mt-5 max-w-[56ch] text-[1.12rem] text-ink-2">
        Kabar seleksi, aturan SKD, dan strategi belajar dari tim GASCPNS. Baca, lalu ukur
        kesiapanmu di Simulasi Kilat.
      </p>
      </div>
      <CatPromo medium="home_hero" />
    </section>

    <section class="border-t-line border-ink bg-white" aria-labelledby="daftar-artikel">
      <div class="wrap py-12 md:py-16">
        <h2 id="daftar-artikel" class="sr-only">Daftar artikel</h2>

        <div v-if="status === 'loading'" class="flex items-center gap-3 rounded-card border-line border-ink bg-paper p-6 font-semibold" role="status">
          <span class="h-5 w-5 rounded-full border-[3px] border-sky border-t-blue motion-safe:animate-spin" aria-hidden="true" />
          Memuat artikel terbaru...
        </div>

        <div v-else-if="status === 'error'" class="rounded-card border-line border-bad bg-bad-tint p-6" role="alert">
          <p class="font-bold">Artikel belum bisa dimuat.</p>
          <p class="mt-1 text-ink-2">Periksa koneksi internetmu, lalu coba lagi.</p>
          <button type="button" class="btn btn-white mt-4" @click="load">Coba lagi</button>
        </div>

        <div v-else-if="status === 'empty'">
          <div>
            <p class="text-[1.4rem] font-extrabold leading-snug" style="font-stretch: 106%">Belum ada artikel yang terbit.</p>
            <p class="mt-3 max-w-[52ch] text-ink-2">
              Tim GASCPNS sedang menyiapkan tulisan seputar seleksi CPNS 2027. Sambil menunggu,
              hitung jarak skormu ke zona aman instansi incaranmu.
            </p>
            <a :href="`${LANDING}/?${utm('empty_state')}#kalkulator-skd`" class="btn btn-white mt-6">Buka Kalkulator SKD</a>
          </div>
        </div>

        <template v-else>
          <article v-if="lead" class="group grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10">
            <RouterLink :to="`/article/${lead.slug}`" class="block overflow-hidden rounded-sheet border-line border-ink bg-cyan-tint" tabindex="-1" aria-hidden="true">
              <img
                v-if="lead.image"
                :src="lead.image"
                alt=""
                width="1280"
                height="720"
                fetchpriority="high"
                class="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span v-else class="grid aspect-video place-items-center text-[1.6rem] font-black text-blue" style="font-stretch: 115%">Info ASN</span>
            </RouterLink>
            <div>
              <p class="text-[0.92rem] font-semibold text-ink-2">
                {{ formatDate(lead.created_at) }} · {{ lead.readTime }} menit baca
              </p>
              <h3 class="mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-extrabold leading-[1.1]" style="font-stretch: 108%">
                <RouterLink :to="`/article/${lead.slug}`" class="hover:text-blue hover:underline hover:decoration-2 hover:underline-offset-4">
                  {{ lead.title }}
                </RouterLink>
              </h3>
              <p class="mt-4 text-ink-2">{{ excerpt(lead.content, 40) }}</p>
              <RouterLink :to="`/article/${lead.slug}`" class="btn btn-white mt-6">
                Baca artikel
                <span class="sr-only">: {{ lead.title }}</span>
              </RouterLink>
            </div>
          </article>

          <ol v-if="rest.length" class="mt-12 border-t-line border-ink">
            <li v-for="item in rest" :key="item.id" class="group grid grid-cols-[minmax(0,1fr)_96px] gap-5 border-b border-hairline py-6 sm:grid-cols-[minmax(0,1fr)_180px] md:gap-8">
              <div>
                <p class="text-[0.88rem] font-semibold text-ink-2">
                  {{ formatDate(item.created_at) }} · {{ item.readTime }} menit baca
                </p>
                <h3 class="mt-1.5 text-[1.2rem] font-extrabold leading-snug sm:text-[1.35rem]" style="font-stretch: 104%">
                  <RouterLink :to="`/article/${item.slug}`" class="hover:text-blue hover:underline hover:decoration-2 hover:underline-offset-4">
                    {{ item.title }}
                  </RouterLink>
                </h3>
                <p class="mt-2 hidden max-w-[62ch] text-ink-2 sm:block">{{ excerpt(item.content, 28) }}</p>
              </div>
              <RouterLink :to="`/article/${item.slug}`" tabindex="-1" aria-hidden="true" class="block self-start overflow-hidden rounded-row border-line border-ink bg-cyan-tint">
                <img v-if="item.image" :src="item.image" alt="" width="360" height="240" loading="lazy" class="aspect-[3/2] w-full object-cover" />
                <span v-else class="grid aspect-[3/2] place-items-center text-sm font-black text-blue">GASCPNS</span>
              </RouterLink>
            </li>
          </ol>

          <nav v-if="lastPage > 1" class="mt-10 flex flex-wrap items-center justify-between gap-4" aria-label="Halaman artikel">
            <RouterLink v-if="page > 1" :to="{ query: { page: page - 1 } }" class="btn btn-white">Lebih baru</RouterLink>
            <span v-else />
            <span class="font-semibold text-ink-2">Halaman {{ page }} dari {{ lastPage }}</span>
            <RouterLink v-if="page < lastPage" :to="{ query: { page: page + 1 } }" class="btn btn-white">Lebih lama</RouterLink>
            <span v-else />
          </nav>
        </template>
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CatPromo from "../components/CatPromo.vue";
import { LANDING, excerpt, formatDate, listArticles, setMeta, utm } from "../lib/blog";

const route = useRoute();
const articles = ref([]);
const status = ref("loading");
const page = ref(1);
const lastPage = ref(1);

const lead = computed(() => (page.value === 1 ? articles.value[0] : null));
const rest = computed(() => (page.value === 1 ? articles.value.slice(1) : articles.value));

async function load() {
  status.value = "loading";
  try {
    const result = await listArticles(Number(route.query.page) || 1);
    articles.value = result.items;
    page.value = result.page;
    lastPage.value = result.lastPage;
    status.value = result.items.length ? "ready" : "empty";
  } catch {
    status.value = "error";
  }
}

setMeta(
  "Info ASN dan persiapan CPNS 2027 - GASCPNS",
  "Kabar seleksi, aturan SKD, dan strategi belajar menuju CPNS 2027 dari tim GASCPNS."
);
watch(() => route.query.page, load, { immediate: true });
</script>
