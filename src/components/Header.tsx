import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Languages } from 'lucide-react' // Adicione Languages
import { useLanguage } from '../components/ui/languageContext' // ajuste o caminho se necessário

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const { language, toggleLanguage, getSection, isLoadingTranslations, translationProgress } = useLanguage()
  const navLabels = getSection('navLabels') as { href: string; label: string }[]


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-md border-b border-cyber-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-mono text-xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            &lt;Rafael/&gt;
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLabels.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  color: '#0ea5e9'
                }}
                onClick={() => scrollToSection(item.href)}
                className="text-cyber-white hover:text-cyber-blue transition-colors duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-blue transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            {/* Botão de idioma */}
            <button
              onClick={toggleLanguage}
              disabled={isLoadingTranslations}
              title={isLoadingTranslations && translationProgress ? `Traduzindo... ${translationProgress.done}/${translationProgress.total}` : undefined}
              className="border border-cyber-blue px-3 py-1 rounded flex items-center text-cyber-blue hover:bg-cyber-blue hover:text-black transition-all duration-300 disabled:opacity-70"
            >
              <Languages className="w-4 h-4 mr-2" />
              {isLoadingTranslations ? '...' : language.toUpperCase()}
            </button>
          </div>

          {/* Mobile Menu Button + Botão de idioma */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleLanguage}
              disabled={isLoadingTranslations}
              className="border border-cyber-blue px-2 py-1 rounded flex items-center text-cyber-blue hover:bg-cyber-blue hover:text-black transition-all duration-300 disabled:opacity-70"
            >
              <Languages className="w-4 h-4 mr-1" />
              {isLoadingTranslations ? '...' : language.toUpperCase()}
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-cyber-white hover:text-cyber-blue transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navLabels.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 px-4 text-cyber-white hover:text-cyber-blue hover:bg-cyber-gray/50 rounded-lg transition-all duration-300"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header