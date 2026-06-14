<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-[#1a1a1a]">
    <p class="text-[#ff6eb4] font-mono text-xs tracking-widest mb-8">// contact</p>
    <div class="flex flex-col gap-3 max-w-xs">
      <a v-for="link in contacts" :key="link.label" :href="link.url" target="_blank"
        class="flex justify-between font-mono text-sm text-[#666] hover:text-[#ff6eb4] transition-colors group">
        <span class="text-[#333] group-hover:text-[#ff6eb4]">{{ link.label }}</span>
        <span>{{ link.value }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { contacts } = usePortfolioData()
</script>