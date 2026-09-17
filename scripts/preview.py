#!/usr/bin/env python3
"""Preview the static site with its exact local Netlify URL rules."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
RULES = {}
for line in (ROOT / "_redirects").read_text().splitlines():
    parts = line.split()
    if len(parts) >= 3 and parts[0].startswith("/") and "*" not in parts[0]:
        RULES[parts[0]] = (parts[1], int(parts[2].rstrip("!")))


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        url = urlsplit(self.path)
        rule = RULES.get(url.path)
        if rule and rule[1] in (301, 302):
            self.send_response(rule[1])
            self.send_header("Location", rule[0] + ("?" + url.query if url.query else ""))
            self.send_header("Content-Length", "0")
            self.end_headers()
            return None
        return super().send_head()

    def translate_path(self, path):
        url = urlsplit(path)
        rule = RULES.get(url.path)
        return super().translate_path(rule[0] if rule and rule[1] == 200 else path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    with ThreadingHTTPServer(("127.0.0.1", args.port), PreviewHandler) as server:
        print(f"Flexpath preview: http://127.0.0.1:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
