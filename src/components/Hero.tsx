import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Instagram, Code2 } from 'lucide-react'
import { useLanguage } from '../components/ui/languageContext'

const Hero = () => {
  const { getSection } = useLanguage()
  const t = getSection('hero')

  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY < 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const currentRole = t.roles[currentIndex]

    if (!isDeleting && text === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % t.roles.length)
      return
    }

    const timeout = setTimeout(() => {
      setText(current => 
        isDeleting 
          ? current.slice(0, -1)
          : currentRole.slice(0, current.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentIndex, t.roles])

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="particles">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-6 text-center relative z-10 mt-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cyber-blue font-mono text-lg mb-4"
          >
            {t.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Rafael</span>
            <br />
            <span className="text-cyber-white">Perez Silva</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-cyber-off-white mb-8 h-12 flex items-center justify-center"
          >
            <span className="font-mono">
              {text}
              <span className="animate-pulse text-cyber-blue">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-cyber-off-white max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(14, 165, 233, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToNext()}
              className="px-8 py-4 bg-gradient-cyber text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              {t.explore}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-semibold rounded-lg hover:bg-cyber-blue hover:text-white transition-all duration-300"
            >
              {t.contact}
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.2, color: '#0ea5e9' }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/RafaPerez05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-off-white hover:text-cyber-blue transition-colors duration-300"
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, color: '#8b5cf6' }}
              whileTap={{ scale: 0.9 }}
              href="https://www.instagram.com/rafaa_per3z/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-off-white hover:text-cyber-purple transition-colors duration-300"
            >
              <Instagram size={28} />
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.2, color: '#10b981' }}
              whileTap={{ scale: 0.9 }}
              className="text-cyber-off-white hover:text-cyber-green transition-colors duration-300 cursor-pointer"
            >
              <Code2 size={28} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - fixo no centro inferior da tela; some ao rolar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollButton ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToNext}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-cyber-blue animate-bounce cursor-pointer ${!showScrollButton ? 'pointer-events-none' : ''}`}
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  )
}

export default Hero