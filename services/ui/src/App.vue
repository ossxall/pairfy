<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue'
import {
  Bell,
  Bookmark,
  CalendarClock,
  ChartNoAxesColumn,
  Clapperboard,
  Ellipsis,
  Heart,
  House,
  Image,
  List,
  Mail,
  MessageCircleMore,
  Moon,
  Newspaper,
  Repeat2,
  Search,
  Share2,
  Sparkles,
  Sticker,
  Sun,
  UserRound,
  UsersRound,
} from '@lucide/vue'
import { useFeedStore } from './stores/feed'

const feed = useFeedStore()
const navItems: { name: string; icon: Component; active?: boolean; badge?: string }[] = [
  { name: 'Inicio', icon: House, active: true },
  { name: 'Explorar', icon: Search },
  { name: 'Notificaciones', icon: Bell, badge: '3' },
  { name: 'Mensajes', icon: Mail },
  { name: 'Artículos', icon: Newspaper },
  { name: 'Guardados', icon: Bookmark },
  { name: 'Comunidades', icon: UsersRound },
  { name: 'Creadores', icon: Sparkles },
  { name: 'Perfil', icon: UserRound },
  { name: 'Más', icon: Ellipsis },
]
const visiblePosts = computed(() =>
  feed.activeTab === 'following' ? feed.posts.filter((post) => post.following) : feed.posts,
)

function boundedReward(amount: number) {
  return Math.min(Math.max(Math.floor(amount), 0), 1000)
}

function rewardColor(amount: number) {
  const reward = boundedReward(amount)
  if (reward >= 1000) return 'bg-gradient-to-r from-amber-300 to-yellow-400 text-amber-950 ring-amber-300/80 hover:from-amber-200 hover:to-yellow-300 dark:from-amber-300 dark:to-yellow-300'
  if (reward >= 500) return 'bg-gradient-to-r from-violet-300 to-fuchsia-300 text-violet-950 ring-violet-300/80 hover:from-violet-200 hover:to-fuchsia-200 dark:from-violet-300 dark:to-fuchsia-300'
  if (reward >= 250) return 'bg-gradient-to-r from-sky-300 to-cyan-300 text-sky-950 ring-sky-300/80 hover:from-sky-200 hover:to-cyan-200 dark:from-sky-300 dark:to-cyan-300'
  return 'bg-gradient-to-r from-emerald-300 to-green-300 text-emerald-950 ring-emerald-300/80 hover:from-emerald-200 hover:to-green-200 dark:from-emerald-300 dark:to-green-300'
}

onMounted(() => feed.applyTheme())

function sharePost() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
    feed.showToast('Enlace copiado al portapapeles')
  } else {
    feed.showToast('Comparte esta publicación con tus amigos')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f4f5] text-slate-900 transition-colors dark:bg-[#09090b] dark:text-slate-100">
    <div class="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-fib-4 px-fib-3 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,686px)_320px] lg:gap-fib-5">
      <!-- Left navigation -->
      <aside class="hidden md:block">
        <div class="sticky top-0 flex h-screen flex-col px-1 py-fib-3">
          <a href="/" aria-label="Pairfy, inicio" class="mb-fib-4 flex h-fib-6 items-center gap-fib-3 rounded-xl px-fib-3 text-neutral-900 transition hover:bg-white dark:text-neutral-300 dark:hover:bg-white/5">
            <MessageCircleMore :size="30" :stroke-width="1.8" aria-hidden="true" />
            <span class="type-title-2">Pairfy</span>
          </a>

          <p class="type-micro mb-2 px-3 uppercase text-slate-400">Tu espacio</p>
          <nav aria-label="Navegación principal" class="flex flex-col gap-fib-2">
            <button
              v-for="item in navItems"
              :key="item.name"
              type="button"
              class="type-label group flex w-full items-center gap-fib-3 rounded-xl px-fib-3 py-fib-3 text-left transition hover:bg-white dark:hover:bg-white/5"
              :class="item.active ? 'bg-neutral-900 text-white shadow-md shadow-neutral-950/10 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600' : 'text-slate-600 dark:text-slate-300'"
            >
              <span class="relative flex h-5 w-5 items-center justify-center">
                <component :is="item.icon" :size="20" :stroke-width="item.active ? 2.2 : 1.8" aria-hidden="true" />
                <span v-if="item.badge" class="type-micro absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-neutral-900 px-1 text-white dark:bg-neutral-200 dark:text-neutral-950">{{ item.badge }}</span>
              </span>
              <span :class="item.active ? 'font-bold' : 'font-medium'">{{ item.name }}</span>
              <span v-if="item.active" class="sr-only">(página actual)</span>
            </button>
          </nav>

          <button type="button" class="type-label mt-fib-4 w-full rounded-xl bg-neutral-900 py-fib-3 text-white shadow-lg shadow-neutral-950/15 transition hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300">
            Publicar
          </button>

          <div class="mt-auto space-y-fib-3 pb-fib-2">
            <div class="rounded-2xl border border-slate-200 bg-white p-fib-3 shadow-sm dark:border-white/10 dark:bg-[#18181b]">
              <p class="type-label">Apariencia</p>
              <p class="type-caption mt-1 text-slate-500 dark:text-slate-400">Personaliza tu experiencia</p>
              <div class="mt-fib-3 grid grid-cols-2 gap-fib-2">
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
      <main class="min-h-screen min-w-0 w-full pb-20">
        <header class="sticky top-0 z-20 bg-[#f4f4f5]/70 backdrop-blur-md dark:bg-[#09090b]/70">
          <div class="flex h-fib-7 items-center justify-between px-1">
            <div>
              <p class="type-micro uppercase text-neutral-900 dark:text-neutral-300">PAIRFY · COMUNIDAD</p>
              <h1 class="type-title-1 mt-0.5">Tu inicio</h1>
            </div>
            <button type="button" aria-label="Destacados" class="rounded-xl p-2.5 text-neutral-900 transition hover:bg-white dark:text-neutral-300 dark:hover:bg-white/5">
              <Sparkles :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="mb-fib-3 grid grid-cols-2 gap-fib-1 rounded-xl bg-slate-200/70 p-fib-1 dark:bg-white/[0.06]">
            <button
              type="button"
              class="type-label rounded-lg py-fib-2 text-slate-500 transition dark:text-slate-400"
              :class="{ '!bg-white !text-neutral-800 shadow-sm dark:!bg-[#27272a] dark:!text-neutral-200': feed.activeTab === 'for-you' }"
              @click="feed.activeTab = 'for-you'"
            >
              Para ti
            </button>
            <button
              type="button"
              class="type-label rounded-lg py-fib-2 text-slate-500 transition dark:text-slate-400"
              :class="{ '!bg-white !text-neutral-800 shadow-sm dark:!bg-[#27272a] dark:!text-neutral-200': feed.activeTab === 'following' }"
              @click="feed.activeTab = 'following'"
            >
              Siguiendo
            </button>
          </div>
        </header>

        <section aria-label="Crear publicación" class="composer-card mb-fib-4 rounded-2xl border border-slate-200 p-fib-4 shadow-sm dark:border-white/10">
          <div class="flex gap-fib-3">
            <span aria-label="Avatar de Mi perfil demo" role="img" class="type-label flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100">MD</span>
            <div class="min-w-0 flex-1">
              <p class="type-label mb-2 text-slate-700 dark:text-slate-200">Comparte con tu comunidad</p>
              <textarea
                v-model="feed.draft"
                aria-label="Comparte algo con tu comunidad"
                placeholder="¿Qué te gustaría compartir?"
                rows="2"
                class="composer-input w-full resize-none rounded-xl bg-slate-100 px-fib-3 py-fib-3 outline-none ring-neutral-700/30 transition placeholder:text-slate-500 focus:ring-2 dark:bg-white/[0.06] dark:placeholder:text-slate-500"
              ></textarea>
              <div class="mt-fib-3 flex items-center justify-between">
                <div class="flex items-center gap-1 text-neutral-900 dark:text-neutral-300">
                  <button type="button" aria-label="Añadir foto" class="rounded-lg p-2 transition hover:bg-neutral-700/10"><Image :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir GIF" class="rounded-lg p-2 transition hover:bg-neutral-700/10"><Clapperboard :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir encuesta" class="rounded-lg p-2 transition hover:bg-neutral-700/10"><List :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir emoji" class="rounded-lg p-2 transition hover:bg-neutral-700/10"><Sticker :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Programar publicación" class="rounded-lg p-2 transition hover:bg-neutral-700/10"><CalendarClock :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                </div>
                <button
                  type="button"
                  :disabled="!feed.draft.trim()"
                  class="type-label rounded-xl bg-neutral-900 px-fib-4 py-fib-2 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300"
                  @click="feed.createPost()"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </section>

        <div v-if="feed.posts.length" class="flex flex-col gap-fib-4 pb-20">
          <article v-for="post in visiblePosts" :key="post.id" class="feed-post group rounded-2xl border border-slate-200 p-fib-4 shadow-sm transition hover:shadow-md dark:border-white/10">
            <div class="flex gap-fib-3">
              <span :aria-label="`Avatar de ${post.name}`" role="img" class="type-label flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full" :class="post.avatarColor">{{ post.avatarInitials }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1 overflow-hidden">
                  <span class="type-label truncate hover:underline">{{ post.name }}</span>
                  <span class="type-caption truncate text-slate-500 dark:text-slate-500">{{ post.handle }}</span>
                  <span class="type-caption shrink-0 text-slate-500 dark:text-slate-500">· {{ post.time }}</span>
                  <button type="button" :aria-label="`Más opciones de ${post.name}`" class="ml-auto -mr-2 shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-neutral-900/10 hover:text-neutral-900">
                    <Ellipsis :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                </div>
                <p class="type-body mt-0.5 whitespace-pre-line">{{ post.text }}</p>
                <div v-if="post.image" class="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                  <img :src="post.image" :alt="post.imageAlt" class="feed-post-image w-full object-cover" />
                </div>
                <div class="type-caption tabular-nums -ml-2 mt-3 flex max-w-[430px] flex-wrap items-center justify-between gap-y-1 text-slate-500 dark:text-slate-500">
                  <button type="button" :aria-label="`${post.replies} respuestas`" class="group/action flex items-center gap-1.5 transition hover:text-neutral-900">
                    <span class="rounded-full p-2 transition group-hover/action:bg-neutral-900/10"><MessageCircleMore :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <span>{{ post.replies }}</span>
                  </button>
                  <button type="button" :aria-label="`${post.reposts} reposts`" class="group/action flex items-center gap-1.5 transition hover:text-neutral-700 dark:hover:text-neutral-200" @click="feed.toggleRepost(post.id)">
                    <span class="rounded-full p-2 transition group-hover/action:bg-neutral-500/10"><Repeat2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <span>{{ post.reposts }}</span>
                  </button>
                  <button type="button" :aria-label="`${post.likes} Me gusta`" class="group/action flex items-center gap-1.5 transition" :class="post.liked ? 'text-neutral-950 dark:text-white' : 'hover:text-neutral-900 dark:hover:text-white'" @click="feed.toggleLike(post.id)">
                    <span class="rounded-full p-2 transition group-hover/action:bg-neutral-500/10"><Heart :size="18" :stroke-width="1.8" :fill="post.liked ? 'currentColor' : 'none'" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <span>{{ post.likes }}</span>
                  </button>
                  <button type="button" aria-label="Ver estadísticas" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900"><ChartNoAxesColumn :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                  <div class="flex items-center gap-1">
                    <button type="button" aria-label="Guardar publicación" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900" :class="{ 'text-neutral-900': post.bookmarked }" @click="feed.toggleBookmark(post.id)"><Bookmark :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                    <button type="button" aria-label="Compartir publicación" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900" @click="sharePost"><Share2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                    <button
                      type="button"
                      :aria-label="`Redeem ${boundedReward(post.adaReward)} ADA de la publicación de ${post.name}`"
                      class="type-micro inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 font-semibold shadow-sm ring-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                      :class="rewardColor(post.adaReward)"
                      @click="feed.showToast(`Canje de ${boundedReward(post.adaReward)} ADA seleccionado`)"
                    >
                      <Sparkles :size="12" :stroke-width="2.2" aria-hidden="true" />
                      Redeem {{ boundedReward(post.adaReward) }} ADA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <button type="button" class="type-label w-full py-5 text-neutral-900 transition hover:bg-slate-50 dark:text-neutral-100 dark:hover:bg-white/[0.025]">Mostrar más publicaciones</button>
        </div>
        <div v-else class="px-8 py-16 text-center">
          <h2 class="type-title-1">Tu timeline está empezando</h2>
          <p class="type-body mt-2 text-slate-500 dark:text-slate-400">Sigue algunas cuentas para ver sus publicaciones aquí.</p>
          <button type="button" class="type-label mt-5 rounded-xl bg-neutral-900 px-5 py-2.5 text-white dark:bg-neutral-200 dark:text-neutral-950" @click="feed.activeTab = 'for-you'">Explorar publicaciones</button>
        </div>
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
              <p class="type-caption mt-1 text-slate-500 dark:text-slate-400">Lo más comentado ahora</p>
            </div>
            <button v-for="(trend, index) in [
              { category: 'Comunidad · Ejemplo', topic: '#IdeasParaHoy', posts: '1,2 mil publicaciones' },
              { category: 'Tecnología · Ejemplo', topic: 'Diseño accesible', posts: '840 publicaciones' },
              { category: 'Creatividad · Ejemplo', topic: 'Proyectos personales', posts: '620 publicaciones' },
              { category: 'Lecturas · Ejemplo', topic: '#LecturasDeLaSemana', posts: '410 publicaciones' },
            ]" :key="trend.topic" type="button" class="flex w-full items-start gap-fib-3 px-fib-4 py-fib-3 text-left transition hover:bg-neutral-50/70 dark:hover:bg-white/[0.04]">
              <span class="type-title-2 mt-0.5 w-5" :class="index < 3 ? 'text-neutral-900 dark:text-neutral-300' : 'text-slate-400'">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="min-w-0 flex-1">
                <span class="type-micro block uppercase text-slate-500 dark:text-slate-400">{{ trend.category }}</span>
                <span class="type-label mt-1 block">{{ trend.topic }}</span>
                <span class="type-caption mt-1 block text-slate-500 dark:text-slate-500">{{ trend.posts }}</span>
              </span>
              <Ellipsis :size="17" :stroke-width="1.8" class="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
            </button>
            <button type="button" class="type-label w-full border-t border-slate-100 px-fib-4 py-fib-3 text-left text-neutral-800 transition hover:bg-neutral-50 dark:border-white/5 dark:text-neutral-300 dark:hover:bg-white/[0.04]">Ver todos los temas</button>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface-app)] shadow-sm dark:border-white/10">
            <h2 class="type-title-2 px-4 pb-2 pt-4">Comunidades para ti</h2>
            <div v-for="person in [
              { name: 'Club de lectura', handle: '1,8 mil miembros', initials: 'L', color: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200' },
              { name: 'Diseño cotidiano', handle: '960 miembros', initials: 'D', color: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200' },
              { name: 'Rutas y escapadas', handle: '2,4 mil miembros', initials: 'R', color: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200' },
            ]" :key="person.handle" class="flex items-center gap-fib-2 px-fib-4 py-fib-3 transition hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <span aria-hidden="true" class="type-label flex h-10 w-10 items-center justify-center rounded-full" :class="person.color">{{ person.initials }}</span>
              <span class="min-w-0 flex-1">
                <span class="type-label block truncate">{{ person.name }}</span>
                <span class="type-caption block truncate text-slate-500 dark:text-slate-400">{{ person.handle }}</span>
              </span>
              <button type="button" aria-label="Unirse a la comunidad" class="type-caption rounded-lg border border-neutral-200 px-3 py-1.5 text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-600/25 dark:text-neutral-300 dark:hover:bg-neutral-700/10">Unirme</button>
            </div>
            <button type="button" class="type-label w-full border-t border-slate-100 px-fib-4 py-fib-3 text-left text-neutral-800 transition hover:bg-neutral-50 dark:border-white/5 dark:text-neutral-300 dark:hover:bg-white/[0.04]">Explorar comunidades</button>
          </section>

          <footer class="type-caption flex flex-wrap gap-x-3 gap-y-1 px-4 pb-4 text-slate-500 dark:text-slate-500">
            <a href="#" class="hover:underline">Términos de Servicio</a><a href="#" class="hover:underline">Política de Privacidad</a>
            <a href="#" class="hover:underline">Política de cookies</a><a href="#" class="hover:underline">Accesibilidad</a>
            <a href="#" class="hover:underline">Información de anuncios</a><a href="#" class="hover:underline">Más opciones ···</a>
            <span>© 2025 Pairfy</span>
          </footer>
        </div>
      </aside>
    </div>

    <nav aria-label="Navegación móvil" class="fixed inset-x-0 bottom-0 z-30 flex h-[calc(89px+env(safe-area-inset-bottom))] items-center justify-around border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#18181b]/95 md:hidden">
      <a href="/" aria-current="page" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><House :size="20" :stroke-width="2" class="h-5 w-5" aria-hidden="true" /><span>Inicio</span></a>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Search :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Buscar</span></button>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Bell :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Novedades</span></button>
      <button type="button" class="mobile-nav-item type-micro flex min-w-[55px] flex-col items-center gap-fib-1 rounded-xl px-fib-2 py-fib-1"><Mail :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" /><span>Mensajes</span></button>
    </nav>

    <div v-if="feed.toast" role="status" class="type-label fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-5 py-3 text-white shadow-lg md:bottom-6">
      {{ feed.toast }}
    </div>
  </div>
</template>
