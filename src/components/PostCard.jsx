import { NavLink } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <article className="blog-post-card">
      <div className="post-meta">
        <span className="post-date">
          <i className="far fa-calendar-alt" /> {post.date}
        </span>
        <span className={`post-category ${post.category}`}>
          {post.categoryLabel || post.category}
        </span>
      </div>
      <h3>
        <a href={post.url}>{post.title}</a>
      </h3>
      <p>{post.excerpt}</p>
      {post.tags && (
        <div className="post-tags">
          {post.tags.map(t => (
            <span key={t} className="post-tag">#{t}</span>
          ))}
        </div>
      )}
    </article>
  )
}
