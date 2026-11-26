<template>
  <footer class="on-navy border-t-line border-ink bg-navy text-white">
    <div class="wrap py-14 md:py-20">
      <div class="grid gap-7 border-b-2 border-white/25 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <p class="headline max-w-[20ch] text-[clamp(1.8rem,1.2rem+2.4vw,3rem)] text-white">
          Pendaftaran CPNS 2027 belum dibuka. Latihanmu bisa mulai malam ini.
        </p>
        <a :href="`${APP}/register?${utm('footer')}`" class="btn btn-gold justify-self-start">Buat akun gratis</a>
      </div>

      <div class="grid gap-9 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/logo-gascpns-putih-480.png" alt="GASCPNS" width="160" height="46" loading="lazy" class="h-auto w-40" />
          <p class="mt-4 max-w-[40ch] text-[0.95rem] text-on-navy">
            Info ASN dari GASCPNS: kabar seleksi dan strategi belajar menuju CPNS 2027.
          </p>
        </div>
        <nav aria-label="Tautan GASCPNS">
          <h2 class="mb-2.5 text-base font-extrabold">GASCPNS</h2>
          <ul>
            <li v-for="link in links" :key="link.label">
              <a :href="link.href" class="inline-flex min-h-[40px] items-center text-on-navy hover:text-white hover:underline">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 class="mb-2.5 text-base font-extrabold">Hubungi kami</h2>
          <ul>
            <li v-for="link in contacts" :key="link.label">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-[40px] items-center text-on-navy hover:text-white hover:underline"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p class="border-t-2 border-white/25 pt-6 text-[0.88rem] text-on-navy">© {{ year }} GASCPNS Indonesia</p>
    </div>
  </footer>
</template>

<script setup>
import { APP, LANDING, utm } from "../lib/blog";

const year = new Date().getFullYear();
const links = [
  { label: "Simulasi Kilat CAT", href: `${LANDING}/?${utm("footer")}#simulasi-kilat` },
  { label: "Kalkulator SKD", href: `${LANDING}/?${utm("footer")}#kalkulator-skd` },
  { label: "Paket tryout", href: `${LANDING}/?${utm("footer")}#tryout` },
  { label: "Masuk ke aplikasi", href: `${APP}/login?${utm("footer")}` },
];
const contacts = [
  { label: "Instagram @gascpns", href: "https://www.instagram.com/gascpns/" },
  { label: "Telegram GASCPNS", href: "https://t.me/gascpns2024" },
  { label: "WhatsApp admin", href: "https://wa.me/6285155095022" },
];
</script>
