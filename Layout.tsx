@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-logoto-bg: #36393f;
  --color-logoto-footer: #2f3136;
  --color-logoto-item: #3a3d42;
  --color-logoto-code: #484c52;
  
  --color-logoto-olive: #8c935d;
  --color-logoto-olive-dark: #767d4f;
  --color-logoto-olive-light: #a3ab72;
}

body {
  background-color: var(--color-logoto-bg);
  color: #F2F3F5;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Custom Markdown styling for docs and legal text */
.markdown-body h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-logoto-olive-light);
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(242, 243, 245, 0.15);
  padding-bottom: 0.25rem;
}

.markdown-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-body p {
  margin-bottom: 1rem;
  opacity: 0.85;
  line-height: 1.6;
}

.markdown-body ul, .markdown-body ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  opacity: 0.85;
}

.markdown-body ul {
  list-style-type: disc;
}

.markdown-body ol {
  list-style-type: decimal;
}

.markdown-body li {
  margin-bottom: 0.5rem;
}

.markdown-body code {
  background-color: var(--color-logoto-code);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.875em;
  font-weight: 500;
}

.markdown-body a {
  color: var(--color-logoto-olive-light);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.markdown-body a:hover {
  color: var(--color-logoto-olive);
}

.markdown-body strong {
  font-weight: 600;
}
