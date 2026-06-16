<template>
  <section v-if="stats && stats.enabled" class="animate-section px-6 md:px-16 lg:px-32 py-24 border-t border-subtle">
    <p class="text-accent font-mono text-xs tracking-widest mb-8">// coding</p>
    <div class="max-w-2xl">

      <!-- Today -->
      <div v-if="stats.today?.seconds > 0" class="mb-8">
        <p class="font-mono text-xs text-muted mb-2">today</p>
        <p class="font-mono text-4xl text-primary">{{ stats.today.human }}</p>
      </div>

      <!-- Languages -->
      <div v-if="stats.languages?.length" class="mb-8">
        <p class="font-mono text-xs text-muted mb-4">languages · 7 days</p>
        <div class="flex flex-col gap-3">
          <div v-for="(lang, i) in stats.languages" :key="lang.name" class="lang-item">
            <div class="flex justify-between font-mono text-xs mb-1">
              <span class="text-primary">{{ lang.name }}</span>
              <span ref="percentRefs" class="text-muted">0%</span>
            </div>
            <div class="h-px bg-subtle">
              <div ref="barRefs" class="h-px bg-accent" style="width: 0%" :data-width="`${lang.percent}%`" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { get } = useApi()
const stats = ref<any>(null)
const barRefs = ref<HTMLElement[]>([])
const percentRefs = ref<HTMLElement[]>([])

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  const data = await get('/api/wakatime/stats')
  if (data?.enabled !== false) {
    stats.value = data
  }

  await nextTick()

  if (!stats.value?.languages?.length) return

  barRefs.value.forEach((bar, i) => {
    const targetWidth = bar.dataset.width ?? '0%'
    const targetPercent = parseFloat(targetWidth)
    const percentEl = percentRefs.value[i]

    gsap.fromTo(bar,
      { width: '0%' },
      {
        width: targetWidth,
        duration: 1.2,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
        }
      }
    )

    if (percentEl) {
      gsap.to({ val: 0 }, {
        val: targetPercent,
        duration: 1.2,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
        },
        onUpdate: function() {
          percentEl.textContent = this.targets()[0].val.toFixed(1) + '%'
        }
      })
    }
  })
})
</script>