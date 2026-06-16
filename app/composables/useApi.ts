export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl

  const get = async (path: string) => {
    try {
      const res = await fetch(`${baseUrl}${path}`, { credentials: 'include' })
      if (!res.ok) return null
      return res.json()
    } catch {
      return null
    }
  }

  const post = async (path: string, body: unknown) => {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })
      return res.json()
    } catch {
      return null
    }
  }

  return { get, post }
}