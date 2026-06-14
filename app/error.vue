<template>
  <div class="min-h-screen bg-base text-primary flex items-center justify-center font-inter">
    <div class="px-6 text-center">
      <p class="text-accent font-mono text-xs tracking-widest mb-4">// error</p>
      <h1 class="font-mono text-8xl font-bold mb-4">
        {{ error.statusCode }}
      </h1>
      <p class="text-secondary font-mono text-sm mb-8">{{ errorMessage }}</p>
      <button @click="handleError"
        class="border border-accent text-accent px-6 py-2 font-mono text-sm hover:bg-accent hover:text-[var(--color-base)] transition-all duration-200">
        go home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number, message?: string } }>()

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404: return 'page not found'
    case 500: return 'internal server error'
    case 403: return 'access forbidden'
    case 401: return 'unauthorized'
    default: return props.error.message ?? 'something went wrong'
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; }
.font-mono { font-family: 'Monaspace Neon', monospace; }
.font-inter { font-family: 'Inter', sans-serif; }
</style>