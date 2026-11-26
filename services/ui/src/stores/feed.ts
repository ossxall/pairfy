import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'
export type FeedTab = 'for-you' | 'following'

export interface FeedComment {
  id: number
  name: string
  handle: string
  avatarInitials: string
  avatarColor: string
  time: string
  text: string
}

export interface FeedPost {
  id: number
  name: string
  handle: string
  avatarInitials: string
  avatarColor: string
  community: string
  time: string
  text: string
  adaReward: number
  following: boolean
  replies: string
  reposts: number
  likes: number
  liked: boolean
  bookmarked: boolean
  comments: FeedComment[]
  image?: string
  imageAlt?: string
}

const initialPosts: FeedPost[] = [
  {
    id: 1,
    name: 'Lucía Martín',
    handle: '@lucia.martin',
    avatarInitials: 'LM',
    avatarColor: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
    community: 'diseño',
    time: '12 min',
    text: 'Un buen diseño no pide atención: hace que todo resulte más fácil. ✨',
    adaReward: 1,
    following: true,
    replies: '24',
    reposts: 18,
    likes: 246,
    liked: false,
    bookmarked: false,
    comments: [
      {
        id: 101,
        name: 'Diego Salas',
        handle: '@diegosalas',
        avatarInitials: 'DS',
        avatarColor: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200',
        time: 'hace 8 min',
        text: 'Totalmente. Cuando una interfaz se entiende sin explicaciones, el diseño está haciendo su trabajo.',
      },
      {
        id: 102,
        name: 'Marina Costa',
        handle: '@marinacosta',
        avatarInitials: 'MC',
        avatarColor: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
        time: 'hace 5 min',
        text: 'Y se nota muchísimo cuando detrás hubo cuidado por los pequeños detalles.',
      },
    ],
  },
  {
    id: 2,
    name: 'Nora Vega',
    handle: '@noravega',
    avatarInitials: 'NV',
    avatarColor: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
    community: 'bienestar',
    time: '38 min',
    text: 'Un recordatorio para hoy: descansar también forma parte del camino. 🌿',
    adaReward: 250,
    following: true,
    replies: '12',
    reposts: 31,
    likes: 582,
    liked: true,
    bookmarked: false,
    image: 'https://images.unsplash.com/photo-1785637495266-c9608353f63a?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Amanecer dorado entre montañas y nubes',
    comments: [
      {
        id: 201,
        name: 'Clara Núñez',
        handle: '@claranunez',
        avatarInitials: 'CN',
        avatarColor: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
        time: 'hace 24 min',
        text: 'Justo necesitaba leer esto. Gracias por recordarlo 🌿',
      },
      {
        id: 202,
        name: 'Pablo Gil',
        handle: '@pablogil',
        avatarInitials: 'PG',
        avatarColor: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200',
        time: 'hace 12 min',
        text: 'Descansar también es avanzar. Me encanta la foto.',
      },
    ],
  },
  {
    id: 3,
    name: 'Álex Ríos',
    handle: '@alexrios',
    avatarInitials: 'AR',
    avatarColor: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200',
    community: 'tecnología',
    time: '1 h',
    text: 'Después de muchas tardes de trabajo, por fin publiqué mi portfolio. Aprendí muchísimo en el proceso. 🚀\n\n¿Qué proyecto personal tienes entre manos?',
    adaReward: 1000,
    following: false,
    replies: '8',
    reposts: 6,
    likes: 93,
    liked: false,
    bookmarked: false,
    comments: [
      {
        id: 301,
        name: 'Sofía León',
        handle: '@sofialeon',
        avatarInitials: 'SL',
        avatarColor: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
        time: 'hace 42 min',
        text: '¡Felicidades! ¿Qué tecnología usaste para construirlo?',
      },
      {
        id: 302,
        name: 'Mateo Ruiz',
        handle: '@mateoruiz',
        avatarInitials: 'MR',
        avatarColor: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
        time: 'hace 18 min',
        text: 'Estoy trabajando en una app para organizar mis lecturas. Publicar algo propio siempre enseña un montón.',
      },
    ],
  },
]

export const useFeedStore = defineStore('feed', {
  state: () => ({
    theme: (typeof window !== 'undefined' && window.localStorage.getItem('pairfy-theme') === 'light' ? 'light' : 'dark') as Theme,
    activeTab: 'for-you' as FeedTab,
    draft: '',
    toast: '',
    posts: initialPosts,
  }),
  actions: {
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
      document.documentElement.style.colorScheme = this.theme
    },
    setTheme(theme: Theme) {
      this.theme = theme
      window.localStorage.setItem('pairfy-theme', theme)
      this.applyTheme()
    },
    createPost() {
      const text = this.draft.trim()
      if (!text) return
      this.posts.unshift({
        id: Date.now(),
        name: 'Mi perfil demo',
        handle: '@mi_perfil_demo',
        avatarInitials: 'MD',
        avatarColor: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100',
        community: 'general',
        time: 'ahora',
        text,
        adaReward: 50,
        following: true,
        replies: '0',
        reposts: 0,
        likes: 0,
        liked: false,
        bookmarked: false,
        comments: [],
      })
      this.draft = ''
      this.showToast('¡Tu publicación se ha publicado!')
    },
    toggleLike(id: number) {
      const post = this.posts.find((item) => item.id === id)
      if (!post) return
      post.liked = !post.liked
      post.likes += post.liked ? 1 : -1
    },
    toggleRepost(id: number) {
      const post = this.posts.find((item) => item.id === id)
      if (!post) return
      post.reposts += 1
      this.showToast('Publicación compartida')
    },
    toggleBookmark(id: number) {
      const post = this.posts.find((item) => item.id === id)
      if (!post) return
      post.bookmarked = !post.bookmarked
      this.showToast(post.bookmarked ? 'Añadido a Guardados' : 'Eliminado de Guardados')
    },
    showToast(message: string) {
      this.toast = message
      window.setTimeout(() => {
        if (this.toast === message) this.toast = ''
      }, 2400)
    },
  },
})
