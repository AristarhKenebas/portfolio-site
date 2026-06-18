<template>
  <section v-if="weeks.length" class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <div class="flex items-baseline justify-between mb-8 flex-wrap gap-2">
      <p class="text-accent font-mono text-xs tracking-widest">// contributions</p>
      <p class="font-mono text-xs text-muted">{{ total }} commits in the last year</p>
    </div>

    <div class="overflow-x-auto pb-2">
      <div class="inline-flex gap-[3px] min-w-max">
        <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-[3px]">
          <div v-for="day in week.contributionDays" :key="day.date"
            class="cell w-[10px] h-[10px] md:w-[11px] md:h-[11px] border border-subtle relative"
            :style="{ backgroundColor: cellColor(day.contributionCount) }"
            :data-count="day.contributionCount"
            :data-date="day.date"
            @mouseenter="showTooltip(day, $event)"
            @mouseleave="hideTooltip"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 mt-4 font-mono text-xs text-muted">
      <span>less</span>
      <div v-for="lvl in [0, 0.25, 0.5, 0.75, 1]" :key="lvl"
        class="w-[10px] h-[10px] border border-subtle"
        :style="{ backgroundColor: cellColor(lvl === 0 ? 0 : Math.ceil(lvl * maxCount)) }" />
      <span>more</span>
    </div>

    <Teleport to="body">
      <div v-if="tooltip.show"
        class="fixed font-mono text-xs bg-card border border-subtle px-2 py-1 pointer-events-none z-50 text-primary whitespace-nowrap"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        {{ tooltip.count }} {{ tooltip.count === 1 ? 'commit' : 'commits' }} on {{ tooltip.date }}
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
const { get } = useApi()

const weeks = ref<any[]>([])
const total = ref(0)
const maxCount = ref(1)

const tooltip = ref({ show: false, x: 0, y: 0, count: 0, date: '' })

const showTooltip = (day: any, event: MouseEvent) => {
  tooltip.value = {
    show: true,
    x: event.clientX + 12,
    y: event.clientY - 28,
    count: day.contributionCount,
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }
}
const hideTooltip = () => { tooltip.value.show = false }

const cellColor = (count: number) => {
  if (!count) return 'var(--color-subtle)'
  const ratio = Math.min(count / maxCount.value, 1)
  // ступени по 25% как договорились
  const step = ratio <= 0.25 ? 0.25 : ratio <= 0.5 ? 0.5 : ratio <= 0.75 ? 0.75 : 1
  const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  return hexToRgba(accentRgb, step)
}

const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

onMounted(async () => {
  const data = await get('/api/github/contributions')
  if (!data || data.error) return

  total.value = data.total
  weeks.value = data.weeks

  const allCounts = data.weeks.flatMap((w: any) => w.contributionDays.map((d: any) => d.contributionCount))
  maxCount.value = Math.max(...allCounts, 1)

  await nextTick()
  animateCells()
})

const animateCells = async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const cells = document.querySelectorAll('.cell')
  gsap.fromTo(cells,
    { opacity: 0, scale: 0.3 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: { amount: 1.2, from: 'start' },
      ease: 'power1.out',
      scrollTrigger: {
        trigger: cells[0],
        start: 'top 85%',
      }
    }
  )
}
</script>