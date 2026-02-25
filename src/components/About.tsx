import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code, Palette, Users, Lightbulb, Zap } from 'lucide-react'
import { useLanguage } from '../components/ui/languageContext'

const skillsIcons = { Users, Lightbulb, Palette, Zap, Code }

const About = () => {
  const { getSection } = useLanguage()
  const t = getSection('about')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* ... */}
          {/* Interpersonal Skills */}
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-cyber-white mb-6">
              {t.interpersonal}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {t.skills.map((skill, index) => {
                const IconComponent = skillsIcons[skill.icon]
                return (
                  <motion.div
                    key={skill.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                    className="p-4 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group"
                  >
                    <IconComponent className="text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300 mb-2" size={20} />
                    <h4 className="font-semibold text-cyber-white text-sm mb-1">{skill.title}</h4>
                    <p className="text-xs text-cyber-off-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
          {/* ... */}
          {/* Bottom Statistics */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={stat.label + stat.number + stat.suffix}
                whileHover={{ scale: 1.05 }}
                className="text-center glass p-6 rounded-xl"
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-cyber-off-white text-sm">
                  {stat.label}
                  {stat.sublabel && <br />}
                  {stat.sublabel && <span className="text-xs">{stat.sublabel}</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About