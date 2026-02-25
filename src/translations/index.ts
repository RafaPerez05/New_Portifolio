/**
 * Traduções: fonte única em PT; EN vem do cache ou da API automática.
 */
import * as pt from './pt'
import { translateObject, getCachedEnTranslations } from '../services/translate'

export type Language = 'en' | 'pt'

/** Objeto completo em português (fonte única para tradução) */
export function getSource() {
  return {
    navLabels: pt.navLabels,
    hero: pt.hero,
    about: pt.about,
    skills: pt.skills,
    projects: pt.projects,
    contact: pt.contact,
    footer: pt.footer,
  }
}

export type Translations = ReturnType<typeof getSource>

/** Busca traduções em inglês: primeiro do cache, senão chama a API e cacheia */
export async function fetchEnTranslations(
  onProgress?: (done: number, total: number) => void
): Promise<Translations> {
  const source = getSource()
  return translateObject(source, { useCache: true, onProgress })
}

/** Retorna traduções em inglês do cache (null se ainda não traduziu) */
export function getEnFromCache(): Translations | null {
  const cached = getCachedEnTranslations()
  return cached as Translations | null
}

export { pt }
export { clearTranslationCache } from '../services/translate'
