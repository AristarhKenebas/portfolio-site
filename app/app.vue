<template>
  <div class="min-h-screen bg-base text-primary font-inter">
    
    <AppLoader :ready="isAppReady" @done="onLoaderDone" />

    <div ref="mainContent" class="opacity-0 pointer-events-none">
      
      <div class="fixed top-6 right-6 z-50 flex items-center gap-2">
        <button @click="showAuth = true"
          class="border border-subtle px-3 py-2 font-mono text-xs text-muted hover:border-accent hover:text-accent transition-colors duration-200 bg-base">
          {{ '⊙ admin' }}
        </button>
        <ClientOnly>
          <ThemeToggle />
        </ClientOnly>
      </div>

      <AuthModal :show="showAuth" @close="showAuth = false" />
      <HeroSection />
      <AboutSection />
      <CurrentlySection />
      <YoutubeSection />
      <WakaSection />
      <GithubContributions />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      <footer class="px-6 md:px-16 lg:px-32 py-8 border-t border-subtle">
        <p class="font-mono text-xs text-muted">
          built with nuxt + typescript + bun — {{ new Date().getFullYear() }}
        </p>
      </footer>

    </div>
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; }
.font-mono { font-family: 'Monaspace Neon', monospace; }
.font-inter { font-family: 'Inter', sans-serif; }

:root, .dark {
  --color-base: #0a0a0a;
  --color-primary: #e8e8e8;
  --color-accent: #ff6eb4;
  --color-muted: #555;
  --color-subtle: #1a1a1a;
  --color-secondary: #888;
  --color-card: #111;
}

.light {
  --color-base: #fdf0f5;
  --color-primary: #1a1a1a;
  --color-accent: #e0257a;
  --color-muted: #999;
  --color-subtle: #f0d0df;
  --color-secondary: #666;
  --color-card: #fae0ec;
}
.animate-section,
.animate-card,
.animate-skill {opacity: 0; }
.bg-base { background-color: var(--color-base); }
.text-primary { color: var(--color-primary); }
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-muted); }
.text-secondary { color: var(--color-secondary); }
.border-subtle { border-color: var(--color-subtle); }
.bg-card { background-color: var(--color-card); }
.bg-accent { background-color: var(--color-accent); }
.border-accent { border-color: var(--color-accent); }
.text-accent { color: var(--color-accent); }
.hover\:bg-accent:hover { background-color: var(--color-accent); }
.hover\:text-accent:hover { color: var(--color-accent); }
.hover\:border-accent:hover { border-color: var(--color-accent); }
</style>

<script setup lang="ts">
import { nextTick } from 'vue'

const colorMode = useColorMode()
const { get } = useApi()

const isAppReady = ref(false)
const mainContent = ref<HTMLDivElement>()
const showAuth = ref(false)
const profile = ref<any>(null)
const skills = ref<any[]>([])
const projects = ref<any[]>([])
const currently = ref<any[]>([])
const github = ref<any>(null)
const youtube = ref<any>(null)
const { initScrollAnimations } = useScrollAnimation()

const faviconUrl = computed(() => {
  return colorMode.value === 'dark' ? '/favicon_light.ico' : '/favicon.ico'
})

useHead(() => ({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: colorMode.value === 'dark' ? '/favicon.ico' : '/favicon-light.ico',
      key: 'favicon',
    }
  ]
}))

const onLoaderDone = async () => {
  const { gsap } = await import('gsap')
  
  gsap.to(mainContent.value!, {
    opacity: 1,
    duration: 1.5,
    ease: 'power3.out',
    onComplete: async () => {
      mainContent.value?.classList.remove('pointer-events-none')
      await nextTick()
      await nextTick()
      initScrollAnimations()
    }
  })
}

onMounted(async () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
  
  try {
    const [p, s, pr, c, g, yt] = await Promise.all([
      get('/api/profile'),
      get('/api/skills'),
      get('/api/projects?featured=true'),
      get('/api/currently'),
      get('/api/github'),
      get('/api/youtube'),
    ])
    
    profile.value = p
    skills.value = s
    projects.value = pr
    currently.value = c
    github.value = g
    youtube.value = yt

  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    isAppReady.value = true
  }
})

provide('profile', profile)
provide('skills', skills)
provide('projects', projects)
provide('currently', currently)
provide('github', github)
provide('youtube', youtube)

</script>