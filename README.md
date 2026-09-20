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


## Optional ACTIAS soundtrack (separate from Phase 2)

Place the owner-supplied MP3 at `assets/audio/starfall-9jackjack8.mp3`.
The original Pixabay MP3 is bundled (5,871,490 bytes). Do not replace it with another track.

Asset record supplied by the owner: Track: Starfall (Hardwave Atmospheric Beat).
Artist: 9JackJack8. Source: Pixabay. License: Pixabay Content License.
Downloaded for use as ACTIAS website background audio. Retain the download page
and license record with the original download; this integration does not verify
an absent file or its licensing provenance.

The optional ACTIAS AUDIO OFF/LIVE button uses audio.js and existing site colors.
Audio starts only on an explicit press, fades to 12% gain over 1.2 seconds, loops,
and fades out over 0.6 seconds before pausing. A Web Audio gain stage controls
volume on mobile as well as desktop. No unsupported loud-playback fallback.
Preference is stored locally when available; even remembered LIVE requires a
new press after a reload. Section links preserve playback and position. Full
page departures stop audio. There is no initial audio request or new service.
Missing/blocked audio leaves the control OFF with a retry message; a missing
file can still appear as an HTTP 404 in browser developer tools.

Phase 2 remains on hold. Pricing, contact code, deployment settings and phase
instructions are unchanged. No runtime credit/API controls are added or altered.
After supplying the MP3, check actual sound level, fades and loop seam on iPhone,
Android and desktop before publishing. Native looping cannot remove silence
already contained in the recording. Run `node test_audio.cjs` for mocked state tests.

Verified track listing: https://pixabay.com/music/electronic-starfall-hardwave-atmospheric-beat-600080/
The listing identifies 9JackJack8, a 3:03 MP3, and the Pixabay Content License.
Downloaded September 16, 2026 from the exact track player source:
https://cdn.pixabay.com/audio/2026/09/09/audio_2da32d9589.mp3
