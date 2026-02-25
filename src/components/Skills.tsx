import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Code, 
  Smartphone, 
  Palette, 
  Database, 
  Globe, 
  Cpu, 
  Monitor, 
  Layers,
  GitBranch,
  Cloud,
  Zap,
  Settings,
  Workflow
} from 'lucide-react'

import { useLanguage } from '../components/ui/languageContext'

const Skills = () => {
  const { getSection } = useLanguage()
  const t = getSection('skills')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technicalSkills = [
    { name: 'React & React Native', icon: Code, level: 95, color: '#61DAFB' },
    { name: 'TypeScript/JavaScript', icon: Zap, level: 90, color: '#3178C6' },
    { name: 'Node.js', icon: Settings, level: 85, color: '#339933' },
    { name: 'Database Design', icon: Database, level: 80, color: '#336791' },
    { name: 'UX/UI Design', icon: Palette, level: 90, color: '#FF6B6B' },
    { name: 'Mobile Development', icon: Smartphone, level: 88, color: '#25D366' },
    { name: 'Web Development', icon: Globe, level: 92, color: '#F7931E' },
    { name: 'System Architecture', icon: Cpu, level: 75, color: '#764ABC' },
  ]

  const softwareSkills = [
    { name: 'Git & GitHub', icon: GitBranch, level: 85 },
    { name: 'Docker', icon: Cloud, level: 70 },
    { name: 'Cursor AI', icon: Monitor, level: 95 },
    { name: 'Figma', icon: Layers, level: 88 },
    { name: 'N8n', icon: Workflow, level: 80 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`
    })
  }

  return (
    <section id="skills" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.TechnicalSkills}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-8"></div>
            <p className="text-cyber-off-white text-lg max-w-2xl mx-auto">
              {t.Technologiesandtools}
            </p>
          </motion.div>

          {/* Technical Knowledge */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold text-cyber-white mb-8 text-center">
              {t.CoreTechnologies}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-6 rounded-xl group hover:border-cyber-blue/40 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}` }}
                    >
                      <skill.icon 
                        size={24} 
                        style={{ color: skill.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-cyber-white mb-1">{skill.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-cyber-off-white text-sm">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-cyber-gray rounded-full h-2 mb-2">
                    <motion.div
                      variants={progressVariants}
                      custom={skill.level}
                      className="h-2 rounded-full relative overflow-hidden"
                      style={{ backgroundColor: skill.color }}
                    >
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30 animate-pulse"
                      ></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Software Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-cyber-white mb-8 text-center">
              {t.DevelopmentTools}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {softwareSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 25px rgba(14, 165, 233, 0.3)'
                  }}
                  className="glass p-6 rounded-xl text-center group cursor-pointer"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-cyber-blue/20 rounded-full group-hover:bg-cyber-blue/30 transition-all duration-300">
                      <skill.icon 
                        size={32} 
                        className="text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300"
                      />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-cyber-white mb-2 text-sm">
                    {skill.name}
                  </h4>
                  
                  <div className="w-full bg-cyber-gray rounded-full h-1.5">
                    <motion.div
                      variants={progressVariants}
                      custom={skill.level}
                      className="h-1.5 bg-gradient-cyber rounded-full"
                    ></motion.div>
                  </div>
                  
                  <span className="text-cyber-off-white text-xs mt-2 block">
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skill Categories Showcase */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t.Frontend,
                  description: t.FrontendDesc,
                  icon: Monitor,
                  color: '#61DAFB',
                  techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
                },
                {
                  title: t.Backend,
                  description: t.BackendDesc,
                  icon: Database,
                  color: '#339933',
                  techs: ['Node.js', 'PHP', 'MySQL', 'REST APIs']
                },
                {
                  title: t.Mobile,
                  description: t.MobileDesc,
                  icon: Smartphone,
                  color: '#25D366',
                  techs: ['React Native', 'Expo', 'Native APIs', 'App Store']
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="glass p-8 rounded-xl text-center group hover:border-cyber-blue/40 transition-all duration-500"
                >
                  <div className="flex justify-center mb-6">
                    <div 
                      className="p-4 rounded-full group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${category.color}20`, border: `2px solid ${category.color}` }}
                    >
                      <category.icon 
                        size={40} 
                        style={{ color: category.color }}
                      />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-cyber-white mb-4">
                    {category.title}
                  </h4>
                  
                  <p className="text-cyber-off-white mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.techs.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-cyber-gray text-cyber-blue text-xs rounded-full border border-cyber-blue/30 hover:border-cyber-blue transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
