import { useState, useEffect, useRef } from 'react'
import docs from '../data/docs'

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

export default function Docs() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(0)
  const topRef = useRef(null)

  useEffect(() => {
    setPage(0)
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [selected])

  const doc = selected ? docs.find(d => d.id === selected) : null

  if (doc) {
    const totalPages = doc.pages.length
    const hasMulti = totalPages > 1

    return (
      <div className="page" ref={topRef}>
        <AS>
          <div className="section-header">
            <h1>
              <i className="fas fa-file-alt" style={{ color: 'var(--primary)' }} />
              {' '}{doc.title}
            </h1>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              <i className="far fa-calendar-alt" /> {doc.date}
              {' · '}
              <span style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => setSelected(null)}>
                <i className="fas fa-arrow-left" /> 返回文档列表
              </span>
            </p>
            <div className="section-line" />
          </div>
        </AS>

        <AS d={0.1}>
          <div className="doc-content">
            {doc.pages[page].split('\n').map((line, i) => {
              const trimmed = line.trim()
              if (!trimmed) return <br key={i} />
              // Check if it looks like a heading (short line, ends with 篇 or is a section title)
              if (/^[^。，、：；？！\w\d]{0,4}?(篇|章|节|记)$/.test(trimmed) || /^(一|二|三|四|五|六|七|八|九|十)+[、.．]/.test(trimmed) || trimmed === '自传' || trimmed === '初中篇' || trimmed === '小学篇') {
                return <h3 key={i} className="doc-heading">{trimmed}</h3>
              }
              return <p key={i} className="doc-paragraph">{trimmed}</p>
            })}
          </div>
        </AS>

        {hasMulti && (
          <AS d={0.15}>
            <div className="doc-pagination">
              <button
                className="btn btn-sm btn-primary"
                disabled={page === 0}
                onClick={() => { setPage(p => p - 1); topRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                <i className="fas fa-chevron-left" /> 上一页
              </button>
              <span className="doc-page-info">
                {page + 1} / {totalPages}
              </span>
              <button
                className="btn btn-sm btn-primary"
                disabled={page >= totalPages - 1}
                onClick={() => { setPage(p => p + 1); topRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                下一页 <i className="fas fa-chevron-right" />
              </button>
            </div>
          </AS>
        )}

        <AS d={0.2}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-sm" onClick={() => setSelected(null)}>
              <i className="fas fa-arrow-left" /> 返回文档列表
            </button>
          </div>
        </AS>
      </div>
    )
  }

  return (
    <div className="page">
      <AS>
        <div className="section-header">
          <h1><i className="fas fa-book" style={{ color: 'var(--primary)' }} /> 文档</h1>
          <p>一些写过的文章和记录 📝</p>
          <div className="section-line" />
        </div>
      </AS>

      <div className="docs-list">
        {docs.map((d, i) => (
          <AS key={d.id} d={i * 0.1}>
            <div className="doc-card" onClick={() => setSelected(d.id)} style={{ cursor: 'pointer' }}>
              <div className="doc-card-body">
                <h3>
                  <i className="fas fa-file-alt" style={{ color: 'var(--primary)', marginRight: '0.5rem' }} />
                  {d.title}
                </h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <i className="far fa-calendar-alt" /> {d.date}
                  {' · '}
                  {d.pages.length > 1 ? `共 ${d.pages.length} 页` : '全文'}
                </p>
                <p>{d.summary}</p>
                <span className="btn btn-sm btn-primary" style={{ marginTop: '0.5rem' }}>
                  <i className="fas fa-book-open" /> 阅读
                </span>
              </div>
            </div>
          </AS>
        ))}
      </div>
    </div>
  )
}
