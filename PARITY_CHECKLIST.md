# EN/CN Parity Checklist (Pre-Deploy Gate)

Use this checklist before every publish to keep English and Chinese pages aligned.

## 1) Page Pair Mapping

- `index.html` ↔ `zh/index.html`
- `about.html` ↔ `zh/about.html`
- `services.html` ↔ `zh/services.html`
- `experience.html` ↔ `zh/experience.html`
- `blog.html` ↔ `zh/blog.html`
- `contact.html` ↔ `zh/contact.html`
- `terms.html` ↔ `zh/terms.html`
- `partials/header.html` ↔ `partials/header-zh.html`
- `partials/footer.html` ↔ `partials/footer-zh.html`

## 2) Required Checks for Any EN Change

- [ ] Matching CN file reviewed
- [ ] CTA meaning aligned (not necessarily literal translation)
- [ ] Booking flow logic aligned (`name`, `email`, `notes`, modal behavior)
- [ ] Quote estimator logic aligned (fields and calculation behavior)
- [ ] Metadata strategy aligned (`title`, `description`, OG/Twitter where used)
- [ ] Language switch links still correct

## 3) Quick Runbook

1. Make ENG change
2. Mirror in CN paired file
3. Run parity script:

```bash
cd /Users/hailiu/Desktop/accounting-website
bash scripts/check_i18n_parity.sh
```

4. Manually verify both URLs in browser:
   - `/index.html` and `/zh/index.html`
   - `/contact.html` and `/zh/contact.html`
5. Deploy only when all checks pass.

## 4) Notes

- Design can vary slightly by language, but core conversion behavior must match.
- If EN adds a new section (e.g., trust/conversion block), either add CN equivalent or explicitly mark exception in release notes.