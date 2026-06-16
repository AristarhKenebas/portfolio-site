<template>
  <Teleport to="body">
    <div v-if="show"class="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div class="border border-subtle p-8 w-full max-w-sm bg-base">
        <div class="flex items-center justify-between mb-6">
          <p class="font-mono text-accent text-sm">portfolio/admin</p>
          <button @click="$emit('close')"
            class="font-mono text-xs text-muted hover:text-accent transition-colors">
            ✕
          </button>
        </div>
        <template v-if="!isAuthenticated">
          <div class="flex flex-col gap-4">
            <div>
              <label class="font-mono text-xs text-muted mb-1 block">username</label>
              <input v-model="form.username" @keyup.enter="login"
                class="w-full bg-[#111] border border-subtle px-3 py-2 text-sm font-mono text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label class="font-mono text-xs text-muted mb-1 block">password</label>
              <input v-model="form.password" type="password" @keyup.enter="login"
                class="w-full bg-[#111] border border-subtle px-3 py-2 text-sm font-mono text-primary focus:border-accent outline-none" />
            </div>
            <p v-if="error" class="font-mono text-xs text-red-400">{{ error }}</p>
            <button @click="login"
              class="border border-accent text-accent px-6 py-2 font-mono text-sm hover:bg-accent hover:text-[var(--color-base)] transition-all">
              {{ loading ? 'logging in...' : 'login' }}
            </button>
          </div>
        </template>

        <template v-else>
          <p class="font-mono text-xs text-muted mb-6">logged in as admin</p>
          <div class="flex flex-col gap-3">
            <a href="http://localhost:3002" target="_blank"
              class="border border-accent text-accent px-6 py-2 font-mono text-sm hover:bg-accent hover:text-[var(--color-base)] transition-all text-center">
              open admin panel
            </a>
            <button @click="logout"
              class="border border-subtle text-muted px-6 py-2 font-mono text-sm hover:border-red-400 hover:text-red-400 transition-all">
              logout
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])

const { get, post } = useApi()

const form = ref({ username: '', password: '' })
const error = ref('')
const loading = ref(false)
const isAuthenticated = ref(false)

onMounted(async () => {
  const res = await get('/api/auth/me')
  isAuthenticated.value = res?.authenticated ?? false
})

const login = async () => {
  if (!form.value.username || !form.value.password) return
  loading.value = true
  error.value = ''
  try {
    const res = await post('/api/auth/login', form.value)
    if (res.success) {
      isAuthenticated.value = true
      form.value = { username: '', password: '' }
    } else {
      error.value = res.error ?? 'Invalid credentials'
    }
  } catch {
    error.value = 'Connection error'
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  await post('/api/auth/logout', {})
  isAuthenticated.value = false
  emit('close')
}
</script>