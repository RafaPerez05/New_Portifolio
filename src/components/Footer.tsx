import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Instagram, Code2, ArrowUp } from 'lucide-react'
import { useLanguage } from '../components/ui/languageContext' // hook do contexto de idioma

const Footer = () => {
  const { getSection } = useLanguage()
  const t = getSection('footer')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-cyber-gray relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="font-mono text-xl font-bold gradient-text">
                &lt;Rafael/&gt;
              </div>
              <p className="text-cyber-off-white text-sm leading-relaxed">
                {t.description}
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.2, color: '#0ea5e9' }}
                  href="https://github.com/RafaPerez05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-off-white hover:text-cyber-blue transition-colors duration-300"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, color: '#8b5cf6' }}
                  href="https://www.instagram.com/rafaa_per3z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-off-white hover:text-cyber-purple transition-colors duration-300"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.2, color: '#10b981' }}
                  className="text-cyber-off-white hover:text-cyber-green transition-colors duration-300 cursor-pointer"
                >
                  <Code2 size={20} />
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-cyber-white font-semibold text-lg">{t.quickLinks}</h4>
              <nav className="space-y-2">
                {t.links.map((link) => (
                  <motion.button
                    key={link.name}
                    whileHover={{ x: 5, color: '#0ea5e9' }}
                    onClick={() => {
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="block text-cyber-off-white hover:text-cyber-blue transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-cyber-white font-semibold text-lg">{t.techStack}</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'React Native',
                  'PHP',
                  'MySQL',
                  'Tailwind CSS',
                  'Framer Motion'
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-2 py-1 bg-cyber-gray text-cyber-blue rounded border border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 text-center cursor-pointer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyber-gray mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-cyber-off-white text-sm flex items-center"
            >
              {t.copyrightPrefix.replace('{year}', String(currentYear))}{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="mx-1 text-red-500"
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>{' '}
              React
            </motion.p>

            <div className="flex items-center space-x-4">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-cyber-off-white text-sm"
              >
                {t.built}
              </motion.span>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#0ea5e9' }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="p-2 bg-cyber-gray hover:bg-cyber-blue text-cyber-blue hover:text-white rounded-full transition-all duration-300 border border-cyber-blue/30 hover:border-cyber-blue"
              >
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-cyber-off-white/60 text-xs font-mono">
              {t.funFact}
            </p>
          </motion.div>

          {/* Animated background element */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-cyber opacity-30 rounded-full"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer