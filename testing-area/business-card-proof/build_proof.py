from pathlib import Path
import math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'assets'
OUT = ROOT / 'output' / 'pdf'
OUT.mkdir(parents=True, exist_ok=True)
URL = 'https://y1nno.github.io/portfolio/'
W, H = 252, 144
for weight in ('Regular', 'Bold'):
    pdfmetrics.registerFont(TTFont('OpenSans-' + weight, str(ASSETS / ('OpenSans-' + weight + '.ttf'))))

# An original static interpretation of the site's flowing burgundy shader.
def background(back=False):
    width, height = 1750, 1000
    y, x = np.mgrid[0:height, 0:width].astype(float)
    x /= width
    y /= height
    rng = np.random.default_rng(42 if not back else 43)
    field = np.zeros_like(x)
    for freq, strength in [(1.5, .52), (3, .26), (6, .12), (12, .06)]:
        p = rng.uniform(0, 6.28, 3)
        field += strength * (np.sin(x*freq*5 + np.sin(y*freq*4+p[0])*1.8+p[1]) * np.cos(y*freq*3+p[2]) + 1)/2
    glow = np.exp(-(((x-.95)/.65)**2 + ((y-.65)/.85)**2)*1.5)
    energy = np.clip(field * glow, 0, 1)
    rgb = np.zeros((height, width, 3))
    for channel, base, strength in [(0, 9, 76), (1, 9, 7), (2, 10, 14)]:
        rgb[:,:,channel] = base + energy*strength*(.65 if back else 1)
    image = Image.fromarray(np.uint8(np.clip(rgb,0,255))).filter(ImageFilter.GaussianBlur(8))
    dest = ASSETS / ('back-background.png' if back else 'front-background.png')
    image.save(dest)
    return dest

FRONT_BG, BACK_BG = background(), background(True)

def text(c, x, y, value, size=9, bold=False, color='#f2f2f2', tracking=0):
    t=c.beginText(x,y)
    t.setFont('OpenSans-' + ('Bold' if bold else 'Regular'),size)
    t.setFillColor(HexColor(color))
    t.setCharSpace(tracking)
    t.textLine(value)
    c.drawText(t)

def draw_side(c, back=False):
    c.drawImage(str(BACK_BG if back else FRONT_BG), 0,0,W,H)
    if not back:
        c.setStrokeColor(HexColor('#a74c4c'))
        c.setLineWidth(1.2)
        c.line(20,113,39,113)
        text(c,20,72,'Wesley Parrish',21,True,tracking=-.35)
        text(c,21,53,'GAMEPLAY PROGRAMMER',7.4,color='#b7b7b7',tracking=1.15)
    else:
        text(c,20,114,'Great games run',12.8,True)
        text(c,20,97,'on great code.',12.8,True)
        c.setStrokeColor(HexColor('#723536'))
        c.setLineWidth(.5)
        c.line(20,82,232,82)
        text(c,20,69,'PORTFOLIO / CONTACT',5.8,color='#c98282',bold=True,tracking=.9)
        text(c,20,54,'y1nno.github.io/portfolio',8)
        text(c,20,40,'wesley@ssparrish.com',8,color='#b7b7b7')
        text(c,20,26,'832-998-2976',8,color='#b7b7b7')
        qr = QrCodeWidget(URL,barLevel='M')
        bounds=qr.getBounds()
        side=52
        d=Drawing(side,side,transform=[side/(bounds[2]-bounds[0]),0,0,side/(bounds[3]-bounds[1]),0,0])
        d.add(qr)
        c.setFillColor(HexColor('#ffffff'))
        c.rect(180,22,52,52,stroke=0,fill=1)
        renderPDF.draw(d,c,180,22)
        c.linkURL(URL,(20,52,167,63),relative=0)
        c.linkURL('mailto:wesley@ssparrish.com',(20,38,167,49),relative=0)
        c.linkURL('tel:+18329982976',(20,24,167,35),relative=0)

pdf = OUT / 'wesley-parrish-business-card-proof.pdf'
c=canvas.Canvas(str(pdf),pagesize=(W,H))
c.setTitle('Wesley Parrish | Business Card Digital Proof')
c.setAuthor('Wesley Parrish')
draw_side(c)
c.showPage()
draw_side(c,True)
c.showPage()
c.save()
print(pdf)
