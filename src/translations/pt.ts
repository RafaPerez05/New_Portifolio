/**
 * Fonte única de textos em português.
 * O inglês é gerado automaticamente via API ao clicar no botão EN (e cacheado).
 */

export const navLabels = [
  { href: '#home', label: 'Início' },
  { href: '#about', label: 'Sobre' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Projetos' },
  { href: '#contact', label: 'Contato' },
]

export const hero = {
  greeting: "Olá, eu sou",
  description: "Profissional apaixonado por tecnologia, com experiência em desenvolvimento full-stack e UX design. Sempre buscando evoluir e inovar no mundo tech.",
  explore: "Veja Meu Trabalho",
  contact: "Fale Comigo",
  roles: [
    'Desenvolvedor Full Stack',
    'Especialista em UX Design',
    'Expert em React Native',
    'Entusiasta de Tecnologia'
  ]
}

export const about = {
  aboutMe: "Sobre Mim",
  getToKnow: "Conheça a pessoa por trás do código",
  myJourney: "Minha Jornada",
  journey1: "Graduado em Análise e Desenvolvimento de Sistemas pela Fatec de Presidente Prudente, desenvolvi uma base sólida tanto em aspectos técnicos quanto de design de software.",
  journey2: "Como Desenvolvedor Full Stack e Especialista em UX Design, minha paixão por novas tecnologias e curiosidade me impulsionam a evoluir constantemente no campo da tecnologia.",
  journey3: "Acredito que um ótimo software nasce da compreensão tanto da implementação técnica quanto da experiência humana. Essa filosofia guia minha abordagem em cada projeto.",
  interpersonal: "Habilidades Interpessoais",
  stats: [
    { number: '20', label: 'Anos', suffix: ' ', sublabel: '' },
    { number: '7', label: 'Projetos', suffix: '+', sublabel: '' },
    { number: '2', label: 'Anos', suffix: '+', sublabel: 'Experiência' },
    { number: '100', label: 'Paixão', suffix: '%', sublabel: '' },
  ],
  skills: [
    { icon: 'Users', title: 'Comunicação Eficaz', description: 'Comunicação clara e impactante com equipes e clientes' },
    { icon: 'Lightbulb', title: 'Resolução de Problemas', description: 'Soluções criativas para desafios técnicos complexos' },
    { icon: 'Palette', title: 'Criatividade', description: 'Pensamento inovador em design e visão artística' },
    { icon: 'Users', title: 'Empatia', description: 'Compreensão das necessidades dos usuários e da equipe' },
    { icon: 'Zap', title: 'Flexibilidade', description: 'Adaptação rápida a novas tecnologias e metodologias' },
    { icon: 'Code', title: 'Proatividade', description: 'Iniciativa e impulsionamento de projetos' },
  ],
  degree: "Análise e Desenvolvimento de Sistemas",
  college: "Fatec de Presidente Prudente",
  age: "20 anos",
  name: "Rafael Perez Silva"
}

export const skills = {
  TechnicalSkills: "Habilidades Técnicas",
  Technologiesandtools: "Tecnologias e ferramentas que utilizo para dar vida às ideias",
  CoreTechnologies: "Tecnologias Principais",
  DevelopmentTools: "Ferramentas de Desenvolvimento",
  Frontend: "Desenvolvimento Frontend",
  FrontendDesc: "Criando interfaces envolventes com frameworks modernos",
  Backend: "Desenvolvimento Backend",
  BackendDesc: "Construindo aplicações robustas e APIs",
  Mobile: "Desenvolvimento Mobile",
  MobileDesc: "Desenvolvendo aplicativos móveis multiplataforma",
}

export const projects = {
  title: "Meus Projetos",
  subtitle: "Uma coleção dos meus trabalhos mostrando habilidades de desenvolvimento e design criativo",
  categories: ['Todos', 'Designs', 'Projetos'],
  viewCode: "Ver Código →",
  designProject: "Projeto de Design",
  learnMore: "Saiba Mais →",
  moreTechSuffix: "mais",
  ctaTitle: "Quer ver mais do meu trabalho?",
  ctaDesc: "Veja meu perfil no GitHub para mais projetos e contribuições na comunidade open-source.",
  visitGithub: "Visitar Perfil no GitHub",
  list: [
    { name: 'Blog educacional para Energisa', description: 'Blog educacional desenvolvido para os Conselhos de Consumidores de Energia Concess.' },
    { name: 'App de rastreamento agrícola', description: 'Aplicativo React Native para rastreamento agrícola com monitoramento em tempo real e interface para o produtor.' },
    { name: 'Página Orbicode', description: 'Página criada para uma startup da qual sou parceiro.' },
    { name: 'Taxthrone', description: 'Site de consultoria tributária moderna. Foco em oportunidades fiscais, análise 360º e eficiência de caixa para empresas, com layout responsivo.' },
    { name: 'Site Cappellari Advogados Associados', description: 'Site institucional do escritório Cappellari, focado em direito tributário e restituição de ICMS para empresários do Simples Nacional no MS. Desenvolvido em WordPress.' },
    { name: 'Plataforma E-commerce', description: 'Site de vendas completo desenvolvido com técnicas de modelagem e padrões de design para arquitetura escalável.' },
    { name: 'Site educacional de estruturas de dados', description: 'Site educacional interativo para ensinar estruturas de dados com exemplos visuais e exercícios.' },
    { name: 'Plataforma de vendas em PHP', description: 'Protótipo de site de vendas em PHP seguindo padrão MVC para arquitetura de código limpa e mantível.' },
    { name: 'Folder promocional para eventos', description: 'Folder promocional criado para a marca Aguardente em eventos com apelo visual moderno.' },
    { name: 'Folder para redes sociais', description: 'Folder para redes sociais criado para uma marca de tereré para fortalecer sua presença digital.' },
  ]
}

export const contact = {
  header: "Entre em Contato",
  subtitle: "Pronto para começar seu próximo projeto? Vamos criar algo incrível juntos.",
  sendMessage: "Envie-me uma mensagem",
  name: "Nome",
  email: "Email",
  message: "Mensagem",
  placeholderName: "Seu nome",
  placeholderEmail: "seu.email@exemplo.com",
  placeholderMessage: "Me conte sobre seu projeto ou apenas diga olá...",
  sendButton: "Enviar Mensagem",
  success: "Mensagem enviada com sucesso! Retornarei em breve.",
  connect: "Vamos Conversar",
  connectText: "Estou sempre interessado em novas oportunidades e projetos empolgantes. Se você tem uma dúvida sobre meu trabalho, quer colaborar ou apenas dizer olá, sinta-se à vontade para entrar em contato!",
  location: "Localização",
  locationValue: "Presidente Prudente, SP, Brasil",
  emailInfo: "Email",
  emailValue: "Disponível sob solicitação",
  response: "Tempo de Resposta",
  responseValue: "Normalmente dentro de 24 horas",
  follow: "Siga-me",
  available: "Disponível para projetos",
  availableText: "Aberto a oportunidades freelancer e colaborações",
  socials: {
    github: "Veja meu código",
    instagram: "Acompanhe minha jornada"
  },
  errorSending: "Erro ao enviar. Tente novamente mais tarde."
}

export const footer = {
  description: "Desenvolvedor Full Stack & Especialista em UX Design apaixonado por criar soluções inovadoras com tecnologias de ponta.",
  quickLinks: "Links Rápidos",
  links: [
    { name: 'Sobre', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ],
  techStack: "Tecnologias",
  copyrightPrefix: "© {year} Rafael Perez Silva. Feito com",
  built: "Design e Desenvolvimento por Rafael",
  funFact: '"Tecnologia não é apenas minha profissão, é minha paixão" - Rafael',
}
