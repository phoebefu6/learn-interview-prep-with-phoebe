# learn-interview-prep-with-phoebe - official course map (source map)

Internal build document. Never linked from an audience page. Every number a page quotes must be in
this file, with its tier. Tiers: READ-AT-SOURCE (the words were read on the primary page or the
publisher's typeset text), REPORTED (secondary only; say "reported" on the page), CONSTRUCTED
(invented for teaching; say "constructed" on the page), COMPUTED (printed by the bench and by the
Python reference, which agree).

Full research notes with URLs: `materials/research-notes.md`.

Bucket `lead`, d2, audience everyone. Single track, 6 sessions x 45 min. Session 4 = bench.
Running case: **Ren**, a fictional analyst moving into a data science role (CONSTRUCTED). Never
Phoebe's career. No named companies, no salary or pay data, no claims about any real employer's
interview process.

## Sessions

| # | File | Title (h1 accent in brackets) |
|---|---|---|
| 1 | 01-what-the-interview-measures.html | What the interview is actually [measuring] |
| 2 | 02-a-story-bank.html | A [story bank] that covers the job |
| 3 | 03-the-sql-round.html | The [SQL] round |
| 4 | 04-the-practice-round-bench.html | The [practice-round] bench |
| 5 | 05-stats-and-the-product-case.html | Stats, experiments and the [product case] |
| 6 | 06-take-homes-and-the-review.html | Take-homes, your questions, and the [review] after |

### Session 1 - What the interview is actually measuring
- A loop is a set of measurements: job description -> competencies -> rounds (screen, SQL, stats or
  experiment, product case, behavioural, take-home). Each round measures a subset.
- Structured vs unstructured interviews: the validity numbers and the disagreement (Schmidt and
  Hunter 1998 vs Sackett et al. 2022 vs Oh, Le and Roth 2023 / Ones and Viswesvaran 2023 / Sackett
  reply 2023). Both camps agree structured beats unstructured.
- What structure means (Campion et al. 1997's 15 components, via Levashina 2014) and what it means
  for a candidate: same questions, rated answers, notes, questions held to the end.
- Myth check: "interviewers decide in the first 4 minutes / 30 seconds".
- Build-along: read Ren's job description A into eight competencies, map each to a round, rate.
- Health line (once here and on the landing): nerves and workload are planning topics; nothing
  here is medical or clinical advice; the body side belongs to planned move-shelf courses.

### Session 2 - A story bank that covers the job
- Past-behaviour questions vs situational questions (Levashina 2014 numbers).
- STAR: what it is, and the origin claim (DDI self-claim 1974, REPORTED tier); behavioural
  interviewing in the peer-reviewed literature credited to Janz (1982).
- Building the bank: 8 stories, each with situation/task, action, result; tagging every story to
  every competency it honestly evidences; trimming to a time limit (rule of thumb, no study).
- Honesty: impression management numbers; self-promotion; structure reduces faking; deceptive IM.
- Build-along: write Ren's eight stories as one-line STAR cards and tag them against JD A.

### Session 3 - The SQL round
- Read the question before typing: grain (what is one row?), the person id, NULLs, the time
  range, row order asked or not. Say it out loud.
- SQLite semantics read at source: avg ignores NULL; count(X) vs count(*); WHERE before grouping,
  HAVING after; a WHERE on the right table undoes a LEFT JOIN; aggregate without GROUP BY returns
  one row.
- Being watched changes performance (Behroozi et al. 2020): practise thinking aloud, watched.
- Build-along: the four checks on each of the six bench questions, written queries on paper; run
  them in session 4.

### Session 4 - The practice-round bench (hand-authored)
- SQL round bench and story-bank bench; numbers in "Bench canon" below.

### Session 5 - Stats, experiments and the product case
- Stats round: explain a p-value in one sentence the ASA statement would accept; effect size vs
  significance; stopping a test early when it looks good (peeking) and why it is unreliable
  (Johari et al.); designing an experiment out loud: unit, metric, guardrail, duration decided in
  advance.
- Product case: choosing a metric (one primary, guardrails), estimation (decompose, state
  assumptions, sanity-check the order of magnitude). All case numbers CONSTRUCTED.
- Seams: learn-statistics and learn-product-analytics own the subjects; here they are rounds.

### Session 6 - Take-homes, your questions, and the review after
- Take-homes: no peer-reviewed validity study found; nearest evidence is work samples (Sackett
  2022: .33); time-box, state assumptions, README first, show checks, do not gold-plate.
- Questions you ask: in a structured interview candidate questions are held to the end and usually
  not scored (Campion component 7, via Levashina); no peer-reviewed effect size for "good questions".
  Ask to learn what the job is; three kinds of questions (the work, the team's decisions, how
  success is measured). No salary content.
- The review after each round: write down within the hour what was asked, which competency it was
  probing, what you answered, what evidence was missing; update the bank and the SQL drill list.
- Course close: Ren's loop end to end (CONSTRUCTED; no outcome claims about real employers).

## Seams (absolute links)
- Interviewer side (structured interviews, calibration): https://phoebefu6.github.io/learn-ai-hr-with-phoebe/
  (b5 page: https://phoebefu6.github.io/learn-ai-hr-with-phoebe/courses/b5-structured-interviews.html)
- Reputation and portfolio visibility: https://phoebefu6.github.io/learn-personal-branding-with-phoebe/
- SQL as a subject: https://phoebefu6.github.io/learn-sql-with-phoebe/
- Statistics as a subject: https://phoebefu6.github.io/learn-statistics-with-phoebe/
- Product analytics as a subject: https://phoebefu6.github.io/learn-product-analytics-with-phoebe/
- Delivery on the day: https://phoebefu6.github.io/learn-public-speaking-with-phoebe/
- Hub: https://phoebefu6.github.io/learn-with-phoebe/

## Verified facts

### Selection research
- Schmidt, F. L., & Hunter, J. E. (1998). The validity and utility of selection methods in
  personnel psychology: Practical and theoretical implications of 85 years of research findings.
  Psychological Bulletin, 124(2), 262-274. READ-AT-SOURCE (full text, Table 1):
  - 85 years of research; 19 procedures.
  - Validity for job performance: structured interview .51; unstructured interview .38; general
    mental ability (GMA) .51; work sample tests .54; job knowledge tests .48.
  - GMA + structured interview .63.
- Sackett, P. R., Zhang, C., Berry, C. M., & Lievens, F. (2022). Revisiting meta-analytic estimates
  of validity in personnel selection: Addressing systematic overcorrection for restriction of
  range. Journal of Applied Psychology, 107(11), 2040-2068 (online first 2021). READ-AT-SOURCE
  (full text, Table 3):
  - Structured interview .42 (ranked first); job knowledge .40; work samples .33; cognitive ability
    .31; unstructured interview .19.
  - Argument: prior corrections for range restriction overcorrected, especially for concurrent
    studies; "recommend no range restriction correction for concurrent studies". Mean validities
    reduced by .10 to .20 for most procedures.
  - S&H's structured .51 traced to McDaniel et al. (1994): observed .28, .37 after criterion
    correction, .51 after range-restriction correction.
- The disagreement:
  - Oh, Le and Roth (2023), JAP 108(8), 1300-1310: Sackett et al. "substantially underestimate the
    severity" of range restriction; recommendation "should be reconsidered". READ-AT-SOURCE (abstract
    only).
  - Sackett, Berry, Lievens and Zhang (2023) reply, JAP 108(8), 1311-1315: endorse correction when
    the applicant-pool information is available; in meta-analysis it typically is not.
    READ-AT-SOURCE (abstract only).
  - Ones and Viswesvaran (2023), Industrial and Organizational Psychology 16, 358-365: "disagree with
    the assertion that the operational validity of cognitive ability is much lower than previously
    reported". READ-AT-SOURCE (full text).
  - Teaching frame: both sides agree structured interviews predict well and unstructured ones less
    well; they disagree about how much to correct, which mostly moves cognitive ability.
- Campion, Palmer and Campion (1997), Personnel Psychology 50(3), 655-702: 15 components of structure,
  7 content + 8 evaluation. Original not read (Wiley 403); list READ-AT-SOURCE in Levashina 2014
  (pp. 244-245). Content: job analysis; same questions; limit prompting; better question types;
  longer interview or more questions; control ancillary information; no applicant questions until
  after. Evaluation: rate each answer or multiple scales; anchored scales; notes; multiple
  interviewers; same interviewers; no discussion between interviews; training; statistical
  prediction. Pages say "as listed by Levashina et al. 2014".
- Levashina, Hartwell, Morgeson and Campion (2014), Personnel Psychology 67(1), 241-293.
  READ-AT-SOURCE (full text):
  - Past-behaviour questions (from Janz 1982) vs situational (from Latham et al. 1980): uncorrected
    validity .31 vs .25 (Taylor and Small 2002) and .31 vs .26 (Huffcutt et al. 2004); "SQs have
    slightly lower criterion-validity than PBQs, especially for high-complexity jobs". Recommend both.
  - Interrater reliability .79 (SQ) vs .76 (PBQ).
  - Applicants with little job experience can use non-work examples (Gibb and Taylor 2003).
  - Impression management: self-promotion correlates r = .26 with interview ratings (k = 13,
    N = 2,202); "almost all applicants use some form of IM" (Ellis et al. 2002); structure decreased
    faking; probing increased faking (Levashina and Campion 2007). Barrick et al. 2009: verbal IM to
    rating link .27 at low structure, .17 at high structure.
- STAR origin: DDI's own page says "DDI introduced the STAR Method in 1974 with Targeted
  Selection" and defines S as Situation/Task. Tier: a company self-claim, no independent history
  found; pages say "DDI says it introduced". SAR, PAR, CAR: folk variants, no origin found.
- Janz (1982), JAP 67(5), 577-580: patterned behaviour description interview; credited in
  Levashina 2014 as the origin of past-behaviour questions. Abstract not read: cite via Levashina.
- First impressions:
  - Frieder, Van Iddekinge and Raymark (2016), JOOP 89(2), 223-248: 166 interviewers, 691
    applicants; structure (question consistency) went with LONGER decision time. READ-AT-SOURCE
    (abstract). The breakdown (about 5 percent within 1 minute, about 30 percent within 5 minutes)
    is REPORTED (BPS Research Digest); say "reported".
  - Ambady and Rosenthal (1993), JPSP 64(3): 13 teachers, silent clips under 30 s predicted
    end-of-semester student ratings. READ-AT-SOURCE. Not a hiring study; using it for "interviewers
    decide in 30 seconds" is a misapplication.
- Behroozi, Shirolkar, Barik and Parnin (2020), ESEC/FSE 2020, "Does stress impact technical
  interview performance?": randomized trial, 48 computer science students, private vs watched
  whiteboard; "performance is reduced by more than half, by simply being watched by an
  interviewer." READ-AT-SOURCE (abstract page). Small sample, students, not hires.

### SQLite documentation (READ-AT-SOURCE, sqlite.org, 2026-10-10)
- lang_aggfunc.html: "The avg() function returns the average value of all non-NULL X within a
  group." "The result of avg() is NULL if there are no non-NULL inputs." count(X) counts non-NULL X;
  count(*) counts rows. sum() of no non-NULL rows is NULL; total() is 0.0.
- lang_select.html: rows where WHERE evaluates "to either false or NULL" are excluded; HAVING "is
  evaluated once for each group"; an aggregate query without GROUP BY "always returns exactly one
  row"; outer-join NULL rows "are added after ON clause processing but before WHERE clause
  processing". The processing order is "purely illustrative".
- nulls.html: SQLite made NULL handling "work the same as Oracle, PostgreSQL, and DB2"; NULLs are
  indistinct for SELECT DISTINCT and UNION.

### Statistics round
- ASA Statement on Statistical Significance and P-Values, released 7 March 2016 (Wasserstein and
  Lazar, The American Statistician). Six principles, READ-AT-SOURCE (ASA press release):
  1 p-values can indicate how incompatible the data are with a specified statistical model;
  2 they do not measure the probability that the studied hypothesis is true, or that the data were
  produced by random chance alone; 3 decisions should not be based only on whether a p-value passes
  a threshold; 4 proper inference requires full reporting and transparency; 5 a p-value does not
  measure the size of an effect or the importance of a result; 6 by itself a p-value is not a good
  measure of evidence.
- Johari, Pekelis and Walsh (2015, arXiv 1512.04922), "Always valid inference": standard p-values
  and confidence intervals are "wholly unreliable if users endogenously choose samples sizes by
  continuously monitoring their tests". READ-AT-SOURCE (abstract).

### Not found (teach as practice, never as finding)
- Peer-reviewed validity of take-home assignments: none found. Nearest: work samples .33 (Sackett 2022).
- An ideal answer length (1-2 minutes): coaching rule of thumb only.
- Effect of the questions a candidate asks: no peer-reviewed effect size read.

## Bench canon (COMPUTED; Python sqlite3 3.51.1 and node + sql.js 1.10.3 / SQLite 3.45.2 agree on all 356 values)

Run: `python3 materials/ip_reference.py` and `node materials/ip-compare.js <node_modules/sql.js>`.

Data: Olist (Kaggle olistbr/brazilian-ecommerce, CC BY-NC-SA 4.0), 2,000 people (seed 20261010) and
all their orders: 2,085 customers rows, 2,085 orders, 2,359 order items, 775 sellers; orders
2016-10-04 to 2018-09-29; 59 undelivered orders; 203 orders with more than one item; 2 orders on
31 Dec 2017. File 261 KB.

| Q | Trap | Reference | Trap result |
|---|---|---|---|
| Q1 orders by status | none | canceled 13, delivered 2,025, invoiced 7, processing 6, shipped 20, unavailable 14 | - |
| Q2 orders with an item > 100 | join duplicates | 802 | 850 (48 extra item rows) |
| Q3 on-time share of delivered | NULLs in an average | 0.943 | 0.916 |
| Q4 sellers >= 5 items, avg > 150 | WHERE vs HAVING | 24 sellers; first sorted row seller 904, 159.67 | 18 sellers; first 966, 231.94; 14 shared, 10 missed, 4 wrong additions, 8 shared with inflated average (seller 1286: 239.72 vs 415.00) |
| Q5 orders per month 2017 | BETWEEN loses 31 Dec | Jan 14, Feb 36, Mar 52, Apr 34, May 59, Jun 83, Jul 90, Aug 86, Sep 109, Oct 98, Nov 183, Dec 111 | Dec 109 |
| Q6 repeat customers | customer_id is per order | 57 | 0 |

Every trap fails the checker; every reference and alternative correct form (EXISTS for Q2, SUM/COUNT
for Q3, alias in HAVING for Q4, strftime for Q5, USING join for Q6) passes. Column order is checked.

Story bank (fits and lengths CONSTRUCTED; arithmetic COMPUTED). JD A (product analytics, 8 comps).

| Rung | Honest coverage | covered/thin/missing | distinct stories | max reuse | fits 2 min |
|---|---|---|---|---|---|
| 3 stories, untagged | 37.5% | 3/0/5 | 3 | 1 | 0 of 8 |
| 5 stories, untagged | 62.5% | 5/0/3 | 5 | 1 | 0 of 8 |
| 8 stories, tagged | 93.8% (0.9375) | 7/1/0 | 6 | 2 | 0 of 8 |
| 8 tagged, trimmed (115 s) | 93.8% | 7/1/0 | 6 | 2 | 8 of 8 |
| Anti-lever: stretch S2 | honest 31.3% (0.3125), claimed 100% | 2/1/5 | 1 | 8 | 3 of 8 |
| Break: JD B, trimmed bank | 62.5% | 4/2/2 (missing ML system design, deploying models) | 4 | 3 | 6 of 8 |
| JD B, stretch S2 | honest 0%, claimed 100% | 0/0/8 | 1 | 8 | 0 |

Thin row on JD A at the top rung: "Turning a vague ask into a question".
Ren's stories: S1 The dashboard nobody trusted (230 s); S2 The A/B test that was stopped early (260 s);
S3 Choosing the one metric for a launch (200 s); S4 The report query rewritten in three days (150 s);
S5 The forecast I got wrong (180 s); S6 Saying no to a misleading chart (140 s); S7 The churn
question nobody had defined (210 s); S8 Teaching the team window functions (110 s).
Ren's constructed fits (strong / thin), used by session 2's tagging build-along and the bench:
S1 dashboard: data quality strong, SQL strong, explaining thin, owning end to end thin.
S2 A/B test stopped early: experiments strong, pushing back strong, metric choice thin.
S3 one metric for a launch: metric choice strong, explaining strong, vague ask thin.
S4 report query rewrite: SQL strong, owning end to end strong, production pipelines thin.
S5 forecast I got wrong: learning from a mistake strong, predictive models thin, experiments thin.
S6 saying no to a misleading chart: pushing back strong, explaining strong.
S7 undefined churn question: metric choice strong, vague ask thin, explaining thin.
S8 teaching window functions: helping others strong, SQL thin.
Untagged rungs use each story only for its headline: S1 data quality, S2 experiments, S3 metric
choice, S4 SQL, S5 learning from a mistake, S6 pushing back, S7 vague ask, S8 helping others.
JD A competencies: SQL and data wrangling; Experiment design and statistics; Metric choice and
product sense; Explaining results to non-specialists; Disagreeing and pushing back; Turning a vague
ask into a question; Learning from a mistake; Data quality and rigour.
JD B: Building predictive models; Production data pipelines; ML system design; Deploying and
monitoring models; Owning work end to end; Helping others get better; SQL and data wrangling; Data
quality and rigour.

## Not covered (honest list)
- The interviewer's side: rubric design, calibration, bias training (learn-ai-hr).
- Salary negotiation, offers, pay data (out of scope by decision).
- Any real employer's process or question bank.
- Coding interviews beyond SQL (algorithms, Python live coding), ML system design depth.
- Delivery skills (voice, presence): learn-public-speaking.
- Portfolio and reputation: learn-personal-branding.
- Anxiety as a health topic: planned move-shelf courses.

## Citation appendix (page form)
- Schmidt and Hunter (1998), Psychological Bulletin 124(2)
- Sackett, Zhang, Berry and Lievens (2022), Journal of Applied Psychology 107(11)
- Oh, Le and Roth (2023), JAP 108(8), abstract read; Sackett et al. (2023) reply, abstract read
- Ones and Viswesvaran (2023), Industrial and Organizational Psychology 16
- Campion, Palmer and Campion (1997), Personnel Psychology 50(3), components as listed by Levashina et al. (2014)
- Levashina, Hartwell, Morgeson and Campion (2014), Personnel Psychology 67(1)
- Janz (1982), via Levashina et al. (2014)
- DDI, STAR method page (company claim)
- Frieder, Van Iddekinge and Raymark (2016), JOOP 89(2), abstract read; breakdown reported
- Ambady and Rosenthal (1993), JPSP 64(3)
- Behroozi, Shirolkar, Barik and Parnin (2020), ESEC/FSE
- ASA Statement on Statistical Significance and P-Values (2016)
- Johari, Pekelis and Walsh (2015), arXiv 1512.04922
- SQLite documentation: lang_aggfunc.html, lang_select.html, nulls.html
- Olist, Brazilian E-Commerce Public Dataset (Kaggle), CC BY-NC-SA 4.0
