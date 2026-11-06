import { contacts } from '../data/contact.js'

export default function Contact() {
  return (
    <div className="page">
      <h1 className="page__title">Contact</h1>
      <p className="prose">
        <span>Email or call me about projects, internships, or anything tech.</span>
      </p>
      <ul className="contacts">
        {contacts.map((c) => (
          <li key={c.label}>
            <span className="contacts__label">{c.label}</span>
            <a href={c.href}>{c.value}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
