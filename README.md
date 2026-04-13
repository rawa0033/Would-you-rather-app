# Would You Rather

A small browser game: pick between two options, track simple stats, and browse recent answers. The UI uses **Bootstrap 5**, **vanilla JavaScript** (no build step), and a minimal **reset** plus **custom CSS**.

## Project files

| File        | Role |
|------------|------|
| `index.html` | Page structure, Bootstrap layout, links to CSS/JS |
| `reset.css`  | Light CSS reset |
| `style.css`  | App-specific styling (cards, OR badge, toast, nav) |
| `app.js`     | Game logic, routing, and `localStorage` persistence |

## How to run

**Option A — open the file**

Double-click `index.html` or open it from your editor’s “Open in browser” action.

**Option B — local server (recommended)**

Some browsers behave more predictably with hash routing and `localStorage` when the page is served over HTTP:

```bash
cd path/to/Would-you-rather-app
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

## Using the app

- **Play** (`#/play`): Choose **A** or **B**, or use **Skip** / **Random** for another prompt.
- **My Stats** (`#/stats`): See totals, **Recent answers**, and **Reset stats** (clears saved data for this site origin).

Stats are stored in **`localStorage`** under the key `wyr:bootstrap:v1` (per browser, per origin).

## Questions

Prompts live in `app.js` as `BASE_QUESTIONS` and `EXTENDED_QUESTIONS`, merged into one `QUESTIONS` array.

## Requirements

- A modern browser with JavaScript enabled.
- Internet access only for the Bootstrap **CDN** (CSS and JS bundles linked in `index.html`).
