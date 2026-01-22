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
