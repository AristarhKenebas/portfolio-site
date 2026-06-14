import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollAnimation = () => {
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('.animate-section').forEach((section) => {
      gsap.fromTo(section as Element,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 80%',
          }
        }
      )
    })

    gsap.utils.toArray('.animate-card').forEach((card, i) => {
      gsap.fromTo(card as Element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
          }
        }
      )
    })

    gsap.utils.toArray('.animate-skill').forEach((skill, i) => {
      gsap.fromTo(skill as Element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: i * 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skill as Element,
            start: 'top 90%',
          }
        }
      )
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
}