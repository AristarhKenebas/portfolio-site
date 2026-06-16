<template>
  <button
    @click="toggleTheme"
    class="border border-subtle px-3 py-2 font-mono text-xs text-muted hover:border-accent hover:text-accent transition-all duration-200 bg-base"
  >
    {{ isDark ? '☀ light' : '◑ dark' }}
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>