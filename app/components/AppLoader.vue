<template>
  <Teleport to="body">
    <div 
      v-if="visible" 
      ref="loaderBg"
      class="fixed inset-0 z-[9999] bg-base/95 backdrop-blur-md flex items-center justify-center overflow-hidden"
      :class="{ 'pointer-events-none': exiting }"
    >

      <div class="absolute inset-6 md:inset-12 pointer-events-none">
        <div ref="cornerTR" class="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 border-t-2 border-r-2 border-accent opacity-0"></div>
        <div ref="cornerBL" class="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 border-b-2 border-l-2 border-accent opacity-0"></div>
      </div>

      <div ref="centerContainer" class="relative flex items-center justify-center opacity-0">
        <svg class="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100">
          <rect ref="box1" x="20" y="20" width="60" height="60" fill="none" class="stroke-accent" stroke-width="3" rx="6" />
          <rect ref="box2" x="20" y="20" width="60" height="60" fill="none" class="stroke-accent" stroke-width="3" rx="6" />
        </svg>
      </div>

    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ ready: boolean }>()
const emit = defineEmits(['done'])

const visible = ref(true)
const exiting = ref(false)
const introFinished = ref(false)

const loaderBg = ref<HTMLDivElement>()
const cornerTR = ref<HTMLDivElement>()
const cornerBL = ref<HTMLDivElement>()
const centerContainer = ref<HTMLDivElement>()
const box1 = ref<SVGRectElement>()
const box2 = ref<SVGRectElement>()

let pulseLoop: any = null

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  const { gsap } = await import('gsap')

  gsap.fromTo(cornerTR.value!,
    { x: 50, y: -50, opacity: 0 },
    { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
  )
  gsap.fromTo(cornerBL.value!,
    { x: -50, y: 50, opacity: 0 },
    { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
  )

  gsap.fromTo(centerContainer.value!,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, delay: 0.3, ease: 'back.out(1.5)' }
  )

  gsap.set([box1.value, box2.value], { transformOrigin: 'center center' })
  
  gsap.to(box1.value!, { rotation: 360, duration: 4, repeat: -1, ease: 'linear' })
  gsap.to(box2.value!, { rotation: -360, scale: 0.6, duration: 4, repeat: -1, ease: 'linear' })
  
  pulseLoop = gsap.to(centerContainer.value!, {
    scale: 1.05,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  })

  setTimeout(() => {
    introFinished.value = true
  }, 1500)
})

watch(() => props.ready, async (isReady) => {
  if (!isReady) return

  if (!introFinished.value) {
    await new Promise<void>(resolve => {
      const unwatch = watch(introFinished, (done) => {
        if (done) {
          unwatch()
          resolve()
        }
      })
    })
  }

  const { gsap } = await import('gsap')
  exiting.value = true

  if (pulseLoop) pulseLoop.kill()

  const tl = gsap.timeline({
    onComplete: () => {
      visible.value = false
      document.body.style.overflow = ''
      emit('done')
    }
  })

  tl.to(centerContainer.value!, {
    scale: 1.5,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.in'
  }, 0)

  tl.to(cornerTR.value!, {
    x: 100,
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.inOut'
  }, 0)
  
  tl.to(cornerBL.value!, {
    x: -100,
    y: 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.inOut'
  }, 0)

  tl.to(loaderBg.value!, {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    duration: 1.2, 
    ease: 'power2.inOut'
  }, 0.2)
})
</script>

<style scoped>
.stroke-accent {
  stroke: var(--color-accent);
}
</style>