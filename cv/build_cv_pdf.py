#!/usr/bin/env python
"""Convert a CV Markdown file to styled HTML and print it to PDF via Chrome/Edge.

By default builds the Cao Viet Hoang CV (two variants, photo + ATS). Pass --src to
build any other CV Markdown file; output PDFs are named after the source file's
stem and written next to it (or into --out-dir / an explicit --out path).

Variants built from the same Markdown source:
  - <stem>.pdf      : with avatar photo (for VN/JP/DE submissions)
  - <stem>_ATS.pdf  : no photo (for US/global ATS systems)

Usage:
  python build_cv_pdf.py                                  # default CV, both variants
  python build_cv_pdf.py --no-photo                       # default CV, ATS only
  python build_cv_pdf.py --photo                          # default CV, photo only
  python build_cv_pdf.py --src ../temp_cv/Foo.md --no-photo --out ../temp_cv/Foo.pdf
"""
import argparse
import base64
import mimetypes
import shutil
import subprocess
from pathlib import Path
import markdown

DEFAULT_SRC = Path("CV_Cao_Viet_Hoang.md")
DEFAULT_AVATAR_NAME = "CV_picture_avatar.jpg"

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
h4 {
  font-size: 10.5pt;
  margin: 9px 0 2px 0;
  color: #2c5d99;
  font-weight: 700;
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
h2, h3, h4 { page-break-after: avoid; break-after: avoid; }
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


def avatar_data_uri(avatar):
    mime = mimetypes.guess_type(avatar.name)[0] or "image/jpeg"
    data = base64.b64encode(avatar.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def display_name_from(src):
    """Derive a human display name from the source filename stem."""
    stem = src.stem
    if stem.startswith("CV_"):
        stem = stem[3:]
    if stem.endswith("_CV"):
        stem = stem[:-3]
    return stem.replace("_", " ").strip() or src.stem


def build_html(src, html_out, name, include_photo=True, avatar=None):
    text = src.read_text(encoding="utf-8")
    html_body = markdown.markdown(text, extensions=["extra", "sane_lists"])
    if include_photo and avatar is not None and avatar.exists():
        marker = "<h2"
        head, sep, tail = html_body.partition(marker)
        avatar_img = f'<img class="cv-avatar" src="{avatar_data_uri(avatar)}" alt="{name}" />'
        html_body = (
            f'<div class="cv-header"><div class="cv-header-text">{head}</div>'
            f"{avatar_img}</div>{sep}{tail}"
        )
    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{name} — CV</title>
<style>{CSS}</style>
</head>
<body>
{html_body}
</body>
</html>"""
    html_out.write_text(doc, encoding="utf-8")
    print(f"Wrote {html_out}")


def build_pdf(browser, html_out, pdf_out):
    subprocess.run(
        [browser, "--headless", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={pdf_out.resolve()}", html_out.resolve().as_uri()],
        check=True,
    )
    print(f"Wrote {pdf_out}")


def main():
    parser = argparse.ArgumentParser(description="Build the CV PDF(s).")
    parser.add_argument("--src", type=Path, default=DEFAULT_SRC,
                        help="source CV Markdown file (default: CV_Cao_Viet_Hoang.md)")
    parser.add_argument("--out-dir", type=Path, default=None,
                        help="directory for outputs (default: alongside --src)")
    parser.add_argument("--out", type=Path, default=None,
                        help="explicit output PDF path; requires --photo or --no-photo")
    parser.add_argument("--avatar", type=Path, default=None,
                        help="avatar image (default: CV_picture_avatar.jpg next to --src)")
    parser.add_argument("--name", default=None,
                        help="display name for HTML title/alt (default: derived from --src)")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--no-photo", action="store_true",
                       help="build only the no-photo ATS variant")
    group.add_argument("--photo", action="store_true",
                       help="build only the photo variant")
    args = parser.parse_args()

    src = args.src
    if not src.exists():
        raise FileNotFoundError(f"Source markdown not found: {src}")

    name = args.name or display_name_from(src)
    avatar = args.avatar or (src.parent / DEFAULT_AVATAR_NAME)

    if args.out is not None:
        if not (args.photo or args.no_photo):
            parser.error("--out requires --photo or --no-photo (a single variant)")
        out_pdf = args.out
        out_pdf.parent.mkdir(parents=True, exist_ok=True)
        jobs = [(bool(args.photo), out_pdf.with_suffix(".html"), out_pdf)]
    else:
        out_dir = args.out_dir or src.parent
        out_dir.mkdir(parents=True, exist_ok=True)
        html_out = out_dir / f"{src.stem}.html"
        pdf_out = out_dir / f"{src.stem}.pdf"
        pdf_out_ats = out_dir / f"{src.stem}_ATS.pdf"
        if args.no_photo:
            jobs = [(False, html_out, pdf_out_ats)]
        elif args.photo:
            jobs = [(True, html_out, pdf_out)]
        else:  # default: build both
            jobs = [(True, html_out, pdf_out), (False, html_out, pdf_out_ats)]

    browser = find_browser()
    print(f"Using browser: {browser}")

    for include_photo, html_out, pdf_out in jobs:
        build_html(src, html_out, name, include_photo=include_photo, avatar=avatar)
        build_pdf(browser, html_out, pdf_out)


if __name__ == "__main__":
    main()
