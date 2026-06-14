<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-inter">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
    <footer class="px-6 md:px-16 lg:px-32 py-8 border-t border-[#1a1a1a]">
      <p class="font-mono text-xs text-[#333]">
        built with nuxt + typescript + bun — {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; }
.font-mono { font-family: 'Monaspace Neon', monospace; }
.font-inter { font-family: 'Inter', sans-serif; }
</style>