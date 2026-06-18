#!/usr/bin/env python
"""Convert CV_Cao_Viet_Hoang.md to styled HTML and print it to PDF via Chrome/Edge.

Builds two variants from the same Markdown source:
  - CV_Cao_Viet_Hoang.pdf      : with avatar photo (for VN/JP/DE submissions)
  - CV_Cao_Viet_Hoang_ATS.pdf  : no photo (for US/global ATS systems)

Usage:
  python build_cv_pdf.py            # build both variants
  python build_cv_pdf.py --no-photo # build only the no-photo ATS variant
  python build_cv_pdf.py --photo    # build only the photo variant
"""
import argparse
import base64
import mimetypes
import shutil
import subprocess
from pathlib import Path
import markdown

SRC = Path("CV_Cao_Viet_Hoang.md")
HTML_OUT = Path("CV_Cao_Viet_Hoang.html")
PDF_OUT = Path("CV_Cao_Viet_Hoang.pdf")
PDF_OUT_ATS = Path("CV_Cao_Viet_Hoang_ATS.pdf")
AVATAR = Path("CV_picture_avatar.jpg")

# Candidate browser binaries, in priority order; first existing one wins.
CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def find_browser():
    for candidate in CHROME_CANDIDATES:
        if Path(candidate).exists():
            return candidate
    for name in ("chrome", "google-chrome", "msedge", "chromium"):
        found = shutil.which(name)
        if found:
            return found
    raise FileNotFoundError(
        "No Chrome/Edge/Chromium binary found. Install Chrome or edit CHROME_CANDIDATES."
    )

CSS = """
@page { size: A4; margin: 16mm 16mm; }
* { box-sizing: border-box; }
body {
  font-family: "Calibri", "Segoe UI", Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.45;
  color: #222;
  margin: 0;
}
h1 {
  font-size: 24pt;
  margin: 0 0 3px 0;
  color: #1a3c66;
  letter-spacing: 0.3px;
}
h1 + p { /* role tagline */
  font-size: 11.5pt;
  font-weight: 600;
  color: #2c5d99;
  margin: 0 0 5px 0;
}
h2 {
  font-size: 14pt;
  color: #1a3c66;
  border-bottom: 1.5px solid #1a3c66;
  padding-bottom: 3px;
  margin: 16px 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
h3 {
  font-size: 11pt;
  margin: 11px 0 2px 0;
  color: #333;
}
p { margin: 4px 0; }
ul { margin: 6px 0 8px 0; padding-left: 18px; }
li { margin: 4px 0; }
ul ul { margin: 3px 0; }
strong { color: #1a3c66; }
h1 + p strong { color: inherit; } /* keep the role tagline a single color */
em { color: #555; font-style: italic; }
hr { border: none; border-top: 1px solid #ccc; margin: 6px 0 10px 0; }
a { color: #2c5d99; text-decoration: none; }
/* keep section headers attached to the content that follows */
h2, h3 { page-break-after: avoid; break-after: avoid; }
li, p { page-break-inside: avoid; break-inside: avoid; }
/* header with avatar */
.cv-header { display: flex; align-items: flex-start; gap: 22px; margin-bottom: 10px; }
.cv-header-text { flex: 1; min-width: 0; }
.cv-header-text h1 { margin-top: 0; }
.cv-header-text p:last-of-type { font-size: 10pt; }
.cv-avatar {
  width: 105px;
  height: 135px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}
"""


def avatar_data_uri():
    mime = mimetypes.guess_type(AVATAR.name)[0] or "image/jpeg"
    data = base64.b64encode(AVATAR.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def build_html(include_photo=True):
    text = SRC.read_text(encoding="utf-8")
    html_body = markdown.markdown(text, extensions=["extra", "sane_lists"])
    if include_photo and AVATAR.exists():
        marker = "<h2"
        head, sep, tail = html_body.partition(marker)
        avatar_img = f'<img class="cv-avatar" src="{avatar_data_uri()}" alt="Cao Viet Hoang" />'
        html_body = (
            f'<div class="cv-header"><div class="cv-header-text">{head}</div>'
            f"{avatar_img}</div>{sep}{tail}"
        )
    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Cao Viet Hoang — CV</title>
<style>{CSS}</style>
</head>
<body>
{html_body}
</body>
</html>"""
    HTML_OUT.write_text(doc, encoding="utf-8")
    print(f"Wrote {HTML_OUT}")


def build_pdf(browser, pdf_out):
    subprocess.run(
        [browser, "--headless", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={pdf_out.resolve()}", HTML_OUT.resolve().as_uri()],
        check=True,
    )
    print(f"Wrote {pdf_out}")


def main():
    parser = argparse.ArgumentParser(description="Build the CV PDF(s).")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--no-photo", action="store_true",
                       help="build only the no-photo ATS variant")
    group.add_argument("--photo", action="store_true",
                       help="build only the photo variant")
    args = parser.parse_args()

    browser = find_browser()
    print(f"Using browser: {browser}")

    if args.no_photo:
        variants = [(False, PDF_OUT_ATS)]
    elif args.photo:
        variants = [(True, PDF_OUT)]
    else:  # default: build both
        variants = [(True, PDF_OUT), (False, PDF_OUT_ATS)]

    for include_photo, pdf_out in variants:
        build_html(include_photo=include_photo)
        build_pdf(browser, pdf_out)


if __name__ == "__main__":
    main()
