<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
    
    <!-- Анимированная сетка -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-30" />

    <!-- Контент -->
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-6">
        <p class="text-[#ff6eb4] font-mono text-sm tracking-widest">~/portfolio</p>
        <span v-if="config.available"
          class="border border-[#ff6eb4]/40 text-[#ff6eb4] font-mono text-xs px-2 py-1 animate-pulse">
          open to work
        </span>
      </div>

      <h1 class="font-mono text-4xl md:text-7xl font-bold mb-4 leading-tight">
        {{ firstName }}<br>
        <span class="text-[#ff6eb4]">{{ lastName }}</span>
      </h1>

      <p class="text-[#888] text-sm font-mono mb-2">{{ config.title }} · {{ config.location }}</p>

      <p class="text-[#ccc] text-lg md:text-xl max-w-xl mb-8 font-light leading-relaxed">
        {{ config.description }}
      </p>

      <div class="flex gap-4 flex-wrap">
        <a v-for="link in primaryContacts" :key="link.label"
          :href="link.url" target="_blank"
          class="border border-[#ff6eb4] text-[#ff6eb4] px-6 py-2 font-mono text-sm hover:bg-[#ff6eb4] hover:text-[#0a0a0a] transition-all duration-200">
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { config, contacts } = usePortfolioData()

const nameParts = config.name.split(' ')
const firstName = nameParts[0]
const lastName = nameParts[1] ?? ''

const primaryContacts = contacts.slice(0, 2)

// Canvas сетка
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const PINK = '#ff6eb4'
  const DOT_COUNT = 80
  const CONNECTION_DISTANCE = 120

  const dots = Array.from({ length: DOT_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1,
  }))

  let animId: number

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Двигаем точки
    for (const dot of dots) {
      dot.x += dot.vx
      dot.y += dot.vy
      if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
      if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1
    }

    // Рисуем линии между близкими точками
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i]!.x - dots[j]!.x
        const dy = dots[i]!.y - dots[j]!.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE
          ctx.strokeStyle = PINK
          ctx.globalAlpha = alpha * 0.4
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(dots[i]!.x, dots[i]!.y)
          ctx.lineTo(dots[j]!.x, dots[j]!.y)
          ctx.stroke()
        }
      }
    }

    // Рисуем точки
    ctx.globalAlpha = 0.8
    for (const dot of dots) {
      ctx.fillStyle = PINK
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
    animId = requestAnimationFrame(draw)
  }

  draw()

  // Resize
  const onResize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)
  })
})
</script>