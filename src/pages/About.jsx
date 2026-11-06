import { skillGroups } from '../data/skills.js'

export default function About() {
  return (
    <div className="page">
      <h1 className="page__title">About me</h1>

      <section className="prose">
        <p>
          I am a third-year Bachelor of Science in Information Technology student at Gordon
          College, Olongapo City. My technical journey is driven by a deep interest in the
          intersection of technology and creativity, with a strong focus on hardware
          configuration and networking infrastructure.
        </p>
        <p>
          As an aspiring IT professional, I am dedicated to continuous learning and technical
          growth. I thrive on hands-on problem solving and am actively seeking opportunities to
          apply my skills to real-world projects.
        </p>
      </section>

      <section className="block">
        <h2>OJT experience</h2>
        <div className="prose">
          <p>
            I did my OJT at the City Assessor’s Office in Olongapo City Hall. My main role was to
            build a system that helps the staff work faster. Before that, I encoded information
            from hardcopy records into their old system. I also fixed a few printers, handled some
            network cabling, and did some printing.
          </p>
        </div>
      </section>

      <section className="block">
        <h2>Skills</h2>
        <dl className="skills">
          {skillGroups.map((group) => (
            <div className="skills__row" key={group.label}>
              <dt>{group.label}</dt>
              <dd>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
