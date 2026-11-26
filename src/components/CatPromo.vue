<template>
  <aside class="rounded-sheet border-line border-ink bg-white p-5 md:p-6" aria-labelledby="promo-title">
    <div class="flex gap-2" aria-hidden="true">
      <span class="numbox bg-blue text-white">1</span>
      <span class="numbox shadow-[inset_0_0_0_3px_#0066cc] bg-sky">2</span>
      <span class="numbox">3</span>
    </div>
    <h2 id="promo-title" class="mt-4 text-[1.35rem] font-extrabold leading-tight" style="font-stretch: 106%">
      Di CAT BKN, satu soal cuma dapat <span class="mark">54 detik</span>.
    </h2>
    <p class="mt-2 text-ink-2">Coba tiga soal TWK, TIU, dan TKP dengan timer. Langsung dinilai, tanpa daftar.</p>
    <a :href="`${LANDING}/?${utm(medium)}#simulasi-kilat`" class="btn btn-gold mt-5 w-full">Coba 3 soal sekarang</a>
  </aside>
</template>

<script setup>
import { LANDING, utm } from "../lib/blog";

defineProps({ medium: { type: String, default: "promo" } });
</script>
