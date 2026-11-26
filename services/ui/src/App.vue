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
  <div class="min-h-screen bg-[#f4f3f8] text-slate-900 transition-colors dark:bg-[#111018] dark:text-slate-100">
    <div class="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-6 px-4 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,720px)_320px] lg:gap-8">
      <!-- Left navigation -->
      <aside class="hidden md:block">
        <div class="sticky top-0 flex h-screen flex-col px-1 py-4">
          <a href="/" aria-label="Pairfy, inicio" class="mb-5 flex h-[58px] items-center gap-3 rounded-xl px-3 text-violet-600 transition hover:bg-white dark:text-violet-300 dark:hover:bg-white/5">
            <MessageCircleMore :size="30" :stroke-width="1.8" aria-hidden="true" />
            <span class="text-xl font-extrabold tracking-tight">Pairfy</span>
          </a>

          <p class="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Tu espacio</p>
          <nav aria-label="Navegación principal" class="space-y-1">
            <button
              v-for="item in navItems"
              :key="item.name"
              type="button"
              class="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] transition hover:bg-white dark:hover:bg-white/5"
              :class="item.active ? 'bg-violet-600 text-white shadow-md shadow-violet-900/10 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400' : 'text-slate-600 dark:text-slate-300'"
            >
              <span class="relative flex h-5 w-5 items-center justify-center">
                <component :is="item.icon" :size="20" :stroke-width="item.active ? 2.2 : 1.8" aria-hidden="true" />
                <span v-if="item.badge" class="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">{{ item.badge }}</span>
              </span>
              <span :class="item.active ? 'font-bold' : 'font-medium'">{{ item.name }}</span>
              <span v-if="item.active" class="sr-only">(página actual)</span>
            </button>
          </nav>

          <button type="button" class="mt-4 w-full rounded-xl bg-violet-600 py-3 text-[15px] font-bold text-white shadow-lg shadow-violet-900/15 transition hover:bg-violet-700">
            Publicar
          </button>

          <div class="mt-auto space-y-3 pb-3">
            <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#1b1924]">
              <p class="text-sm font-bold">Apariencia</p>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Personaliza tu experiencia</p>
              <div class="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'light'"
                  class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold transition hover:bg-slate-100 aria-pressed:border-violet-500 aria-pressed:text-violet-700 dark:border-white/15 dark:hover:bg-white/10 dark:aria-pressed:bg-violet-500/10 dark:aria-pressed:text-violet-300"
                  @click="feed.setTheme('light')"
                >
                  <Sun :size="16" :stroke-width="1.8" class="h-4 w-4" aria-hidden="true" />
                  Claro
                </button>
                <button
                  type="button"
                  :aria-pressed="feed.theme === 'dark'"
                  class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold transition hover:bg-slate-100 aria-pressed:border-violet-500 aria-pressed:text-violet-700 dark:border-white/15 dark:hover:bg-white/10 dark:aria-pressed:bg-violet-500/10 dark:aria-pressed:text-violet-300"
                  @click="feed.setTheme('dark')"
                >
                  <Moon :size="16" :stroke-width="1.8" class="h-4 w-4" aria-hidden="true" />
                  Oscuro
                </button>
              </div>
            </div>

            <button type="button" class="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white dark:hover:bg-white/5">
              <span aria-hidden="true" class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-700 dark:text-violet-300">MD</span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-bold">Mi perfil demo</span>
                <span class="block truncate text-xs text-slate-500 dark:text-slate-400">@mi_perfil_demo</span>
              </span>
              <Ellipsis :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      <!-- Feed -->
      <main class="min-h-screen min-w-0 w-full pb-20">
        <header class="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f4f3f8]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#111018]/90">
          <div class="flex h-[72px] items-center justify-between px-1">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">PAIRFY · COMUNIDAD</p>
              <h1 class="mt-0.5 text-2xl font-extrabold tracking-tight">Tu inicio</h1>
            </div>
            <button type="button" aria-label="Destacados" class="rounded-xl p-2.5 text-violet-600 transition hover:bg-white dark:text-violet-300 dark:hover:bg-white/5">
              <Sparkles :size="20" :stroke-width="1.8" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1 dark:bg-white/[0.06]">
            <button
              type="button"
              class="rounded-lg py-2.5 text-sm font-semibold text-slate-500 transition dark:text-slate-400"
              :class="{ '!bg-white !text-violet-700 shadow-sm dark:!bg-[#262330] dark:!text-violet-200': feed.activeTab === 'for-you' }"
              @click="feed.activeTab = 'for-you'"
            >
              Para ti
            </button>
            <button
              type="button"
              class="rounded-lg py-2.5 text-sm font-semibold text-slate-500 transition dark:text-slate-400"
              :class="{ '!bg-white !text-violet-700 shadow-sm dark:!bg-[#262330] dark:!text-violet-200': feed.activeTab === 'following' }"
              @click="feed.activeTab = 'following'"
            >
              Siguiendo
            </button>
          </div>
        </header>

        <section aria-label="Crear publicación" class="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1b1924]">
          <div class="flex gap-3">
            <span aria-hidden="true" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-bold text-violet-700 dark:text-violet-300">MD</span>
            <div class="min-w-0 flex-1">
              <p class="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Comparte con tu comunidad</p>
              <textarea
                v-model="feed.draft"
                aria-label="Comparte algo con tu comunidad"
                placeholder="¿Qué te gustaría compartir?"
                rows="2"
                class="w-full resize-none rounded-xl bg-slate-100 px-3 py-3 text-[15px] outline-none ring-violet-500/30 transition placeholder:text-slate-500 focus:ring-2 dark:bg-white/[0.06] dark:placeholder:text-slate-500"
              ></textarea>
              <div class="mt-3 flex items-center justify-between">
                <div class="flex items-center gap-1 text-violet-600 dark:text-violet-300">
                  <button type="button" aria-label="Añadir foto" class="rounded-lg p-2 transition hover:bg-violet-500/10"><Image :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir GIF" class="rounded-lg p-2 transition hover:bg-violet-500/10"><Clapperboard :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir encuesta" class="rounded-lg p-2 transition hover:bg-violet-500/10"><List :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Añadir emoji" class="rounded-lg p-2 transition hover:bg-violet-500/10"><Sticker :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Programar publicación" class="rounded-lg p-2 transition hover:bg-violet-500/10"><CalendarClock :size="19" :stroke-width="1.8" class="h-[19px] w-[19px]" aria-hidden="true" /></button>
                </div>
                <button
                  type="button"
                  :disabled="!feed.draft.trim()"
                  class="rounded-xl bg-violet-600 px-4 py-[9px] text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                  @click="feed.createPost()"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </section>

        <div v-if="feed.posts.length" class="space-y-4 pb-20">
          <article v-for="post in visiblePosts" :key="post.id" class="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#1b1924] dark:hover:bg-[#201e2a]">
            <div class="mb-3 flex items-center gap-2">
              <span class="rounded-md bg-violet-500/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">Comunidad · {{ post.community }}</span>
            </div>
            <div class="flex gap-3">
            <span :aria-label="`Avatar de ${post.name}`" role="img" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold" :class="post.avatarColor">{{ post.avatarInitials }}</span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1 overflow-hidden text-[15px]">
                <span class="truncate font-bold hover:underline">{{ post.name }}</span>
                <span class="truncate text-slate-500 dark:text-slate-500">{{ post.handle }}</span>
                <span class="shrink-0 text-slate-500 dark:text-slate-500">· {{ post.time }}</span>
                <button type="button" :aria-label="`Más opciones de ${post.name}`" class="ml-auto -mr-2 shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-violet-600/10 hover:text-violet-600">
                  <Ellipsis :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </div>
              <p class="mt-0.5 whitespace-pre-line text-[15px] leading-[1.55]">{{ post.text }}</p>
              <div v-if="post.image" class="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                <img :src="post.image" :alt="post.imageAlt" class="max-h-[420px] w-full object-cover" />
              </div>
              <div class="-ml-2 mt-3 flex max-w-[430px] items-center justify-between text-[13px] text-slate-500 dark:text-slate-500">
                <button type="button" :aria-label="`${post.replies} respuestas`" class="group/action flex items-center gap-1.5 transition hover:text-violet-600">
                  <span class="rounded-full p-2 transition group-hover/action:bg-violet-600/10"><MessageCircleMore :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <span>{{ post.replies }}</span>
                </button>
                <button type="button" :aria-label="`${post.reposts} reposts`" class="group/action flex items-center gap-1.5 transition hover:text-emerald-500" @click="feed.toggleRepost(post.id)">
                  <span class="rounded-full p-2 transition group-hover/action:bg-emerald-500/10"><Repeat2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <span>{{ post.reposts }}</span>
                </button>
                <button type="button" :aria-label="`${post.likes} Me gusta`" class="group/action flex items-center gap-1.5 transition" :class="post.liked ? 'text-pink-500' : 'hover:text-pink-500'" @click="feed.toggleLike(post.id)">
                  <span class="rounded-full p-2 transition group-hover/action:bg-pink-500/10"><Heart :size="18" :stroke-width="1.8" :fill="post.liked ? 'currentColor' : 'none'" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <span>{{ post.likes }}</span>
                </button>
                <button type="button" aria-label="Ver estadísticas" class="group/action rounded-full p-2 transition hover:bg-violet-600/10 hover:text-violet-600"><ChartNoAxesColumn :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                <div class="flex items-center">
                  <button type="button" aria-label="Guardar publicación" class="group/action rounded-full p-2 transition hover:bg-violet-600/10 hover:text-violet-600" :class="{ 'text-violet-600': post.bookmarked }" @click="feed.toggleBookmark(post.id)"><Bookmark :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                  <button type="button" aria-label="Compartir publicación" class="group/action rounded-full p-2 transition hover:bg-violet-600/10 hover:text-violet-600" @click="sharePost"><Share2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
                </div>
              </div>
            </div>
            </div>
          </article>
          <button type="button" class="w-full py-5 text-sm text-violet-600 transition hover:bg-slate-50 dark:hover:bg-white/[0.025]">Mostrar más publicaciones</button>
        </div>
        <div v-else class="px-8 py-16 text-center">
          <h2 class="text-2xl font-bold">Tu timeline está empezando</h2>
          <p class="mt-2 text-slate-500 dark:text-slate-400">Sigue algunas cuentas para ver sus publicaciones aquí.</p>
          <button type="button" class="mt-5 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold text-white" @click="feed.activeTab = 'for-you'">Explorar publicaciones</button>
        </div>
      </main>

      <!-- Right sidebar -->
      <aside class="hidden min-w-0 lg:block">
        <div class="sticky top-0 space-y-4 py-4">
          <label class="relative block">
            <Search :size="18" :stroke-width="1.8" class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input type="search" placeholder="Buscar temas o comunidades" class="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm outline-none transition placeholder:text-slate-500 focus:border-violet-400 dark:border-white/10 dark:bg-[#1b1924] dark:focus:border-violet-400" />
          </label>

          <section class="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white shadow-lg shadow-violet-900/10">
              <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">Encuentra tu gente</p>
              <h2 class="mt-2 text-xl font-extrabold">Descubre nuevas comunidades</h2>
              <p class="mt-2 text-sm leading-5 text-white/85">Ideas, aficiones y conversaciones para compartir.</p>
              <button type="button" class="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50">Explorar temas</button>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1b1924]">
            <div class="px-4 pb-2 pt-4">
              <h2 class="text-lg font-extrabold">Temas en auge</h2>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Lo más comentado ahora</p>
            </div>
            <button v-for="(trend, index) in [
              { category: 'Comunidad · Ejemplo', topic: '#IdeasParaHoy', posts: '1,2 mil publicaciones' },
              { category: 'Tecnología · Ejemplo', topic: 'Diseño accesible', posts: '840 publicaciones' },
              { category: 'Creatividad · Ejemplo', topic: 'Proyectos personales', posts: '620 publicaciones' },
              { category: 'Lecturas · Ejemplo', topic: '#LecturasDeLaSemana', posts: '410 publicaciones' },
            ]" :key="trend.topic" type="button" class="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-violet-50/70 dark:hover:bg-white/[0.04]">
              <span class="mt-0.5 w-5 text-lg font-extrabold leading-none" :class="index < 3 ? 'text-violet-600 dark:text-violet-300' : 'text-slate-400'">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ trend.category }}</span>
                <span class="mt-1 block text-sm font-bold">{{ trend.topic }}</span>
                <span class="mt-1 block text-xs text-slate-500 dark:text-slate-500">{{ trend.posts }}</span>
              </span>
              <Ellipsis :size="17" :stroke-width="1.8" class="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
            </button>
            <button type="button" class="w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-white/5 dark:text-violet-300 dark:hover:bg-white/[0.04]">Ver todos los temas</button>
          </section>

          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1b1924]">
            <h2 class="px-4 pb-2 pt-4 text-lg font-extrabold">Comunidades para ti</h2>
            <div v-for="person in [
              { name: 'Club de lectura', handle: '1,8 mil miembros', initials: 'L', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
              { name: 'Diseño cotidiano', handle: '960 miembros', initials: 'D', color: 'bg-orange-500/15 text-orange-700 dark:text-orange-300' },
              { name: 'Rutas y escapadas', handle: '2,4 mil miembros', initials: 'R', color: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300' },
            ]" :key="person.handle" class="flex items-center gap-2 px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <span aria-hidden="true" class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" :class="person.color">{{ person.initials }}</span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-bold">{{ person.name }}</span>
                <span class="block truncate text-xs text-slate-500 dark:text-slate-400">{{ person.handle }}</span>
              </span>
              <button type="button" aria-label="Unirse a la comunidad" class="rounded-lg border border-violet-200 px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-50 dark:border-violet-400/25 dark:text-violet-300 dark:hover:bg-violet-500/10">Unirme</button>
            </div>
            <button type="button" class="w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-white/5 dark:text-violet-300 dark:hover:bg-white/[0.04]">Explorar comunidades</button>
          </section>

          <footer class="flex flex-wrap gap-x-3 gap-y-1 px-4 pb-4 text-xs leading-4 text-slate-500 dark:text-slate-500">
            <a href="#" class="hover:underline">Términos de Servicio</a><a href="#" class="hover:underline">Política de Privacidad</a>
            <a href="#" class="hover:underline">Política de cookies</a><a href="#" class="hover:underline">Accesibilidad</a>
            <a href="#" class="hover:underline">Información de anuncios</a><a href="#" class="hover:underline">Más opciones ···</a>
            <span>© 2025 Pairfy</span>
          </footer>
        </div>
      </aside>
    </div>

    <nav aria-label="Navegación móvil" class="fixed inset-x-0 bottom-0 z-30 flex h-[60px] items-center justify-around border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(17,16,24,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1b1924]/95 md:hidden">
      <a href="/" aria-label="Inicio" class="rounded-full p-2"><House :size="24" :stroke-width="1.8" class="h-6 w-6" aria-hidden="true" /></a>
      <button type="button" aria-label="Buscar" class="rounded-full p-2"><Search :size="24" :stroke-width="1.8" class="h-6 w-6" aria-hidden="true" /></button>
      <button type="button" aria-label="Notificaciones" class="rounded-full p-2"><Bell :size="24" :stroke-width="1.8" class="h-6 w-6" aria-hidden="true" /></button>
      <button type="button" aria-label="Mensajes" class="rounded-full p-2"><Mail :size="24" :stroke-width="1.8" class="h-6 w-6" aria-hidden="true" /></button>
    </nav>

    <div v-if="feed.toast" role="status" class="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg md:bottom-6">
      {{ feed.toast }}
    </div>
  </div>
</template>
