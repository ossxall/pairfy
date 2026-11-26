<script setup lang="ts">
import { computed } from 'vue'
import {
  Bookmark,
  CalendarClock,
  ChartNoAxesColumn,
  Clapperboard,
  Ellipsis,
  Heart,
  Image,
  List,
  MessageCircleMore,
  Repeat2,
  Share2,
  Sparkles,
  Sticker,
} from '@lucide/vue'
import { RouterLink, useRouter } from 'vue-router'
import { useFeedStore } from '../stores/feed'

const feed = useFeedStore()
const router = useRouter()
const visiblePosts = computed(() =>
  feed.activeTab === 'following' ? feed.posts.filter((post) => post.following) : feed.posts,
)

function openPost(id: number) {
  router.push(`/post/${id}`)
}

function boundedReward(amount: number) {
  return Math.min(Math.max(Math.floor(amount), 0), 1000)
}

function boundedEarned(amount: number) {
  return (Number.isFinite(amount) ? Math.min(Math.max(amount, 0), 100) : 0).toFixed(1)
}

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
    <article
      v-for="post in visiblePosts"
      :key="post.id"
      tabindex="0"
      :aria-label="`Abrir publicación de ${post.name}`"
      class="feed-post group cursor-pointer rounded-2xl border border-slate-200 p-fib-4 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-white/10"
      @click="openPost(post.id)"
      @keydown.enter.self="openPost(post.id)"
      @keydown.space.self.prevent="openPost(post.id)"
    >
      <div class="flex gap-fib-3">
        <span :aria-label="`Avatar de ${post.name}`" role="img" class="type-label flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full" :class="post.avatarColor">{{ post.avatarInitials }}</span>
        <div class="min-w-0 flex-1">
          <div class="flex min-w-0 flex-wrap items-center gap-1">
            <span class="type-label truncate hover:underline">{{ post.name }}</span>
            <span class="type-caption truncate text-slate-500 dark:text-slate-500">{{ post.handle }}</span>
            <span class="type-caption shrink-0 text-slate-500 dark:text-slate-500">· {{ post.time }}</span>
            <button
              type="button"
              :aria-label="`Earned ${boundedEarned(post.earnedAda)} ADA`"
              class="type-micro ml-fib-1 inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-emerald-100 px-fib-1 py-0.5 text-[10px] leading-3 font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-300 transition hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800 dark:hover:bg-emerald-900"
              @click.stop="feed.showToast(`Earned ${boundedEarned(post.earnedAda)} ADA`)"
            >
              Earned {{ boundedEarned(post.earnedAda) }} ADA
            </button>
            <button type="button" :aria-label="`Más opciones de ${post.name}`" class="ml-auto -mr-2 shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-neutral-900/10 hover:text-neutral-900" @click.stop>
              <Ellipsis :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
          <p class="type-body mt-0.5 whitespace-pre-line">{{ post.text }}</p>
          <div v-if="post.image" class="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            <img :src="post.image" :alt="post.imageAlt" class="feed-post-image w-full object-cover" />
          </div>
          <div class="type-caption tabular-nums -ml-2 mt-3 flex w-full max-w-[430px] flex-wrap items-center gap-x-1 gap-y-1 text-slate-500 dark:text-slate-500" @click.stop>
            <RouterLink :to="`/post/${post.id}`" :aria-label="`${post.replies} respuestas`" class="group/action flex items-center gap-1.5 transition hover:text-neutral-900" @click.stop>
              <span class="rounded-full p-2 transition group-hover/action:bg-neutral-900/10"><MessageCircleMore :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
              <span>{{ post.replies }}</span>
            </RouterLink>
            <button type="button" :aria-label="`${post.reposts} reposts`" class="group/action flex items-center gap-1.5 transition hover:text-neutral-700 dark:hover:text-neutral-200" @click="feed.toggleRepost(post.id)">
              <span class="rounded-full p-2 transition group-hover/action:bg-neutral-500/10"><Repeat2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
              <span>{{ post.reposts }}</span>
            </button>
            <button type="button" :aria-label="`${post.likes} Me gusta`" class="group/action flex items-center gap-1.5 transition" :class="post.liked ? 'text-neutral-950 dark:text-white' : 'hover:text-neutral-900 dark:hover:text-white'" @click="feed.toggleLike(post.id)">
              <span class="rounded-full p-2 transition group-hover/action:bg-neutral-500/10"><Heart :size="18" :stroke-width="1.8" :fill="post.liked ? 'currentColor' : 'none'" class="h-[18px] w-[18px]" aria-hidden="true" /></span>
              <span>{{ post.likes }}</span>
            </button>
            <button type="button" aria-label="Ver estadísticas" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900"><ChartNoAxesColumn :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
            <div class="ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-1">
              <button type="button" aria-label="Guardar publicación" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900" :class="{ 'text-neutral-900': post.bookmarked }" @click="feed.toggleBookmark(post.id)"><Bookmark :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
              <button type="button" aria-label="Compartir publicación" class="group/action rounded-full p-2 transition hover:bg-neutral-900/10 hover:text-neutral-900" @click="sharePost"><Share2 :size="18" :stroke-width="1.8" class="h-[18px] w-[18px]" aria-hidden="true" /></button>
              <button
                type="button"
                :aria-label="`Redeem ${boundedReward(post.adaReward)} ADA de la publicación de ${post.name}`"
                class="type-micro inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-300 px-2 py-1 font-semibold text-amber-950 shadow-sm ring-1 ring-amber-400/80 transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:bg-amber-300 dark:hover:bg-amber-200"
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
  </div>
  <div v-else class="px-8 py-16 text-center">
    <h2 class="type-title-1">Tu timeline está empezando</h2>
    <p class="type-body mt-2 text-slate-500 dark:text-slate-400">Sigue algunas cuentas para ver sus publicaciones aquí.</p>
    <button type="button" class="type-label mt-5 rounded-xl bg-neutral-900 px-5 py-2.5 text-white dark:bg-neutral-200 dark:text-neutral-950" @click="feed.activeTab = 'for-you'">Explorar publicaciones</button>
  </div>
</template>
