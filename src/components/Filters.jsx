// Every category slug the newsdata.io free tier accepts on /latest, ordered
// hard-news first. Verified against the live endpoint — an unknown slug comes
// back as an `UnsupportedFilter` error rather than an empty result set.
const CATEGORIES = [
  { id: 'top', label: 'Top' },
  { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' },
  { id: 'politics', label: 'Politics' },
  { id: 'technology', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'environment', label: 'Environment' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food' },
]

export default function Filters({ category, onCategoryChange, query, onQueryChange, onSearch }) {
  return (
    <div className="filters">
      <div className="filters__tabs" role="tablist" aria-label="News categories">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={category === c.id}
            className={'tab' + (category === c.id ? ' tab--active' : '')}
            onClick={() => onCategoryChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form
        className="filters__search"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
        }}
      >
        <input
          type="search"
          placeholder="Search headlines…"
          value={query}
          aria-label="Search headlines"
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
