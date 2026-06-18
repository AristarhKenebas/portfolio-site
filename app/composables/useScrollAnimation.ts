import { onUnmounted } from 'vue'

export const useScrollAnimation = () => {
  const initScrollAnimations = async () => {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    // Даём браузеру один кадр на окончательный layout
    await new Promise(r => requestAnimationFrame(r))
    await new Promise(r => requestAnimationFrame(r))

    ScrollTrigger.refresh()

    gsap.utils.toArray('.animate-section').forEach((section) => {
      gsap.fromTo(section as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 85%',
            once: true,
          }
        }
      )
    })

    gsap.set('.animate-card', { opacity: 0, y: 30 })

    ScrollTrigger.batch('.animate-card', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
        })
      }
    })

    gsap.set('.animate-skill', { opacity: 0, y: 15 })

    ScrollTrigger.batch('.animate-skill', {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'transform',
        })
      }
    })
  }

  onUnmounted(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    })
  })

  return { initScrollAnimations }
}