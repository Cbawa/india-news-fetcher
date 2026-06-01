// Thin wrapper around the newsdata.io /news endpoint.
// Requests go to the local `/api` path; the Vite dev proxy forwards them to
// https://newsdata.io/api/1 and injects the apikey (see vite.config.js).

const BASE = '/api'

/**
 * Fetch latest India news.
 * @param {{category?: string, query?: string, page?: string|null}} opts
 * @returns {Promise<{results: any[], nextPage: string|null, totalResults: number}>}
 */
export async function fetchNews({ category = 'top', query = '', page = null } = {}) {
  const params = new URLSearchParams()
  // Free-tier-safe parameters only.
  params.set('country', 'in')
  params.set('language', 'en')
  if (category) params.set('category', category)
  if (query) params.set('q', query)
  if (page) params.set('page', page)

  let res
  try {
    res = await fetch(`${BASE}/news?${params.toString()}`)
  } catch (err) {
    throw new Error('Network error \u2014 check your connection and that the dev server is running.')
  }

  let data = null
  try {
    data = await res.json()
  } catch (err) {
    data = null
  }

  const apiErrored = data && data.status === 'error'
  if (!res.ok || apiErrored) {
    const code = res.status
    const message = (data && (data.results?.message || data.message)) || ''

    if (code === 401) {
      throw new Error('Invalid API key (401). Check NEWSDATA_API_KEY in your .env file.')
    }
    if (code === 429) {
      throw new Error('Rate limit reached (429). The free plan allows a limited number of requests \u2014 wait a moment and try again.')
    }
    if (code === 403 || code === 422) {
      throw new Error('This request needs a paid plan. Falling back to free-tier defaults \u2014 try removing the search term or switching category.')
    }
    throw new Error(message || `Request failed (${code}). Please try again.`)
  }

  return {
    results: Array.isArray(data?.results) ? data.results : [],
    nextPage: data?.nextPage || null,
    totalResults: data?.totalResults || 0,
  }
}
