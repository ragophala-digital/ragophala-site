"""
Builds the PRIVATE client-facing PDF: RAGOPHALA DIGITAL - Service Catalogue & Pricing Guide (2026 Edition).

Source of truth: private/catalogue.json, exported from src/lib/pricing.ts by `node private/export-catalogue.mjs`.
Prices are read from that file and never retyped here. Output goes to private/documents/ (git-ignored, never in /public).

Run:  node private/export-catalogue.mjs && python private/build-catalogue-pdf.py
Needs: reportlab
"""
import json
import os
import re
import sys

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

HERE = os.path.dirname(os.path.abspath(__file__))
CAT = json.load(open(os.path.join(HERE, "catalogue.json"), encoding="utf8"))
OUT_DIR = os.path.join(HERE, "documents")
OUT = os.path.join(OUT_DIR, "Ragophala-Digital-Service-Catalogue-and-Pricing-Guide-2026.pdf")
os.makedirs(OUT_DIR, exist_ok=True)

# ---- brand ---------------------------------------------------------------
NAVY = HexColor("#101827")
NAVY2 = HexColor("#182238")
IVORY = HexColor("#F5F3EF")
COBALT = HexColor("#315BFA")
SOFT = HexColor("#DCE5FF")
CHAR = HexColor("#242B39")
SLATE = HexColor("#A7B1C2")
MUTED = HexColor("#566075")
LINE = HexColor("#DAD6CE")

for name, file in [("Sora", "Sora-Regular"), ("Sora-SB", "Sora-SemiBold"), ("Sora-B", "Sora-Bold"), ("Inter", "Inter-Regular"), ("Inter-SB", "Inter-SemiBold"), ("Mono", "JetBrainsMono-Regular")]:
    pdfmetrics.registerFont(TTFont(name, os.path.join(HERE, "fonts", f"{file}.ttf")))

W, H = A4
M = 46
CW = W - 2 * M
TITLE = "RAGOPHALA DIGITAL  -  SERVICE CATALOGUE & PRICING GUIDE  -  2026"


def contact_lines():
    """Verified details only: taken from the project's public env settings, never invented."""
    vals = {}
    for f in (".env", ".env.local"):
        p = os.path.join(HERE, "..", f)
        if os.path.exists(p):
            for line in open(p, encoding="utf8"):
                m = re.match(r"^(NEXT_PUBLIC_CONTACT_EMAIL|NEXT_PUBLIC_WHATSAPP_NUMBER|NEXT_PUBLIC_SITE_URL)=(.*)$", line.strip())
                if m and m.group(2).strip().strip('"'):
                    vals[m.group(1)] = m.group(2).strip().strip('"')
    out = []
    if vals.get("NEXT_PUBLIC_CONTACT_EMAIL"):
        out.append(("Email", vals["NEXT_PUBLIC_CONTACT_EMAIL"]))
    if vals.get("NEXT_PUBLIC_WHATSAPP_NUMBER"):
        out.append(("WhatsApp", vals["NEXT_PUBLIC_WHATSAPP_NUMBER"]))
    if vals.get("NEXT_PUBLIC_SITE_URL") and "localhost" not in vals["NEXT_PUBLIC_SITE_URL"]:
        out.append(("Website", vals["NEXT_PUBLIC_SITE_URL"]))
    return out


c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Ragophala Digital - Service Catalogue & Pricing Guide (2026 Edition)")
c.setAuthor("Ragophala Digital")
c.setSubject("Private client document: service catalogue and pricing guide")

state = {"y": 0, "page": 0, "section": ""}


def wrap(text, font, size, width):
    return simpleSplit(text, font, size, width)


def text(x, y, s, font="Inter", size=10, color=CHAR, align="left"):
    w = c.stringWidth(s, font, size)
    if align == "right":
        x -= w
    elif align == "center":
        x -= w / 2
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(0)
    t.textOut(s)
    c.drawText(t)


def paragraph(x, y, s, width, font="Inter", size=10, color=CHAR, leading=None):
    leading = leading or size * 1.5
    for line in wrap(s, font, size, width):
        text(x, y, line, font, size, color)
        y -= leading
    return y


def para_height(s, width, font="Inter", size=10, leading=None):
    return len(wrap(s, font, size, width)) * (leading or size * 1.5)


def spaced(x, y, s, size=7.5, color=MUTED, spacing=1.6, font="Mono"):
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(spacing)
    t.textOut(s.upper())
    c.drawText(t)


def footer():
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(M, 40, W - M, 40)
    spaced(M, 26, "Ragophala Digital  /  Service Catalogue & Pricing Guide  /  2026", 6.5, MUTED, 1.1)
    text(W - M, 26, f"{state['page']:02d}", "Mono", 8, COBALT, "right")


def new_page(section=""):
    if state["page"] > 0:
        footer()
        c.showPage()
    state["page"] += 1
    state["section"] = section or state["section"]
    c.setFillColor(IVORY)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    # top band
    c.setFillColor(NAVY)
    c.rect(0, H - 34, W, 34, stroke=0, fill=1)
    text(M, H - 22, "RAGOPHALA", "Sora-B", 9, white)
    text(M + 64, H - 22, "DIGITAL", "Sora", 9, SLATE)
    c.setFillColor(COBALT)
    c.circle(M + 109, H - 20.5, 1.6, stroke=0, fill=1)
    spaced(W - M - 180, H - 21.5, state["section"], 6.5, SLATE, 1.4)
    state["y"] = H - 78


def need(h, section=""):
    if state["y"] - h < 60:
        new_page(section)


def section_heading(num, title, intro=None):
    need(90)
    spaced(M, state["y"], f"{num}  /", 8, COBALT, 1.6)
    state["y"] -= 26
    for line in wrap(title, "Sora-SB", 24, CW):
        text(M, state["y"], line, "Sora-SB", 24, NAVY)
        state["y"] -= 29
    if intro:
        state["y"] = paragraph(M, state["y"] - 2, intro, CW * 0.86, "Inter", 10.5, MUTED, 15.5)
    state["y"] -= 14


def tag(x, y, label, kind):
    w = c.stringWidth(label.upper(), "Mono", 6.5) + 14 + len(label) * 0.9
    c.setFillColor(COBALT if kind == "monthly" else SOFT)
    c.roundRect(x, y - 3.5, w, 13, 3, stroke=0, fill=1)
    spaced(x + 7, y + 0.5, label, 6.5, white if kind == "monthly" else NAVY, 0.9)
    return w


def bullet(x, y):
    c.setFillColor(COBALT)
    c.circle(x + 2, y + 3, 1.8, stroke=0, fill=1)


def price_rows(items, billing="once-off", note_key="note"):
    """items: dicts with name, price, optional note. Rendered as a clean ruled table."""
    c.setStrokeColor(NAVY)
    c.setLineWidth(1)
    need(50)
    c.line(M, state["y"] + 6, W - M, state["y"] + 6)
    for it in items:
        price = it["price"]
        kind = "monthly" if billing == "monthly" else "once-off"
        note = it.get(note_key) or ""
        nlines = wrap(note, "Inter", 8.5, CW - 190) if note else []
        h = 46 + max(0, len(nlines) - 1) * 11.5
        need(h)
        y = state["y"]
        text(M, y - 12, it["name"], "Sora-SB", 10.5, NAVY)
        yy = y - 25
        for ln in nlines:
            text(M, yy, ln, "Inter", 8.5, MUTED)
            yy -= 11.5
        text(W - M, y - 12, price, "Sora-B", 12, COBALT, "right")
        label = "Custom quote" if re.search(r"quote|quoted", price, re.I) else ("Monthly" if kind == "monthly" else "Once-off")
        tw = c.stringWidth(label.upper(), "Mono", 6.5) + 14 + len(label) * 0.9
        tag(W - M - tw, y - 29, label, "monthly" if label == "Monthly" else "once-off")
        c.setStrokeColor(LINE)
        c.setLineWidth(0.5)
        c.line(M, y - h + 8, W - M, y - h + 8)
        state["y"] -= h
    state["y"] -= 10


def callout(title, lines, dark=False):
    inner = CW - 44
    h = 30 + sum(para_height(ln, inner, "Inter", 9, 13.5) + 3 for ln in lines) + 8
    need(h + 10)
    y = state["y"]
    c.setFillColor(NAVY if dark else SOFT)
    c.roundRect(M, y - h, CW, h, 8, stroke=0, fill=1)
    c.setFillColor(COBALT)
    c.rect(M, y - h + 10, 3, h - 20, stroke=0, fill=1)
    spaced(M + 22, y - 20, title, 7.5, SLATE if dark else COBALT, 1.5)
    yy = y - 38
    for ln in lines:
        yy = paragraph(M + 22, yy, ln, inner, "Inter", 9, white if dark else CHAR, 13.5) - 3
    state["y"] -= h + 14


def package_card(p, idx):
    pad = 18
    colw = (CW - 2 * pad - 20) / 2
    feats = p["features"]
    # measure
    cols = [feats[0::2], feats[1::2]]
    def colh(col):
        return sum(len(wrap(f, "Inter", 9, colw - 14)) * 12.5 + 3 for f in col)
    blurb_h = para_height(p["blurb"], CW - 2 * pad - 130, "Inter", 9.5, 14)
    h = pad + 38 + blurb_h + 14 + max(colh(cols[0]), colh(cols[1])) + pad - 4
    need(h + 12)
    y = state["y"]
    rec = bool(p.get("recommended"))
    c.setFillColor(NAVY if rec else white)
    c.setStrokeColor(NAVY if rec else LINE)
    c.setLineWidth(0.8)
    c.roundRect(M, y - h, CW, h, 10, stroke=1, fill=1)
    fg, sub = (white, SLATE) if rec else (NAVY, MUTED)
    spaced(M + pad, y - pad - 4, f"{idx:02d}", 8, COBALT if not rec else HexColor("#8FA5FF"), 1.4)
    text(M + pad + 26, y - pad - 5, p["name"], "Sora-SB", 13.5, fg)
    price = f"R{p['price']:,}"
    text(W - M - pad, y - pad - 6, price, "Sora-B", 18, HexColor("#8FA5FF") if rec else COBALT, "right")
    tag(W - M - pad - 52, y - pad - 28, "Once-off", "once-off")
    if rec:
        spaced(M + pad + 26, y - pad - 20, "Recommended", 6.5, HexColor("#8FA5FF"), 1.2)
    yy = paragraph(M + pad, y - pad - 38, p["blurb"], CW - 2 * pad - 130, "Inter", 9.5, sub, 14)
    yy -= 8
    for ci, col in enumerate(cols):
        cx = M + pad + ci * (colw + 20)
        cy = yy
        for f in col:
            bullet(cx, cy - 1)
            for ln in wrap(f, "Inter", 9, colw - 14):
                text(cx + 12, cy, ln, "Inter", 9, white if rec else CHAR)
                cy -= 12.5
            cy -= 3
    state["y"] -= h + 12


def plan_card(m, idx, billing_label="Monthly"):
    pad = 16
    inc = ([m["extends"]] if m.get("extends") else []) + m["includes"]
    h = pad + 40 + sum(len(wrap(i, "Inter", 9, CW - 2 * pad - 150)) * 12.5 + 3 for i in inc) + pad - 6
    need(h + 10)
    y = state["y"]
    c.setFillColor(white)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.roundRect(M, y - h, CW, h, 10, stroke=1, fill=1)
    spaced(M + pad, y - pad - 3, f"{idx:02d}", 8, COBALT, 1.4)
    text(M + pad + 26, y - pad - 4, m["name"], "Sora-SB", 13, NAVY)
    text(W - M - pad, y - pad - 5, m["price"], "Sora-B", 18, COBALT, "right")
    text(W - M - pad, y - pad - 18, "per month", "Mono", 7.5, MUTED, "right")
    yy = y - pad - 32
    for i in inc:
        if i.endswith(":"):
            text(M + pad, yy, i, "Inter-SB", 9, MUTED)
            yy -= 15.5
            continue
        bullet(M + pad, yy - 1)
        for ln in wrap(i, "Inter", 9, CW - 2 * pad - 150):
            text(M + pad + 12, yy, ln, "Inter", 9, CHAR)
            yy -= 12.5
        yy -= 3
    state["y"] -= h + 10


# ===== 01 COVER ===========================================================
state["page"] = 1
c.setFillColor(NAVY)
c.rect(0, 0, W, H, stroke=0, fill=1)
# structural geometry
c.setFillColor(NAVY2)
c.rect(W - 190, 0, 130, H, stroke=0, fill=1)
c.setFillColor(COBALT)
c.rect(W - 120, 0, 20, H, stroke=0, fill=1)
c.setStrokeColor(HexColor("#2A3654"))
c.setLineWidth(0.6)
for i in range(0, 12):
    c.line(0, H - 80 - i * 64, W, H - 80 - i * 64)
c.setStrokeColor(HexColor("#B8C4E6"))
c.setLineWidth(1.2)
c.circle(W - 190, H - 250, 120, stroke=1, fill=0)
c.setLineWidth(0.6)
c.circle(W - 190, H - 250, 80, stroke=1, fill=0)
c.setFillColor(COBALT)
c.circle(W - 190, H - 250, 9, stroke=0, fill=1)

text(M + 8, H - 70, "RAGOPHALA", "Sora-B", 14, white)
text(M + 8 + 92, H - 70, "DIGITAL", "Sora", 14, SLATE)
c.setFillColor(COBALT)
c.circle(M + 8 + 154, H - 66, 2.4, stroke=0, fill=1)
spaced(M + 8, H - 88, "Digital solutions. Built for business.", 7, SLATE, 1.6)

spaced(M + 8, 505, "Private client document  /  2026 edition", 8, HexColor("#8FA5FF"), 1.8)
y = 438
for line in ["SERVICE", "CATALOGUE", "& PRICING", "GUIDE"]:
    text(M + 8, y, line, "Sora-B", 44, white)
    y -= 52
c.setFillColor(COBALT)
c.rect(M + 8, y + 18, 60, 3, stroke=0, fill=1)
text(M + 8, y - 8, "2026 EDITION", "Sora-SB", 13, white)
paragraph(M + 8, y - 34, "Digital solutions designed around your business.", 300, "Inter", 12, SLATE, 17)

spaced(M + 8, 88, "Prepared for prospective clients", 7, SLATE, 1.5)
paragraph(M + 8, 70, "This guide is shared privately. Please do not publish or redistribute it.", 330, "Inter", 8.5, SLATE, 12)

# ===== 02 INTRODUCTION ====================================================
new_page("Introduction")
section_heading("01", "A digital studio for what's next.", "Ragophala Digital designs and builds websites, web applications, AI assistants and business automation for South African businesses. This guide sets out our services, what each package includes and how we price and bill our work.")
SERVICES = [
    ("01", "Website Development", "Business websites, landing pages, corporate sites, online stores, booking, educational and membership websites, and redesigns."),
    ("02", "Web Applications", "Custom systems built around how your business works: management systems, CRMs, inventory, portals and dashboards."),
    ("03", "AI Agents & Assistants", "Website chatbots, WhatsApp assistants, lead capture and appointment assistants built around practical business use."),
    ("04", "Business Automation", "Connected workflows, email automation, document processing and custom integrations."),
    ("05", "Website Maintenance", "Monthly care: updates, security checks, monitoring, backups and support."),
    ("06", "AI & Automation Support", "Ongoing monitoring and support for assistants and automated workflows."),
]
for i, (n, t, d) in enumerate(SERVICES):
    col, row = i % 2, i // 2
    cw = (CW - 14) / 2
    x = M + col * (cw + 14)
    y = state["y"] - row * 104
    c.setFillColor(white)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.roundRect(x, y - 92, cw, 92, 9, stroke=1, fill=1)
    spaced(x + 14, y - 20, n, 8, COBALT, 1.4)
    text(x + 40, y - 21, t, "Sora-SB", 11, NAVY)
    paragraph(x + 14, y - 40, d, cw - 28, "Inter", 8.8, MUTED, 12.5)
state["y"] -= 3 * 104 + 14
callout("How to read this guide", [
    "All prices are in South African rand (ZAR). Website, specialist website, web application and AI prices are once-off development fees unless marked monthly.",
    "Prices are starting prices. Final prices are confirmed in a written quotation after we understand your requirements.",
])

# ===== 03 WEBSITE PACKAGES ================================================
new_page("Website development packages")
section_heading("02", "Website development packages.", "Six once-off packages, from a simple online presence to a complete custom website with content management. Domain registration and hosting are quoted separately unless explicitly included.")
for i, p in enumerate(CAT["PACKAGES"], 1):
    package_card(p, i)

# ===== 04 SPECIALIST ======================================================
new_page("Specialist website solutions")
section_heading("03", "Specialist website solutions.", "Purpose-built websites for specific business models. Starting prices, once-off.")
price_rows(CAT["SPECIALIST_SITES"])
callout("E-commerce and booking notes", [
    "Payment gateway charges, shipping services, advanced inventory requirements and external subscriptions may involve additional costs.",
    "Custom features and integrations beyond the base solution are quoted separately.",
])

# ===== 05 WEB APPLICATIONS ================================================
new_page("Web application packages")
section_heading("04", "Web application packages.", "Custom software designed around your business processes. Pricing depends on authentication, user roles, database design, integrations, workflows, security requirements and overall complexity.")
price_rows(CAT["WEB_APPS"])
need(150)
spaced(M, state["y"], "Application solutions we can build", 7.5, COBALT, 1.5)
state["y"] -= 18
half = (len(CAT["WEB_APP_SOLUTIONS"]) + 1) // 2
for ci, col in enumerate([CAT["WEB_APP_SOLUTIONS"][:half], CAT["WEB_APP_SOLUTIONS"][half:]]):
    cy = state["y"]
    cx = M + ci * (CW / 2)
    for s in col:
        bullet(cx, cy - 1)
        text(cx + 12, cy, s, "Inter", 9, CHAR)
        cy -= 15
state["y"] -= half * 15 + 14
callout("Enterprise and custom applications", ["Enterprise and custom applications require a detailed project assessment and a formal, individually prepared quotation."])

# ===== 06 AI AGENTS =======================================================
new_page("AI agents and integrations")
section_heading("05", "AI agents and integrations.", "Practical AI assistants and automation, built around your approved business information. Once-off implementation fees.")
price_rows(CAT["AI_SOLUTIONS"])
need(110)
spaced(M, state["y"], "Available AI and automation solutions", 7.5, COBALT, 1.5)
state["y"] -= 18
half = (len(CAT["AI_AVAILABLE"]) + 1) // 2
for ci, col in enumerate([CAT["AI_AVAILABLE"][:half], CAT["AI_AVAILABLE"][half:]]):
    cy = state["y"]
    cx = M + ci * (CW / 2)
    for s in col:
        bullet(cx, cy - 1)
        text(cx + 12, cy, s, "Inter", 9, CHAR)
        cy -= 15
state["y"] -= half * 15 + 14
callout("Third-party and running costs", [
    "API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless explicitly included in your quotation.",
    "Pricing depends on integrations, model requirements, workflow complexity, data sources and deployment.",
], dark=True)

# ===== 07 MONTHLY MAINTENANCE ============================================
new_page("Monthly website maintenance")
section_heading("06", "Monthly website maintenance.", "Optional recurring care for your website. Billed monthly, separately from once-off development.")
for i, m in enumerate(CAT["MAINTENANCE"], 1):
    plan_card(m, i)
callout("Service limits", [
    "Maintenance plans have defined service limits, support hours and response times set out in the maintenance agreement.",
    "Major redesigns, new functionality, additional pages and extensive development are quoted separately.",
])

# ===== 08 MONTHLY AI SUPPORT =============================================
new_page("Monthly AI and automation support")
section_heading("07", "Monthly AI and automation support.", "Ongoing monitoring and support for AI assistants and automated workflows. Billed monthly.")
price_rows(CAT["AI_MONTHLY"], billing="monthly")
callout("Running costs", ["API consumption, hosting, messaging, model usage and third-party subscription charges may be billed separately unless explicitly included in your quotation."])

# ===== 09 ADD-ONS =========================================================
section_heading("08", "Additional website services and add-ons.", "Extras that can be added to a project or ordered on their own. Once-off unless stated.")
price_rows(CAT["ADDONS"])

# ===== 10 PAYMENT TERMS ===================================================
new_page("Payment terms")
section_heading("09", "Payment terms.", "A simple two-part structure for once-off projects.")
cw3 = (CW - 14) / 2
for i, (t, big, d) in enumerate([("Deposit", "50%", "Payable before development begins."), ("Completion", "50%", "Payable before final handover and deployment.")]):
    x = M + i * (cw3 + 14)
    y = state["y"]
    c.setFillColor(NAVY if i == 0 else COBALT)
    c.roundRect(x, y - 118, cw3, 118, 10, stroke=0, fill=1)
    spaced(x + 18, y - 24, t, 7.5, SLATE if i == 0 else SOFT, 1.5)
    text(x + 18, y - 70, big, "Sora-B", 38, white)
    paragraph(x + 18, y - 92, d, cw3 - 36, "Inter", 9.5, SLATE if i == 0 else SOFT, 13.5)
state["y"] -= 118 + 22
terms = {t["title"]: t["points"] for t in CAT["TERMS"]}
for t in CAT["TERMS"]:
    if t["title"] in ("Payment structure",):
        for p in t["points"]:
            need(26)
            bullet(M, state["y"] - 1)
            state["y"] = paragraph(M + 14, state["y"], p, CW - 14, "Inter", 10, CHAR, 15) - 4
state["y"] -= 8
callout("Custom projects and out-of-scope work", [
    "Custom projects are quoted individually.",
    "Work outside the agreed scope is quoted separately and may affect timelines.",
    "Monthly services are billed separately from once-off development.",
])

# ===== 11 CONDITIONS ======================================================
new_page("Service conditions and exclusions")
section_heading("10", "Service conditions and exclusions.", "What every quotation assumes, and what is quoted separately.")
for t in CAT["TERMS"]:
    if t["title"] == "Payment structure":
        continue
    need(40 + len(t["points"]) * 30)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(M, state["y"] + 6, W - M, state["y"] + 6)
    text(M, state["y"] - 12, t["title"], "Sora-SB", 11.5, NAVY)
    yy = state["y"] - 32
    for p in t["points"]:
        bullet(M, yy - 1)
        yy = paragraph(M + 14, yy, p, CW - 14, "Inter", 9.5, CHAR, 14) - 3
    state["y"] = yy - 12

# ===== 12 CONTACT =========================================================
new_page("Quotation and contact")
section_heading("11", "Request your personalised quotation.", "Every project is different. Tell us what you want to build and we will send a written quotation that confirms scope, deliverables, timeline, price and payment terms.")
steps = [("Tell us what you need", "Share your goals and the service you are interested in."), ("We review and ask questions", "We may ask a few clarifying questions about content, features and integrations."), ("You receive a written quotation", "Scope, deliverables, timeline, price and payment terms in writing."), ("Approve and begin", "Work starts once the quotation is agreed and the deposit is received.")]
for i, (t, d) in enumerate(steps, 1):
    need(46)
    y = state["y"]
    c.setFillColor(COBALT)
    c.circle(M + 11, y - 6, 11, stroke=0, fill=1)
    text(M + 11, y - 9, str(i), "Sora-B", 10, white, "center")
    text(M + 34, y - 4, t, "Sora-SB", 11, NAVY)
    paragraph(M + 34, y - 19, d, CW - 40, "Inter", 9.2, MUTED, 13)
    state["y"] -= 48
state["y"] -= 8
info = contact_lines()
need(150)
y = state["y"]
c.setFillColor(NAVY)
c.roundRect(M, y - 130, CW, 130, 10, stroke=0, fill=1)
spaced(M + 22, y - 26, "Contact Ragophala Digital", 8, HexColor("#8FA5FF"), 1.6)
yy = y - 52
if info:
    for k, v in info:
        text(M + 22, yy, k.upper(), "Mono", 7.5, SLATE)
        text(M + 100, yy, v, "Inter-SB", 11, white)
        yy -= 22
else:
    yy = paragraph(M + 22, yy, "Use the Start a Project form on the Ragophala Digital website, or reply to the message that shared this guide.", CW - 44, "Inter", 10.5, white, 15)
paragraph(M + 22, y - 112, "Prices are starting prices in South African rand (2026 edition). A written quotation confirms the final price.", CW - 44, "Inter", 8.5, SLATE, 12)

footer()
c.save()
print(f"Wrote {OUT} ({state['page']} pages)")
if not contact_lines():
    print("Note: no verified contact details found in .env; the contact page uses the website form instead. Add NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_WHATSAPP_NUMBER and rebuild to include them.", file=sys.stderr)
