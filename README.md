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

Phase 1 established the business offer. Phase 2 implements the visual and navigation upgrade. Phase 3 delivers the website configurator, command palette, fictional design comparison and theme preview. Phase 4 adds the verified Divine Design 144 case study and ACTIAS LUNA showcase. Phase 5 completes the scanner feasibility review and personal website-review intake; the automatic scanner is deferred. Phase 6 documents the reusable-module architecture in [ACTIAS-LUNA-ARCHITECTURE.md](ACTIAS-LUNA-ARCHITECTURE.md). Phase 7 requires a separate instruction. Do not start backend systems concurrently. A real Flex Score scanner needs a separate feasibility/security assessment; do not fabricate scores.


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
quick links already provide those customer paths. No scanner, backend, paid service, DNS change, or recurring price change was included in Phase 3.

Final automated checks pass: site/PDF consistency, configurator pricing boundaries,
theme contrast, contact provider mocks and audio state mocks. Browser checks pass at
320, 390, 412, 768, 820, 1366 and 1440px without horizontal overflow, with no console
errors. Keyboard checks cover planner handoff, command-palette filtering, focus loop,
Escape, destination focus and comparison controls. Contact tests did not transmit
email; audio remained OFF. JavaScript-disabled fallbacks and reduced-motion support
were checked in source; physical-device and live email delivery testing were not done.


## Phase 4 — portfolio and ACTIAS LUNA showcase

The user confirmed Divine Design 144 as the portfolio project. Its source is
https://github.com/TCD978/divinedesign.io (reviewed commit `1bd42c9`) and its working
GitHub Pages URL is https://tcd978.github.io/divinedesign.io/.

### Verified behavior and claim correction

The reference is a single HTML file with inline CSS/JavaScript. `pickWeeklyReading`
selects one of four stored readings by calendar week. `renderChanneledMessage` picks
from a curated library. A five-minute browser interval refreshes the reading/guidance
while the page is open and auto-mode is on; manual refresh controls also exist.
There is no scheduled publishing workflow, backend, AI API call or daily content
publication in the inspected repository. The earlier Flex IT sentence claiming
that the project updates automatically every day has therefore been replaced.
The project predates ACTIAS LUNA and is not described as originally using the brand.

The reference uses responsive CSS/card stacking, but its live 390px view has
horizontal overflow and a failed optional service-worker registration. These are
limitations in the reference site, not the Flex IT page. No reference-project code
was changed in this phase. The portfolio avoids claims of flawless mobile behavior,
PWA support, measured business results, or server automation.

### Assets and implementation

`assets/portfolio/divine-desktop.jpg` and `divine-mobile.jpg` are actual browser
captures from September 21, 2026 (1351×890 and 375×812 pixels). They total about
172 KB, are lazy loaded with dimensions and alt text, and have full-image links.
No third-party embeds or image services are loaded. Screenshots are historical
captures; the live project may display different library content.

`showcase.css` scopes the case study, ACTIAS explanation and illustrated build.
`showcase.js` provides a deterministic weekday promotion illustration and a
six-stage build walkthrough. Both clearly disclose their illustrative nature;
neither runs a customer schedule nor creates/deploys a website. The schedule
shows a weekend promotion Friday/Saturday, a follow-up Sunday, and regular content
Monday–Thursday. No pricing, secrets, new dependency or network calls are added.

The walkthrough never autoplays. Play/Pause, Next, Replay, and Skip are native
buttons. Closing the disclosure, hiding the page or leaving stops the timer.
Reduced motion starts at the completed view and supports manual stepping with
no timed playback. Without JavaScript the six stages and completed illustration
remain visible, and Friday's sample is readable without inactive controls.
The existing soundtrack and contact implementation remain unchanged.

### Validation and continuation

Run `node test_showcase.cjs`, all previous Node tests and `python check_site.py`.
The new test covers seven schedule days and invalid inputs, no autoplay, pause,
next, replay, skip, end/close/visibility timer cleanup and reduced-motion changes.
Browser checks cover loaded screenshots, day selection, keyboard walkthrough
controls, mobile navigation and no horizontal overflow at 320, 390, 412, 768,
800, 820, 950, 1024, 1366 and 1440px. No Flex IT console errors were observed.
No real email was sent or music played. Physical-device testing was not performed.

Phase 4 was released before Phase 5. The Phase 5 feasibility decision and scanner continuation are documented in `FLEX-SCORE-SPEC.md`. Never invent scans or scores. Any future repair of the separate Divine Design repository should be
scoped as its own task.


## Phase 5 — Flex Score feasibility and website-review requests

`FLEX-SCORE-SPEC.md` records the evidence, alternatives, proposed scanner design,
security requirements, and exact continuation point. The current Pages site is
static; cross-origin reading is restricted, and a single key-free PageSpeed API
request for Flex IT returned 429/quota exceeded. No scan results were returned.
A dependable arbitrary-URL scanner requires additional provider/backend and
operational work. The automatic scanner is deferred as allowed by the original
Phase 5 instructions; no numerical score or pretend scan is published.

The shipped fallback is Request a Website Review. `website-review.js` prepares a
plain-text summary with the public website URL, selected priority and optional
visitor goal. It performs no fetch, DNS lookup, scan or automatic email. It validates
HTTP(S) URL syntax and rejects credentials; this is not a future SSRF defense.
No customer data is stored locally. The customer reviews the existing contact form
and chooses Send Message; scope and any cost are agreed before review work begins.
No free service or guaranteed turnaround is advertised.

Existing customer notes and build-planner requests remain intact. Repeat requests
replace only the previous exact generated block, leaving edited text alone. A
contact-form reset clears review handoff state. Requests wait while an earlier
message is sending; preparing a new request clears stale contact status. Without
JavaScript the review instructions link to the existing contact details/form.

`website-review.css` scopes the light-background review section; quick links and
the fictional comparison now offer review entry points. No contact-provider,
pricing, audio, domain, SEO, deployment or existing API configuration was changed.

Validation: `node test_website_review.cjs`, all previous Node checks and
`python check_site.py`. New tests cover URL edge cases, summary text, repeat
requests, preservation of notes/build requests, invalid inputs, busy-send handling,
stale status, focus and reset. Browser checks cover native required validation,
invalid scheme errors, keyboard handoff, repeat requests, cross-feature coexistence,
quick-link navigation and eight widths (320, 390, 412, 768, 820, 1024, 1366, 1440)
without horizontal overflow. No console errors observed. No real email sent or
music played. No-JavaScript fallback was checked in source; physical devices were
not tested. Phase 6 subsequently documented the future architecture; no scanner or backend was enabled.

## Phase 6 — reusable ACTIAS LUNA architecture

[ACTIAS-LUNA-ARCHITECTURE.md](ACTIAS-LUNA-ARCHITECTURE.md) defines isolated client
configuration, module/template boundaries, a first scheduled-announcement
contract, scheduling choices, data-source limits, deployment verification,
monitoring, recovery, version rollout and managed-service scope. It includes a
fictional configuration example and a concrete pilot acceptance plan.

This is documentation only, as requested for Phase 6. No module, workflow,
backend, subscription system, runtime dependency, service or account is enabled.
The customer-facing site, prices, audio, contact flow and deployment settings
remain unchanged. The existing weekday showcase remains illustrative.

Validation: reviewed against current source and plan boundaries, parsed the
JSON example, checked local Markdown links and confirmed only documentation
changed. The site checker could not rerun because its existing local BeautifulSoup
dependency folder was inaccessible; no website runtime files changed. Future module acceptance tests are
specified, not executed. Phase 7 has not started. The exact next module task is
the one-client pilot in the architecture document.
