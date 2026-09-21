# ACTIAS LUNA — reusable automation architecture

## Status and foundation

Phase 6 is a design deliverable. No scheduler, module runtime, API integration, database, account, billing system or admin application is enabled. The customer-facing Flex IT site is unchanged. Phase 7 remains separate.

Goal: build a useful module once, configure it for multiple clients, and manage each installation as a bounded service. Start with one real client; extract shared code after a second use demonstrates what should be shared.

The current repository is static HTML/CSS/JavaScript, published from the main branch root through GitHub Pages. `showcase.js` provides a visitor-controlled weekday promotion illustration, not a production scheduler. `configurator.js` prepares requests, not service provisioning. `website-review.js` prepares personal review requests; the automatic scanner remains deferred in [FLEX-SCORE-SPEC.md](FLEX-SCORE-SPEC.md). Contact, soundtrack, domain and prices stay intact.

## Architecture decision

Use isolated client deployments, small versioned modules and explicit configuration. Keep private customer records and credentials outside public source and published files. A shared multi-client runtime is unnecessary at this stage.

```text
Approved public content + client configuration + explicit clock
                         |
                  Validate configuration
                         |
                 Pure module selection
                         |
               Escaped accessible template
                         |
                  Preview and acceptance
                         |
            Supported client deployment process
                         |
          Verify published content and freshness
```

Pass the clock into the selector so tests can reproduce any date. Keep fetching, rendering, deployment and notification separate. A module must not silently spend API credits or make network requests.

| Component | Responsibility | Excludes |
|---|---|---|
| Module | Select approved content using validated rules | Network, credentials, billing |
| Public configuration | Content, time zone, version, fallback | Private contacts, invoices, keys |
| Source adapter | Read a scoped source and validate data within limits | Arbitrary URL fetching or executable configuration |
| Template | Semantic HTML and safe links | Unescaped customer HTML/scripts |
| Runner | Supply clock, validate, generate, compare | Changing plan entitlements |
| Deployer | Publish one tested client artifact | Cross-client writes |
| Private operations record | Scope, owner, version, costs, last success | Public disclosure of client information |

Use an existing private business record and manual checklist initially.

## First module: scheduled announcement

Pilot one approved announcement area, such as a featured service or weekend promotion. Use fictional fixtures until the client approves wording, dates and fallback.

Proposed interface, not implemented:

```text
validate(config) -> validatedConfig or field errors
select(validatedConfig, instantUTC) -> selection
render(selection) -> escaped semantic HTML
```

Selection returns module version, content ID, state (scheduled/fallback/disabled), reason and public content. Diagnostics include the configuration revision and evaluated UTC instant. Exclude volatile diagnostics from the rendered content hash to avoid unnecessary deployments.

Example configuration (fictional; not installed):

```json
{
  "schemaVersion": 1,
  "module": "scheduled-announcement",
  "moduleVersion": "1.0.0",
  "clientId": "sample-client",
  "enabled": true,
  "timeZone": "America/New_York",
  "fallback": {
    "id": "regular-service",
    "heading": "Explore our services",
    "body": "Get in touch to discuss your project.",
    "href": "/#contact",
    "linkLabel": "Contact us"
  },
  "rules": [{
    "id": "weekend",
    "weekdays": [5, 6],
    "startDate": "2026-10-01",
    "endDateExclusive": "2026-11-01",
    "content": {
      "id": "weekend-message",
      "heading": "Plan your next project",
      "body": "Ask about our featured service this weekend.",
      "href": "/#contact",
      "linkLabel": "Ask about the service"
    }
  }]
}
```

Pilot contract:

- Sunday is 0; Saturday is 6. Evaluate weekday and calendar date in the configured IANA time zone, independently of visitor locale. Start is inclusive and end exclusive. Date-only rules avoid ambiguous repeated/skipped hours during daylight-saving transitions.
- Validate versions, real calendar dates, supported zone, booleans, unique IDs, weekday range and start-before-end. Reject unknown fields to catch misspellings.
- Reject overlapping rules rather than inventing priority. Cap rules at 20, headings at 120 characters, bodies at 500 and link labels at 80. Reject empty mandatory content.
- Accept same-site root-relative links, excluding `//...`, or HTTPS URLs on explicitly approved hosts. Reject credentials and unsafe schemes. Escape text at the template boundary.
- Disabled or unmatched rules select the approved evergreen fallback. Invalid configuration fails before deployment; never publish partial output.
- Identical input and clock produce identical selection. Do not rotate randomly or execute configuration as code.

## Rendering and scheduling

For simple preapproved content, consider static baseline HTML plus a small browser selector when client clock accuracy and JavaScript dependence are acceptable. Evaluate on load, visibility return and the next boundary. Preserve readable fallback without JavaScript. Browser selection is not an authoritative pricing or transaction rule, and does not guarantee search engines see every variation.

Use scheduled generation when public HTML must change or controlled external data must be read. Generate a temporary artifact, validate it, compare content hashes and publish meaningful changes. On failure retain the previous good deployment and report the issue. Expired promotions must not become an evergreen fallback: pre-render neutral content and suppress stale offers in the page where possible. Exact commercial expiry requires infrastructure with suitable timing and availability guarantees before accepting the work.

GitHub schedules may be delayed or dropped; inactive public repositories can have schedules disabled. Jobs run from the default branch. Use a non-peak minute, document the local time zone and provide manual recovery. Do not promise exact-minute execution. [GitHub scheduling documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

Inspect each client's actual deployment trigger. Do not assume automation-generated commits trigger another workflow or Pages build. Prove the whole generation-to-publication path in the pilot. A different deployment workflow may require a separately reviewed settings change; Phase 6 makes none.

Evaluate hosting suitability per client. GitHub Pages restricts commercial SaaS and sites primarily facilitating commercial transactions, and has resource limits. It is not the default answer for every future product. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## Reuse, templates and versions

Proposed future layout, not created in this phase:

```text
actias/
  modules/scheduled-announcement/  # selector and validation
  templates/                      # semantic renderers
  fixtures/                       # fictional public examples
  tests/                          # boundaries and failure cases
```

Client repositories hold their own approved public configuration and a pinned module release. Initially vendor the small reviewed module with version/provenance; avoid a package registry or runtime CDN dependency. Pilot upgrades before rolling out client by client. Breaking schema changes require explicit migration and a retained rollback version.

Templates inherit typography and colors through a few documented CSS variables. Use ordinary headings, paragraphs and links, with keyboard focus and reduced-motion support. No animation framework is needed.

## Data sources and APIs

Start with repository-managed content and zero external API calls. Add adapters only for an agreed requirement. Each needs an allowed source, data contract, timeout, response-size limit, freshness window, bounded retries and cost cap. Validate responses before rendering. Cached data may be reused only while valid; otherwise choose evergreen fallback and report degraded status.

Credentials belong in the client's protected server/runner environment, never browser code, public JSON, logs or generated artifacts. Separate credentials and permissions by client. Do not accept arbitrary fetch URLs from visitors. AI, authenticated integrations and the Flex Score scanner require separate scoping.

## Operations, monitoring and recovery

Maintain a private record of client/site, approved scope, source/config revision, module version, time zone, cadence, freshness threshold, support owner, approved budget, last successful publication and rollback revision. Logs contain run ID, UTC start/end, outcome, content hash and sanitized error category; exclude raw provider payloads and customer messages. Proposed retention is 30 days, to be agreed before onboarding.

Generation success is not publication success. Check the deployed version/content. Distinguish invalid configuration, source failure, unchanged content, deploy failure and verified success. Detect missing runs with an independent freshness check, initially an existing monitor or documented manual review. Phase 6 installs no monitoring and claims none is active.

Recovery procedure:

1. Identify the affected client and published version.
2. Stop the faulty job or disable its module using reviewed configuration.
3. Restore the previous tested artifact or evergreen fallback; preserve unrelated site content.
4. Verify public output and record recovery. Notify the customer through the agreed support process when impact warrants it.
5. Reproduce the failure in a fixture, fix and test, then re-enable.

Use bounded jobs and one publication at a time per client. Prevent old runs overwriting newer content. Grant minimum repository/deploy permissions; do not run untrusted pull-request code with deploy secrets. Pin reviewed dependencies/actions during implementation and establish an update cadence.

## Service and subscription management

Configuration does not implement billing or prove a purchase. Use the existing quote/invoice process and private scope record. Before activation agree the module, setup work, support, external costs, owner and cancellation/handoff procedure.

| Offer | Operational boundary |
|---|---|
| Care — $49/month | Technical care; no included automation or editing |
| Automation — $99/month | One scoped feature; approximately 30 minutes/month minor changes |
| Pro — $179/month | Multiple scoped features or advanced automation; 60 minutes/month minor changes total |
| Custom | Complex APIs, AI, databases, high-frequency jobs or substantial support |

Unused editing time does not roll over. New modules, redesigns and integrations are separately quoted development. Domain, hosting, API and other third-party costs remain separately disclosed. Track actual support time and usage; reassess scope before exceeding budget. Do not automatically charge, provision, suspend or delete anything based on this design.

Initial admin tooling is validated configuration, preview, release history and a runbook. Add dashboards, authentication, databases, billing automation or multi-tenant services only when repeated operational work justifies a separately authorized project.

## Acceptance and exact continuation

Next implementation unit: one scheduled-announcement pilot.

1. Select an actual client/site; agree approved content, time zone, timing tolerance, fallback, hosting suitability and service scope.
2. Choose browser selection or generated HTML from those needs and inspect the client's deployment.
3. Implement the pure selector, validator and template with fictional fixtures; no paid dependency is needed for this baseline.
4. Test weekday boundaries, date start/end, DST dates, invalid dates/zones, overlap, disabled mode, escaping/unsafe links, repeated runs, stale source, failed deployment and rollback.
5. Preview desktop/mobile, keyboard access and no-JavaScript fallback; verify unrelated content is unchanged.
6. Obtain client content acceptance, publish through the agreed process, verify public output and a full schedule transition, and record recovery ownership.
7. After a second client use, extract proven shared behavior into a reusable release.

Phase 6 completes the architecture and continuation plan, not the proposed runtime or its tests. Phase 7 optional visual polish awaits the user's instruction.
