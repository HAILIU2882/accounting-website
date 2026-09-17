# Flexpath Tax – Professional Accounting Website

This repository contains the source code for the **Flexpath Tax** public website.

Flexpath Tax provides professional tax accounting and advisory services for individuals, freelancers, and small businesses. The website is designed to be fast, secure, easy to maintain, and cost-effective by using a **static site architecture**.

---

## 📌 Project Overview

- **Type:** Static marketing website
- **Purpose:** Promote accounting and tax services, showcase professional experience, and receive client enquiries
- **Target audience:** Individuals, freelancers, and small businesses
- **Maintenance:** Manual updates by site owner

---

## 🧱 Tech Stack

- **HTML5** – Core structure
- **Tailwind CSS (CDN)** – Styling
- **Vanilla JavaScript** – Header/footer partial loading
- **Netlify** – Hosting, SSL, and form handling
- **Gmail** – Enquiry notifications (via Netlify Forms)

No backend server or database is required.

---

## 📁 Project Structure

```plaintext
accounting-website/
├── index.html          # Homepage
├── about.html          # Qualifications & background
├── services.html       # Services offered
├── experience.html     # Professional experience
├── contact.html        # Enquiry form
├── partials/
│   ├── header.html     # Shared site header
│   └── footer.html     # Shared site footer
├── assets/
│   ├── logo.png        # Logo + favicon
│   └── images/         # Optional images
└── README.md
```

## Visual design and motion

The shared visual system lives in `assets/css/design.css`; progressive motion and navigation behavior live in `assets/js/design.js`. Homepages use an inline SVG illustration, system fonts, and native browser animations. No animation framework or build step is required.

Both languages include the same hero, services, estimate and process layouts. Motion respects `prefers-reduced-motion`, and visitors can pause it with the corner control. The choice lasts for the browser session. Quotes and enquiry submission retain their existing logic.

Navigation uses a floating, translucent pill bar with a centred Flexpath brand, a native expandable menu, a language switch and a consultation link. It stays visible on scroll and adapts to narrow screens. The menu supports Escape and outside-click dismissal; its native disclosure also works without JavaScript.

Navigation and footers are embedded in each HTML page for immediate rendering and access without JavaScript. After editing a file in `partials/`, run:

```sh
python3 scripts/sync_layout.py
bash scripts/check_i18n_parity.sh
```

The existing Tailwind CDN is still required for utility styles. Hosting and form handling remain unchanged.

## Local preview

Run `python3 scripts/preview.py` from the `website` folder, then open
`http://127.0.0.1:8765/`. This server applies the exact local redirects and
rewrites in `_redirects`, so clean URLs such as `/contact` and `/zh/contact`
work in preview. A plain `python3 -m http.server` does not apply those rules.
Netlify form submissions still require the hosted site.
