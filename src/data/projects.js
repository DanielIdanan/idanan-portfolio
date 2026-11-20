
import assesscore from '../assets/projects/assesscore.webp'
import ecosort from '../assets/projects/ecosort.webp'
import donkeyKong from '../assets/projects/donkey-kong.webp'
import sciCal from '../assets/projects/sci-cal.webp'

export const projects = [
  { title: 'AssessCore', img: assesscore, alt: "AssessCore property register showing one record with its owner, classification, area and assessed value", category: 'Property Assessment System', tag: 'Web app', status: "City Assessor's Office", description: "A web app I built for the Office of the City Assessor of Olongapo. It keeps the register of real property owners and assessments, fills out FAAS forms for land, buildings and machinery, and prints tax declarations. Staff sign in with role-based access.", url: 'https://assess-core-gamma.vercel.app' },
  { title: 'EcoSort', img: ecosort, alt: "EcoSort home screen with the Start Scanning button and the four waste categories", category: 'Live Waste Scanner', tag: 'Web app', status: 'Camera scanning', description: 'Point your camera at waste and it tells you which bin it goes in: recyclable, biodegradable, residual or hazardous. Web app with live multi-item detection, a MobileNetV2 model trained by transfer learning, a map with directions to drop-off points, and an AI explanation for hazardous items.', url: 'https://danielidanan.github.io/EcoSorts/' },
  { title: 'Donkey Kong (DSA Edition)', img: donkeyKong, alt: "Donkey Kong (DSA Edition) main menu with Play Game, Settings and Quit buttons", category: 'Game', tag: 'Game', status: 'Data structures & algorithms', description: 'A pixel-art Donkey Kong game I made to practice data structures and algorithms.', url: 'https://danielidanan.github.io/DK-and-Mario/' },
  { title: 'Sci-Cal', img: sciCal, alt: "Sci-Cal calculator in Standard mode with memory keys and a dark theme", category: 'Scientific Calculator', tag: 'Web app', status: 'Standard & Scientific modes', description: 'A calculator that runs in the browser, with a Standard and a Scientific mode, trig and other functions, memory keys and a history list.', url: 'https://danielidanan.github.io/Sci-Cal/' },
]
