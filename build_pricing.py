from pathlib import Path
from bs4 import BeautifulSoup
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parent
soup=BeautifulSoup((root/'index.html').read_text(encoding='utf-8'),'html.parser')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleFlex',fontName='Helvetica-Bold',fontSize=23,leading=27,textColor=colors.HexColor('#102541'),spaceAfter=14))
styles.add(ParagraphStyle(name='CopyFlex',fontName='Helvetica',fontSize=9,leading=13,textColor=colors.HexColor('#33465b'),spaceAfter=7))
styles.add(ParagraphStyle(name='HeadFlex',fontName='Helvetica-Bold',fontSize=13,leading=17,textColor=colors.HexColor('#155d93'),spaceBefore=14,spaceAfter=8,keepWithNext=True))
def text(el):
 return escape(el.get_text(' ',strip=True).replace('–','-').replace('—','-').replace('’',"'").replace('↗',''))
story=[]
panels=soup.select('.price-panel')
for i,panel in enumerate(panels):
 if i: story.append(PageBreak())
 story.append(Paragraph(text(panel.select_one('summary strong')), styles['TitleFlex']))
 body=panel.select_one('.price-body')
 for item in body.children:
  if not getattr(item,'name',None):continue
  if item.name=='a':continue
  if item.name=='h3':
   if text(item) in ('Home Technology packages','Website terms'):
    story.append(PageBreak())
    story.append(Paragraph(text(item),styles['TitleFlex']))
   else:story.append(Paragraph(text(item),styles['HeadFlex']))
  elif 'rate-list' in item.get('class',[]):
   for rate in item.select('.rate'):
    story.append(KeepTogether([Paragraph(text(rate.select_one('h4'))+' <b>'+text(rate.select_one('strong'))+'</b>',styles['CopyFlex']),Paragraph(text(rate.select_one('p')),styles['CopyFlex']),Spacer(1,5)]))
  elif 'package-grid' in item.get('class',[]):
   for art in item.select('article'):
    story.append(KeepTogether([Paragraph(text(art.select_one('h4'))+' - '+text(art.select_one('strong')),styles['HeadFlex']),Paragraph(text(art.select_one('p')),styles['CopyFlex'])]))
  elif 'managed-plans' in item.get('class',[]):
   for art in item.select('article'):
    block=[Paragraph(text(art.select_one('h4'))+' - '+text(art.select_one('strong')),styles['HeadFlex'])]
    for el in art.select('p,li'):
     block.append(Paragraph(('- ' if el.name=='li' else '')+text(el),styles['CopyFlex']))
    story.append(KeepTogether(block))
  else:
   for para in ([item] if item.name=='p' else item.find_all('p')):story.append(Paragraph(text(para),styles['CopyFlex']))
def page(c,d):
 c.setFillColor(colors.HexColor('#07152c'));c.rect(0,745,612,47,fill=1,stroke=0)
 c.setFillColor(colors.white);c.setFont('Helvetica-Bold',12);c.drawString(42,771,'FLEX IT')
 c.setFont('Helvetica',9);c.drawString(42,755,'Technology Solutions & Web Development | For Home & Small Business')
 c.setFillColor(colors.HexColor('#33465b'));c.setFont('Helvetica',8)
 c.drawString(42,37,'Thomas Doherty | 978-872-7798 | Tom@flexintegrationtech.com')
 c.drawString(42,25,'Dracut, MA | Managed plans updated September 15, 2026 | flexintegrationtech.com')
 c.drawRightString(570,37,str(d.page))
SimpleDocTemplate(str(root/'Flex-IT-Client-Pricing.pdf'),pagesize=(612,792),rightMargin=42,leftMargin=42,topMargin=65,bottomMargin=57).build(story,onFirstPage=page,onLaterPages=page)
print('PDF generated')
