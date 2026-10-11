# Interview Prep - research notes

Compiled 2026-10-10. Tags used on every fact:

- READ-AT-SOURCE - I read these words myself in the primary document (full text or the official page).
- REPORTED - seen only in a secondary source (search summary, press article, blog). Do not put a REPORTED number on a course page without re-checking it.

Copies used: several papers were read as full-text PDF scans hosted by third parties (university course sites, a vendor's file server, gwern.net). They are the publisher typeset versions (journal header, page numbers and APA copyright line present), so I count them as primary text, but the host is noted.

---

## 1. Schmidt and Hunter (1998)

Citation: Schmidt, F. L., & Hunter, J. E. (1998). The validity and utility of selection methods in personnel psychology: Practical and theoretical implications of 85 years of research findings. Psychological Bulletin, 124(2), 262-274. https://doi.org/10.1037/0033-2909.124.2.262

URL read: https://raw-files.adaface.com/adaface-lp/The_Validity_and_Utility_of_Selection_Methods_in_P.pdf (publisher scan, 13 pages, hosted by a vendor).

What I read: full text, including abstract and Table 1 (p. 265).

Facts:

- Span of research summarised: 85 years. READ-AT-SOURCE. Quote (abstract): "This article summarizes the practical and theoretical implications of 85 years of research in personnel selection."
- Number of procedures: validity of 19 selection procedures, plus each of the 18 others paired with GMA. READ-AT-SOURCE.
- Table 1 validities (r) for overall job performance. READ-AT-SOURCE:
  - GMA tests .51
  - Work sample tests .54
  - Employment interviews (structured) .51
  - Employment interviews (unstructured) .38
  - Job knowledge tests .48
  - Integrity tests .41; conscientiousness tests .31; job tryout .44; peer ratings .49; reference checks .26; job experience (years) .18; biodata .35; assessment centers .37; years of education .10; interests .10; graphology .02; age -.01.
- Best combinations (abstract): GMA + work sample .63; GMA + integrity .65; GMA + structured interview .63. READ-AT-SOURCE.
- GMA validity varies by job complexity: .58 professional-managerial, .56 high-complexity technical, .51 medium complexity, .40 semi-skilled, .23 unskilled; the .51 used in Table 1 is the medium-complexity value, said to cover 62% of jobs. READ-AT-SOURCE.
- Sackett et al. (2022, p. 16) add that S&H's structured .51 came from McDaniel et al. (1994): observed .28, .37 after criterion-reliability correction, .51 after range-restriction correction (the restriction step added 38%). Unstructured: observed .21 -> .27 -> .38 (+41%). READ-AT-SOURCE (in Sackett 2022).

---

## 2. Sackett, Zhang, Berry and Lievens (2022), and the disagreement

Citation: Sackett, P. R., Zhang, C., Berry, C. M., & Lievens, F. (2022). Revisiting meta-analytic estimates of validity in personnel selection: Addressing systematic overcorrection for restriction of range. Journal of Applied Psychology, 107(11), 2040-2068. https://doi.org/10.1037/apl0000994 (online first 2021, so some sources cite it as 2021).

URL read: https://gwern.net/doc/statistics/meta-analysis/2021-sackett.pdf (APA typeset PDF, 29 pages).

What I read: full text; abstract, Table 3 (comparison with S&H 1998), and the interview, work sample and job knowledge sections.

Main argument. READ-AT-SOURCE:

- Range-restriction corrections in prior meta-analyses used artifact distributions; the authors critique five common approaches and conclude "each has significant issues that often result in substantial overcorrection" (abstract).
- Key mechanism: most validation studies are concurrent (tested on current employees), where restriction is at most indirect and usually small, yet they were corrected with U ratios taken from predictive studies. They "recommend no range restriction correction for concurrent studies."
- Headline: "Structured interviews emerged as the top-ranked selection procedure." (abstract)
- Mean validities "reduced by .10-.20 points" for most procedures, but rank order mostly unchanged; "selection predictor-criterion relationships are considerably lower than previously thought." (abstract)

Table 3, S&H (1998) value -> Sackett et al. (2022) operational validity (rho), SD of rho, lower 80% credibility value. READ-AT-SOURCE:

| Procedure | S&H 1998 | Sackett 2022 | SD rho | Lower 80% CV |
|---|---|---|---|---|
| Structured interview | .51 | .42 | .19 | .18 |
| Job knowledge tests | .48 | .40 | .13 | .23 |
| Empirically keyed biodata | .35 | .38 | .09 | .26 |
| Work sample tests | .54 | .33 | .09 | .21 |
| Cognitive ability tests | .51 | .31 | .14 | .13 |
| Integrity tests | .41 | .31 | .20 | .05 |
| Assessment centers | .37 | .29 | .09 | .17 |
| Unstructured interview | .38 | .19 | .16 | -.01 |
| Job experience (years) | .18 | .07 | .11 | -.07 |

Rank-order change. READ-AT-SOURCE (from the table): in 1998 the top single predictors were work sample (.54), then GMA and structured interview tied (.51). In 2022 structured interview is first (.42), job knowledge second (.40), GMA drops to fifth (.31, tied with integrity). Unstructured interviews halve (.38 -> .19).

Derivation details. READ-AT-SOURCE:

- Interviews: sample-size-weighted mean of re-analysed McDaniel et al. (1994) and Huffcutt et al. (2014), "producing mean validity estimates of .42 for structured interviews and .19 for unstructured interviews."
- Work samples: Roth et al. (2005), 54 studies, 53 concurrent; observed .26, corrected for criterion unreliability only -> .33; no range-restriction correction.
- Job knowledge: Dye et al. (1993), 59 job-specific studies, observed .31 -> .40 after criterion-reliability correction.
- Cognitive ability .31 is based on Bertua et al. (2005) and related re-analyses (Table 2 row "Overall ... .31").

The other side (published critiques):

a) Oh, I.-S., Le, H., & Roth, P. L. (2023). Revisiting Sackett et al.'s (2022) rationale behind their recommendation against correcting for range restriction in concurrent validation studies. Journal of Applied Psychology, 108(8), 1300-1310. https://doi.org/10.1037/apl0001078
- URL read: https://academicnewsletter.sufe.edu.cn/info/368915 (abstract reproduced on a university newsletter page; publisher page not reached). Abstract only.
- Position. READ-AT-SOURCE (abstract excerpts): their reanalysis of Sackett's Table 5 "indicates that Sackett et al. substantially underestimate the severity of RR"; selection ratios of .30 or lower are "not extreme"; "their recommendation itself should be reconsidered."

b) Sackett, P. R., Berry, C. M., Lievens, F., & Zhang, C. (2023). Correcting for range restriction in meta-analysis: A reply to Oh et al. (2023). Journal of Applied Psychology, 108(8), 1311-1315. https://doi.org/10.1037/apl0001116
- URL read: https://experts.umn.edu/en/publications/correcting-for-range-restriction-in-meta-analysis-a-reply-to-oh-e/ (abstract only).
- Position. READ-AT-SOURCE (abstract): "we endorse correction when one has access to the information needed to do so"; in meta-analysis "the applicant pool information needed for correction is typically not available"; in many settings restriction is small so not correcting gives only a modest underestimate.

c) Ones, D. S., & Viswesvaran, C. (2023). A response to speculations about concurrent validities in selection: Implications for cognitive ability. Industrial and Organizational Psychology, 16, 358-365. https://doi.org/10.1017/iop.2023.43 (commentary on the Sackett et al. 2023 IOP focal article).
- URL read: Cambridge open-access PDF (cambridge.org, doi above). Full text.
- Position. READ-AT-SOURCE: "we disagree with the assertion that the operational validity of cognitive ability is much lower than previously reported." They argue range-restriction corrections in concurrent studies are appropriate; cite Sackett and Ostgaard (1994) that applicant SDs are on average only 10% smaller than population norms; call Sackett's no-correction constraint "arbitrary and implausible"; criticise reliance on an unpublished SIOP poster (Griebie et al., 2022: 114 studies, validity .24, criterion-unreliability correction only) and say its SD rho of .15 suggests unaddressed restriction. Their table (from Hunter 1983 / Hunter et al. 2006, GATB data) gives GMA operational validities of .58 (direct RR) and .74 (indirect RR) for professional-managerial jobs.

d) Schmidt, F. L., Oh, I.-S., & Shaffer, J. A. (2016). The validity and utility of selection methods in personnel psychology: Practical and theoretical implications of 100 years of research findings. Working paper, DOI 10.13140/RG.2.2.18843.26400.
- Could not read (the hosted PDF link returned an HTML page). REPORTED only: covers 31 procedures; best combinations GMA + integrity and GMA + structured interview; one secondary source claims structured and unstructured both reached .58 under indirect-RR correction. Do not cite that .58 figure without reading the paper.

Teaching frame: both camps agree structured interviews predict well and that unstructured interviews are weaker. They disagree on whether concurrent-study validities should be corrected upward, which mainly moves GMA (.31 vs .51 or higher).

---

## 3. Campion, Palmer and Campion (1997)

Citation: Campion, M. A., Palmer, D. K., & Campion, J. E. (1997). A review of structure in the selection interview. Personnel Psychology, 50(3), 655-702. https://doi.org/10.1111/j.1744-6570.1997.tb00709.x

URL tried: Wiley page (HTTP 403). The Purdue-hosted file I downloaded turned out to be a different 1997 paper (Williamson, Campion et al., JAP 82(6), on structure and litigation, which scores "17 aspects of interview structure").

What I read: NOT the original. The 15 components and the definition below are as quoted and listed by Levashina et al. (2014, pp. 244-245), which I read in full. Tag: READ-AT-SOURCE in Levashina 2014; secondary for Campion 1997 itself.

- Definition (Campion 1997, p. 656, as quoted by Levashina): structure is "any enhancement of the interview that is intended to increase psychometric properties by increasing standardization or otherwise assisting the interviewer".
- 15 components in two dimensions.
  - Content (7): (1) base questions on a job analysis; (2) same questions for each applicant; (3) limit prompting, follow-up and elaboration; (4) better types of questions; (5) longer interview or more questions; (6) control ancillary information; (7) no questions from the applicant until after the interview.
  - Evaluation (8): (8) rate each answer or use multiple scales; (9) anchored rating scales; (10) take notes; (11) multiple interviewers; (12) same interviewer(s) across applicants; (13) no discussion of applicants between interviews; (14) interviewer training; (15) statistical rather than clinical prediction.
- Levashina's validation: 30 subject-matter experts rated the 15; 14 of 15 sat on the dimension Campion proposed; only "control ancillary information" leaned toward evaluation (p = .09).
- Candidate-side note: component 7 means candidate questions are held to the end in a structured interview.

---

## 4. Levashina, Hartwell, Morgeson and Campion (2014)

Citation: Levashina, J., Hartwell, C. J., Morgeson, F. P., & Campion, M. A. (2014). The structured employment interview: Narrative and quantitative review of the research literature. Personnel Psychology, 67(1), 241-293. https://doi.org/10.1111/peps.12052

URL read: https://apps.it.purdue.edu/sites/Home/DirectoryApi/Files/42d5154c-ccc5-403e-b3ed-edd69e3f6896/Download (publisher PDF, 53 pages).

What I read: full text of the abstract, structure definition, impression management, and situational vs past-behaviour sections.

Scope. READ-AT-SOURCE: 8 topics; 12 propositions and 19 research questions.

Past-behaviour (PBQ) vs situational (SQ) questions. READ-AT-SOURCE:

- Origins: SQs from Latham, Saari, Pursell and Campion (1980); PBQs from Janz (1982), "based on the premise that past behavior predicts future behavior."
- Interrater reliability similar: .79 (SQ) vs .76 (PBQ) (Taylor & Small, 2002).
- Uncorrected validity: Taylor and Small (2002) SQ .25 vs PBQ .31; Huffcutt et al. (2004) SQ .26 vs PBQ .31.
- For high-complexity jobs, Huffcutt et al. (2004): SQ drops .27 -> .18 low vs high complexity; PBQ stays .30 / .31.
- Constructs differ: SQs lean on job knowledge or cognitive ability; PBQs lean on experience and some personality.
- Conclusion quote: "SQs have slightly lower criterion-validity than PBQs, especially for high-complexity jobs." They recommend using both (Proposition 6).
- Gibb and Taylor (2003): no evidence job experience moderates PBQ validity; applicants with little experience can use non-work examples.
- Predictive studies run about .10 lower than concurrent for both question types (Huffcutt et al., 2004).

Impression management (IM) and faking. READ-AT-SOURCE:

- Barrick et al. (2009) meta-analysis: verbal IM-rating link falls from .27 (low structure) to .17 (high structure); nonverbal from .40 to .30.
- Levashina's own meta-analysis (Table 4), IM vs interview ratings: self-promotion r = .26 (k = 13, N = 2,202); nonverbal .18; other-focused .13; defensive .12.
- Table 5: self-promotion used more in PBQs than SQs (d = .48, CI .01 to .95, the only CI excluding zero); other-focused IM used more in SQs (d = -.27, n.s.).
- "almost all applicants use some form of IM in structured selection interviews" (Ellis et al., 2002).
- Levashina and Campion (2007): four deceptive IM types (slight image creation, extensive image creation, image protection, deceptive ingratiation); structure decreased faking; more deceptive IM on SQs than PBQs.
- Faking is possible but smaller than on personality tests (Van Iddekinge, Raymark & Roth, 2005).
- Probing: Levashina and Campion (2007) found probing increased faking.
- Rapport: they propose limiting rapport building because "people form impressions very quickly" and early impressions may bias the structured phase.

---

## 5. STAR origin and behavioural interviewing

a) DDI STAR method page. URL read: http://www.ddi.com/solutions/behavioral-interviewing/star-method (publisher's own page).
- READ-AT-SOURCE (as a claim by DDI): "DDI invented the STAR method." and "DDI introduced the STAR Method in 1974 with Targeted Selection."
- DDI's page defines S as "Situation/Task", A as Action, R as Result (three parts, with S and T merged). It also describes a feedback variant STAR/AR (alternative action, alternative result). It does not mention SAR or PAR.

b) DDI blog, "10 insights from 50 years of innovation", by William C. Byham (DDI founder). URL read: https://www.ddi.com/blog/10-insights-from-50-years-of-innovation
- READ-AT-SOURCE (as a claim): behavioural interviewing "which I invented and DDI brought to market as our Targeted Selection"; Targeted Selection introduced "in the early 1970s"; STAR standing for situation, task, action, result.

Tier: the 1974 / DDI origin is a self-claim by the company and its founder. I found no independent historical source confirming who coined the acronym. Wikipedia's DDI article carries "citation needed" on the Targeted Selection claim. REPORTED only: a 1980 Byham monograph "Targeted Selection: A Behavioral Approach to Improved Hiring Decisions" (seen on a Grokipedia page, not verified).

c) SAR / PAR / CAR. Only practitioner blogs (career sites) describe these as STAR variants (Problem-Action-Result, Challenge-Action-Result, Situation-Action-Result). No origin, author or date found. REPORTED; treat as folk variants.

d) Janz (1982). Citation: Janz, T. (1982). Initial comparisons of patterned behavior description interviews versus unstructured interviews. Journal of Applied Psychology, 67(5), 577-580.
- Could not read the abstract (APA PsycNet page did not load). Citation details READ-AT-SOURCE in Levashina 2014's reference list ("Janz JT. (1982) ... Journal of Applied Psychology, 67, 577-580"), and Levashina credits PBQs to Janz (1982). REPORTED only: Janz presented the approach at a 1977 conference (campanthropology.org blog).
- Honest framing: behavioural (past-behaviour) interviewing is credited in the peer-reviewed literature to Janz (1982); the STAR acronym is credited by DDI to itself (1974). These are separate claims.

---

## 6. SQLite documentation (all READ-AT-SOURCE on sqlite.org, 2026-10-10)

a) Aggregate functions. URL: https://www.sqlite.org/lang_aggfunc.html

- "The avg() function returns the average value of all non-NULL X within a group."
- "The result of avg() is NULL if there are no non-NULL inputs."
- "The result of avg() is always a floating point value whenever there is at least one non-NULL input even if all inputs are integers."
- "The count(X) function returns a count of the number of times that X is not NULL in a group."
- "The count(*) function (with no arguments) returns the total number of rows in the group."
- "If there are no non-NULL input rows then sum() returns NULL but total() returns 0.0."
- "Total() never throws an integer overflow." (sum() throws "integer overflow" if all inputs are integers or NULL and overflow occurs.)

b) NULL handling. URL: https://www.sqlite.org/nulls.html

- Purpose: SQLite ran a test script on other engines because "the descriptions in the SQL standards on how to handle NULLs seem ambiguous."
- "SQLite was modified to work the same as Oracle, PostgreSQL, and DB2."
- "This involved making NULLs indistinct for the purposes of the SELECT DISTINCT statement and for the UNION operator in a SELECT. NULLs are still distinct in a UNIQUE column."
- The page itself gives no commentary on aggregates; its script includes count(*), count(b), sum(b), avg(b) over a NULL-containing column but the results are not printed.

c) SELECT processing. URL: https://www.sqlite.org/lang_select.html (sections 2.3 to 2.5)

- Caveat first: the step-by-step description "is purely illustrative - in practice neither SQLite nor any other SQL engine is required to follow this or any other specific process."
- WHERE: "the WHERE expression is evaluated for each row in the input data as a boolean expression. Only rows for which the WHERE clause expression evaluates to true are included from the dataset before continuing. Rows are excluded from the result if the WHERE clause evaluates to either false or NULL."
- Order: "Once the input data from the FROM clause has been filtered by the WHERE clause expression (if any), the set of result rows for the simple SELECT are calculated."
- GROUP BY: rows with equal GROUP BY results go to the same group; "For the purposes of grouping rows, NULL values are considered equal."
- HAVING: "If a HAVING clause is specified, it is evaluated once for each group of rows as a boolean expression. If the result of evaluating the HAVING clause is false, the group is discarded." Also: "The HAVING expression may refer to values, even aggregate functions, that are not in the result."
- Row count: rows returned equal "the number of groups of rows produced by applying the GROUP BY and HAVING clauses to the filtered input dataset."
- No GROUP BY: "An aggregate query without a GROUP BY clause always returns exactly one row of data, even if there are zero rows of input".
- Outer joins: NULL rows for non-matches "are added after ON clause processing but before WHERE clause processing" (so a WHERE on the right table can undo a LEFT JOIN).
- Bare columns: the value comes from "one of the input rows that form the aggregate"; with exactly one min() or max(), bare columns come from the row holding the min or max.

---

## 7. Optional items

a) First impressions / "decided in the first 4 minutes".

- Frieder, R. E., Van Iddekinge, C. H., & Raymark, P. H. (2016). How quickly do interviewers reach decisions? An examination of interviewers' decision-making time across applicants. Journal of Occupational and Organizational Psychology, 89(2), 223-248. https://doi.org/10.1111/joop.12118
  - URL read: https://iro.uiowa.edu/esploro/outputs/journalArticle/How-quickly-do-interviewers-reach-decisions/9984380498702771 (institutional repository, abstract only).
  - READ-AT-SOURCE (abstract): 166 interviewers, 691 applicants, university career centre; more experience, higher interviewing efficacy and more rapport building -> quicker decisions; question consistency (structure) -> longer decision time; decision time rose over the first few applicants, levelled off, then fell.
  - REPORTED (BPS Research Digest, https://bps.org.uk/research-digest/do-interviewers-really-make-hiring-decision-first-four-minutes): 4.9% of decisions within 1 minute; about 30% within 5 minutes; 69.9% after 5 minutes or more; 17.7% after 15 minutes; 22.5% after the interview ended. Interview slots reported elsewhere as 30 minutes (REPORTED). These percentages are not in the abstract; re-check against the full paper before citing exact figures.
  - Verdict: the "first 4 minutes" claim is not supported by this study; most decisions came after 5 minutes. Note these are interviewer self-reports of decision time.
- Ambady, N., & Rosenthal, R. (1993). Half a minute: Predicting teacher evaluations from thin slices of nonverbal behavior and physical attractiveness. Journal of Personality and Social Psychology, 64(3), 431-441.
  - URL read: https://www.math.stonybrook.edu/~bishop/classes/math598.F25/Half_a_Minute.pdf (publisher scan on a course site). Full text.
  - READ-AT-SOURCE: Study 1 used 13 college teachers, three 10-s silent clips each (39 clips); "very brief (under 30 s) silent video clips significantly predicted global end-of-semester student evaluations"; global rating correlation r = .76. Study 3 used 6-s and 15-s clips.
  - Verdict: this is about teachers judged by strangers from silent video, not job interviews. The paper does not test hiring. Using it as "interviewers decide in 30 seconds" is a misapplication.
- Related, not read: Swider, Barrick and Harris (2016, JAP) on initial impressions in rapport building; Barrick et al. (2012, JOOP). REPORTED only.

b) Candidates asking questions.

- No peer-reviewed effect size found and read. Babbitt and Jablin (1985, Human Communication Research) on applicant questions is cited in the literature but I could not reach its abstract. A 2016 dissertation (Heimbaugh, UMSL, https://irl.umsl.edu/dissertation/46) is REPORTED as saying research on applicant questions is limited and interview performance matters more than the questions asked. Not read.
- What is READ-AT-SOURCE: in Campion et al.'s structure typology (via Levashina 2014), holding applicant questions until after the interview is itself a structure component. So in a structured interview, candidate questions are usually not scored.

c) Take-home assignments.

- No peer-reviewed study of take-home assignments' validity found. Search results were vendor blogs and forums. The nearest evidence is the work-sample literature (Roth et al. 2005, via Sackett 2022: .33) which is about work samples generally, not unsupervised take-homes.
- Adjacent peer-reviewed study: Behroozi, M., Shirolkar, S., Barik, T., & Parnin, C. (2020). Does stress impact technical interview performance? ESEC/FSE 2020. URL read: https://2020.esec-fse.org/details/fse-2020-papers/140/Does-Stress-Impact-Technical-Interview-Performance- (conference abstract page). READ-AT-SOURCE: randomized controlled trial with 48 computer science students, private vs public whiteboard; "performance is reduced by more than half, by simply being watched by an interviewer." Small sample; students, not hires.

d) "Keep each story to 1-2 minutes".

- No peer-reviewed source found. It appears only as career-coaching advice. Teach it as a practitioner heuristic, not a finding. (Levashina 2014 component (5) concerns longer interviews or more questions, not answer length.)

---

## Could not read

- Campion, Palmer and Campion (1997) original text (Wiley 403). 15 components taken from Levashina 2014's listing.
- Oh, Le and Roth (2023) full text; abstract only via a university newsletter page.
- Sackett et al. (2023) reply full text; abstract only.
- Schmidt, Oh and Shaffer (2016) working paper; link dead. Its numbers are REPORTED only.
- Janz (1982) abstract (PsycNet did not load).
- Frieder et al. (2016) full text; the minute-by-minute percentages are REPORTED via BPS.
- Babbitt and Jablin (1985); Swider et al. (2016); Barrick et al. (2012).
- Any independent (non-DDI) history of the STAR acronym; any origin for SAR, PAR or CAR.
- Any peer-reviewed study on take-home assignments or on ideal answer length.
