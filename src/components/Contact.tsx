import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, User, MessageSquare, Instagram, Github, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../components/ui/languageContext'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const { getSection } = useLanguage()
  const t = getSection('contact')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const result = await emailjs.send(
      "service_gbk1itu", // seu Service ID
      "template_2t36qrj", // seu Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      "_jkCjDGwksFc1wf9U" // seu Public Key
    )

    console.log("Email enviado:", result.text)
    setSubmitStatus(t.success)
    setFormData({ name: '', email: '', message: '' })
  } catch (error) {
    console.error("Erro ao enviar:", error)
    setSubmitStatus(t.errorSending)
  } finally {
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(''), 5000)
  }
}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/RafaPerez05',
      icon: Github,
      color: '#333',
      description: t.socials.github
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rafaa_per3z/',
      icon: Instagram,
      color: '#E4405F',
      description: t.socials.instagram
    }
  ]

  return (
    <section id="contact" ref={ref} className="py-20 relative">
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
              <span className="gradient-text">{t.header}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-8"></div>
            <p className="text-cyber-off-white text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-cyber-white mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-cyber-blue" size={24} />
                  {t.sendMessage}
                </h3>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-cyber-green/20 border border-cyber-green rounded-lg text-cyber-green text-sm"
                  >
                    {submitStatus}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-cyber-white font-medium mb-2">
                      {t.name}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-cyber-white placeholder-cyber-off-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                        placeholder={t.placeholderName}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-cyber-white font-medium mb-2">
                      {t.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-cyber-white placeholder-cyber-off-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                        placeholder={t.placeholderEmail}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-cyber-white font-medium mb-2">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-cyber-white placeholder-cyber-off-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300 resize-none"
                      placeholder={t.placeholderMessage}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-cyber text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="loading-dots"><span></span><span></span><span></span></div>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        {t.sendButton}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-cyber-white mb-6">{t.connect}</h3>
                <div className="space-y-6">
                  <p className="text-cyber-off-white leading-relaxed">{t.connectText}</p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-cyber-blue/20 rounded-lg mr-4"><MapPin className="text-cyber-blue" size={20} /></div>
                      <div>
                        <p className="text-cyber-white font-medium">{t.location}</p>
                        <p className="text-cyber-off-white text-sm">{t.locationValue}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-3 bg-cyber-green/20 rounded-lg mr-4"><Mail className="text-cyber-green" size={20} /></div>
                      <div>
                        <p className="text-cyber-white font-medium">{t.emailInfo}</p>
                        <p className="text-cyber-off-white text-sm">{t.emailValue}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-3 bg-cyber-purple/20 rounded-lg mr-4"><Phone className="text-cyber-purple" size={20} /></div>
                      <div>
                        <p className="text-cyber-white font-medium">{t.response}</p>
                        <p className="text-cyber-off-white text-sm">{t.responseValue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-cyber-white mb-6">{t.follow}</h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center p-4 rounded-lg border border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${social.color}20` }}>
                        <social.icon size={24} style={{ color: social.color }} />
                      </div>
                      <div>
                        <p className="text-cyber-white font-medium">{social.name}</p>
                        <p className="text-cyber-off-white text-sm">{social.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass p-6 rounded-2xl border border-cyber-green/30">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse mr-3"></div>
                  <div>
                    <p className="text-cyber-white font-medium">{t.available}</p>
                    <p className="text-cyber-off-white text-sm">{t.availableText}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
