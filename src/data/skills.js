export const skillGroups = [
  { label: 'Programming languages', items: ['Python', 'C', 'JavaScript'] },
  { label: 'Web technologies', items: ['Node.js', 'HTML', 'CSS'] },
  { label: 'Database tools', items: ['MySQL', 'PostgreSQL', 'MongoDB (basic)', 'XAMPP'] },
  { label: 'Programming tools', items: ['Visual Studio Code', 'Visual Studio'] },
  { label: 'Design tools', items: ['Figma', 'Canva'] },
]

export const totalSkills = skillGroups.reduce((sum, g) => sum + g.items.length, 0)
export const languageCount = skillGroups[0].items.length
