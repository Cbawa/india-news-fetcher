import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

// Resolve the initial theme: a previously saved choice wins, otherwise fall
// back to the OS preference, otherwise default to the app's native dark theme.
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage may be unavailable (private mode) */
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light'
  }
  return 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Reflect the current theme onto <html data-theme> and persist the choice.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore persistence errors */
    }
  }, [theme])

  const isDark = theme === 'dark'
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span aria-hidden="true">{isDark ? '\u2600\ufe0f' : '\ud83c\udf19'}</span>
    </button>
  )
}
