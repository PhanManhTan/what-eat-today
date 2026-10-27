# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

---

## 🔒 Security & Privacy Commitments

1. **Local-First Architecture**: `what-eat-today` runs entirely client-side. Your biometrics, meal plans, and custom recipes are stored within your browser's IndexedDB database. No server backend receives your personal data by default.
2. **Zero Telemetry**: We do not include third-party analytics, behavioral tracking, or session replay scripts.
3. **Static Deployment**: When self-hosted via Docker or static hosting (Cloudflare Pages), the service serves pre-built static HTML, CSS, and JS files without server-side execution of untrusted code.

---

## 🛡️ Reporting a Vulnerability

If you discover a security vulnerability in `what-eat-today`:

1. Please do not disclose it in a public GitHub issue.
2. Report the vulnerability privately via GitHub Security Advisories on the repository or email the project maintainer.
3. We will acknowledge receipt within 48 hours and work with you to patch and disclose the issue responsibly.
