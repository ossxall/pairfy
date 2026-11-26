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
  Newspaper,
  Search,
  Sparkles,
  Sun,
  UserRound,
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
  { name: 'Artículos', icon: Newspaper },
  { name: 'Guardados', icon: Bookmark },
  { name: 'Comunidades', icon: UsersRound },
  { name: 'Creadores', icon: Sparkles },
  { name: 'Perfil', icon: UserRound },
  { name: 'Más', icon: Ellipsis },
])

onMounted(() => feed.applyTheme())
</script>

<template>
  <div class="min-h-screen bg-[#f4f4f5] text-slate-900 transition-colors dark:bg-[#09090b] dark:text-slate-100">
    <div class="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-fib-4 px-fib-3 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,665px)_320px] lg:gap-fib-5">
      <!-- Left navigation -->
      <aside class="hidden md:block">
        <div class="sticky top-0 flex h-screen flex-col px-fib-1 py-fib-3">
          <RouterLink to="/" aria-label="Pairfy, inicio" class="mb-fib-4 flex h-fib-6 items-center rounded-xl px-fib-3 text-neutral-900 transition hover:bg-white dark:text-neutral-300 dark:hover:bg-white/5">
            <span class="type-title-2">Pairfy</span>
          </RouterLink>

          <p class="type-micro mb-fib-2 px-fib-3 uppercase text-[var(--color-slate-100)]">Tu espacio</p>
          <nav aria-label="Navegación principal" class="flex flex-col gap-fib-2">
            <button
              v-for="item in navItems"
              :key="item.name"
              type="button"
              class="type-label group flex w-full items-center gap-fib-3 rounded-xl px-fib-3 py-fib-3 text-left text-slate-600 transition hover:bg-white dark:text-slate-100 dark:hover:bg-white/5"
            >
              <span class="relative flex h-5 w-5 items-center justify-center">
                <component :is="item.icon" :size="20" :stroke-width="1.8" aria-hidden="true" />
                <span v-if="item.badge" class="type-micro absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-neutral-900 px-fib-1 text-white dark:bg-neutral-200 dark:text-neutral-950">{{ item.badge }}</span>
              </span>
              <span :class="item.active ? 'font-bold' : 'font-normal'">{{ item.name }}</span>
              <span v-if="item.active" class="sr-only">(página actual)</span>
            </button>
          </nav>

          <button type="button" class="type-label mt-fib-4 w-full rounded-xl bg-neutral-900 py-fib-3 text-white shadow-lg shadow-neutral-950/15 transition hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300">
            Publicar
          </button>

          <div class="mt-auto space-y-fib-3 pb-fib-2">
            <div class="rounded-2xl border border-slate-200 bg-[var(--surface-app)] p-fib-3 shadow-sm dark:border-white/10">
              <div class="grid grid-cols-2 gap-fib-2">
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'light'"
                  class="type-caption flex items-center justify-center gap-fib-2 rounded-lg border border-slate-200 px-fib-2 py-fib-2 transition hover:bg-slate-100 aria-pressed:border-neutral-700 aria-pressed:text-neutral-800 dark:border-white/15 dark:hover:bg-white/10 dark:aria-pressed:bg-neutral-700/50 dark:aria-pressed:text-neutral-100"
                  @click="feed.setTheme('light')"
                >
                  <Sun :size="16" :stroke-width="1.8" class="h-4 w-4" aria-hidden="true" />
                  Claro
                </button>
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'dark'"
                  class="type-caption flex items-center justify-center gap-fib-2 rounded-lg border border-slate-200 px-fib-2 py-fib-2 transition hover:bg-slate-100 aria-pressed:border-neutral-700 aria-pressed:text-neutral-800 dark:border-white/15 dark:hover:bg-white/10 dark:aria-pressed:bg-neutral-700/50 dark:aria-pressed:text-neutral-100"
                  @click="feed.setTheme('dark')"
                >
                  <Moon :size="16" :stroke-width="1.8" class="h-4 w-4" aria-hidden="true" />
                  Oscuro
                </button>
              </div>
            </div>

            <button type="button" class="flex w-full items-center gap-fib-3 rounded-xl p-fib-2 text-left transition hover:bg-white dark:hover:bg-white/5">
              <span aria-hidden="true" class="type-caption flex h-fib-5 w-fib-5 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100">MD</span>
              <span class="min-w-0 flex-1">
                <span class="type-label block truncate">Mi perfil demo</span>
                <span class="type-caption block truncate text-slate-500 dark:text-slate-400">@mi_perfil_demo</span>
              </span>
              <Ellipsis :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" />
            </button>
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
              Tu próxima conversación
            </p>
            <h2 class="type-title-2 mt-fib-2">Ideas que nos conectan.</h2>
            <p class="type-body mt-fib-1 text-white/85">Conecta con gente como tú.</p>
            <div class="mt-fib-3 flex flex-wrap gap-fib-2" aria-label="Algunos temas para explorar">
              <span class="type-caption rounded-full border border-white/20 bg-white/10 px-fib-2 py-fib-1">🎬 Cine de culto</span>
              <span class="type-caption rounded-full border border-white/20 bg-white/10 px-fib-2 py-fib-1">🌱 Huertos urbanos</span>
            </div>
            <button type="button" class="type-label mt-fib-3 rounded-lg bg-white px-fib-3 py-fib-1 text-neutral-900 transition hover:bg-neutral-100">Encuentra tu comunidad <span aria-hidden="true">→</span></button>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface-app)] shadow-sm dark:border-white/10">
            <div class="px-fib-4 pb-fib-2 pt-fib-4">
              <h2 class="type-title-2">Temas en auge</h2>
              <p class="type-caption mt-fib-1 text-slate-500 dark:text-slate-400">Lo más comentado ahora</p>
            </div>
            <button v-for="(trend, index) in [
              { category: 'Comunidad · Ejemplo', topic: '#IdeasParaHoy', posts: '1,2 mil publicaciones' },
              { category: 'Tecnología · Ejemplo', topic: 'Diseño accesible', posts: '840 publicaciones' },
              { category: 'Creatividad · Ejemplo', topic: 'Proyectos personales', posts: '620 publicaciones' },
              { category: 'Lecturas · Ejemplo', topic: '#LecturasDeLaSemana', posts: '410 publicaciones' },
            ]" :key="trend.topic" type="button" class="flex w-full items-start gap-fib-3 px-fib-4 py-fib-3 text-left transition hover:bg-neutral-50/70 dark:hover:bg-white/[0.04]">
              <span class="type-title-2 mt-fib-1 w-fib-4" :class="index < 3 ? 'text-neutral-900 dark:text-neutral-300' : 'text-slate-400'">{{ String(index + 1).padStart(2, '0') }}</span>
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
