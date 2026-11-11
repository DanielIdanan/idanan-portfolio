import { Link } from "react-router-dom";
import photo from "../../assets/daniel.png";
import { projects } from "./projectsData";

export default function MobileHome() {
  return (
    <>
      <section className="m-hero">
        <h1 className="m-display m-display--xl">
          Daniel<span className="m-accent">.</span>
        </h1>
        <div className="m-photo">
          <img src={photo} alt="Daniel Idanan, portrait" />
        </div>
        <div className="m-tagrow">
          <span>Idanan, Daniel D.</span>
          <span>IT Student / Developer</span>
        </div>
      </section>

      <section className="m-section m-stack">
        <span className="m-eyebrow"><i />Hello</span>
        <h2 className="m-display m-display--md">Hardware &amp; networks, with a side of apps.</h2>
        <p className="m-lead">
          Hi, I'm Daniel, a third-year IT student at Gordon College in Olongapo City. I like working with
          hardware and networks, and I build apps when I can. Have a look at what I've made below.
        </p>
        <Link to="/projects" className="m-btn">View projects<span aria-hidden="true">→</span></Link>
      </section>

      <div className="m-marquee">
        <span>
          Hardware <b>·</b> Networking <b>·</b> Flask apps <b>·</b> Cabling <b>·</b> Olongapo City
        </span>
      </div>

      <section className="m-section m-section--work">
        <span className="m-eyebrow"><i />Selected work</span>
        <h2 className="m-display m-display--lg">Things I've built.</h2>
      </section>

      <section className="m-worklist">
        {projects.map((p) => (
          <Link to="/projects" key={p.n} className="m-work">
            {p.img ? <img src={p.img} alt={`${p.title} screen`} /> : <div className="m-work__ph" />}
            <div className="m-work__row">
              <div>
                <span className="m-eyebrow-sm">{p.n} / {p.tag}</span>
                <h3>{p.title}</h3>
              </div>
              <span className="m-sq" aria-hidden="true">↗</span>
            </div>
            <p>{p.short}</p>
          </Link>
        ))}
      </section>

      <section className="m-cta">
        <h2 className="m-display m-display--xl2">Open to internships.</h2>
        <Link to="/contact" className="m-btn m-btn--light">Say hello<span aria-hidden="true">→</span></Link>
      </section>

      <footer className="m-footer">
        <div className="m-display m-display--sm">Daniel Idanan</div>
        <div className="m-eyebrow-sm">BSIT 3C, Gordon College, Olongapo City</div>
        <a className="m-footer__row" href="mailto:202410394@gordoncollege.edu.ph">202410394@gordoncollege.edu.ph</a>
        <a className="m-footer__row" href="https://github.com/DanielIdanan" target="_blank" rel="noreferrer">github.com/DanielIdanan</a>
        <div className="m-footer__copy">© 2026 Daniel D. Idanan.</div>
      </footer>
    </>
  );
}
