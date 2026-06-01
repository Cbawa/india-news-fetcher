import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server proxies `/api/*` to newsdata.io and injects the API key
// (read from NEWSDATA_API_KEY) as the `apikey` query param. This keeps the
// key server-side so it never ends up in the browser bundle.
export default defineConfig(({ mode }) => {
  // '' prefix loads ALL env vars (not just VITE_*), including NEWSDATA_API_KEY.
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.NEWSDATA_API_KEY || ''

  if (!apiKey) {
    console.warn(
      '\n\u26a0\ufe0f  NEWSDATA_API_KEY is not set. Copy .env.example to .env and add your free key from https://newsdata.io/register\n'
    )
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://newsdata.io/api/1',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => {
            const stripped = path.replace(/^\/api/, '')
            const sep = stripped.includes('?') ? '&' : '?'
            return `${stripped}${sep}apikey=${encodeURIComponent(apiKey)}`
          },
        },
      },
    },
  }
})
