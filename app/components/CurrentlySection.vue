<template>
  <section v-if="entries.length" class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// currently</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
      <div v-for="entry in entries" :key="entry.id"
        class="border border-subtle px-4 py-3 flex items-center gap-3 hover:border-accent transition-all duration-200">
        <span class="font-mono text-xs text-accent w-20 shrink-0">{{ entry.type }}</span>
        <span class="font-mono text-sm text-primary">{{ entry.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
const currentlyData = inject<Ref<any[]>>('currently')
const entries = computed(() => currentlyData?.value ?? [])
</script>