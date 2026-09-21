# Flex Score — Phase 5 feasibility and continuation

Assessed September 21, 2026. **Automated scanning is not implemented or advertised.**
The shipped feature is a personal website-review request using the existing contact
flow. It produces neither scan findings nor numerical scores.

## Decision and evidence

Flex IT deploys static HTML/CSS/JavaScript from `main` to GitHub Pages. There is no
application server or private credential store. GitHub describes Pages as static
hosting: [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

A browser generally cannot inspect another site's response unless that site grants
cross-origin access. `no-cors` does not fix this: the response becomes unreadable.
The presence of `https://` in an entered URL also does not prove a successful HTTPS
connection. See [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors)
and [opaque responses](https://developer.mozilla.org/en-US/docs/Web/API/Response/type).

Google's PageSpeed Insights API can provide real Lighthouse data, including
performance, accessibility and SEO checks. Its documentation permits key-free
requests and recommends a key for frequent automated queries. A single key-free
request for Flex IT's public homepage during this assessment returned HTTP 429,
with a quota-exceeded response. This is evidence about that request, not a claim
about the user's personal quota or all future availability. No score or audit was
returned. See [Google's API guide](https://developers.google.com/speed/docs/insights/v5/get-started).

An open URL-fetching backend would introduce server-side request forgery (SSRF):
attackers could try to make it reach private networks or cloud metadata. Redirects,
DNS resolution and destination IPs need validation, supported by network isolation.
See [OWASP's SSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).

**Conclusion:** the existing static site cannot reliably deliver the broad scanner
described in Phase 5. A dependable public implementation adds a provider/backend,
quota handling, security work and operational ownership. Following the original
phase instructions, this release supplies the review CTA and this specification.

## Options assessed

| Option | Useful capability | Limitation | Decision |
| --- | --- | --- | --- |
| Browser fetch of arbitrary sites | Read CORS-enabled pages | Most targets cannot be inspected; failures are not evidence of bad site health | Do not ship as a general scanner |
| Unauthenticated PageSpeed API | Real provider-generated audits when available | Assessment request returned 429; no agreed quota/reliability arrangement | Do not ship as a dependable service |
| Configured audit provider | Measured results with supported limits | Requires provider choice, usage policy and integration work | Future candidate |
| Isolated worker with a browser | Rendered mobile, performance and automated accessibility checks | Requires backend security, maintenance and capacity | Future candidate |
| Personal review intake | Collect a website and the owner's priorities | No instant automated report | Shipped |

No CORS proxy, new cloud account, paid service, API credential, DNS change,
GitHub workflow, database or public scanning endpoint was introduced.

## Shipped customer experience

1. Enter a public HTTP(S) URL, choose a focus and optionally describe a visitor goal.
2. Request a Website Review adds an editable summary to the existing contact form.
3. The customer reviews it and supplies name/email before choosing Send Message.
4. Tom confirms scope and any cost before work begins. No free review, turnaround,
   ranking, security certification or accessibility-compliance guarantee is promised.

URL handling checks syntax and rejects non-web schemes and embedded credentials.
It performs no DNS lookup, reachability request, link checking or scan. It is **not**
the security boundary for a future scanner. No entered URL is sent anywhere until
the customer submits the existing contact form. There is no local persistence.

Existing notes and build-planner requests are preserved. Repeating the review
request replaces only the exact generated block. If the customer edited that block,
the edited text remains and a new block is appended. This deliberately favors
preservation over destructive deduplication. Contact-form reset clears handoff state.

## Proposed first scanner milestone — not yet built

Begin with an operator-controlled prototype on an explicit allowlist of public,
owner-approved domains. Measure one page at a time. Keep the existing website
deployment untouched. Before offering arbitrary public URLs, approve the service
provider, cost ceiling, retention policy, capacity limits and maintenance owner.

### Honest results contract

Each check should return its name, status (`passed`, `needs_attention`, `not_checked`
or `error`), evidence, tested URL, timestamp, tool/version and a practical next step.
For rendered audits, also identify desktop/mobile mode and test conditions. Make
timeouts, unreachable pages, robots restrictions, missing data and partial results
visible. Never translate a missing check into a passing result or a zero score.

| Check | Evidence required | Important limit |
| --- | --- | --- |
| HTTPS | Successful TLS request and validated redirect destination | Not a security audit of the business |
| Search basics | Actual title, description, canonical and indexability observations | Not a ranking prediction |
| Mobile layout | Rendered viewport dimensions and observed overflow | Not every physical device |
| Accessibility indicators | Named automated checks and manual-review gaps | Not a compliance certificate |
| Performance | Real measured metrics with tool, timestamp and conditions | Lab measurements vary; field data may be unavailable |
| Links | Bounded list of checked links and their actual responses | Not proof that all website links work |

Prefer understandable check results over a single score for the first milestone.
If a future score is approved, publish its exact rubric and coverage. Keep provider
scores attributed to their provider; do not rename a Lighthouse category as a
comprehensive Flex Score. An illustration must never appear in a real report.

### Engineering acceptance gates

These are proposed requirements, not implemented controls:

- Validate HTTP(S) targets on the server. Reject credentials and private, loopback,
  link-local, reserved and metadata destinations for IPv4 and IPv6. Validate every
  redirect and resolution; isolate worker egress to prevent DNS-rebinding escapes.
- Begin without authenticated sessions or arbitrary ports. Do not log sensitive
  query strings; define retention/deletion and avoid indexing reports publicly.
- Bound redirects, response/decompressed size, page resources, crawl depth, time,
  concurrency and requests per requester/domain. Add cancellation and quota limits.
- Keep credentials server-side where applicable. Escape displayed evidence. Never
  execute target content on the Flex IT origin or expose an open proxy.
- Use GET/HEAD only within agreed scope. Do not submit target forms, attempt logins,
  follow destructive actions or conduct intrusive vulnerability testing.
- Test redirects to private addresses, alternate IP encodings, DNS changes,
  oversized responses, slow pages, malicious HTML, unreachable hosts, quota errors,
  partial provider data and caching timestamps before public release.
- Preserve manual-review fallback on every scanner failure and provide operational
  monitoring and a way to disable the service without breaking the main website.

## Exact continuation point

The Phase 5 feasible release is complete; the automatic scanner is deferred.
Do not start Phase 6 without instruction. To resume scanner work, first choose
between an operator-run allowlisted prototype and a configured audit provider,
agree on costs/limits, and implement a real evidence-producing check in isolation.
Then meet the gates above before adding a public scan button. Start from this
document, `website-review.js`, `website-review.css`, and `index.html`.
