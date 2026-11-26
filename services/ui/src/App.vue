<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue'
import { useRoute } from 'vue-router'
import {
  Bell,
  Bookmark,
  Ellipsis,
  House,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  UsersRound,
} from '@lucide/vue'
import { useFeedStore } from './stores/feed'

const feed = useFeedStore()
const route = useRoute()
const isHome = computed(() => route.name === 'home')
const navItems = computed<{ name: string; icon: Component; active?: boolean; badge?: string }[]>(() => [
  { name: 'Inicio', icon: House, active: isHome.value },
  { name: 'Explorar', icon: Search },
  { name: 'Notificaciones', icon: Bell, badge: '3' },
  { name: 'Mensajes', icon: Mail },
  { name: 'Guardados', icon: Bookmark },
  { name: 'Comunidades', icon: UsersRound },
])
const platformGroups = [
  {
    name: 'Las más conocidas',
    platforms: [
      { name: 'Facebook', mark: 'f' },
      { name: 'Instagram', mark: 'ig' },
      { name: 'WhatsApp', mark: 'wa' },
      { name: 'YouTube', mark: 'yt' },
      { name: 'TikTok', mark: 'tk' },
      { name: 'WeChat', mark: 'wc' },
      { name: 'LinkedIn', mark: 'in' },
      { name: 'Telegram', mark: 'tg' },
      { name: 'Snapchat', mark: 'sc' },
      { name: 'Kuaishou', mark: 'ks' },
      { name: 'X (Twitter)', mark: 'x' },
    ],
  },
  {
    name: 'Más plataformas',
    platforms: [
      { name: 'Bluesky', mark: 'b' },
      { name: 'Threads', mark: 'th' },
      { name: 'Mastodon', mark: 'm' },
      { name: 'GETTR', mark: 'g' },
      { name: 'Tumblr', mark: 't' },
      { name: 'Substack Notes', mark: 'sn' },
      { name: 'Reddit', mark: 'r' },
      { name: 'Spill', mark: 'sp' },
      { name: 'Nostr', mark: 'n' },
      { name: 'Plurk', mark: 'p' },
      { name: 'Weibo', mark: 'wb' },
      { name: 'Parler', mark: 'p' },
      { name: 'Truth Social', mark: 'ts' },
      { name: 'Pleroma', mark: 'pl' },
      { name: 'Diaspora', mark: 'd' },
      { name: 'Friendica', mark: 'fr' },
      { name: 'Micro.blog', mark: 'mb' },
      { name: 'Hive Social', mark: 'h' },
      { name: 'Farcaster', mark: 'fc' },
      { name: 'CounterSocial', mark: 'cs' },
      { name: 'Spoutible', mark: 's' },
      { name: 'Minds', mark: 'mi' },
      { name: 'Discord', mark: 'dc' },
    ],
  },
]

onMounted(() => feed.applyTheme())
</script>

<template>
  <div class="min-h-screen bg-[#f4f4f5] text-slate-900 transition-colors dark:bg-[#09090b] dark:text-slate-100">
    <div class="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-fib-4 px-fib-3 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,665px)_320px] lg:gap-fib-5">
      <!-- Left navigation -->
      <aside class="hidden md:block">
        <div class="sticky top-0 h-screen py-fib-2">
          <div class="sidebar-panel flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111114]">
            <header class="flex shrink-0 items-center justify-between px-fib-3 pb-fib-3 pt-fib-4">
              <RouterLink to="/" aria-label="Pairfy, inicio" class="group flex min-w-0 items-center gap-fib-2 rounded-xl">
                <span class="pairfy-mark flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" aria-hidden="true">
                  <span class="pairfy-mark-dot"></span>
                </span>
                <span class="min-w-0">
                  <span class="type-title-2 block leading-none tracking-[-0.04em]">Pairfy</span>
                </span>
              </RouterLink>
              <button type="button" aria-label="Más opciones" class="rounded-lg p-fib-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white">
                <Ellipsis :size="19" :stroke-width="2" aria-hidden="true" />
              </button>
            </header>

            <div class="shrink-0 px-fib-3">
              <RouterLink to="/" class="type-label group flex w-full items-center justify-center gap-fib-2 rounded-xl bg-neutral-900 px-fib-3 py-[11px] text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300">
                <Sparkles :size="17" :stroke-width="2" aria-hidden="true" />
                Crear publicación
              </RouterLink>
            </div>

            <nav aria-label="Navegación principal" class="shrink-0 px-fib-2 pb-fib-3 pt-fib-3">
              <p class="type-micro mb-fib-1 px-fib-2 uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">Tu espacio</p>
              <div class="flex flex-col gap-0.5">
                <button
                  v-for="item in navItems"
                  :key="item.name"
                  type="button"
                  :aria-current="item.active ? 'page' : undefined"
                  class="sidebar-nav-item type-label group flex min-h-[37px] w-full items-center gap-fib-2 rounded-[11px] px-fib-2 text-left text-slate-600 transition hover:bg-slate-100/90 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white"
                  :class="{ 'sidebar-nav-active': item.active }"
                >
                  <span class="relative flex h-5 w-5 shrink-0 items-center justify-center">
                    <component :is="item.icon" :size="18" :stroke-width="item.active ? 2.1 : 1.8" aria-hidden="true" />
                    <span v-if="item.badge" class="type-micro absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-neutral-700 px-1 text-white ring-2 ring-white dark:bg-neutral-300 dark:text-neutral-950 dark:ring-[#111114]">{{ item.badge }}</span>
                  </span>
                  <span class="truncate" :class="item.active ? 'font-semibold' : 'font-medium'">{{ item.name }}</span>
                  <span v-if="item.active" class="sr-only">(página actual)</span>
                  <span v-if="item.active" class="ml-auto h-1.5 w-1.5 rounded-full bg-neutral-500 dark:bg-neutral-400" aria-hidden="true"></span>
                </button>
              </div>
            </nav>

            <section aria-label="Directorio de redes sociales" class="sidebar-scroll min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-fib-3 pb-fib-3 dark:border-white/[0.07]">
              <div class="sticky top-0 z-10 -mx-fib-3 flex items-center justify-between bg-white/95 px-fib-3 pb-fib-2 pt-fib-3 backdrop-blur dark:bg-[#111114]/95">
                <div>
                  <h2 class="type-label">Panorama social</h2>
                  <p class="type-micro mt-0.5 text-slate-500 dark:text-slate-400">Un mundo de conversaciones</p>
                </div>
                <span class="type-micro rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">34 redes</span>
              </div>

              <div v-for="group in platformGroups" :key="group.name" class="mt-fib-2">
                <h3 class="type-micro mb-1 px-1 uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">{{ group.name }}</h3>
                <ul class="flex flex-col gap-px">
                  <li v-for="platform in group.platforms" :key="platform.name" class="flex min-h-[29px] items-center gap-fib-2 rounded-lg px-1.5 py-1 transition hover:bg-slate-100 dark:hover:bg-white/[0.06]">
                    <span class="network-mark type-micro flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-md bg-slate-100 font-semibold text-slate-600 dark:bg-white/[0.08] dark:text-slate-300" aria-hidden="true">{{ platform.mark }}</span>
                    <span class="type-caption min-w-0 truncate text-slate-600 dark:text-slate-300">{{ platform.name }}</span>
                  </li>
                </ul>
              </div>
            </section>

            <footer class="shrink-0 border-t border-slate-100 px-fib-3 pb-fib-2 pt-fib-2 dark:border-white/[0.07]">
              <div class="mb-fib-1 grid grid-cols-2 gap-fib-1">
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'light'"
                  class="type-caption flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-slate-500 transition hover:bg-slate-100 aria-pressed:bg-slate-100 aria-pressed:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.07] dark:aria-pressed:bg-white/10 dark:aria-pressed:text-white"
                  @click="feed.setTheme('light')"
                >
                  <Sun :size="15" :stroke-width="1.8" aria-hidden="true" />
                  Claro
                </button>
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'dark'"
                  class="type-caption flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-slate-500 transition hover:bg-slate-100 aria-pressed:bg-slate-100 aria-pressed:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.07] dark:aria-pressed:bg-white/10 dark:aria-pressed:text-white"
                  @click="feed.setTheme('dark')"
                >
                  <Moon :size="15" :stroke-width="1.8" aria-hidden="true" />
                  Oscuro
                </button>
              </div>
              <button type="button" class="flex w-full items-center gap-fib-2 rounded-xl p-fib-1 text-left transition hover:bg-slate-100/80 dark:hover:bg-white/[0.06]">
                <span aria-hidden="true" class="type-caption flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-neutral-700 dark:text-slate-200">MD</span>
                <span class="min-w-0 flex-1">
                  <span class="type-caption block truncate font-semibold">Mi perfil demo</span>
                  <span class="type-micro block truncate text-slate-500 dark:text-slate-400">@mi_perfil_demo</span>
                </span>
                <Ellipsis :size="17" :stroke-width="1.8" class="shrink-0 text-slate-500" aria-hidden="true" />
              </button>
            </footer>
          </div>
        </div>
      </aside>

      <!-- Feed -->
      <main class="mobile-content-clearance min-h-screen min-w-0 w-full">
        <RouterView />
      </main>

      <!-- Right sidebar -->
      <aside class="hidden min-w-0 lg:block">
        <div class="sticky top-0 flex flex-col gap-fib-4 py-fib-3">
          <label class="relative block">
            <Search :size="18" :stroke-width="1.8" class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input type="search" placeholder="Buscar temas o comunidades" class="input-control h-fib-6 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-fib-3 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-neutral-600 dark:border-white/10 dark:bg-[#18181b] dark:focus:border-neutral-600" />
          </label>

          <section class="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-fib-3 text-white shadow-lg shadow-neutral-950/20">
            <Sparkles :size="55" :stroke-width="1" class="pointer-events-none absolute -right-2 -top-2 -z-10 rotate-12 text-white/15" aria-hidden="true" />
            <p class="type-micro inline-flex items-center gap-fib-1 rounded-full border border-white/20 bg-white/10 px-fib-2 py-fib-1 uppercase text-white/90">
              <span class="h-1.5 w-1.5 rounded-full bg-neutral-300" aria-hidden="true"></span>
              Pool de staking
            </p>
            <h2 class="type-title-2 mt-fib-2">Estado actual del pool</h2>
            <p class="type-body mt-fib-1 text-white/85">ADA bloqueados actualmente</p>
            <div class="mt-fib-3 flex flex-wrap gap-fib-2" aria-label="ADA bloqueados en el pool de staking">
              <span class="type-title-2 tabular-nums rounded-full border border-white/20 bg-white/10 px-fib-3 py-fib-1">388,000 ADA</span>
            </div>
            <p class="type-caption mt-fib-3 text-white/70">Total bloqueado en staking</p>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface-app)] shadow-sm dark:border-white/10">
            <div class="px-fib-4 pb-fib-2 pt-fib-4">
              <h2 class="type-title-2">Temas en auge</h2>
              <p class="type-caption mt-fib-1 text-slate-500 dark:text-slate-400">Lo más comentado ahora</p>
            </div>
            <button v-for="trend in [
              { category: 'Comunidad · Ejemplo', topic: '#IdeasParaHoy', posts: '1,2 mil publicaciones' },
              { category: 'Tecnología · Ejemplo', topic: 'Diseño accesible', posts: '840 publicaciones' },
              { category: 'Creatividad · Ejemplo', topic: 'Proyectos personales', posts: '620 publicaciones' },
              { category: 'Lecturas · Ejemplo', topic: '#LecturasDeLaSemana', posts: '410 publicaciones' },
            ]" :key="trend.topic" type="button" class="flex w-full items-start gap-fib-3 px-fib-4 py-fib-3 text-left transition hover:bg-neutral-50/70 dark:hover:bg-white/[0.04]">
              <span class="min-w-0 flex-1">
                <span class="type-micro block uppercase text-slate-500 dark:text-slate-400">{{ trend.category }}</span>
                <span class="type-label mt-fib-1 block">{{ trend.topic }}</span>
                <span class="type-caption mt-fib-1 block text-slate-500 dark:text-slate-500">{{ trend.posts }}</span>
              </span>
              <Ellipsis :size="17" :stroke-width="1.8" class="mt-fib-1 shrink-0 text-slate-400" aria-hidden="true" />
            </button>
            <button type="button" class="type-label w-full border-t border-slate-100 px-fib-4 py-fib-3 text-left text-neutral-800 transition hover:bg-neutral-50 dark:border-white/5 dark:text-neutral-300 dark:hover:bg-white/[0.04]">Ver todos los temas</button>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface-app)] shadow-sm dark:border-white/10">
            <h2 class="type-title-2 px-fib-4 pb-fib-2 pt-fib-4">Comunidades para ti</h2>
            <div v-for="person in [
              { name: 'Club de lectura', handle: '1,8 mil miembros', initials: 'L', color: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200' },
              { name: 'Diseño cotidiano', handle: '960 miembros', initials: 'D', color: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200' },
              { name: 'Rutas y escapadas', handle: '2,4 mil miembros', initials: 'R', color: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200' },
            ]" :key="person.handle" class="flex items-center gap-fib-2 px-fib-4 py-fib-3 transition hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <span aria-hidden="true" class="type-label flex h-fib-5 w-fib-5 items-center justify-center rounded-full" :class="person.color">{{ person.initials }}</span>
              <span class="min-w-0 flex-1">
                <span class="type-label block truncate">{{ person.name }}</span>
                <span class="type-caption block truncate text-slate-500 dark:text-slate-400">{{ person.handle }}</span>
              </span>
              <button type="button" aria-label="Unirse a la comunidad" class="type-caption rounded-lg border border-neutral-200 px-fib-3 py-fib-3 text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-600/25 dark:text-neutral-300 dark:hover:bg-neutral-700/10">Unirme</button>
            </div>
            <button type="button" class="type-label w-full border-t border-slate-100 px-fib-4 py-fib-3 text-left text-neutral-800 transition hover:bg-neutral-50 dark:border-white/5 dark:text-neutral-300 dark:hover:bg-white/[0.04]">Explorar comunidades</button>
          </section>

          <footer class="type-caption flex flex-wrap gap-x-fib-3 gap-y-fib-1 px-fib-3 pb-fib-4 text-slate-500 dark:text-slate-500">
            <a href="#" class="hover:underline">Términos de Servicio</a><a href="#" class="hover:underline">Política de Privacidad</a>
            <a href="#" class="hover:underline">Política de cookies</a><a href="#" class="hover:underline">Accesibilidad</a>
            <a href="#" class="hover:underline">Información de anuncios</a><a href="#" class="hover:underline">Más opciones ···</a>
            <span>© 2025 Pairfy</span>
          </footer>
        </div>
      </aside>
    </div>

    <nav aria-label="Navegación móvil" class="fixed inset-x-0 bottom-0 z-30 flex h-[calc(89px+env(safe-area-inset-bottom))] items-center justify-around border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#18181b]/95 md:hidden">
      <RouterLink to="/" :aria-current="isHome ? 'page' : undefined" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><House :size="20" :stroke-width="2" class="h-5 w-5" aria-hidden="true" /><span>Inicio</span></RouterLink>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Search :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Buscar</span></button>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Bell :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Novedades</span></button>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Mail :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Mensajes</span></button>
    </nav>

    <div v-if="feed.toast" role="status" class="type-label fixed bottom-fib-7 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-fib-4 py-fib-3 text-white shadow-lg md:bottom-fib-4">
      {{ feed.toast }}
    </div>
  </div>
</template>
