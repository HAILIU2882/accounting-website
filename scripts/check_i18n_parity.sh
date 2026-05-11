#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

failures=0

check_pair_exists() {
  local en="$1"
  local zh="$2"
  if [[ ! -f "$ROOT/$en" ]]; then
    echo "❌ Missing EN file: $en"
    failures=$((failures+1))
  fi
  if [[ ! -f "$ROOT/$zh" ]]; then
    echo "❌ Missing ZH file: $zh"
    failures=$((failures+1))
  fi
}

check_contains_both() {
  local pattern="$1"
  local en="$2"
  local zh="$3"
  local label="$4"

  local en_has=0
  local zh_has=0

  grep -q "$pattern" "$ROOT/$en" && en_has=1 || true
  grep -q "$pattern" "$ROOT/$zh" && zh_has=1 || true

  if [[ "$en_has" != "$zh_has" ]]; then
    echo "⚠️  Parity mismatch for '$label': $en=$en_has, $zh=$zh_has"
    failures=$((failures+1))
  fi
}

echo "== Checking EN/CN file pairs =="
check_pair_exists "index.html" "zh/index.html"
check_pair_exists "about.html" "zh/about.html"
check_pair_exists "services.html" "zh/services.html"
check_pair_exists "experience.html" "zh/experience.html"
check_pair_exists "blog.html" "zh/blog.html"
check_pair_exists "contact.html" "zh/contact.html"
check_pair_exists "terms.html" "zh/terms.html"
check_pair_exists "partials/header.html" "partials/header-zh.html"
check_pair_exists "partials/footer.html" "partials/footer-zh.html"

echo "== Checking booking logic parity (contact pages) =="
check_contains_both "searchParams.set('name'" "contact.html" "zh/contact.html" "cal prefill name"
check_contains_both "searchParams.set('email'" "contact.html" "zh/contact.html" "cal prefill email"
check_contains_both "searchParams.set('notes'" "contact.html" "zh/contact.html" "cal notes"

echo "== Checking quote prefill parity =="
check_contains_both "prefillQuote" "contact.html" "zh/contact.html" "quote prefill"

echo "== Checking homepage metadata parity (OG/Twitter markers) =="
check_contains_both "og:title" "index.html" "zh/index.html" "og:title"
check_contains_both "twitter:card" "index.html" "zh/index.html" "twitter:card"

if [[ "$failures" -gt 0 ]]; then
  echo ""
  echo "❌ Parity check failed with $failures issue(s)."
  exit 1
fi

echo ""
echo "✅ Parity check passed. EN/CN critical markers are aligned."
