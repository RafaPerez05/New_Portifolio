import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { getSource, fetchEnTranslations, getEnFromCache, type Translations } from '../../translations'

type Language = 'en' | 'pt'

type SectionKey = keyof Translations

interface LanguageContextProps {
  language: Language
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  /** Retorna os textos da seção no idioma atual. EN é automático (cache ou API). */
  getSection: (section: SectionKey) => Translations[SectionKey]
  /** True enquanto as traduções EN estão sendo carregadas da API (primeira vez sem cache) */
  isLoadingTranslations: boolean
  /** Progresso da tradução: [concluídos, total] */
  translationProgress: { done: number; total: number } | null
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

const source = getSource()

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt')
  const [enTranslations, setEnTranslations] = useState<Translations | null>(() => getEnFromCache())
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false)
  const [translationProgress, setTranslationProgress] = useState<{ done: number; total: number } | null>(null)

  // Carregar cache de EN ao montar
  useEffect(() => {
    if (getEnFromCache() && !enTranslations) {
      setEnTranslations(getEnFromCache())
    }
  }, [enTranslations])

  const ensureEnLoaded = useCallback(async () => {
    if (enTranslations) return
    setIsLoadingTranslations(true)
    setTranslationProgress({ done: 0, total: 1 })
    try {
      const translated = await fetchEnTranslations((done, total) => {
        setTranslationProgress({ done, total })
      })
      setEnTranslations(translated)
    } catch {
      // Em caso de erro (rede, etc.), continuamos em PT
      setEnTranslations(null)
    } finally {
      setIsLoadingTranslations(false)
      setTranslationProgress(null)
    }
  }, [enTranslations])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (lang === 'en') {
      ensureEnLoaded()
    }
  }, [ensureEnLoaded])

  const toggleLanguage = useCallback(() => {
    const next = language === 'en' ? 'pt' : 'en'
    setLanguageState(next)
    if (next === 'en') {
      ensureEnLoaded()
    }
  }, [language, ensureEnLoaded])

  const getSection = useCallback((section: SectionKey): Translations[SectionKey] => {
    if (language === 'pt') {
      return source[section]
    }
    return (enTranslations ?? source)[section]
  }, [language, enTranslations])

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        getSection,
        isLoadingTranslations,
        translationProgress,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
