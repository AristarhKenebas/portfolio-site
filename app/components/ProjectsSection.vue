<template>
  <section class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// projects</p>
    <div class="grid md:grid-cols-2 gap-4 max-w-4xl">
      <div v-for="project in projects" :key="project.id ?? project.name"
        class="animate-card border border-subtle p-6 hover:border-accent transition-all duration-300 group bg-card relative overflow-hidden">

        <!-- декоративная линия слева, выезжает при hover -->
        <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

        <h3 class="font-mono text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {{ project.name }}
        </h3>
        <p class="text-muted text-sm mb-4 leading-relaxed">{{ project.description }}</p>

        <div class="flex gap-2 flex-wrap mb-4">
          <span v-for="tag in project.tags" :key="tag"
            class="text-accent font-mono text-xs border border-subtle px-2 py-1">
            {{ tag }}
          </span>
        </div>

        <!-- метаданные репозитория -->
        <div v-if="hasMeta(project)" class="flex items-center gap-4 mb-4 font-mono text-xs text-muted">
          <span v-if="displaySettings.showStars && project.stars !== null && project.stars !== undefined" class="flex items-center gap-1">
            <span class="text-accent">★</span>{{ project.stars }}
          </span>
          <span v-if="displaySettings.showForks && project.forks !== null && project.forks !== undefined" class="flex items-center gap-1">
            <span class="text-accent">⑂</span>{{ project.forks }}
          </span>
          <span v-if="displaySettings.showLanguage && project.language" class="flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-accent inline-block" />{{ project.language }}
          </span>
          <span v-if="displaySettings.showUpdatedAt && project.repoUpdatedAt" class="text-muted/70 ml-auto">
            {{ timeAgo(project.repoUpdatedAt) }}
          </span>
        </div>

        <a :href="project.url" target="_blank"
          class="font-mono text-xs text-muted hover:text-accent transition-colors inline-flex items-center gap-1">
          github
          <span class="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
const projectsData = inject<Ref<any[]>>('projects')
const projects = computed(() => projectsData?.value ?? [])

const { get } = useApi()
const displaySettings = ref({
  showStars: true,
  showForks: true,
  showLanguage: true,
  showUpdatedAt: true,
})

onMounted(async () => {
  const data = await get('/api/project-settings')
  if (data && !data.error) {
    displaySettings.value = { ...displaySettings.value, ...data }
  }
})

const hasMeta = (project: any) => {
  return (displaySettings.value.showStars && project.stars !== null && project.stars !== undefined)
    || (displaySettings.value.showForks && project.forks !== null && project.forks !== undefined)
    || (displaySettings.value.showLanguage && project.language)
    || (displaySettings.value.showUpdatedAt && project.repoUpdatedAt)
}

const timeAgo = (dateStr: string) => {
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
</script>