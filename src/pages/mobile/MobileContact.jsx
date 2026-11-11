const contacts = [
  { label: "School email", value: "202410394@gordoncollege.edu.ph", href: "mailto:202410394@gordoncollege.edu.ph" },
  { label: "Personal email", value: "itzme.guyzzz@gmail.com", href: "mailto:itzme.guyzzz@gmail.com" },
  { label: "GitHub", value: "github.com/DanielIdanan", href: "https://github.com/DanielIdanan", external: true },
  { label: "Phone", value: "0963 894 3230", href: "tel:+639638943230" },
];

export default function MobileContact() {
  return (
    <>
      <section className="m-section m-section--top m-stack">
        <span className="m-eyebrow"><i />Contact</span>
        <h1 className="m-display m-display--xxl">Say hello.</h1>
        <p className="m-lead">Open to internships and real projects. Tap a row to get in touch.</p>
      </section>

      <section className="m-contacts">
        {contacts.map((c) => (
          <a key={c.label} href={c.href} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            <div>
              <div className="m-eyebrow-sm">{c.label}</div>
              <div className="m-contacts__val">{c.value}</div>
            </div>
            <span className="m-sq" aria-hidden="true">↗</span>
          </a>
        ))}
      </section>

      <div className="m-copy">© 2026 Daniel D. Idanan.</div>
    </>
  );
}
