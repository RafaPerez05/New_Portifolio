/**
 * Tradução automática PT → EN via MyMemory API (gratuita).
 * Resultado é cacheado no localStorage para não depender da API a cada clique.
 */

const CACHE_KEY = 'portfolio-en-translations'
const API = 'https://api.mymemory.translated.net/get'
const MAX_CHARS = 450 // MyMemory limita ~500 bytes; usamos 450 para segurança com UTF-8

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/** Converte objeto aninhado em mapa plano de caminho → string (só folhas que são string) */
function collectStrings(
  obj: unknown,
  prefix = '',
  acc: Record<string, string> = {}
): Record<string, string> {
  if (isString(obj)) {
    acc[prefix] = obj
    return acc
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (isString(item)) {
        acc[`${prefix}.${i}`] = item
      } else if (isPlainObject(item)) {
        collectStrings(item, `${prefix}.${i}`, acc)
      }
    })
    return acc
  }
  if (isPlainObject(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key
      if (isString(value)) {
        acc[path] = value
      } else if (Array.isArray(value) || isPlainObject(value)) {
        collectStrings(value, path, acc)
      }
    }
    return acc
  }
  return acc
}

/** Define valor em um objeto aninhado pelo caminho (ex: "footer.links.0.name") */
function setAtPath(
  root: Record<string, unknown>,
  path: string,
  value: string
): void {
  const parts = path.split('.')
  let current: unknown = root
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    current = (current as Record<string, unknown>)[key]
  }
  const lastKey = parts[parts.length - 1]
  const parent = current as Record<string, unknown>
  if (Array.isArray(parent)) {
    parent[parseInt(lastKey, 10)] = value
  } else {
    parent[lastKey] = value
  }
}

/** Traduz uma string PT → EN */
async function translateText(text: string): Promise<string> {
  if (!text.trim()) return text
  const params = new URLSearchParams({
    q: text.slice(0, MAX_CHARS),
    langpair: 'pt|en',
  })
  const res = await fetch(`${API}?${params}`)
  const data = await res.json()
  if (data.responseStatus === 200 && data.responseData?.translatedText) {
    return data.responseData.translatedText
  }
  return text
}

/** Pequena pausa para não estourar rate limit */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Traduz um objeto cujas folhas são strings (PT → EN).
 * Usa cache no localStorage; se não houver cache, chama a API e salva.
 */
export async function translateObject<T extends Record<string, unknown>>(
  source: T,
  options?: { useCache?: boolean; onProgress?: (done: number, total: number) => void }
): Promise<T> {
  const useCache = options?.useCache !== false
  if (useCache && typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        return JSON.parse(cached) as T
      }
    } catch {
      // ignore
    }
  }

  const flat = collectStrings(source)
  const keys = Object.keys(flat)
  const total = keys.length
  const translated: Record<string, string> = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const text = flat[key]
    translated[key] = await translateText(text)
    options?.onProgress?.(i + 1, total)
    await delay(150) // evitar rate limit
  }

  // Reconstruir objeto com mesma estrutura que source
  const result = JSON.parse(JSON.stringify(source)) as T
  for (const [path, value] of Object.entries(translated)) {
    setAtPath(result as unknown as Record<string, unknown>, path, value)
  }

  if (useCache && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(result))
    } catch {
      // ignore
    }
  }

  return result
}

export function getCachedEnTranslations(): Record<string, unknown> | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    return cached ? (JSON.parse(cached) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export function clearTranslationCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch {
    // ignore
  }
}
