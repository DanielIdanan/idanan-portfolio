export default function ProjectCard({ project, flip }) {
  return (
    <article className={`project${flip ? ' project--flip' : ''}`}>
      <img className="project__image" src={project.image} alt={project.alt} loading="lazy" />
      <div className="project__body">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </article>
  )
}
