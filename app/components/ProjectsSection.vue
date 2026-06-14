<template>
  <section class="px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// projects</p>
    <div class="grid md:grid-cols-2 gap-4 max-w-4xl">
      <div v-for="project in projects" :key="project.name"
        class="border border-subtle p-6 hover:border-accent transition-all duration-200 group bg-card">
        <h3 class="font-mono text-primary mb-2 group-hover:text-accent transition-colors">
          {{ project.name }}
        </h3>
        <p class="text-muted text-sm mb-4 leading-relaxed">{{ project.description }}</p>
        <div class="flex gap-2 flex-wrap mb-4">
          <span v-for="tag in project.tags" :key="tag"
            class="text-accent font-mono text-xs border border-subtle px-2 py-1">
            {{ tag }}
          </span>
        </div>
        <a :href="project.url" target="_blank"
          class="font-mono text-xs text-muted hover:text-accent transition-colors">
          github →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { projects } = usePortfolioData()
</script>