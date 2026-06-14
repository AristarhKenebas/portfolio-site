<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-[#1a1a1a]">
    <p class="text-[#ff6eb4] font-mono text-xs tracking-widest mb-8">// skills</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
      <div v-for="skill in skills" :key="skill"
        class="border border-[#1a1a1a] px-4 py-3 font-mono text-sm text-[#888] hover:border-[#ff6eb4] hover:text-[#ff6eb4] transition-all duration-200 cursor-default">
        {{ skill }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { skills } = usePortfolioData()
</script>