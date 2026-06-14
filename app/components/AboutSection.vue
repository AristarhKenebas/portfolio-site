<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-[#1a1a1a]">
    <p class="text-[#ff6eb4] font-mono text-xs tracking-widest mb-8">// about</p>
    <div class="max-w-2xl">
      <p class="text-[#ccc] text-lg leading-relaxed mb-4">
        {{ config.description }}
      </p>
      <div class="flex flex-wrap gap-2 mt-6">
        <span class="font-mono text-xs text-[#555]">{{ config.location }}</span>
        <span class="text-[#333]">·</span>
        <span class="font-mono text-xs text-[#555]">{{ config.title }}</span>
        <span v-if="config.available" class="text-[#333]">·</span>
        <span v-if="config.available" class="font-mono text-xs text-[#ff6eb4]">open to work</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { config } = usePortfolioData()
</script>