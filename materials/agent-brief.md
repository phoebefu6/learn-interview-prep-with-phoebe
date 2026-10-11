# Agent brief - shared by every fan-out page of learn-interview-prep-with-phoebe

You are writing ONE static HTML session page. No servers, no npm. **If your target file already
exists on disk, do not write it; report that and stop.** Write the file, return its path and one
line of coverage. No HTML in your reply.

## Read first, in this order

1. The template page for YOUR track. Copy its structure, classes, SVG grammar and quiz markup
   EXACTLY, including how many options each question has:
   - Single track: `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-interview-prep-with-phoebe/courses/01-what-the-interview-measures.html`
   - Also read for rhythm (bench page, same palette): `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-interview-prep-with-phoebe/courses/04-the-practice-round-bench.html`
2. The source map: every verified number, its evidence tier, per-session coverage, the seams. Use
   ONLY its numbers; never invent a statistic; if a fact is missing, teach the uncertainty.
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-interview-prep-with-phoebe/materials/official-course-map.md (and research detail in /Users/phoebe.fu/Documents/claude_work/github_repo/learn-interview-prep-with-phoebe/materials/research-notes.md)`
3. The stylesheet `:root` block for the palette tokens: `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-interview-prep-with-phoebe/assets/style.css`
<!-- Slimming these reads (map block only, no stylesheet) is plan step 6: adopt only after an A/B
     page passes the same gate. docs/plans/2026-09-25-course-builder-token-diet.md -->

## Page skeleton (keep every component)

toolbar (crumb EXACTLY "Session N of 6", #toggle-all, #zoom-toggle) · masthead (eyebrow
"Learn Interview Prep with Phoebe · Session N of 6", h1 with one `<span class="accent">`, .sub, .chip-row with the level chip
(sessions 2 and 3: "🟡 Core"; sessions 5 and 6: "🟠 Deeper"), .agenda a1-a4) · main.wrap · section#intro (Part 0: kicker, .lede, .legend pills,
.callout.win "★ What you walk out with tonight") · 3 Parts, each `section.section#part-N` with
section-kicker (klabel "Part N · covers ...", h2, `.tag.concept "N min live"`), a `.lede`, ONE
figure, `details.card` accordions (summary: `.mode.live` or `.mode.self`, title, `.mini`,
`.caret ▶`), at least one `.callout.example` with `span.ex-pill` "Real world" on the page ·
section#demo-1 Build-along (kicker `.tag.demo "★ 22 min · everyone builds"`, .lede, ONE figure,
`.steps > .step`, each with a `.prompt-box.good` carrying a `span.label`; six steps, each a real artefact the learner writes for their own interview, worked first on Ren)
· section#exercise Homework (ol, 4 items) · section#quiz (3 x `.quiz-q data-answer="0-based"`,
`p.qtext`, `button.qopt` "A · ..." as in your template, `p.qwhy`; one `p.quiz-score` after the
last) · section#official, h2 EXACTLY "What this session teaches, and where it came from",
`.covered > .covered-row` (pill solid ✓ / light ◐ + name + note), then the `.mono` line EXACTLY
"Every fact on this page, and its verification tier, is recorded in the course's source map." ·
section.cheat#cheatsheet (h3 "Session N cheat sheet <span>· pin this</span>", .grid-2 of six
.cheat-item) · `.callout.next` with `.nx-pill` "Next session" · footer.pagefoot · 
`<script src="../assets/app.js?v=1">`.

Head: the template's social meta block with this page's own title/description/url;
`<title>Session N · <title> - learn interview prep with phoebe</title>`; `<link rel="stylesheet" href="../assets/style.css?v=1">`.
Nothing else external.

First `details.card` in the FIRST Part is `open`; no other. Sentence case headings. Warm
practitioner voice, concrete, never dry. Inside prompt-boxes escape `&` `<` `>`. 450 to 650 lines
is guidance about depth, never a target: never collapse whitespace, dissolve a list into a
paragraph, or drop a component to fit.

## Hard rules (a violation is rework)

- NEVER an em dash or en dash, anywhere (prose, code, aria-labels, comments). Hyphen only.
- No meta text: never "this course", "in this course", "the course teaches", "banned here". State
  the professional norm directly with its reason. The two exact estate phrases above are the only
  self-references; "session 5" cross-references are fine.
- Attribution "by Phoebe Fu". Never "built with" a tool.
- Every number comes from the map or is labelled constructed. For constructed data print "your
  numbers will differ", never invented outputs as if run.
- Contested or missing evidence: teach the disagreement; never resolve what the literature has not.
- Citations in the exact form of the map's appendix; anything marked secondary is "reported".
- NEVER "lottery" or "lotteries"; say the mechanism ("decided by row order", "arbitrary", "a
  random draw"). A verbatim quoted title in curly quotes is the only exception.
- Default to the English word. A Chinese term that is genuinely a name carries its English in
  brackets right after it, every occurrence: `店播 (brand rooms)`.
- Titles, widget ids and class names must not collide with siblings: never use the titles "A system you keep", "The one-page marketing plan", "Is it worth the time?", "Where your week actually goes", nor any learn-ai-hr, learn-performance-management, learn-ai-leadership, learn-okr, learn-ai-productivity title; widget ids starting "ip-" and classes "ipb-" belong to the session 4 bench, do not reuse them; figure prefixes are p2a-p2e, p3a-p3e, p5a-p5e, p6a-p6e for sessions 2, 3, 5, 6.
- Running case Ren is FICTIONAL and says "constructed" on the page. Never Phoebe's career, employers or clients. No named companies (no tech giant names, no "FAANG"), no salary, pay, offer or negotiation figures, no claims about any real employer's interview process or question bank. Seams: the interviewer side belongs to learn-ai-hr; reputation/portfolio to learn-personal-branding; SQL, statistics and product analytics as subjects to their own courses; delivery to learn-public-speaking. Link them, do not teach them. Quiz: 4 options per question (as session 1); the correct answer letters for YOUR page are given in your file outline, follow them exactly. Stress content is workload and planning, never medical. The session 4 bench numbers may be quoted only exactly as in the map's "Bench canon" table. Do not include any <script> other than ../assets/app.js?v=1.

## Figure grammar (hand-drawn, every figure)

Palette, ONLY these hexes (no invented greys): `#2A4FA0` primary · `#1B3570` deep · `#3A5FB0` mid · `#C9D6F0` soft · `#EEF2FA` 50-tint · `#18203A` ink · `#525C75` muted · `#C5CDDD` faint · `#E3E8F1` hairline · `#C2453A` coral contrast (fill or stroke only; text in coral-ink) · `#8E2A22` coral-ink · `#FBECEA` coral-50 · `#FCFDFF` paper · `#F4F6FC` code-bg · `#FFFFFF` · universal reds
`#991B1B` `#FEF2F2` `#FCA5A5` only for a wrong-way panel.

- `<figure class="zoomable">` > `<svg viewBox="0 0 880 H" role="img" aria-label="the data, not the
  shape">` > `<defs>` + `<style>` + content, then `<figcaption>🔍 Click to zoom - takeaway</figcaption>`.
  Grow H, never W.
- Prefix unique per figure, used for every class and id: p<session><letter>, e.g. p2a, p2b ... (filter p2aSk, pattern p2aHc, marker p2aAr, classes .p2aH etc.).
- `<defs>` holds three things with the figure prefix P: a wobble filter `id="PSk"` (`feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="<int>"` + `feDisplacementMap scale="2.4" xChannelSelector="R" yChannelSelector="G"`, `x="-3%" y="-3%" width="106%" height="106%"`), a hachure pattern `id="PHc"` (7x7 userSpaceOnUse, rotate(-38), one accent line, opacity .5), an open arrowhead `id="PAr"` (path `M1 1 L9 5 L1 9`, fill none, ink stroke 1.6). ALL shapes sit inside ONE `<g filter="url(#PSk)" fill="none" stroke="<ink>" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`; rects carry a tiny rotation (-4 to 4 degrees for hand-placed items, under 1 for panels). Fills: white, accent-50, the hachure for "the pile" or "the data", and the contrast colour ONLY for the one thing the figure is about. One doodle anchor per figure, simple strokes, never a mascot. Text classes: `.PH` 800 12px ink heading · `.PL` 600 12px ink label · `.PS` 400 11px muted · `.PB` 800 11px contrast-ink · `.PV` 800 16-20px accent-deep value · `.PW` 800 12px white on a fill · `.PA` 700 11px accent axis caption · `.PN` 400 12px muted note. Hand-stacked items must not overlap as painted rects (the gate flags a pile). Text classes in this course: .PH 800 12px #18203A · .PL 600 12px #18203A · .PS 400 11px #525C75 · .PB 800 11px #8E2A22 · .PV 800 12-18px #1B3570 · .PW 800 12px #FFFFFF on #2A4FA0 or #1B3570 fills only · .PA 700 11px #2A4FA0 · .PN 400 12px #525C75. Hachure stroke #2A4FA0. Ink stroke #18203A. Copy the exact <defs>/<style> blocks from session 1.
- ALL `<text>` outside any filtered group, sans stack, never below 10.5px.
- Fit (owner: `diagram-kit.md`, change it there first): max chars ≈ (box width - 20) / 7 at 12px,
  6.4px/char at 11px; full-width note under 110 chars; 40px between neighbouring point labels; bottom
  note 22px below the last row, H clears it by 8px. When in doubt, shorten.
- Floor: one figure per Part plus one in the build-along. Draw the MECHANISM (a story card split into situation/task, action, result with the action box the biggest; the grain of a join drawn as one order fanning into item rows; a p-value drawn as the tail area under a null distribution with the observed line; an estimation tree multiplying assumptions; a review loop feeding the story bank),
  never a metaphor literally, never decoration.

## Voice and honesty

Every Part gets a real-world story from the map's cases. Constructed cases say "constructed" on the
page: Ren, job descriptions A and B, Ren's eight stories S1-S8 (titles and lengths in the map), every product case number, every take-home brief. REPORTED facts carry the word "reported" on the page. Things the map lists under "Not found" (take-home validity, ideal answer length, effect of candidate questions) are taught as practice with "no study found", never as findings. Contested findings (structured interview validity sizes) are taught as a disagreement.

## Cross-links (absolute URLs)

- Interviewer side: https://phoebefu6.github.io/learn-ai-hr-with-phoebe/courses/b5-structured-interviews.html
- Personal branding: https://phoebefu6.github.io/learn-personal-branding-with-phoebe/
- SQL: https://phoebefu6.github.io/learn-sql-with-phoebe/
- Statistics: https://phoebefu6.github.io/learn-statistics-with-phoebe/
- Product analytics: https://phoebefu6.github.io/learn-product-analytics-with-phoebe/
- Public speaking: https://phoebefu6.github.io/learn-public-speaking-with-phoebe/
- Hub: https://phoebefu6.github.io/learn-with-phoebe/

## Footer chain(s) and session titles

Chain: 01-what-the-interview-measures.html (What the interview is actually measuring) -> 02-a-story-bank.html (A story bank that covers the job) -> 03-the-sql-round.html (The SQL round) -> 04-the-practice-round-bench.html (The practice-round bench) -> 05-stats-and-the-product-case.html (Stats, experiments and the product case) -> 06-take-homes-and-the-review.html (Take-homes, your questions, and the review after) -> ../index.html (Course home).
Footer left: "Session N of 6 · learn-interview-prep-with-phoebe · by Phoebe Fu &nbsp;·&nbsp; 📚 <a href="https://phoebefu6.github.io/learn-with-phoebe/">Learn with Phoebe ↗</a>"
Footer right: "← Prev: <title>" and "Next: <title> →" (last page: "← Prev" and "Course home").

Session titles (exact, sentence case, one accent span in h1): "What the interview is actually <span class=accent>measuring</span>", "A <span class=accent>story bank</span> that covers the job", "The <span class=accent>SQL</span> round", "The <span class=accent>practice-round</span> bench", "Stats, experiments and the <span class=accent>product case</span>", "Take-homes, your questions, and the <span class=accent>review</span> after"
