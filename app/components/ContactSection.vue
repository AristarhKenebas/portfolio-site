<template>
  <section class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// contact</p>
    <div class="flex flex-col gap-3 max-w-xs">
      <a v-for="link in contacts" :key="link.label" :href="link.url" target="_blank"
        class="flex justify-between font-mono text-sm text-muted hover:text-accent transition-colors group">
        <span class="text-subtle group-hover:text-accent transition-colors">{{ link.label }}</span>
        <span>{{ link.value }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { contacts } = usePortfolioData()
</script>