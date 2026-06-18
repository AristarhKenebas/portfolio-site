<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
    <div class="relative z-10 w-full">

      <div class="md:hidden flex flex-col w-full">
        
        <div class="flex items-center gap-3 mb-6">
          <p class="text-accent font-mono text-sm tracking-widest">~/portfolio</p>
          <span v-if="config.available"
            class="border border-accent/40 text-accent font-mono text-xs px-2 py-1 animate-pulse">
            open to work
          </span>
        </div>

        <h1 class="font-mono text-5xl font-bold mb-6 leading-tight">
          {{ firstName }}<br>
          <span class="text-accent">{{ lastName }}</span>
        </h1>
        
        <div class="flex gap-5 items-start mb-8">
          <div class="flex-shrink-0">
            <div class="w-28 h-28 border border-gray-800 p-1 bg-gray-950">
              <img v-if="avatarSrc" :src="avatarSrc" alt="avatar" 
                class="w-full h-full object-cover" 
                @error="avatarSrc = null" />
              <div v-else class="w-full h-full bg-gray-900 flex items-center justify-center">
                <span class="font-mono text-[10px] text-gray-500">no photo</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 pt-1">
            <h2 class="text-accent font-mono text-lg font-bold">{{ config.title }}</h2>
            <p class="text-gray-400 text-sm font-light leading-relaxed">
              {{ config.description }}
            </p>
            <p class="text-gray-600 text-xs font-mono mt-1">{{ config.location }}</p>
          </div>
        </div>

        <div class="flex gap-4 flex-wrap">
          <a v-for="link in primaryContacts" :key="link.label"
            :href="link.url" target="_blank"
            class="border border-accent text-accent px-6 py-2 font-mono text-sm hover:bg-accent hover:text-[var(--color-base)] transition-all duration-200">
            {{ link.label }}
          </a>
        </div>

      </div>


      <div class="hidden md:flex w-full items-center justify-between gap-12 lg:gap-16">

        <div class="flex-1 w-full">
          <div class="flex items-center gap-3 mb-6">
            <p class="text-accent font-mono text-sm tracking-widest">~/portfolio</p>
            <span v-if="config.available"
              class="border border-accent/40 text-accent font-mono text-xs px-2 py-1 animate-pulse">
              open to work
            </span>
          </div>

          <h1 class="font-mono text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            {{ firstName }}<br>
            <span class="text-accent">{{ lastName }}</span>
          </h1>

          <p class="text-secondary text-sm font-mono mb-2">{{ config.title }} · {{ config.location }}</p>

          <p class="text-secondary text-xl max-w-xl mb-8 font-light leading-relaxed">
            {{ config.description }}
          </p>

          <div class="flex gap-4 flex-wrap">
            <a v-for="link in primaryContacts" :key="link.label"
              :href="link.url" target="_blank"
              class="border border-accent text-accent px-6 py-2 font-mono text-sm hover:bg-accent hover:text-[var(--color-base)] transition-all duration-200">
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="flex-shrink-0 flex items-center justify-end">
          <div class="relative group">
            
            <div class="absolute inset-0 translate-x-4 translate-y-4 border border-accent/40 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 z-0" />

            <div class="w-64 h-64 lg:w-72 lg:h-72 border border-gray-800 bg-gray-950 relative z-10 p-1">
              <img v-if="avatarSrc" :src="avatarSrc" alt="avatar"
                class="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                @error="avatarSrc = null" />

              <div v-else class="w-full h-full flex items-center justify-center bg-gray-900">
                <svg class="w-24 h-24 opacity-20" viewBox="0 0 100 100">
                  <rect ref="box1" x="20" y="20" width="60" height="60"
                    fill="none" stroke="var(--color-accent)" stroke-width="2" rx="4" />
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import type { Ref } from 'vue'

const profile = inject<Ref<any>>('profile')
const { get } = useApi()
const runtimeConfig = useRuntimeConfig()

const firstName = computed(() => profile?.value?.name?.split(' ')[0] ?? 'Aristarh')
const lastName = computed(() => profile?.value?.name?.split(' ')[1] ?? 'Kenebas')
const config = computed(() => profile?.value ?? {
  available: true,
  title: 'Junior Developer',
  location: 'Ukraine → Germany',
  description: 'Self-taught developer.',
})

const primaryContacts = computed(() => {
  const p = profile?.value
  if (!p) return [
    { label: 'github', url: 'https://github.com/AristarhKenebas' },
    { label: 'email', url: 'mailto:arikkenebas09@gmail.com' },
  ]
  return [
    p.githubUsername && { label: 'github', url: `https://github.com/${p.githubUsername}` },
    p.email && { label: 'email', url: `mailto:${p.email}` },
  ].filter(Boolean)
})

const avatarSrc = ref<string | null>(null)
const box1 = ref<SVGRectElement>()
const box2 = ref<SVGRectElement>()

onMounted(async () => {
  try {
    const apiUrl = runtimeConfig.public.apiUrl
    const res = await fetch(`${apiUrl}/api/profile/avatar`, { method: 'HEAD' })
    if (res.ok) {
      avatarSrc.value = `${apiUrl}/api/profile/avatar?t=${Date.now()}`
    }
  } catch {
    avatarSrc.value = null
  }

  if (!avatarSrc.value && box1.value && box2.value) {
    const { gsap } = await import('gsap')
    gsap.set([box1.value, box2.value], { transformOrigin: 'center center' })
    gsap.to(box1.value, { rotation: 360, duration: 6, repeat: -1, ease: 'linear' })
    gsap.to(box2.value, { rotation: -360, scale: 0.6, duration: 6, repeat: -1, ease: 'linear' })
  }
})
</script>