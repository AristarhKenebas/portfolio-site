export const usePortfolioData = () => {
  const config = {
    name: 'Aristarh Kenebas',
    title: 'Junior Developer',
    location: 'Ukraine → Germany',
    description: 'Self-taught developer. Building things with TypeScript, Bun, and Linux.',
    available: true,
  }

  const skills = [
    'TypeScript', 'Bun', 'Git', 'Linux',
    'NixOS', 'Docker', 'Go', 'Bash',
    'Nuxt.js', 'Hyprland'
  ]

  const projects = [
    {
      name: 'daily-journal-bot',
      description: 'Personal Telegram bot that asks how your day went every evening and saves your answer as a Markdown file.',
      tags: ['TypeScript', 'Bun', 'grammY'],
      url: 'https://github.com/AristarhKenebas/daily-journal-bot'
    },
    {
      name: 'portfolio-site',
      description: 'Open source portfolio template. Fork it and make it yours.',
      tags: ['Nuxt', 'TypeScript', 'Tailwind'],
      url: 'https://github.com/AristarhKenebas/portfolio-site'
    }
  ]

  const contacts = [
    { label: 'github', value: 'AristarhKenebas', url: 'https://github.com/AristarhKenebas' },
    { label: 'telegram', value: '@kirck1414', url: 'https://t.me/kirck1414' },
    { label: 'discord', value: '@kirck1414', url: 'https://discord.com/users/kirck1414' },
    { label: 'email', value: 'arikkenebas09@gmail.com', url: 'mailto:arikkenebas09@gmail.com' },
  ]

  return { config, skills, projects, contacts }
}