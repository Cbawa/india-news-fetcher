# 🇮🇳 India News Fetcher

A polished single-page app built with **React + Vite** that fetches the **latest India news** from the [newsdata.io](https://newsdata.io) REST API. Headlines are shown as cards with their source and publish date. You can filter by category (Top / Business / Sports) and search headlines with a keyword.

> Built entirely against the **newsdata.io FREE tier** — no paid features required.
<img width="1830" height="961" alt="Screenshot from 2026-08-25 10-59-47" src="https://github.com/user-attachments/assets/ad6dde1d-9d8d-4223-a4ba-0bf48ef1e6e7" />


## Screenshot


## Features

- ⚡️ Latest India headlines (`country=in`, `language=en`) from `GET /news`
- 🗂️ Category filter: **Top**, **Business**, **Sports**
- 🔎 Keyword search box (uses the free `q` parameter)
- 🃏 Responsive headline cards with title, description, **source** and **publish date**
- ➕ "Load more" pagination using the `nextPage` token
- 🛡️ Graceful error handling for invalid keys (401), rate limits (429), empty results, and paid-only requests (403/422)
- 🔐 Your API key stays **server-side** in development (injected by the Vite dev proxy), so it never ships in the browser bundle

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A free newsdata.io API key — [register here](https://newsdata.io/register)

## Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/your-username/india-news-fetcher.git
   cd india-news-fetcher
   npm install
   ```

2. **Add your API key.** Copy the example env file and paste your key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:

   ```bash
   NEWSDATA_API_KEY=your_api_key_here
   ```

   The app reads the key from the **`NEWSDATA_API_KEY`** environment variable. The Vite dev server appends it as the `apikey` query parameter to every request, so the key is never exposed to the browser.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the printed URL (usually http://localhost:5173).

## How it works

The browser calls a local path like `/api/news?country=in&category=top`. Vite's dev proxy (see `vite.config.js`) forwards that to `https://newsdata.io/api/1/news`, transparently adding `apikey=$NEWSDATA_API_KEY`. This keeps your key out of the client-side JavaScript.

```
browser ──> /api/news ──> [Vite proxy adds apikey] ──> https://newsdata.io/api/1/news
```

## Building for production

```bash
npm run build
npm run preview
```

> ⚠️ **Important:** The dev-server proxy that hides your API key only runs during `npm run dev`. A static production build cannot keep a secret key hidden — anything in the browser bundle is public. For a real deployment, put a small backend/serverless function in front of newsdata.io that injects the key, and point the app's `/api` calls at it. **Never commit your real key or ship it in client code.**

## Free-tier notes

This project uses only parameters available on the newsdata.io **free plan**: `q`, `country`, `language`, `category`, and `page` (the `nextPage` token) on the `/news` endpoint.

The following are **paid-only** and are intentionally **not used**:

- Sentiment analysis (`sentiment`)
- AI fields (`ai_tag`, `ai_region`, `ai_org`, `ai_summary`)
- The historical `/archive` endpoint and long date ranges
- Advanced full-text query operators

If newsdata.io returns a `403`/`422` "upgrade your plan" response, the app shows a friendly message and keeps working with the free-tier defaults.

## Project structure

```
├── index.html
├── vite.config.js          # dev proxy that injects the API key
├── package.json
├── .env.example
└── src
    ├── main.jsx
    ├── App.jsx             # state, fetching, layout
    ├── api.js              # fetch wrapper + error handling
    ├── index.css
    └── components
        ├── Filters.jsx     # category tabs + search
        └── NewsCard.jsx    # headline card
```

## License

MIT — free to use, learn from, and build on.

---

Data provided by [newsdata.io](https://newsdata.io).
