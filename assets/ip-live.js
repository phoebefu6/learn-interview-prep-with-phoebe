/* ip-live.js - the practice-round bench for learn-interview-prep-with-phoebe
 *
 * Two parts, both computed here, in the browser.
 *
 * 1. The SQL round. Six interview-style questions run for real on a seeded sample of the Olist
 *    e-commerce data (CC BY-NC-SA 4.0; 2,000 people and every order they placed, ids renumbered)
 *    inside SQLite compiled to WebAssembly (sql.js 1.10.3 from cdnjs). Your result set is compared
 *    with the reference query's result set: same columns, same rows, row order only where the
 *    question asks for an order. It prints pass or fail and the first row that differs. Five of
 *    the questions carry a planted trap, and the trap query can be loaded and run like any other.
 *
 * 2. Story-bank coverage. A constructed job description is parsed into eight competencies and
 *    crossed with Ren's eight constructed stories. Every fit value and every story length is
 *    constructed and labelled so on the widget; the arithmetic is real.
 *    Rules (the Python reference, materials/ip_reference.py, implements the same rules
 *    independently and prints the same numbers):
 *      - a story's evidence for a competency is its fit: 2 strong, 1 thin, 0 none
 *      - untagged stories count only for their headline competency; tagged ones count everywhere
 *        they fit
 *      - best evidence decides the status: covered (2), thin (1), missing (0)
 *      - the story you would tell is the shortest at that level, judged on untrimmed length
 *      - coverage = (covered + 0.5 x thin) / competencies
 *      - fits in time = competencies with evidence whose chosen story runs <= 120 s
 *    ANTI-LEVER "stretch one great story": the same story answers every competency. Claimed
 *    coverage reads 100 percent; honest coverage scores only that story's real fit.
 *    BREAK BUTTON: swap to a second constructed job description. Stories written for one role do
 *    not transfer, and coverage falls where they do not.
 */
(function (root) {
  "use strict";

  var SQLJS_BASE = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";

  /* ---------------- engine: coverage ---------------- */
  function coverage(bank, jdId, rungId, stretch) {
    var jd = bank.jds.filter(function (j) { return j.id === jdId; })[0];
    var rung = bank.rungs.filter(function (r) { return r.id === rungId; })[0];
    var byId = {}, order = [];
    bank.stories.forEach(function (s) { byId[s.id] = s; order.push(s.id); });
    var limit = bank.time_limit_secs, trim = bank.trimmed_secs;
    var w = [0, bank.weights.thin, bank.weights.strong];
    function secs(id) { return rung.trimmed ? Math.min(byId[id].secs, trim) : byId[id].secs; }
    function fitOf(s, c) { var f = s.fit[c]; return f === undefined ? 0 : f; }

    var rows = jd.comps.map(function (c) {
      if (stretch) {
        var sid = bank.stretch_story;
        return { comp: c, level: fitOf(byId[sid], c), story: sid, claimed: 2 };
      }
      var cands = [];
      rung.stories.forEach(function (id) {
        var s = byId[id];
        var f = rung.tagged ? fitOf(s, c) : (s.headline === c ? fitOf(s, c) : 0);
        if (f > 0) cands.push([f, id]);
      });
      if (!cands.length) return { comp: c, level: 0, story: null, claimed: 0 };
      var best = 0;
      cands.forEach(function (x) { if (x[0] > best) best = x[0]; });
      var pool = cands.filter(function (x) { return x[0] === best; }).map(function (x) { return x[1]; });
      pool.sort(function (a, b) { return byId[a].secs - byId[b].secs || order.indexOf(a) - order.indexOf(b); });
      return { comp: c, level: best, story: pool[0], claimed: best };
    });
    var n = rows.length, honest = 0, claimed = 0;
    rows.forEach(function (r) { honest += w[r.level]; claimed += w[r.claimed]; });
    var told = rows.filter(function (r) { return r.story && (r.level > 0 || stretch); }).map(function (r) { return r.story; });
    var uniq = told.filter(function (s, i) { return told.indexOf(s) === i; });
    var reuse = 0;
    uniq.forEach(function (s) { var k = told.filter(function (t) { return t === s; }).length; if (k > reuse) reuse = k; });
    var fits = rows.filter(function (r) { return r.level > 0 && secs(r.story) <= limit; }).length;
    function r4(x) { return Math.round(x * 10000) / 10000; }
    return {
      jd: jdId, rung: rungId, stretch: !!stretch,
      covered: rows.filter(function (r) { return r.level === 2; }).length,
      thin: rows.filter(function (r) { return r.level === 1; }).length,
      missing: rows.filter(function (r) { return r.level === 0; }).length,
      honest: r4(honest / n), claimed: r4(claimed / n),
      distinct: uniq.length, maxReuse: reuse, fitsTime: fits,
      levels: rows.map(function (r) { return r.level; }),
      rows: rows, secs: secs
    };
  }

  /* ---------------- engine: SQL ---------------- */
  function buildDb(SQL, sample) {
    var db = new SQL.Database();
    Object.keys(sample.tables).forEach(function (name) {
      var t = sample.tables[name];
      db.run("CREATE TABLE " + name + " (" + t.cols.map(function (c, i) { return c + " " + t.types[i]; }).join(", ") + ")");
      var st = db.prepare("INSERT INTO " + name + " VALUES (" + t.cols.map(function () { return "?"; }).join(", ") + ")");
      db.run("BEGIN");
      t.rows.forEach(function (r) { st.run(r); });
      db.run("COMMIT");
      st.free();
    });
    return db;
  }
  function runSql(db, sql) {
    var res = db.exec(sql);
    if (!res.length) return { columns: [], values: [] };
    var last = res[res.length - 1];
    return { columns: last.columns, values: last.values };
  }
  function norm(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return Math.round(v * 1e6) / 1e6;
    return String(v);
  }
  function key(row) { return JSON.stringify(row.map(norm)); }
  function cellCmp(x, y) {
    x = norm(x); y = norm(y);
    if (x === y) return 0;
    if (x === null) return -1;
    if (y === null) return 1;
    if (typeof x === "number" && typeof y === "number") return x - y;
    if (typeof x === "number") return -1;
    if (typeof y === "number") return 1;
    return x < y ? -1 : 1;
  }
  function rowCmp(p, q) {
    var a = p[2], b = q[2], n = Math.min(a.length, b.length);
    for (var i = 0; i < n; i++) { var c = cellCmp(a[i], b[i]); if (c) return c; }
    return a.length - b.length;
  }
  function compare(ref, got, ordered) {
    var rc = ref.values.length ? ref.values[0].length : ref.columns.length;
    var gc = got.values.length ? got.values[0].length : got.columns.length;
    if (got.values.length && rc !== gc) {
      return { pass: false, reason: "columns", detail: "Your result has " + gc + " column" + (gc === 1 ? "" : "s") + "; the reference has " + rc + "." };
    }
    var a = ref.values.map(key), b = got.values.map(key);
    var ra = ref.values, rb = got.values;
    if (!ordered) {
      var ia = a.map(function (k, i) { return [k, i, ref.values[i]]; }).sort(rowCmp);
      var ib = b.map(function (k, i) { return [k, i, got.values[i]]; }).sort(rowCmp);
      a = ia.map(function (x) { return x[0]; }); b = ib.map(function (x) { return x[0]; });
      ra = ia.map(function (x) { return ref.values[x[1]]; }); rb = ib.map(function (x) { return got.values[x[1]]; });
    }
    var n = Math.max(a.length, b.length);
    for (var i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        return { pass: false, reason: "row", index: i, expected: i < ra.length ? ra[i] : null, got: i < rb.length ? rb[i] : null,
                 nRef: a.length, nGot: b.length };
      }
    }
    return { pass: true, nRef: a.length, nGot: b.length };
  }

  /* the canon, same shape as materials/ip_reference.py --json (minus the sqlite version) */
  function canon(sample, SQL) {
    var db = buildDb(SQL, sample);
    var out = { counts: {}, sql: [], coverage: [] };
    Object.keys(sample.tables).forEach(function (n) { out.counts[n] = sample.tables[n].rows.length; });
    sample.questions.forEach(function (q) {
      var rec = { id: q.id, ref: runSql(db, q.ref).values };
      if (q.trap) rec.trap = runSql(db, q.trap).values;
      rec.trapPasses = q.trap ? compare(runSql(db, q.ref), runSql(db, q.trap), q.ordered).pass : null;
      out.sql.push(rec);
    });
    var bank = sample.bank;
    function strip(c) { var o = {}; Object.keys(c).forEach(function (k) { if (k !== "rows" && k !== "secs") o[k] = c[k]; }); return o; }
    ["A", "B"].forEach(function (jd) {
      bank.rungs.forEach(function (r) { out.coverage.push(strip(coverage(bank, jd, r.id))); });
      out.coverage.push(strip(coverage(bank, jd, "r8t", true)));
    });
    function one(sql) { return runSql(db, sql).values[0]; }
    out.facts = {
      people: one("SELECT COUNT(DISTINCT customer_unique_id) FROM customers")[0],
      undelivered: one("SELECT COUNT(*) FROM orders WHERE delivered_date IS NULL")[0],
      dec31_2017: one("SELECT COUNT(*) FROM orders WHERE substr(purchase_ts,1,10)='2017-12-31'")[0],
      multi_item_orders: one("SELECT COUNT(*) FROM (SELECT order_id FROM order_items GROUP BY order_id HAVING COUNT(*)>1)")[0],
      sellers: one("SELECT COUNT(DISTINCT seller_id) FROM order_items")[0],
      date_range: one("SELECT MIN(purchase_ts), MAX(purchase_ts) FROM orders")
    };
    out.sqliteVersion = one("SELECT sqlite_version()")[0];
    db.close();
    return out;
  }

  /* ---------------- widgets ---------------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pct(x) { return Math.round(x * 1000) / 10 + "%"; }
  function fmtRow(r) { return r === null ? "(no row)" : "[" + r.map(function (v) { return v === null ? "NULL" : String(v); }).join(", ") + "]"; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

  function table(res, max) {
    if (!res.columns.length) return '<p class="mb-hint">The query returned no result set.</p>';
    var h = '<table class="dt-table ipb-res"><thead><tr>';
    res.columns.forEach(function (c) { h += "<th>" + esc(c) + "</th>"; });
    h += "</tr></thead><tbody>";
    res.values.slice(0, max).forEach(function (r) {
      h += "<tr>" + r.map(function (v) { return "<td>" + (v === null ? "<em>NULL</em>" : esc(v)) + "</td>"; }).join("") + "</tr>";
    });
    h += "</tbody></table>";
    if (res.values.length > max) h += '<p class="mb-hint">Showing ' + max + " of " + res.values.length + " rows.</p>";
    return h;
  }

  /* --- part 1: the SQL round --- */
  function sqlWidget(mount, sample) {
    var qs = sample.questions, state = { i: 0, passed: {} }, db = null, refCache = {};
    mount.innerHTML = "";
    var status = el("p", "ipb-status", "Loading SQLite (sql.js 1.10.3, WebAssembly) and the 2,000-person Olist sample...");
    mount.appendChild(status);
    var tabs = el("div", "ipb-tabs");
    var btns = qs.map(function (q, i) {
      var b = el("button", "ipb-tab", "<b>Q" + (i + 1) + "</b> " + esc(q.title));
      b.type = "button";
      b.addEventListener("click", function () { state.i = i; load(); });
      tabs.appendChild(b);
      return b;
    });
    mount.appendChild(tabs);
    var ask = el("p", "ipb-ask"); mount.appendChild(ask);
    var schema = el("details", "ipb-schema");
    var sh = "<summary>Schema: three tables</summary><div>";
    Object.keys(sample.tables).forEach(function (n) {
      sh += "<p><b>" + n + "</b> (" + sample.tables[n].rows.length.toLocaleString("en-US") + " rows): " + sample.tables[n].cols.join(", ") + "</p>";
    });
    sh += '<p class="mb-hint">customer_id is the customer key printed on each order; customer_unique_id identifies the person. purchase_ts is a timestamp (YYYY-MM-DD HH:MM:SS); delivered_date and estimated_date are dates, and delivered_date is NULL when the order never arrived.</p></div>';
    schema.innerHTML = sh;
    mount.appendChild(schema);
    var ta = el("textarea", "ipb-sql"); ta.id = "ipb-sql"; ta.spellcheck = false; ta.rows = 7;
    ta.setAttribute("aria-label", "Your SQL query");
    mount.appendChild(ta);
    var bar = el("div", "ipb-bar");
    function mk(label, cls, fn) { var b = el("button", "ipb-btn " + cls, label); b.type = "button"; b.addEventListener("click", fn); bar.appendChild(b); return b; }
    mk("Run and check", "is-run", function () { check(ta.value, false); });
    var trapBtn = mk("Load the trap", "is-trap", function () { ta.value = qs[state.i].trap; check(ta.value, true); });
    mk("Show a reference answer", "", function () { ta.value = qs[state.i].ref; check(ta.value, false); });
    mk("Reset", "", function () { ta.value = qs[state.i].starter; verdict.className = "mb-verdict is-ok"; verdict.textContent = "Starter query restored. Finish it, then Run and check."; out.innerHTML = ""; });
    mount.appendChild(bar);
    var verdict = el("p", "mb-verdict is-ok"); verdict.id = "ipb-verdict"; mount.appendChild(verdict);
    var note = el("p", "ipb-note"); mount.appendChild(note);
    var out = el("div", "dt-tablewrap ipb-out"); mount.appendChild(out);
    var score = el("p", "ipb-score"); mount.appendChild(score);
    mount.appendChild(el("p", "mb-hint", "Real rows: " + esc(sample.source) + " Every query runs in SQLite inside this page; nothing is sent anywhere."));

    function load() {
      var q = qs[state.i];
      btns.forEach(function (b, k) { b.classList.toggle("is-on", k === state.i); b.classList.toggle("is-pass", !!state.passed[qs[k].id]); });
      ask.innerHTML = "<b>Q" + (state.i + 1) + ".</b> " + esc(q.ask) + ' <span class="ipb-order">' + (q.ordered ? "row order checked" : "any row order") + "</span>";
      ta.value = q.starter;
      trapBtn.disabled = !q.trap;
      trapBtn.title = q.trap ? "Load the planted trap: " + q.trap_kind : "No planted trap on this question";
      verdict.className = "mb-verdict is-ok";
      verdict.textContent = q.trap ? "Planted trap on this one: " + q.trap_kind + ". Write your query, then Run and check." : "Warm-up. Write your query, then Run and check.";
      note.textContent = ""; out.innerHTML = "";
      renderScore();
    }
    function renderScore() {
      var n = Object.keys(state.passed).length;
      score.textContent = "Passed on this visit: " + n + " of " + qs.length + ". Loading the reference answer does not count.";
    }
    function check(sql, isTrap) {
      if (!db) { verdict.className = "mb-verdict is-bad"; verdict.textContent = "SQLite is still loading. Try again in a moment."; return; }
      var q = qs[state.i], got;
      var ref = refCache[q.id] || (refCache[q.id] = runSql(db, q.ref));
      try { got = runSql(db, sql); }
      catch (e) { verdict.className = "mb-verdict is-bad"; verdict.textContent = "SQLite error: " + e.message; note.textContent = ""; out.innerHTML = ""; return; }
      var c = compare(ref, got, q.ordered);
      if (c.pass) {
        verdict.className = "mb-verdict is-good";
        verdict.textContent = "Pass. " + c.nGot + " row" + (c.nGot === 1 ? "" : "s") + ", matching the reference result set" + (q.ordered ? " in order." : ".");
        if (!isTrap && sql.replace(/\s+/g, " ").trim() !== q.ref) { state.passed[q.id] = true; }
      } else if (c.reason === "columns") {
        verdict.className = "mb-verdict is-bad"; verdict.textContent = "Fail. " + c.detail;
      } else {
        verdict.className = "mb-verdict is-bad";
        verdict.textContent = "Fail. " + (c.nGot !== c.nRef ? "You returned " + c.nGot + " row" + (c.nGot === 1 ? "" : "s") + "; the reference returns " + c.nRef + ". " : "") +
          "First difference at row " + (c.index + 1) + (q.ordered || Math.max(c.nRef, c.nGot) < 2 ? "" : " (both sides sorted)") + ": expected " + fmtRow(c.expected) + ", got " + fmtRow(c.got) + ".";
      }
      note.textContent = isTrap && q.trap_note ? "Why the trap fails: " + q.trap_note : "";
      out.innerHTML = table(got, 12);
      btns[state.i].classList.toggle("is-pass", !!state.passed[q.id]);
      renderScore();
    }
    load();
    function ready(SQL) {
      db = buildDb(SQL, sample);
      var v = runSql(db, "SELECT sqlite_version()").values[0][0];
      status.textContent = "Ready: SQLite " + v + " running in this page on " + sample.tables.orders.rows.length.toLocaleString("en-US") + " real orders.";
      status.classList.add("is-ready");
    }
    if (typeof root.initSqlJs !== "function") {
      status.textContent = "SQLite could not load (the sql.js script from cdnjs is blocked or offline). The story-bank half below still works.";
      return;
    }
    root.initSqlJs({ locateFile: function (f) { return SQLJS_BASE + f; } }).then(ready, function (e) {
      status.textContent = "SQLite failed to start: " + e.message;
    });
    root.IP_SQL = { check: function (i, sql) { state.i = i; load(); ta.value = sql; check(sql, false); return verdict.textContent; },
                    trap: function (i) { state.i = i; load(); ta.value = qs[i].trap; check(qs[i].trap, true); return verdict.textContent; },
                    ready: function () { return !!db; } };
  }

  /* --- part 2: story-bank coverage --- */
  function storyWidget(mount, bank) {
    var compName = {}; bank.competencies.forEach(function (c) { compName[c[0]] = c[1]; });
    var state = { jd: "A", mode: "r8t" };
    var MODES = bank.rungs.map(function (r) { return { id: r.id, label: r.label, note: noteFor(r) }; });
    MODES.push({ id: "stretch", label: "Stretch one great story", note: "Anti-lever: \"" + byIdTitle(bank.stretch_story) + "\" is told for every competency, on the trimmed bank.", anti: true });
    function byIdTitle(id) { return bank.stories.filter(function (s) { return s.id === id; })[0].title; }
    function noteFor(r) {
      return (r.tagged ? "Each story tagged with every competency it can evidence." : "Each story used only for its headline competency.") +
        (r.trimmed ? " Every story cut to " + bank.trimmed_secs + " s." : "");
    }
    mount.innerHTML = "";
    var jdRow = el("div", "mb-presets ipb-jds");
    var jdBtns = {};
    bank.jds.forEach(function (j) {
      var l = el("label", "mb-preset" + (j.id === "B" ? " is-anti" : ""));
      l.innerHTML = '<input type="radio" name="ipb-jd" value="' + j.id + '"><span class="mb-pname">' +
        (j.id === "A" ? "Job description A" : "Break it: swap to job description B") + (j.id === "B" ? ' <em class="mb-anti">break</em>' : "") +
        '</span><span class="mb-pnote">' + esc(j.title) + ": " + j.comps.map(function (c) { return compName[c]; }).join(", ") + ".</span>";
      l.querySelector("input").addEventListener("change", function () { state.jd = j.id; render(); });
      jdRow.appendChild(l); jdBtns[j.id] = l;
    });
    mount.appendChild(jdRow);
    var modeRow = el("div", "mb-presets");
    var modeBtns = {};
    MODES.forEach(function (m) {
      var l = el("label", "mb-preset" + (m.anti ? " is-anti" : ""));
      l.innerHTML = '<input type="radio" name="ipb-mode" value="' + m.id + '"><span class="mb-pname">' + esc(m.label) +
        (m.anti ? ' <em class="mb-anti">anti-lever</em>' : "") + '</span><span class="mb-pnote">' + esc(m.note) + "</span>";
      l.querySelector("input").addEventListener("change", function () { state.mode = m.id; render(); });
      modeRow.appendChild(l); modeBtns[m.id] = l;
    });
    mount.appendChild(modeRow);
    var verdict = el("p", "mb-verdict"); verdict.id = "ipb-cov-verdict"; mount.appendChild(verdict);
    var metrics = el("div", "mb-metrics"); mount.appendChild(metrics);
    var mat = el("div", "dt-tablewrap ipb-matrix-wrap"); mount.appendChild(mat);
    var list = el("div", "ipb-stories"); mount.appendChild(list);
    mount.appendChild(el("p", "mb-hint", "Constructed: Ren, both job descriptions, the eight stories, every fit value (filled dot strong, half dot thin) and every story length. " +
      "Computed: everything else, by the rules printed in Part 1 of this page. Coverage = (covered + half of thin) / 8. A 2-minute limit is a coaching rule of thumb, not a research finding."));

    function render() {
      var stretch = state.mode === "stretch";
      var rungId = stretch ? "r8t" : state.mode;
      var r = coverage(bank, state.jd, rungId, stretch);
      var base = coverage(bank, "A", "r8t", false);
      Object.keys(jdBtns).forEach(function (k) { jdBtns[k].classList.toggle("is-on", k === state.jd); jdBtns[k].querySelector("input").checked = k === state.jd; });
      Object.keys(modeBtns).forEach(function (k) { modeBtns[k].classList.toggle("is-on", k === state.mode); modeBtns[k].querySelector("input").checked = k === state.mode; });
      var v, cls;
      if (stretch) { v = "Anti-lever. Claimed coverage " + pct(r.claimed) + ", honest coverage " + pct(r.honest) + ": one story told " + r.maxReuse + " times."; cls = "is-bad"; }
      else if (state.jd === "B") { v = "Broken on purpose. The same bank against job description B: honest coverage " + pct(r.honest) + " (job description A, trimmed bank: " + pct(base.honest) + ")."; cls = "is-bad"; }
      else { v = "Computed. " + r.covered + " covered, " + r.thin + " thin, " + r.missing + " missing: coverage " + pct(r.honest) + "; " + r.fitsTime + " of 8 answers fit in 2 minutes."; cls = r.honest >= 0.9 ? "is-good" : "is-ok"; }
      verdict.className = "mb-verdict " + cls; verdict.textContent = v;
      function metric(label, val, unit) {
        return '<div class="mb-metric"><span class="mb-mkind is-heuristic">computed</span><span class="mb-mlabel">' + esc(label) +
          '</span><span class="mb-mvalue">' + esc(val) + '</span><span class="mb-munit">' + esc(unit) + "</span></div>";
      }
      metrics.innerHTML =
        metric("Honest coverage", pct(r.honest), "scores only real evidence") +
        metric("Claimed coverage", pct(r.claimed), stretch ? "what the candidate believes" : "equal to honest here") +
        metric("Covered / thin / missing", r.covered + " / " + r.thin + " / " + r.missing, "of 8 competencies") +
        metric("Distinct stories told", String(r.distinct), "different pieces of evidence") +
        metric("Most-reused story", r.maxReuse + " of 8", "competencies it answers") +
        metric("Fits in 2 minutes", r.fitsTime + " of 8", "answers with evidence, chosen story <= 120 s");
      var jd = bank.jds.filter(function (j) { return j.id === state.jd; })[0];
      var rung = bank.rungs.filter(function (x) { return x.id === rungId; })[0];
      var inBank = {}; rung.stories.forEach(function (s) { inBank[s] = 1; });
      var h = '<table class="dt-table ipb-matrix"><thead><tr><th>Competency</th>';
      bank.stories.forEach(function (s) { h += '<th title="' + esc(s.title) + '">' + s.id + "</th>"; });
      h += "<th>Status</th><th>You tell</th></tr></thead><tbody>";
      r.rows.forEach(function (row) {
        h += "<tr><th>" + esc(compName[row.comp]) + "</th>";
        bank.stories.forEach(function (s) {
          var f = s.fit[row.comp] || 0;
          var active = stretch ? s.id === bank.stretch_story : !!inBank[s.id];
          var usable = active && (stretch || rung.tagged || s.headline === row.comp);
          var g = f === 2 ? "●" : f === 1 ? "◐" : "";
          var c = "ipb-cell" + (usable ? "" : " is-off") + (row.story === s.id ? " is-told" : "");
          h += '<td class="' + c + '">' + g + "</td>";
        });
        var st = row.level === 2 ? "covered" : row.level === 1 ? "thin" : "missing";
        h += '<td><span class="ipb-st is-' + st + '">' + (stretch && row.level === 0 ? "stretched" : st) + "</span></td><td>" + (row.story || "-") + "</td></tr>";
      });
      mat.innerHTML = h + "</tbody></table>";
      var lh = "";
      bank.stories.forEach(function (s) {
        var on = stretch ? s.id === bank.stretch_story : !!inBank[s.id];
        lh += '<span class="ipb-story' + (on ? "" : " is-off") + '"><b>' + s.id + "</b> " + esc(s.title) + " · " + r.secs(s.id) + " s</span>";
      });
      list.innerHTML = lh;
    }
    render();
    root.IP_COVERAGE = { set: function (jd, mode) { if (jd) state.jd = jd; if (mode) state.mode = mode; render(); return verdict.textContent; } };
  }

  function init() {
    if (!root.IP_SAMPLE) return;
    var a = document.getElementById("ip-sql-bench");
    if (a) sqlWidget(a, root.IP_SAMPLE);
    var b = document.getElementById("ip-story-bench");
    if (b) storyWidget(b, root.IP_SAMPLE.bank);
  }

  var api = { coverage: coverage, buildDb: buildDb, runSql: runSql, compare: compare, canon: canon };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : this);
