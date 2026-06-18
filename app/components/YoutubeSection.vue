<template>
  <section v-if="channel" class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// youtube</p>

    <div class="flex items-center gap-4 mb-10">
      <img v-if="channel.avatar" :src="getProxiedImage(channel.avatar)" :alt="channel.name"
        class="w-14 h-14 object-cover border border-subtle" />
      <div>
        <p class="font-mono text-primary text-sm">{{ channel.name }}</p>
        <p class="font-mono text-xs text-muted">
          {{ formatNumber(channel.subscribers) }} subscribers · {{ formatNumber(channel.views) }} views
        </p>
      </div>
      <a :href="channel.url" target="_blank"
        class="ml-auto font-mono text-xs text-muted hover:text-accent transition-colors">
        channel →
      </a>
    </div>

    <div v-if="channel.videos?.length" class="grid md:grid-cols-3 gap-4 max-w-4xl">
      <a v-for="video in channel.videos" :key="video.id" :href="video.url" target="_blank"
        class="animate-card group">
        <div class="aspect-video overflow-hidden border border-subtle mb-2">
          <img :src="getProxiedImage(video.thumbnail)" :alt="video.title"
            class="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-200" />
        </div>
        <p class="font-mono text-xs text-primary group-hover:text-accent transition-colors line-clamp-2">
          {{ video.title }}
        </p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const youtubeData = inject<Ref<any>>('youtube')
const channel = computed(() => {
  const data = youtubeData?.value
  if (!data || data.error) return null
  return data
})

const formatNumber = (n: string | number) => {
  const num = Number(n)
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return String(num)
}

const getProxiedImage = (url: string) => {
  if (!url) return ''
  return `/api/youtube/image-proxy?url=${encodeURIComponent(url)}`
}
</script>