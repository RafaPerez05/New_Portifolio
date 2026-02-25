import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Smartphone, Globe, Palette, GraduationCap, ShoppingCart } from 'lucide-react'
import { useLanguage } from '../components/ui/languageContext'
import type { Translations } from '../translations'

const Projects = () => {
  const { language, getSection } = useLanguage()
  const t = getSection('projects') as Translations['projects']
  const ref = useRef(null)
  // amount: 0 = dispara assim que qualquer parte da seção entra na viewport (evita seção “invisível” no mobile)
  const isInView = useInView(ref, { once: true, amount: 0 })
  const [activeFilter, setActiveFilter] = useState(t.categories[0])

  // Dados estáticos (imagem, links, tecnologias). Nome e descrição vêm das traduções (t.list).
  const projectsBase = [
    { id: 0, image: '/images/concess.png', technologies: ['PHP', 'JavaScript', 'MYSQL', 'MVC Pattern'], site: 'https://www.concess.com.br/', category: 'Projects' as const, icon: Globe, featured: true },
    { id: 1, image: '/images/rastreia_agro.png', technologies: ['React Native', 'JavaScript', 'Mobile APIs', 'Agriculture Tech'], github: 'https://github.com/RafaPerez05/-rastreiaagro', site: 'https://www.figma.com/proto/y2IZy9BP577fjhPkRhLw9p/RastreiaAgro?page-id=33%3A154&node-id=1185-5917&node-type=CANVAS&viewport=1050%2C342%2C0.34&t=1c9LzPsGpij1RiUM-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1185%3A5917', category: 'Projects' as const, icon: Smartphone, featured: true },
    { id: 2, image: '/images/orbicode.png', technologies: ['HTML', 'CSS', 'JavaScript', 'UI/UX'], site: 'https://orbicode.com.br/', category: 'Projects' as const, icon: Globe, featured: true },
    { id: 8, image: '/images/taxthrone.png', technologies: ['Web Development', 'UI/UX', 'Responsive Design'], site: 'https://taxthrone.com.br/', category: 'Projects' as const, icon: Globe, featured: true },
    { id: 9, image: '/images/advmalcon.png', technologies: ['WordPress', 'PHP', 'UI/UX', 'Web'], site: 'https://advmalconcappellari.com/', category: 'Projects' as const, icon: Globe, featured: true },
    { id: 3, image: '/images/tocaDoBoi.png', technologies: ['PHP', 'MySQL', 'Design Patterns', 'E-commerce'], github: 'https://github.com/RafaPerez05/TocadoBoi', category: 'Projects' as const, icon: ShoppingCart, featured: true },
    { id: 4, image: '/images/ed.jpg', technologies: ['Web Development', 'Educational Tech', 'Interactive Learning'], github: 'https://github.com/Yan0606/Ambiente-E.D', category: 'Projects' as const, icon: GraduationCap, featured: true },
    { id: 5, image: '/images/ecommerce-mockup.png', technologies: ['PHP', 'MVC Pattern', 'Web Development', 'Backend'], github: 'https://github.com/RafaPerez05/xhopii-final-v3', category: 'Projects' as const, icon: Globe, featured: false },
    { id: 6, image: '/images/FolderGolden.jpg', technologies: ['Graphic Design', 'Brand Identity', 'Print Design'], category: 'Designs' as const, icon: Palette, featured: false },
    { id: 7, image: '/images/PropagandaBATATEC.jpg', technologies: ['Social Media Design', 'Brand Marketing', 'Visual Design'], category: 'Designs' as const, icon: Palette, featured: false },
  ]
  const projectList = t.list || []
  const projects = projectsBase.map((p, i) => ({
    ...p,
    name: projectList[i]?.name ?? '',
    description: projectList[i]?.description ?? '',
  }))


  // Atualiza o filtro quando o idioma ou as categorias traduzidas mudarem
  useEffect(() => {
    setActiveFilter(t.categories[0])
  }, [language, t.categories])

  // Categoria canônica: índice 1 = Design, 2 = Projetos/Projects
  const canonicalCategory = activeFilter === t.categories[1] ? 'Designs' : 'Projects'
  const filteredProjects = activeFilter === t.categories[0]
    ? projects
    : projects.filter(project => project.category === canonicalCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-visible min-h-[400px]">
      <div className="container mx-auto px-6">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto w-full"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.title}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-8"></div>
            <p className="text-cyber-off-white text-lg max-w-2xl mx-auto mb-8">
              {t.subtitle}
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4">
              {t.categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                    ? 'bg-gradient-cyber text-white shadow-lg'
                    : 'border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white'
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 ${project.featured ? 'lg:col-span-1 md:col-span-1' : ''
                  }`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-3">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-cyber-blue/80 rounded-full text-white hover:bg-cyber-blue transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={16} />
                          </motion.a>
                        )}
                        {project.site && (
                          <motion.a
                            href={project.site}
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-cyber-purple/80 rounded-full text-white hover:bg-cyber-purple transition-colors duration-300"
                          >
                            <ExternalLink size={16} />
                          </motion.a>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-cyber-blue/20 rounded-lg mr-3">
                      <project.icon size={20} className="text-cyber-blue" />
                    </div>
                    <span className="text-xs text-cyber-blue font-mono uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-cyber-white mb-3 group-hover:text-cyber-blue transition-colors duration-300">
                    {project.name}
                  </h3>

                  <p className="text-cyber-off-white text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-cyber-gray text-cyber-blue text-xs rounded border border-cyber-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-cyber-gray text-cyber-off-white text-xs rounded">
                        {`+${project.technologies.length - 3} ${t.moreTechSuffix}`}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-cyber-gray">
                    {project.github || project.site ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-blue hover:text-cyber-purple transition-colors duration-300 text-sm font-medium"
                      >
                        {t.viewCode}
                      </a>
                    ) : (
                      <span className="text-cyber-off-white text-sm">
                        {t.designProject}
                      </span>
                    )}
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-green hover:text-cyber-blue transition-colors duration-300 text-sm font-medium"
                    >
                      {t.learnMore}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-cyber-white mb-4">
                {t.ctaTitle}
              </h3>
              <p className="text-cyber-off-white mb-6">
                {t.ctaDesc}
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/RafaPerez05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-cyber text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Github className="mr-2" size={20} />
                {t.visitGithub}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
