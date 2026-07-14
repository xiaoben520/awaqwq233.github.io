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
  { icon: 'fa-code', bg: '#EDF2FF', color: '#4263EB', title: '编程', desc: 'C# / Python / Web 开发' },
  { icon: 'fa-heartbeat', bg: '#FFF0F5', color: '#E64980', title: '小玩具', desc: '做有趣的小项目、小工具' },
  { icon: 'fa-graduation-cap', bg: '#E6FCF5', color: '#1098AD', title: '学习', desc: '武汉大学 · 软件工程' },
]

const timeline = [
  { title: '开始搭建个人网站', time: '2025 年 10 月', desc: '使用 GitHub Pages 搭建了个人网站' },
  { title: '武汉大学 · 软件工程', time: '2024 - 至今', desc: '学习软件开发、数据结构与算法等课程' },
  { title: '开始在 GitHub 上活动', time: '2017 年 3 月', desc: '注册 GitHub 账号，开始了开源之旅' },
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
            <p>你好哇，这里是 <strong>awaqwq233</strong>，最常见的缩写是 <strong>awa</strong>。</p>
            <p>你也可以叫我 <strong>Shirakawa</strong>，<strong>Pure Memory</strong>，<strong>Cynthia</strong>，以及别的什么 w</p>
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
          <p>这里暂时用来存放我写的一些文章啦。内容主要涵盖技术笔记、项目心得、以及生活中的一些随想。</p>
          <p>本站使用 <strong>React</strong> 构建，部署在 <strong>GitHub Pages</strong> 上。主题以蓝色为主调，力求简洁、清晰、舒适。Hope you can enjoy it! :D</p>
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
