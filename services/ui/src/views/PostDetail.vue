<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft, Heart, MessageCircleMore, Send } from '@lucide/vue'
import { useFeedStore, type FeedComment } from '../stores/feed'

const route = useRoute()
const feed = useFeedStore()
const replyDraft = ref('')
const post = computed(() => {
  const id = Number(route.params.id)
  return Number.isInteger(id) ? feed.posts.find((item) => item.id === id) : undefined
})

function addComment() {
  const text = replyDraft.value.trim()
  if (!post.value || !text) return

  const comment: FeedComment = {
    id: Date.now(),
    name: 'Mi perfil demo',
    handle: '@mi_perfil_demo',
    avatarInitials: 'MD',
    avatarColor: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100',
    time: 'ahora',
    text,
  }

  post.value.comments.unshift(comment)
  const replies = Number(post.value.replies)
  if (Number.isFinite(replies)) post.value.replies = String(replies + 1)
  replyDraft.value = ''
}
</script>

<template>
  <div class="pb-20">
    <header class="sticky top-0 z-20 flex h-fib-7 items-center gap-fib-3 bg-[#f4f4f5]/85 px-1 backdrop-blur-md dark:bg-[#09090b]/85">
      <RouterLink to="/" aria-label="Volver al feed" class="rounded-full p-2 transition hover:bg-neutral-900/10 dark:hover:bg-white/10">
        <ArrowLeft :size="20" :stroke-width="1.8" aria-hidden="true" />
      </RouterLink>
      <div>
        <p class="type-micro uppercase text-slate-500 dark:text-slate-400">PAIRFY · COMUNIDAD</p>
        <h1 class="type-title-2">Publicación</h1>
      </div>
    </header>

    <template v-if="post">
      <article class="feed-post rounded-2xl border border-slate-200 p-fib-4 shadow-sm dark:border-white/10">
        <div class="flex gap-fib-3">
          <span :aria-label="`Avatar de ${post.name}`" role="img" class="type-label flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full" :class="post.avatarColor">{{ post.avatarInitials }}</span>
          <div class="min-w-0 flex-1">
            <div class="flex min-w-0 flex-wrap items-center gap-fib-1">
              <span class="type-label truncate">{{ post.name }}</span>
              <span class="type-caption truncate text-slate-500 dark:text-slate-400">{{ post.handle }}</span>
              <span class="type-caption shrink-0 text-slate-500 dark:text-slate-400">· {{ post.time }}</span>
            </div>
            <p class="type-body mt-fib-2 whitespace-pre-line">{{ post.text }}</p>
            <div v-if="post.image" class="mt-fib-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
              <img :src="post.image" :alt="post.imageAlt" class="feed-post-image w-full object-cover" />
            </div>
            <div class="type-caption mt-fib-4 flex flex-wrap items-center gap-fib-4 border-b border-slate-200 pb-fib-3 text-slate-500 dark:border-white/10 dark:text-slate-400">
              <span class="inline-flex items-center gap-fib-2">
                <MessageCircleMore :size="21" :stroke-width="1.8" class="h-fib-4 w-fib-4" aria-hidden="true" />
                {{ post.replies }} respuestas
              </span>
              <span class="inline-flex items-center gap-fib-2">
                <Heart :size="21" :stroke-width="1.8" class="h-fib-4 w-fib-4" aria-hidden="true" />
                {{ post.likes }} Me gusta
              </span>
            </div>
          </div>
        </div>
      </article>

      <section aria-label="Responder a la publicación" class="composer-card my-fib-3 rounded-2xl border border-slate-200 p-fib-4 shadow-sm dark:border-white/10">
        <form class="flex items-center gap-fib-3" @submit.prevent="addComment">
          <span aria-label="Avatar de Mi perfil demo" role="img" class="type-caption flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100">MD</span>
          <label class="min-w-0 flex-1">
            <span class="sr-only">Escribe una respuesta</span>
            <input
              v-model="replyDraft"
              type="text"
              placeholder="Escribe tu respuesta"
              class="input-control w-full rounded-xl bg-slate-100 px-fib-3 py-fib-2 outline-none ring-neutral-700/30 transition placeholder:text-slate-500 focus:ring-2 dark:bg-white/[0.06]"
            />
          </label>
          <button type="submit" :disabled="!replyDraft.trim()" aria-label="Publicar respuesta" class="rounded-xl bg-neutral-900 p-fib-2 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300">
            <Send :size="21" :stroke-width="1.8" class="h-fib-4 w-fib-4" aria-hidden="true" />
          </button>
        </form>
      </section>

      <section aria-labelledby="comments-heading" class="overflow-hidden rounded-2xl border border-slate-200 p-fib-4 dark:border-white/10">
        <div class="border-b border-slate-200 pb-fib-3 dark:border-white/10">
          <h2 id="comments-heading" class="type-title-2">Comentarios</h2>
        </div>
        <div v-if="post.comments.length" class="divide-y divide-slate-200 dark:divide-white/10">
          <article v-for="comment in post.comments" :key="comment.id" class="flex gap-fib-3 py-fib-3 last:pb-0">
            <span :aria-label="`Avatar de ${comment.name}`" role="img" class="type-caption flex h-fib-5 w-fib-5 shrink-0 items-center justify-center rounded-full" :class="comment.avatarColor">{{ comment.avatarInitials }}</span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-baseline gap-x-fib-2">
                <span class="type-label">{{ comment.name }}</span>
                <span class="type-caption text-slate-500 dark:text-slate-400">{{ comment.handle }}</span>
                <span class="type-caption text-slate-500 dark:text-slate-400">· {{ comment.time }}</span>
              </div>
              <p class="type-body mt-fib-1 whitespace-pre-line">{{ comment.text }}</p>
            </div>
          </article>
        </div>
        <p v-else class="type-body py-fib-3 text-slate-500 dark:text-slate-400">
          Todavía no hay comentarios. ¡Sé la primera persona en responder!
        </p>
      </section>
    </template>

    <section v-else class="rounded-2xl border border-slate-200 px-fib-4 py-fib-5 text-center dark:border-white/10">
      <h2 class="type-title-2">No encontramos esta publicación</h2>
      <p class="type-body mt-2 text-slate-500 dark:text-slate-400">Puede que se haya eliminado o que el enlace no sea válido.</p>
      <RouterLink to="/" class="type-label mt-fib-3 inline-flex rounded-xl bg-neutral-900 px-fib-4 py-fib-2 text-white dark:bg-neutral-200 dark:text-neutral-950">
        Volver al feed
      </RouterLink>
    </section>
  </div>
</template>
