import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <div className="page">
      <h1 className="page__title">Projects</h1>
      <div className="projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  )
}
