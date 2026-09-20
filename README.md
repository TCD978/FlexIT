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

Phase 1 established the business offer. Phase 2 implements the visual and navigation upgrade. Phase 3 delivers the website configurator, command palette, fictional design comparison and theme preview. Phase 4 requires a separate instruction. Do not start backend systems concurrently. Later portfolio work needs the actual astrology project URL/repository before adding technology claims or live links. A real Flex Score scanner needs a separate feasibility/security assessment; do not fabricate scores.


## Optional ACTIAS soundtrack (separate from Phase 2)

The soundtrack is stored at `assets/audio/starfall-9jackjack8.mp3`.
The original Pixabay MP3 is bundled (5,871,490 bytes). Do not replace it with another track.

Asset record: Track: Starfall (Hardwave Atmospheric Beat).
Artist: 9JackJack8. Source: Pixabay. License: Pixabay Content License.
Downloaded for use as ACTIAS website background audio. Retain the download page and license record with the original download.

The optional ACTIAS AUDIO OFF/LIVE button uses audio.js and existing site colors.
Audio starts only on an explicit press, fades to 12% gain over 1.2 seconds, loops,
and fades out over 0.6 seconds before pausing. A Web Audio gain stage controls
volume on mobile as well as desktop. No unsupported loud-playback fallback.
Preference is stored locally when available; even remembered LIVE requires a
new press after a reload. Section links preserve playback and position. Full
page departures stop audio. There is no initial audio request or new service.
Missing/blocked audio leaves the control OFF with a retry message; a missing
file can still appear as an HTTP 404 in browser developer tools.

Phase 2 preserves the soundtrack behavior. Pricing, contact code and deployment settings are unchanged. No runtime credit/API controls are added or altered.
Actual playback was checked in the desktop browser. Physical iPhone/Android listening and the complete loop seam still warrant device testing. Native looping cannot remove silence
already contained in the recording. Run `node test_audio.cjs` for mocked state tests.

Verified track listing: https://pixabay.com/music/electronic-starfall-hardwave-atmospheric-beat-600080/
The listing identifies 9JackJack8, a 3:03 MP3, and the Pixabay Content License.
Downloaded September 16, 2026 from the exact track player source:
https://cdn.pixabay.com/audio/2026/09/09/audio_2da32d9589.mp3


## Phase 2: visual hierarchy and navigation

`phase2.css` contains the visual upgrade over the preserved base stylesheet.
Flex IT remains the parent brand; ACTIAS LUNA uses a small original SVG mark
with abstract wing symmetry and a crescent. No external font, image service,
animation library, paid integration or additional runtime dependency is used.
The decorative connection illustration is CSS; it makes no live-system claims.

`navigation.js` progressively enhances mobile navigation: without JavaScript
all links remain visible. Menu state follows the mobile breakpoint, closes
after navigation, and Escape returns focus to its button. Links to content
inside pricing disclosures open the disclosure before navigation.

The original prices, plan boundaries, contact script, audio script, MP3,
pricing PDF, domain settings, SEO metadata and business claims are retained.
Keyboard focus and reduced-motion styles are preserved.

Validation: run `python check_site.py`, `node test_contact.cjs`, and
`node test_audio.cjs`; check responsive navigation, pricing disclosures,
contact validation and horizontal overflow at 320–1440px before publication.

Phase 2 validation completed: nine widths (320, 390, 412, 768, 800, 820, 1024, 1366, 1440), mobile menu Enter/Escape/focus, pricing disclosure keyboard and anchor behavior, required contact fields, loaded SVG, no browser console errors. Existing automated pricing, contact and audio tests pass. Reduced-motion and no-JavaScript fallbacks verified in source; physical-device testing was not performed.


## Phase 3 — website configurator

`configurator.js` holds the published-price recommendation rules and safe contact-form
handoff; `configurator.css` scopes the planner styling. No backend, package, tracking,
storage, or paid service is added. The form starts hidden and is revealed only after
initialization, with pricing/contact fallback links if JavaScript is unavailable.

Builds use $750 for one page/up to six sections and $1,500 for up to five pages.
Six to ten pages add the published $150–$250 per extra page; larger or unknown scopes
are custom quotes. Additional-page estimates assume the existing design and client
content. A one-page working contact form, booking, ecommerce, email setup/migration,
and additional SEO require separate quotes. No estimated add-on prices are invented.
Automation recommends $99 for one feature, $179 for multiple, or a custom quote for
complex work; initial implementation and third-party fees remain separate. Basic
metadata and domain connection are already included in standard builds.

Request This Build places an editable summary in the contact form and focuses the
name field. It never sends email. Repeated requests replace only the exact previously
generated block, preserving customer-written notes. No customer information is
persisted locally. A successful contact-form reset clears the handoff notice.

Validation: `node test_configurator.cjs`, `node test_contact.cjs`,
`node test_audio.cjs`, and `python check_site.py`. Browser checks cover keyboard
handoff, repeat requests, preserved notes, reset, custom recommendations, mobile
and desktop layout, and no initial audio playback. Physical devices were not tested.
Prices must be updated in the published content, PDF source and `PRICES` together.


## Phase 3 — quick links / command palette

`quick-links.js` and `quick-links.css` add the header Quick links button and Ctrl/Cmd+K.
The native dialog contains ordinary links, a labelled search, live result count,
empty-result guidance, and visible close button. Arrow keys browse matches; Enter
opens the first match from search; Tab stays inside the modal; Escape returns focus.
Navigation moves focus to the chosen section and opens pricing disclosures. The
shortcut is left alone in editable fields outside the dialog. Without JavaScript or
native dialog support, the button remains hidden and the normal navigation works.
Browser checks: mobile entry, filtering, no results, arrow/Enter navigation, destination
focus, shortcut, and Escape. No external library or network requests added.


## Phase 3 — fictional before/after design

`design-demo.js` and `design-demo.css` present a clearly labelled invented café,
Cedar & Cup, in dated and redesigned layouts. Compare both, Before and After use
native buttons with pressed state and a live status. Both examples and their sample
menu work without JavaScript. The demonstration is not presented as client work,
a testimonial, or evidence of business results. Desktop/mobile, keyboard view
switching and the menu link were checked; no remote artwork or fonts were added.


## Phase 3 — live theme demonstrator

The same fictional café preview offers Default, Corporate, Minimal, Modern Dark,
and Cyber-Neon styles. Variables, fonts, CTA shape, and restrained glow are scoped
to `#demoCanvas`; the main site's navigation, pricing and contact colors stay intact.
Choosing a theme from Before switches to After so the change is visible. A native
select and status text support keyboard users. No motion, storage or new assets.
`node test_design.cjs` checks at least 4.5:1 contrast for primary/secondary text and
CTA colors in all five themes. Browser checks confirm each theme applies only to
the preview and fits a 320px viewport.


## Phase 3 release boundary

Four interactive features are complete in separate local commits. The optional
service ecosystem graphic is deferred because the existing service cards and
quick links already provide those customer paths. No Phase 4 portfolio work,
scanner, backend, paid service, DNS change, or recurring price change is included.

Final automated checks pass: site/PDF consistency, configurator pricing boundaries,
theme contrast, contact provider mocks and audio state mocks. Browser checks pass at
320, 390, 412, 768, 820, 1366 and 1440px without horizontal overflow, with no console
errors. Keyboard checks cover planner handoff, command-palette filtering, focus loop,
Escape, destination focus and comparison controls. Contact tests did not transmit
email; audio remained OFF. JavaScript-disabled fallbacks and reduced-motion support
were checked in source; physical-device and live email delivery testing were not done.
