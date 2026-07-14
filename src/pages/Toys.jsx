import { useState, useEffect, useRef } from 'react'

function useScrollReveal() {
  const ref = useRef(null); const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, show]
}
function AS({ children, d = 0 }) {
  const [ref, show] = useScrollReveal()
  return <div ref={ref} className={`reveal${show ? ' visible' : ''}`} style={{ transitionDelay: `${d}s` }}>{children}</div>
}

const toys = [
  {
    name: '💓 Heartbeat',
    desc: '一个有趣的心跳互动应用，可以用来表达心意或者测试反应速度。',
    url: 'http://heartbeat.shenxianovo.com',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    icon: 'fa-heart',
  },
  {
    name: '🎵 更多精彩',
    desc: '更多小玩具正在开发中，敬请期待～',
    url: null,
    bg: 'linear-gradient(135deg, #f093fb, #f5576c)',
    icon: 'fa-music',
    soon: true,
  },
  {
    name: '🧩 更多项目',
    desc: '如果你有任何有趣的点子，欢迎联系我一起开发！',
    url: '/#/about',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    icon: 'fa-cubes',
    contact: true,
  },
]

export default function Toys() {
  return (
    <div className="page">
      <AS>
        <div className="section-header">
          <h1><i className="fas fa-gamepad" style={{ color: 'var(--primary)' }} /> 小玩具</h1>
          <p>一些有趣的小项目，部署在不同的服务器上 🚀</p>
          <div className="section-line" />
        </div>
      </AS>

      <div className="toys-grid">
        {toys.map((toy, i) => (
          <AS key={toy.name} d={i * 0.1}>
            <div className="toy-card">
              <div className="toy-card-img" style={{ background: toy.bg }}>
                <i className={`fas ${toy.icon}`} />
              </div>
              <div className="toy-card-body">
                <h3>{toy.name}</h3>
                <p>{toy.desc}</p>
                {toy.soon ? (
                  <span className="btn btn-sm btn-disabled">
                    <i className="fas fa-clock" /> 即将上线
                  </span>
                ) : toy.contact ? (
                  <a href={toy.url} className="btn btn-sm btn-primary">
                    <i className="fas fa-envelope" /> 联系我
                  </a>
                ) : (
                  <a href={toy.url} target="_blank" rel="noopener" className="btn btn-sm btn-primary">
                    <i className="fas fa-external-link-alt" /> 打开玩具
                  </a>
                )}
              </div>
            </div>
          </AS>
        ))}
      </div>
    </div>
  )
}
