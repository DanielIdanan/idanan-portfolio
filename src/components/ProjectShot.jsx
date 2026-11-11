// A looping 3D device shot: the screen tilts with floating glass layers and callouts, flattens, gets a scan sweep and a "done" pill, then tilts back.
export default function ProjectShot({ project, big = false }) {
  const { image, alt, points = [], done, glow = '#1f9d6b' } = project
  return (
    <div className={'ps' + (big ? ' ps-big' : '')} style={{ '--glow': glow }} role="img" aria-label={alt}>
      <div className="ps-glow" />
      <div className="ps-stage">
        <div className="ps-rig">
          <div className="ps-layer ps-back" />
          <div className="ps-layer ps-body">
            <img className="ps-screen" src={image} alt="" draggable="false" loading="lazy" />
            <span className="ps-scan" />
            <i className="ps-c ps-c1" /><i className="ps-c ps-c2" /><i className="ps-c ps-c3" /><i className="ps-c ps-c4" />
            {done && <span className="ps-pill">✓ {done}</span>}
          </div>
          <div className="ps-layer ps-glass" />
        </div>
      </div>
      <ul className="ps-pts" aria-hidden="true">
        {points.map((p, i) => (
          <li key={p}><span>0{i + 1}</span> {p}</li>
        ))}
      </ul>
    </div>
  )
}
