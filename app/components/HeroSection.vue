<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-6">
        <p class="text-accent font-mono text-sm tracking-widest">~/portfolio</p>
        <span v-if="config.available"
          class="border border-accent/40 text-accent font-mono text-xs px-2 py-1 animate-pulse">
          open to work
        </span>
      </div>

      <h1 class="font-mono text-4xl md:text-7xl font-bold mb-4 leading-tight">
        {{ firstName }}<br>
        <span class="text-accent">{{ lastName }}</span>
      </h1>

      <p class="text-secondary text-sm font-mono mb-2">{{ config.title }} · {{ config.location }}</p>

      <p class="text-secondary text-lg md:text-xl max-w-xl mb-8 font-light leading-relaxed">
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
  </section>
</template>

<script setup lang="ts">
const { config, contacts } = usePortfolioData()

const nameParts = config.name.split(' ')
const firstName = nameParts[0]
const lastName = nameParts[1] ?? ''

const primaryContacts = contacts.slice(0, 2)
</script>