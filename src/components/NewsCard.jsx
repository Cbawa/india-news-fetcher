function formatDate(value) {
  if (!value) return ''
  // newsdata.io returns pubDate as 'YYYY-MM-DD HH:mm:ss' in UTC.
  const d = new Date(value.replace(' ', 'T') + 'Z')
  if (isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function NewsCard({ article }) {
  const { title, link, description, source_id, pubDate, image_url } = article

  return (
    <article className="card">
      {image_url && (
        <div className="card__media">
          <img
            src={image_url}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.parentElement.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="card__body">
        <h2 className="card__title">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title || 'Untitled'}
            </a>
          ) : (
            title || 'Untitled'
          )}
        </h2>
        {description && <p className="card__desc">{description}</p>}
        <div className="card__meta">
          <span className="card__source">{source_id || 'unknown source'}</span>
          <span className="card__date">{formatDate(pubDate)}</span>
        </div>
      </div>
    </article>
  )
}
