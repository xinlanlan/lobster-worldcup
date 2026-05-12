import { kv } from '@vercel/kv'

// Simple in-memory fallback for local development
const memStore = new Map<string, string>()

const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function kvGet<T>(key: string): Promise<T | null> {
  if (isKVAvailable()) {
    return await kv.get<T>(key)
  }
  const val = memStore.get(key)
  return val ? (JSON.parse(val) as T) : null
}

export async function kvSet(key: string, value: unknown, exSeconds?: number): Promise<void> {
  if (isKVAvailable()) {
    if (exSeconds) {
      await kv.set(key, value, { ex: exSeconds })
    } else {
      await kv.set(key, value)
    }
    return
  }
  memStore.set(key, JSON.stringify(value))
}

export async function kvDel(key: string): Promise<void> {
  if (isKVAvailable()) {
    await kv.del(key)
    return
  }
  memStore.delete(key)
}
