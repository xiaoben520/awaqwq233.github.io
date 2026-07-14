import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useScrollReveal() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, show]
}

function AnimatedSection({ children, delay = 0, style }) {
  const [ref, show] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal${show ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  )
}

const features = [
  {
    to: '/blog',
    icon: 'fa-pen-fancy',
    bg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    title: '📝 博客',
    desc: '记录技术笔记、生活随想和项目心得。支持按分类和日期浏览。',
  },
  {
    to: '/toys',
    icon: 'fa-gamepad',
    bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    title: '🎮 小玩具',
    desc: '各种有趣的小项目和在线工具，部署在不同的服务器上，随时来玩。',
  },
  {
    to: '/about',
    icon: 'fa-user',
    bg: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    title: '👤 关于我',
    desc: '了解关于 awapwq233 的更多信息，包括经历、兴趣和联系方式。',
  },
]

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/blog/posts/index.json')
      .then(r => r.json())
      .then(d => setPosts(d.slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div className="page">
      {/* ====== Hero ====== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="shape s1" />
          <div className="shape s2" />
          <div className="shape s3" />
          <div className="shape s4" />
        </div>
        <div className="hero-content">
          <span className="hero-greeting">
            <span className="wave">👋</span> 你好哇，欢迎来到
          </span>
          <h1 className="hero-title">
            <span className="gradient-text">awaqwq233</span> 的小站
          </h1>
          <p className="hero-subtitle">
            这里是 <strong>awaqwq233</strong> 的个人空间。
            目前是武汉大学的学生，喜欢写代码、做小玩具、以及记录生活。
          </p>
          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">
              <i className="fas fa-book-open" /> 浏览博客
            </Link>
            <Link to="/toys" className="btn btn-glass">
              <i className="fas fa-rocket" /> 逛逛玩具
            </Link>
          </div>
        </div>
      </section>

      {/* ====== Features ====== */}
      <section className="features-section">
        <AnimatedSection>
          <div className="section-header">
            <h2>探索本站</h2>
            <div className="section-line" />
          </div>
        </AnimatedSection>

        <div className="features-grid">
          {features.map((f, i) => (
            <AnimatedSection key={f.to} delay={i * 0.1}>
              <Link to={f.to} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>
                  <i className={`fas ${f.icon}`} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="card-link">
                  前往探索 <i className="fas fa-arrow-right" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ====== Latest Posts ====== */}
      <section className="latest-section">
        <AnimatedSection>
          <div className="section-header">
            <h2>📌 最新文章</h2>
            <div className="section-line" />
          </div>
        </AnimatedSection>

        <div className="blog-list">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <AnimatedSection key={post.url} delay={i * 0.08}>
                <a href={post.url} className="blog-post-card blog-post-link">
                  <div className="post-meta">
                    <span className="post-date">
                      <i className="far fa-calendar-alt" /> {post.date}
                    </span>
                    <span className={`post-category ${post.category}`}>
                      {post.categoryLabel || post.category}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  {post.tags && (
                    <div className="post-tags">
                      {post.tags.map(t => <span key={t} className="post-tag">#{t}</span>)}
                    </div>
                  )}
                </a>
              </AnimatedSection>
            ))
          ) : (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>
              <i className="fas fa-spinner fa-spin" /> 加载中...
            </p>
          )}
        </div>

        <AnimatedSection delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="btn btn-outline">
              查看全部文章 <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
