## Annika Salmi — Personal Website

Static website served via GitHub Pages.

### Structure
- `index.html`: About/home page
- `cv.html` + `cv.js`: Renders CV content dynamically
- `repositories.html` + `repositories.js`: Displays selected repos
- `science_writing.html`, `funstuff.html`: Content pages
- `sidebar.html` + `sidebar.js`: Shared sidebar (loaded dynamically)
- `style.css`: Global styles (desktop + mobile)
- `assets/`: Images and PDFs (CV and articles)

### Local development
You can open `index.html` directly in a browser, or serve locally for consistent behavior:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

### Deployment
- Pushing to `master` updates GitHub Pages (repo configured with `CNAME`).
- `.nojekyll` ensures assets (like PDFs) are served as-is.

### License
Personal site content © Annika Salmi. Code snippets MIT unless noted otherwise.