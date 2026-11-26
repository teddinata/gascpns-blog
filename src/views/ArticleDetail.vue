<template>
  <main id="konten" tabindex="-1" class="focus:outline-none">
    <div class="wrap pt-8">
      <RouterLink to="/" class="inline-flex min-h-[44px] items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:text-blue">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Semua artikel
      </RouterLink>
    </div>

    <div v-if="status === 'loading'" class="wrap py-16" role="status">
      <div class="flex items-center gap-3 rounded-card border-line border-ink bg-white p-6 font-semibold">
        <span class="h-5 w-5 rounded-full border-[3px] border-sky border-t-blue motion-safe:animate-spin" aria-hidden="true" />
        Memuat artikel...
      </div>
    </div>

    <div v-else-if="status === 'missing'" class="wrap grid gap-8 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div>
        <h1 class="headline text-[clamp(2rem,1.3rem+2.6vw,3rem)]">Artikel ini tidak ditemukan.</h1>
        <p class="mt-4 max-w-[52ch] text-ink-2">Tautannya mungkin salah ketik, atau artikelnya sudah dipindahkan.</p>
        <RouterLink to="/" class="btn btn-white mt-6">Lihat semua artikel</RouterLink>
      </div>
      <CatPromo medium="not_found" />
    </div>

    <div v-else-if="status === 'error'" class="wrap py-14">
      <div class="rounded-card border-line border-bad bg-bad-tint p-6" role="alert">
        <p class="font-bold">Artikel belum bisa dimuat.</p>
        <p class="mt-1 text-ink-2">Periksa koneksi internetmu, lalu coba lagi.</p>
        <button type="button" class="btn btn-white mt-4" @click="load">Coba lagi</button>
      </div>
    </div>

    <template v-else-if="article">
      <article class="wrap grid gap-10 pb-16 pt-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
        <div class="min-w-0">
          <header>
            <h1 class="headline max-w-[22ch] text-[clamp(2rem,1.25rem+2.8vw,3.3rem)]">{{ article.title }}</h1>
            <p class="mt-5 flex flex-wrap gap-x-2 text-[0.95rem] font-semibold text-ink-2">
              <time :datetime="article.created_at">{{ formatDate(article.created_at) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ article.readTime }} menit baca</span>
              <template v-if="article.views">
                <span aria-hidden="true">·</span>
                <span>dibaca {{ article.views.toLocaleString("id-ID") }} kali</span>
              </template>
            </p>
          </header>

          <figure v-if="article.image" class="mt-8 overflow-hidden rounded-sheet border-line border-ink bg-cyan-tint">
            <img :src="article.image" alt="" width="1280" height="720" fetchpriority="high" class="aspect-video w-full object-cover" />
          </figure>

          <div class="article-body mt-10" v-html="article.content" />

          <div class="mt-12 flex flex-wrap items-center gap-3 border-t-line border-ink pt-6">
            <span class="mr-2 font-extrabold">Bagikan artikel ini</span>
            <a :href="waShare" target="_blank" rel="noopener noreferrer" class="btn btn-white">Kirim lewat WhatsApp</a>
            <button type="button" class="btn btn-white" @click="copyLink">Salin tautan</button>
            <p class="w-full text-[0.92rem] font-semibold text-ink-2" role="status">{{ copyMsg }}</p>
          </div>
        </div>

        <div class="lg:sticky lg:top-[92px] lg:self-start">
          <CatPromo medium="article_aside" />
          <section v-if="related.length" class="mt-10" aria-labelledby="artikel-lain">
            <h2 id="artikel-lain" class="text-[1.15rem] font-extrabold">Artikel lain</h2>
            <ul class="mt-3 border-t-line border-ink">
              <li v-for="item in related" :key="item.id" class="border-b border-hairline py-4">
                <p class="text-[0.85rem] font-semibold text-ink-2">{{ formatDate(item.created_at) }}</p>
                <RouterLink :to="`/article/${item.slug}`" class="mt-1 block font-bold leading-snug hover:text-blue hover:underline hover:decoration-2 hover:underline-offset-4">
                  {{ item.title }}
                </RouterLink>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </template>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CatPromo from "../components/CatPromo.vue";
import { excerpt, formatDate, getArticle, listArticles, setMeta } from "../lib/blog";

const route = useRoute();
const article = ref(null);
const others = ref([]);
const status = ref("loading");
const copyMsg = ref("");

const related = computed(() => others.value.filter((a) => a.slug !== route.params.slug).slice(0, 4));
const pageUrl = computed(() => `${window.location.origin}/article/${route.params.slug}`);
const waShare = computed(() =>
  `https://wa.me/?text=${encodeURIComponent(`${article.value?.title || ""} ${pageUrl.value}`)}`
);

async function load() {
  status.value = "loading";
  copyMsg.value = "";
  try {
    const found = await getArticle(route.params.slug);
    if (!found) {
      status.value = "missing";
      setMeta("Artikel tidak ditemukan - Info ASN GASCPNS");
      return;
    }
    article.value = found;
    status.value = "ready";
    setMeta(`${found.title} - Info ASN GASCPNS`, excerpt(found.content, 28));
  } catch {
    status.value = "error";
  }
  listArticles(1)
    .then((r) => (others.value = r.items))
    .catch(() => (others.value = []));
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(pageUrl.value);
    copyMsg.value = "Tautan tersalin.";
  } catch {
    copyMsg.value = `Salin manual: ${pageUrl.value}`;
  }
}

watch(() => route.params.slug, load, { immediate: true });
</script>
