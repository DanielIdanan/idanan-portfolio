import laptop from "../../assets/daniel-laptop.webp";

const ojt = [
  ["Built a system for the staff", "I built AssessCore, a Flask-based register of property owners and assessments for the office."],
  ["Encoded hardcopy records", "Before that, I typed records from paper files into their old system."],
  ["Fixed printers", "I troubleshot printer problems whenever they came up."],
  ["Cabling and printing", "I did network cabling and helped out with printing jobs."],
];

const skills = [
  ["Programming languages", ["Python", "C", "JavaScript"]],
  ["Web technologies", ["Node.js", "HTML", "CSS"]],
  ["Database tools", ["MySQL", "PostgreSQL", "MongoDB (basic)", "XAMPP"]],
  ["Programming tools", ["Visual Studio Code", "Visual Studio"]],
  ["Design tools", ["Figma", "Canva"]],
];

export default function MobileAbout() {
  return (
    <>
      <section className="m-section m-section--top m-stack">
        <span className="m-eyebrow"><i />About</span>
        <h1 className="m-display m-display--xxl">I learn by doing.</h1>
        <p className="m-lead">
          I'm a third-year BSIT student at Gordon College in Olongapo City. I like the point where tech meets
          creativity, and most of my time goes into hardware setup and networking.
        </p>
        <p className="m-lead">
          I learn best by doing, so I'm looking for real projects where I can put my skills to work and get better.
        </p>
      </section>

      <div className="m-pad">
        <div className="m-photo m-photo--about">
          <img src={laptop} alt="Daniel working on a laptop" />
        </div>
      </div>

      <section className="m-section m-section--work">
        <span className="m-eyebrow"><i />OJT, City Assessor's Office</span>
        <h2 className="m-display m-display--lg">What I did on the job.</h2>
        <div className="m-list">
          {ojt.map(([title, text], i) => (
            <div className="m-ojt" key={title}>
              <span className="m-accent">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="m-section m-section--skills">
        <span className="m-eyebrow"><i />Skills</span>
        <h2 className="m-display m-display--lg">Skills &amp; tools.</h2>
        <div className="m-list">
          {skills.map(([label, items]) => (
            <div className="m-skill" key={label}>
              <div className="m-skill__head">
                <h3>{label}</h3>
                <span>{items.length} skills</span>
              </div>
              <div className="m-pills">
                {items.map((i) => <span key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
