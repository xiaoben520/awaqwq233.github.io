import { useState, useEffect, useRef } from 'react'
import PostCard from '../components/PostCard'

function useScrollReveal() {
  const ref = useRef(null); const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el) } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, show]
}
function AS({ children, d = 0 }) {
  const [ref, show] = useScrollReveal()
  return <div ref={ref} className={`reveal${show ? ' visible' : ''}`} style={{ transitionDelay: `${d}s` }}>{children}</div>
}

const catLabels = {
  all: '全部',
  tech: '💻 技术',
  life: '🌸 生活',
  dev: '⚙️ 开发',
  toy: '🎮 玩具',
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blog/posts/index.json')
      .then(r => r.json())
      .then(d => { setPosts(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(posts.map(p => p.category))]
  const filtered = posts
    .filter(p => category === 'all' || p.category === category)
    .sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date)
      return sort === 'newest' ? db - da : da - db
    })

  return (
    <div className="page">
      <AS>
        <div className="section-header">
          <h1><i className="fas fa-pen-fancy" style={{ color: 'var(--primary)' }} /> 博客</h1>
          <p>技术笔记 · 生活记录 · 项目心得</p>
          <div className="section-line" />
        </div>
      </AS>

      <AS d={0.1}>
        <div className="blog-controls">
          <div className="blog-filter-group">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {catLabels[cat] || cat}
              </button>
            ))}
          </div>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">最新优先</option>
            <option value="oldest">最早优先</option>
          </select>
          <span className="post-count">共 {filtered.length} 篇文章</span>
        </div>
      </AS>

      <div className="blog-list">
        {loading ? (
          <p className="text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }} />
            加载中...
          </p>
        ) : filtered.length > 0 ? (
          filtered.map((post, i) => (
            <AS key={post.url} d={i * 0.05}>
              <PostCard post={post} />
            </AS>
          ))
        ) : (
          <p className="text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }} />
            该分类暂无文章
          </p>
        )}
      </div>
    </div>
  )
}
