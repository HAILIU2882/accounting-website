#!/usr/bin/env python3
"""Embed shared navigation/footer in every page, so navigation works without JS."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
for language in ('en', 'zh'):
    folder = root / 'zh' if language == 'zh' else root
    suffix = '-zh' if language == 'zh' else ''
    for page in folder.glob('*.html'):
        text = page.read_text()
        for part in ('header', 'footer'):
            fragment = (root / 'partials' / f'{part}{suffix}.html').read_text().strip()
            pattern = rf'<div id="site-{part}">.*?</{part}></div>'
            text, count = re.subn(pattern, lambda _: f'<div id="site-{part}">{fragment}</div>', text, flags=re.S)
            if count != 1:
                raise ValueError(f'{page}: expected one embedded {part}, found {count}')
        page.write_text(text)
print('Synced English and Chinese navigation and footers.')
