<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// skills</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
      <div v-for="skill in skills" :key="skill"
        class="border border-subtle px-4 py-3 font-mono text-sm text-secondary hover:border-accent hover:text-accent transition-all duration-200 cursor-default">
        {{ skill }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { skills } = usePortfolioData()
</script>