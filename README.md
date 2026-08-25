# React News App — Live India Headlines from the newsdata.io News API

A **React news app** built with **React 18 + Vite**, fetching live India headlines from the [newsdata.io](https://newsdata.io) REST news API. Headlines render as cards with source and publish date, filterable across **11 categories**, with keyword search, "load more" pagination, and a dark/light theme.

**Built entirely on the newsdata.io free tier — no paid plan, no credit card, no paid-only parameters.**

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![News API](https://img.shields.io/badge/API-newsdata.io-1f6feb)](https://newsdata.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<img width="1830" height="961" alt="React news app showing India headlines fetched from the newsdata.io API, with category filter tabs and search" src="https://github.com/user-attachments/assets/ad6dde1d-9d8d-4223-a4ba-0bf48ef1e6e7" />

> **Live demo:** _not deployed yet_ — see [Building for production](#building-for-production).

---

## Features

- ⚡️ **Live India headlines** (`country=in`, `language=en`) from the `GET /latest` endpoint
- 🗂️ **11 category filters** — Top, World, Business, Politics, Technology, Science, Health, Environment, Sports, Entertainment, Food
- 🔎 **Keyword search** using the free `q` parameter
- 🃏 **Responsive news cards** with image, title, description, **source** and **publish date**
- ➕ **"Load more" pagination** via the `nextPage` token
- 🌗 **Dark / light theme** toggle, persisted across reloads
- 🛡️ **Real error handling** for invalid keys (401), rate limits (429), empty results, and paid-only requests (403/422)
- 🔐 **API key stays server-side** in development — injected by the Vite dev proxy, never shipped in the browser bundle

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 18 (hooks — `useState`, `useEffect`, `useCallback`) |
| Build | Vite 5 |
| Data | [newsdata.io](https://newsdata.io) REST news API (free tier) |
| Styling | Plain CSS with custom properties (no UI framework) |
| Key handling | Vite dev-server proxy |

No Redux, no component library, no CSS framework — small enough to read end to end in a few minutes.

## Quick start

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm, plus a free newsdata.io API key ([register here](https://newsdata.io/register)).

```bash
# 1. Clone & install
git clone https://github.com/cbawa/india-news-fetcher.git
cd india-news-fetcher
npm install

# 2. Add your API key
cp .env.example .env
```

Edit `.env` and paste your key:

```bash
NEWSDATA_API_KEY=your_api_key_here
```

```bash
# 3. Run it
npm run dev
```

Open the printed URL (usually http://localhost:5173).

## How it works

The browser calls a local path like `/api/latest?country=in&category=top`. Vite's dev proxy (see `vite.config.js`) forwards that to `https://newsdata.io/api/1/latest`, transparently appending `apikey=$NEWSDATA_API_KEY`. Your key never reaches the client-side JavaScript.

```
browser ──> /api/latest ──> [Vite proxy adds apikey] ──> https://newsdata.io/api/1/latest
```

## Categories

All 11 slugs below work on the **free plan** and map one-to-one to the tabs in the UI:

| Slug | Tab | Slug | Tab |
| --- | --- | --- | --- |
| `top` | Top | `environment` | Environment |
| `world` | World | `sports` | Sports |
| `business` | Business | `entertainment` | Entertainment |
| `politics` | Politics | `food` | Food |
| `technology` | Technology | | |
| `science` | Science | | |
| `health` | Health | | |

The free plan accepts up to **5 comma-separated categories** per request; this app sends exactly one at a time. An unrecognised slug returns an `UnsupportedFilter` error rather than an empty result set.

## Building for production

```bash
npm run build
npm run preview
```

> ⚠️ **Read this before deploying.** The dev-server proxy that hides your API key only runs during `npm run dev`. A static production build **cannot** keep a secret key hidden — anything in the browser bundle is public. For a real deployment, put a small backend or serverless function in front of newsdata.io that injects the key, and point the app's `/api` calls at it. **Never commit your real key or ship it in client code.**

## Free-tier notes

This project uses only parameters available on the newsdata.io **free plan**: `q`, `country`, `language`, `category`, and `page` (the `nextPage` token) on the `/latest` endpoint.

The following are **paid-only** and are intentionally **not used**:

- Sentiment analysis (`sentiment`)
- AI fields (`ai_tag`, `ai_region`, `ai_org`, `ai_summary`)
- The historical `/archive` endpoint and long date ranges
- Advanced full-text query operators

If newsdata.io returns a `403`/`422` "upgrade your plan" response, the app shows a friendly message and keeps working with free-tier defaults.

## FAQ

**Is there a free news API I can use with React?**
Yes — newsdata.io has a free tier, and this repo is a complete working example against it. No paid parameters are used anywhere.

**How do I hide an API key in a React app?**
You can't, in a purely static build — anything in the bundle is readable by any visitor. This project demonstrates the correct pattern: a proxy layer holds the key and the browser only ever calls your own endpoint. See [How it works](#how-it-works).

**Can I fetch news for a country other than India?**
Yes. `country` and `language` are set in [`src/api.js`](src/api.js) — change `'in'` to another supported country code and the rest of the app works unchanged.

**Can I search headlines by keyword?**
Yes, via the free `q` parameter — that's what the search box sends.

**Why are some categories empty for my query?**
Combining a narrow `q` with a specific category can legitimately return zero results. Clear the search box or switch category.

## Project structure

```
├── index.html
├── vite.config.js          # dev proxy that injects the API key
├── package.json
├── .env.example
├── LICENSE                 # MIT
└── src
    ├── main.jsx
    ├── App.jsx             # state, fetching, layout
    ├── api.js              # fetch wrapper + error handling
    ├── index.css           # base (dark) palette + layout
    ├── theme.css           # light-mode overrides
    └── components
        ├── Filters.jsx     # category tabs + search
        ├── NewsCard.jsx    # headline card
        └── ThemeToggle.jsx # dark/light switch (persisted)
```

## Contributing

Issues and pull requests are welcome — bug fixes, new filters, deployment recipes, or a UI pass. Fork the repo, branch off `main`, and open a PR.

## License

Released under the [MIT License](LICENSE) — free to use, learn from, and build on.

Copyright (c) 2026 NewsData.io.

---

**Keywords:** react news app · react news application · news app using react · newsdata.io api example · free news api · india news api · react rest api example · vite spa · javascript news aggregator

Data provided by [newsdata.io](https://newsdata.io) — a REST news API with global coverage and a free tier.
