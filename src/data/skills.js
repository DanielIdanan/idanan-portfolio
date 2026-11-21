// level = how far along I am, in percent. It only drives the bar length; the label shown next to each bar
// comes from stageOf(), so the bar and the word can never disagree.
export const stageOf = (level) => (level >= 85 ? 'Confident' : level >= 70 ? 'Comfortable' : level >= 40 ? 'Practicing' : 'Learning')

export const skillGroups = [
  // TODO(Daniel): these three levels are placeholders. Set them to how you'd honestly rate yourself.
  { label: 'Hardware & networking', file: 'hardware', items: [
    { name: 'Hardware setup', level: 75 },
    { name: 'Network cabling', level: 60 },
    { name: 'Printer troubleshooting', level: 70 },
  ] },
  { label: 'Programming languages', file: 'languages', items: [
    { name: 'Python', level: 80 },
    { name: 'C', level: 30 },
    { name: 'JavaScript', level: 70 },
  ] },
  { label: 'Web technologies', file: 'web', items: [
    { name: 'Node.js', level: 50 },
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 100 },
  ] },
  { label: 'Database tools', file: 'databases', items: [
    { name: 'MySQL', level: 75 },
    { name: 'PostgreSQL', level: 60 },
    { name: 'MongoDB (basic)', level: 30 },
    { name: 'XAMPP', level: 75 },
  ] },
  { label: 'Programming tools', file: 'dev-tools', items: [
    { name: 'Visual Studio Code', level: 100 },
    { name: 'Visual Studio', level: 100 },
  ] },
  { label: 'Design tools', file: 'design', items: [
    { name: 'Figma', level: 85 },
    { name: 'Canva', level: 100 },
  ] },
]

export const aiTools = [
  { name: 'Claude', url: 'https://claude.ai' },
  { name: 'Gemini', url: 'https://gemini.google.com' },
  { name: 'ChatGPT', url: 'https://chatgpt.com' },
  { name: 'Grok', url: 'https://grok.com' },
]
