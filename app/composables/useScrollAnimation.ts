import { onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollAnimation = () => {
  const initScrollAnimations = () => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.refresh()

    gsap.utils.toArray('.animate-section').forEach((section) => {
      gsap.fromTo(section as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 85%',
            once: true,
          },
          clearProps: 'transform'
        }
      )
    })

    ScrollTrigger.batch('.animate-card', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        )
      }
    })

    ScrollTrigger.batch('.animate-skill', {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 15 }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        )
      }
    })
  }

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })

  return { initScrollAnimations }
}