# Upgrade validation — September 26, 2026

Baseline: `64c5300` from `TCD978/FlexIT`. Implementation branch: `upgrade/interactive-flexit`.

## Delivered

- Extended the existing design system and preserved the two flagship service paths.
- Added a lightweight wing/network hero graphic, bounded pointer response and reduced-motion fallback.
- Added a three-choice service finder with 39 supported paths and canonical pricing-row lookup.
- Added contextual service inquiries, existing-note preservation, repeat replacement and sending guards.
- Added ACTIAS LUNA Live: real browser weekday selection using Dracut time, actual session evaluation timestamps, automatic minute checks, pause/resume and explicitly labelled previews.
- Reused the verified Divine Design case study and existing portfolio screenshots.
- Added `/web-development/`, its metadata, legitimate Service schema and sitemap entry.
- Generated planner prices and the new page from the existing homepage; stale-output check included.
- Preserved existing audio, email provider configuration, price PDF, service terms, domain and Pages setup.

## Verification

- Nine Node suites: existing audio, configurator, contact, design and showcase/review checks plus service finder, shared contact context, and ACTIAS Live checks.
- Python site checker: published pricing/PDF consistency, headings, labels, unique IDs, schema, files and cross-page anchors.
- `build_site.py --check`: generated page/prices match source.
- Browser widths: 320, 390, 768, 820, 1024, 1366 and 1440px on both pages, without horizontal document overflow.
- Browser: home mesh recommendation ($225), smart-device scope/asterisk, Automation Pro ($179/month and 60-minute total allowance), preserved personal notes, repeat handoff, combined planner/review requests, mobile menu Escape/focus, pricing anchor expansion, ACTIAS simulated-day selector and pause/resume.
- Existing contact tests mock the provider. No email was sent; optional music stayed off.
- Browser console review found no warnings or errors during these checks.
- Reduced-motion rules and no-JavaScript fallbacks reviewed in source; ACTIAS timer lifecycle tested with deterministic mocks. This is not a physical-device or assistive-technology certification.

## Architecture boundaries

The site still deploys static files from the repository root. Generated artifacts are committed, so GitHub Pages needs no new build step or dependency. Python dependencies remain authoring tools only.

ACTIAS Live is a browser demonstration with real rule evaluations, not a backend service, automated deployment or uptime monitor. Browser/device clocks can be incorrect; the display explicitly identifies its clock source. Hidden pages stop their timer and resume by reevaluating current time.

The health feature remains a personal website-review request. A genuine arbitrary-site scanner is deferred, as permitted by the master plan. Continue from `FLEX-SCORE-SPEC.md` only when an appropriate backend/provider and operational scope are selected. No fake score or scan was added.

No changes to the separate Divine Design project were made. No billing, paid APIs, DNS, customer accounts or server scheduler was activated.

## Maintenance and next steps

Change canonical rates in `index.html`, then regenerate `pricing-data.js` and the dedicated page with `python build_site.py`. Keep remaining static mentions and the PDF consistent; rebuild and visually verify the PDF when rates change. Do not edit the generated page directly; its template is `templates/web-development.html`.

The frontend upgrade is ready for repository review. Publish through the existing Pages workflow after review. A true server-publishing ACTIAS pilot and an automated health scanner remain separate infrastructure work, rather than half-enabled features on this site.
