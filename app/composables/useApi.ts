export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl

  const get = async (path: string) => {
    try {
      const res = await fetch(`${baseUrl}${path}`)
      if (!res.ok) return null
      return res.json()
    } catch {
      return null
    }
  }

  return { get }
}