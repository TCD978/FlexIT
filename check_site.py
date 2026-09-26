"""Content, pricing and local-link checks. Run from any directory."""
from pathlib import Path
import json,re
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
from pypdf import PdfReader
root=Path(__file__).resolve().parent
soup=BeautifulSoup((root/'index.html').read_text(encoding='utf-8'),'html.parser')
assert len(soup.select('h1'))==1
ids=[e['id'] for e in soup.select('[id]')]
assert len(ids)==len(set(ids))
for el in soup.select('[href],[src]'):
    url=el.get('href',el.get('src',''))
    if url.startswith('#') and len(url)>1: assert url[1:] in ids,url
    elif url and not re.match(r'^(https?:|mailto:|tel:|#)',url):
        path=root/urlsplit(url).path
        assert path.is_file() or (path/'index.html').is_file(),url
for el in soup.select('input,textarea'): assert soup.select_one('label[for="'+el['id']+'"]')
json.loads(soup.select_one('script[type="application/ld+json"]').string)
assert len(soup.select('.service-grid > article'))==2
plans=soup.select('.managed-plans article')
assert [p.select_one('strong').get_text() for p in plans]==['$49/month','$99/month','$179/month','Custom quote']
assert not plans[0].select('.powered')
assert 'not included' in plans[0].get_text()
assert '30 minutes/month' in plans[1].get_text()
assert '60 minutes/month' in plans[2].get_text()
assert len(soup.select('.recommended'))==1
pdf=' '.join(p.extract_text() for p in PdfReader(root/'Flex-IT-Client-Pricing.pdf').pages)
html=soup.get_text(' ',strip=True)
for text in (html,pdf):
    assert not re.search(r'phone repair|screen repair|battery replacement|charging.port repair|tablet repair|microsolder|ACTIAS LUNA®',text,re.I)
    assert '$15/month' not in text and '$50/month' not in text
    for price in ('$750','$1,500','$49/month','$99/month','$179/month','$75/hour'): assert price in text,price
    for phrase in ('does not roll over','quoted separately','registration','Third-party costs'): assert phrase in text,phrase
for el in soup.select('.rate strong,.package-grid strong,.managed-plans strong'):
    assert el.get_text().replace('–','-') in pdf,el.get_text()
assert (root/'CNAME').read_text().strip()=='flexintegrationtech.com'
print('PASS: customer paths, plan boundaries, PDF pricing, preserved build prices, labels, schema, local links, mobile-repair removal, domain')

# Check the independently indexable page and all local cross-page links/assets.
for file in [root/'index.html',root/'web-development/index.html']:
    page=BeautifulSoup(file.read_text(encoding='utf-8'),'html.parser')
    assert len(page.select('h1'))==1,file
    page_ids=[e['id'] for e in page.select('[id]')]
    assert len(page_ids)==len(set(page_ids)),file
    assert page.select_one('meta[name="description"]')['content']
    assert page.select_one('link[rel="canonical"]')['href'].startswith('https://flexintegrationtech.com/')
    for schema in page.select('script[type="application/ld+json"]'): json.loads(schema.string)
    for el in page.select('[href],[src]'):
        for attr in ['href','src']:
            value=el.get(attr,'')
            if not value or re.match(r'^(https?:|mailto:|tel:)',value): continue
            url=urlsplit(value)
            target=(file.parent/unquote(url.path)).resolve() if url.path else file
            if target.is_dir(): target=target/'index.html'
            assert target.is_file(),(file,value)
            if url.fragment:
                target_page=BeautifulSoup(target.read_text(encoding='utf-8'),'html.parser')
                assert target_page.find(id=unquote(url.fragment)),(file,value)
print('PASS: both pages have valid metadata, schema, headings, unique IDs, assets and cross-page anchors')
