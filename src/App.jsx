import { useCallback, useEffect, useState } from 'react'
import { fetchNews } from './api'
import Filters from './components/Filters'
import NewsCard from './components/NewsCard'

export default function App() {
  const [category, setCategory] = useState('top')
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [articles, setArticles] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(
    async ({ page = null, append = false } = {}) => {
      if (append) setLoadingMore(true)
      else setLoading(true)
      setError('')
      try {
        const data = await fetchNews({ category, query: submittedQuery, page })
        setArticles((prev) => (append ? [...prev, ...data.results] : data.results))
        setNextPage(data.nextPage)
      } catch (err) {
        setError(err.message)
        if (!append) {
          setArticles([])
          setNextPage(null)
        }
      } finally {
        if (append) setLoadingMore(false)
        else setLoading(false)
      }
    },
    [category, submittedQuery]
  )

  // Reload whenever the category or the submitted search term changes.
  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="app">
      <header className="header">
        <h1>\ud83c\uddee\ud83c\uddf3 India News Fetcher</h1>
        <p>
          Latest headlines powered by{' '}
          <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer">
            newsdata.io
          </a>
        </p>
      </header>

      <Filters
        category={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
        onSearch={() => setSubmittedQuery(query.trim())}
      />

      {error && <div className="banner banner--error">{error}</div>}

      {loading ? (
        <div className="status">Loading headlines\u2026</div>
      ) : articles.length === 0 && !error ? (
        <div className="status">No articles found. Try a different category or search term.</div>
      ) : (
        <main className="grid">
          {articles.map((article, index) => (
            <NewsCard
              key={(article.article_id || article.link || 'item') + '-' + index}
              article={article}
            />
          ))}
        </main>
      )}

      {!loading && nextPage && (
        <div className="loadmore">
          <button onClick={() => load({ page: nextPage, append: true })} disabled={loadingMore}>
            {loadingMore ? 'Loading\u2026' : 'Load more'}
          </button>
        </div>
      )}

      <footer className="footer">
        <p>Built with React + Vite \u00b7 Data from newsdata.io (free tier)</p>
      </footer>
    </div>
  )
}
