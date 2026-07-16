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

const catGradients = {
  '收藏网站': 'linear-gradient(135deg, #667eea, #764ba2)',
  '工具': 'linear-gradient(135deg, #f093fb, #f5576c)',
  '学习资源': 'linear-gradient(135deg, #4facfe, #00f2fe)',
  '灵感': 'linear-gradient(135deg, #fa709a, #fee140)',
}

export default function Docs() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/materials/index.json')
      .then(r => r.json())
      .then(d => { setCategories(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <AS>
        <div className="section-header">
          <h1><i className="fas fa-book" style={{ color: 'var(--primary)' }} /> 资料收藏</h1>
          <p>收藏的网站 / 工具 / 学习资源等 🔖</p>
          <div className="section-line" />
        </div>
      </AS>

      {loading ? (
        <p className="text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }} />
          加载中...
        </p>
      ) : categories.length === 0 ? (
        <p className="text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
          <i className="fas fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }} />
          暂无内容
        </p>
      ) : categories.map((cat, ci) => (
        <section key={ci} className="materials-category" style={{ marginTop: ci === 0 ? '1rem' : '2.5rem' }}>
          <AS>
            <h2 className="materials-cat-title">
              <i className={`fas ${cat.icon || 'fa-folder'}`} style={{ color: 'var(--primary)', marginRight: '0.5rem' }} />
              {cat.category}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>
                ({cat.items.length})
              </span>
            </h2>
          </AS>
          <div className="materials-grid">
            {cat.items.map((item, i) => (
              <AS key={item.name} d={i * 0.05}>
                <div className="material-card">
                  <div
                    className="material-card-head"
                    style={{ background: catGradients[cat.category] || catGradients['收藏网站'] }}
                  >
                    <i className="fas fa-link" />
                  </div>
                  <div className="material-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    {item.soon ? (
                      <span className="btn btn-sm btn-disabled">
                        <i className="fas fa-clock" /> 待补充
                      </span>
                    ) : (
                      <a href={item.url} target="_blank" rel="noopener" className="btn btn-sm btn-primary">
                        <i className="fas fa-external-link-alt" /> 访问
                      </a>
                    )}
                  </div>
                </div>
              </AS>
            ))}
          </div>
        </section>
      ))}

      <AS d={0.2}>
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', background: 'var(--primary-bg)', borderRadius: 'var(--radius)' }}>
          <i className="fas fa-info-circle" style={{ color: 'var(--primary)', marginRight: '0.5rem' }} />
          <span className="text-muted">
            想添加收藏？编辑 <code style={{ background: 'white', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>public/materials/index.json</code>
          </span>
        </div>
      </AS>
    </div>
  )
}
