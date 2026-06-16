<template>
  <section class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// contact</p>
    <div class="flex flex-col gap-3 max-w-xs">
      <a v-for="link in contacts" :key="link.label" :href="link.url" target="_blank"
        class="flex justify-between font-mono text-sm text-muted hover:text-accent transition-colors group">
        <span class="text-muted group-hover:text-accent transition-colors">{{ link.label }}</span>
        <span>{{ link.value }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const profile = inject<Ref<any>>('profile')

const contacts = computed(() => {
  const p = profile?.value
  if (!p) return []
  return [
    p.githubUsername && { label: 'github', value: p.githubUsername, url: `https://github.com/${p.githubUsername}` },
    p.telegramUsername && { label: 'telegram', value: p.telegramUsername, url: `https://t.me/${p.telegramUsername.replace('@', '')}` },
    p.discordUsername && { label: 'discord', value: p.discordUsername, url: `https://discord.com/users/${p.discordUsername.replace('@', '')}` },
    p.email && { label: 'email', value: p.email, url: `mailto:${p.email}` },
  ].filter(Boolean)
})
</script>