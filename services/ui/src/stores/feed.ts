import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'
export type FeedTab = 'for-you' | 'following'

export interface FeedPost {
  id: number
  name: string
  handle: string
  avatarInitials: string
  avatarColor: string
  community: string
  time: string
  text: string
  following: boolean
  replies: string
  reposts: number
  likes: number
  liked: boolean
  bookmarked: boolean
  image?: string
  imageAlt?: string
}

const initialPosts: FeedPost[] = [
  {
    id: 1,
    name: 'Cuenta demo 01',
    handle: '@demo_01',
    avatarInitials: '01',
    avatarColor: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
    community: 'diseño',
    time: '12 min',
    text: 'El mejor diseño no es el que más llama la atención, sino el que hace que todo parezca sencillo. ✨',
    following: true,
    replies: '24',
    reposts: 18,
    likes: 246,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    name: 'Cuenta demo 02',
    handle: '@demo_02',
    avatarInitials: '02',
    avatarColor: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
    community: 'bienestar',
    time: '38 min',
    text: 'Un recordatorio para hoy: también estás avanzando cuando descansas. 🌿',
    following: true,
    replies: '12',
    reposts: 31,
    likes: 582,
    liked: true,
    bookmarked: false,
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Amanecer dorado entre montañas y nubes',
  },
  {
    id: 3,
    name: 'Cuenta demo 03',
    handle: '@demo_03',
    avatarInitials: '03',
    avatarColor: 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200',
    community: 'tecnología',
    time: '1 h',
    text: 'Acabo de lanzar mi nuevo portfolio. He aprendido muchísimo construyéndolo y estoy muy orgulloso del resultado. 🚀\n\n¿Qué proyecto personal tienes entre manos?',
    following: false,
    replies: '8',
    reposts: 6,
    likes: 93,
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    name: 'Cuenta demo 04',
    handle: '@demo_04',
    avatarInitials: '04',
    avatarColor: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    community: 'viajes',
    time: '2 h',
    text: 'Perderse por calles nuevas y terminar encontrando tu cafetería favorita. Lisboa siempre tiene algo que contar. ☕️',
    following: true,
    replies: '17',
    reposts: 9,
    likes: 314,
    liked: false,
    bookmarked: true,
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Tranvía amarillo recorriendo una calle de Lisboa',
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
        following: true,
        replies: '0',
        reposts: 0,
        likes: 0,
        liked: false,
        bookmarked: false,
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
