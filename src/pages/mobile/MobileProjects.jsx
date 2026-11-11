import { projects } from "./projectsData";

export default function MobileProjects() {
  return (
    <>
      <section className="m-section m-section--top">
        <span className="m-eyebrow"><i />Projects</span>
        <h1 className="m-display m-display--xxl">Things I've built.</h1>
        <p className="m-lead">Three projects so far: two Flask apps and a game. Tap a card to read more.</p>
      </section>

      <section className="m-cards">
        {projects.map((p) => (
          <article key={p.n} className="m-card">
            {p.img ? <img src={p.img} alt={`${p.title} screen`} /> : <div className="m-card__ph" />}
            <div className="m-card__body">
              <div className="m-chips">
                <span>{p.tag}</span>
                <span>{p.status}</span>
              </div>
              <div className="m-card__row">
                <div>
                  <h2>{p.title}</h2>
                  <div className="m-card__cat">{p.category}</div>
                </div>
                <span className="m-sq m-sq--light" aria-hidden="true">↗</span>
              </div>
              <p>{p.desc}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
