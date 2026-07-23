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

const skills = [
  { icon: 'fa-code', bg: '#EDF2FF', color: '#4263EB', title: '编程', desc: '啥也不会，AI老虎机 开发' },
  { icon: 'fa-heartbeat', bg: '#FFF0F5', color: '#E64980', title: '小玩具', desc: '做有趣的小项目、小工具' },
  { icon: 'fa-graduation-cap', bg: '#E6FCF5', color: '#1098AD', title: '学习', desc: '武汉大学 · 软件工程' },
]

const timeline = [
  { title: '本网站确立', time: '2026 年 7 月', desc: 'AI就是好用（' },
  { title: '武汉大学 · 软件工程', time: '2024 - 至今', desc: '学计算机人生享受xnn生活喵' },
  { title: '注册github账号 命运的齿轮开始转动', time: '2017 年 3 月', desc: '注册 GitHub 账号，开始了开源之旅（哇我居然这么早就注册了）' },
]

export default function About() {
  return (
    <div className="page">
      {/* Profile */}
      <AS>
        <div className="about-profile">
          <img
            src="https://avatars.githubusercontent.com/u/26668842?v=4"
            alt="awaqwq233"
            className="about-avatar"
          />
          <div className="about-info">
            <h1>awaqwq233</h1>
            <p className="tagline">
              <i className="fas fa-map-pin" style={{ color: 'var(--primary)' }} /> Wuhan University
              &nbsp;·&nbsp; <i className="fas fa-code" /> C# / Python / Web
            </p>
            <p>你好哇，这里是 <strong>awaqwq233</strong>，也可以叫我 <strong>awa</strong>喵。</p>
            <div className="about-links">
              <a href="https://github.com/awaqwq23" target="_blank" rel="noopener">
                <i className="fab fa-github" /> GitHub
              </a>
              <a href="javascript:location.href='mailto:'+['awapwq233','outlook.com'].join('@')">
                <i className="fas fa-envelope" /> Email
              </a>
            </div>
          </div>
        </div>
      </AS>

      {/* About site */}
      <AS d={0.1}>
        <div className="about-section">
          <h2>📖 关于本站</h2>
          <p>存放点文章，网站、收藏和自己偷的时尚小垃圾（ 学计算机是这样的喵 即使不知道能干什么但还是做了</p>
          <p>本站使用 <strong>React</strong> 构建，部署在 <strong>GitHub Pages</strong> 上。我喜欢你喵！今天也要开心哦</p>
        </div>
      </AS>

      {/* Skills */}
      <AS d={0.15}>
        <div className="about-section">
          <h2>🎯 技能与兴趣</h2>
          <div className="skills-grid">
            {skills.map(s => (
              <div key={s.title} className="feature-card">
                <div className="feature-icon small" style={{ background: s.bg, color: s.color }}>
                  <i className={`fas ${s.icon}`} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AS>

      {/* Timeline */}
      <AS d={0.2}>
        <div className="about-section">
          <h2>📅 历程</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <h4>{item.title}</h4>
                <span className="time">{item.time}</span>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AS>
    </div>
  )
}
