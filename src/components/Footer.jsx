const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Daniel D. Idanan, BSIT 3C, Gordon College, Olongapo City</p>
        <p>&copy; {year}</p>
      </div>
    </footer>
  )
}
