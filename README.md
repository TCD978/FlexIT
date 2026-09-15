# Flex IT website

Static HTML/CSS/JavaScript. GitHub Pages deploys the `main` branch, repository root, to https://flexintegrationtech.com. No application build or new hosting service is required. Keep CNAME and the existing Pages settings intact.

## Local preview and checks

```sh
python -m http.server 8766
python -m pip install -r requirements.txt
python build_pricing.py
python check_site.py
node test_contact.cjs
git diff --check
```

Root-level Python packages and check scripts are authoring/checking tools only; they are not website runtime dependencies. Rebuild the PDF whenever pricing or service terms change. Visually inspect rendered PDF pages before publishing. Browser-check 320, 390, 412, 768, 1366, and 1440 pixel widths, keyboard focus and pricing disclosures. The contact test mocks the mail provider and sends no email. An actual delivered-message test requires a separately coordinated test.

## Phase 1 business decisions

- Two flagship paths: home/small-business technology solutions and small-business web design/development.
- Existing one-time builds remain $750 and $1,500; additional pages $150–$250. Technology rates and packages are preserved.
- Replace the overlapping public $15 hosting / $50 maintenance offers with Care $49, Automation $99, and Automation Pro $179 per month, plus custom quotes. Existing customer contracts are not automatically migrated.
- Care is technical maintenance with no included editing or ACTIAS LUNA automation. Automation includes approximately 30 minutes of minor edits; Pro includes 60 minutes total, not an additional 60 minutes. Unused time does not roll over.
- Initial automation implementation is separately scoped/quoted to avoid funding custom development out of a low monthly fee. Monthly service covers the agreed operational feature set. New development and expensive dependencies need quotes.
- Registration/renewal, paid APIs, AI, premium hosting, databases, email and other third-party services are separate. No unlimited editing or guaranteed response time is advertised.
- Pricing analysis: old hosting plus maintenance totaled $65 with 30 minutes of editing. The $49 plan removes editing, while $99 adds bounded automation operations. At the existing $75/hour editing rate, included editing represents $37.50/$75 of the $99/$179 plans, leaving $61.50/$104 before technical care and operating costs. These are capacity illustrations, not profit estimates. Track actual support time and scope each deployment before accepting it.
- ACTIAS LUNA is a Flex IT service identity, not a separate company, registered mark, or assertion of AI. The earlier astrology project illustrates similar functionality and is not described as originally carrying the new brand.

## Infrastructure and claims

No scheduled automation is installed by Phase 1. Automation is a scoped customer service offer. No DNS, billing, domain ownership, deployment settings, secrets, or external accounts are changed. Existing EmailJS browser identifiers remain unchanged; they are public client configuration, not newly added secrets. Never put private keys in this repository.

## Continuation

Phase 1 is the business-offer unit. Phase 2 should improve visual hierarchy and ACTIAS LUNA's restrained visual identity using the existing static architecture. Do not start configurators or backend systems concurrently. Later portfolio work needs the actual astrology project URL/repository before adding technology claims or live links. A real Flex Score scanner needs a separate feasibility/security assessment; do not fabricate scores.
