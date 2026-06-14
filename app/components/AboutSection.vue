<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// about</p>
    <div class="max-w-2xl">
      <p class="text-primary text-lg leading-relaxed mb-4">
        {{ config.description }}
      </p>
      <div class="flex flex-wrap gap-2 mt-6">
        <span class="font-mono text-xs text-muted">{{ config.location }}</span>
        <span class="text-muted">·</span>
        <span class="font-mono text-xs text-muted">{{ config.title }}</span>
        <span v-if="config.available" class="text-muted">·</span>
        <span v-if="config.available" class="font-mono text-xs text-accent">open to work</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { config } = usePortfolioData()
</script>