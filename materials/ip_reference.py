#!/usr/bin/env python3
"""Python reference for the practice-round bench (session 4) of learn-interview-prep-with-phoebe.

Internal build script. Not linked from any audience-facing page.

Usage
-----
  python3 materials/ip_reference.py            # human-readable canon
  python3 materials/ip_reference.py --json     # the canon as JSON, for the node comparison

It reads assets/ip-sample.js (the same file the browser loads), then:
  1. builds an in-memory SQLite database with Python's sqlite3 and runs the six reference queries
     and the planted trap queries, printing every result set (these are the canon result sets);
  2. recomputes the story-bank coverage ladder with an implementation written independently of
     assets/ip-live.js. The node runner (materials/ip-node.js) prints the same JSON from the
     browser engine; both must agree before any page quotes a number.

Coverage rules (stated on the widget too; the bank is constructed):
  For each competency in the job description, a story's evidence is its fit (2 strong, 1 thin,
  0 none). Untagged stories count only for their headline competency; tagged stories count for
  every competency they fit. Best evidence decides the status: covered (2), thin (1), missing (0).
  The story you would tell is the shortest one at that best level, judged on its untrimmed length
  (ties: story order), so trimming changes how long a story runs, never which story is chosen.
  Coverage score = (covered x 1.0 + thin x 0.5) / number of competencies.
  Distinct stories = how many different stories you would actually tell across the competencies.
  Fits in time = competencies with evidence whose chosen story runs <= 120 s (trimmed stories
  run 115 s).
  Anti-lever "stretch one great story": the same story is told for every competency. Claimed
  coverage is 100 percent; honest coverage scores only the story's real fit.
"""
import json
import os
import sqlite3
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_sample():
    s = open(os.path.join(REPO, "assets", "ip-sample.js"), encoding="utf-8").read()
    body = s[s.index("window.IP_SAMPLE = ") + len("window.IP_SAMPLE = "):].rstrip().rstrip(";")
    return json.loads(body)


def build_db(sample):
    con = sqlite3.connect(":memory:")
    for name, t in sample["tables"].items():
        cols = ", ".join(f"{c} {ty}" for c, ty in zip(t["cols"], t["types"]))
        con.execute(f"CREATE TABLE {name} ({cols})")
        q = ", ".join("?" for _ in t["cols"])
        con.executemany(f"INSERT INTO {name} VALUES ({q})", t["rows"])
    con.commit()
    return con


def run(con, sql):
    cur = con.execute(sql)
    return [list(r) for r in cur.fetchall()]


def coverage(bank, jd_id, rung_id, stretch=False):
    comps = next(j for j in bank["jds"] if j["id"] == jd_id)["comps"]
    rung = next(r for r in bank["rungs"] if r["id"] == rung_id)
    stories = {s["id"]: s for s in bank["stories"]}
    order = [s["id"] for s in bank["stories"]]
    limit, trim = bank["time_limit_secs"], bank["trimmed_secs"]
    w = {2: bank["weights"]["strong"], 1: bank["weights"]["thin"], 0: 0.0}

    def secs(sid):
        return min(stories[sid]["secs"], trim) if rung["trimmed"] else stories[sid]["secs"]

    rows = []
    for c in comps:
        if stretch:
            sid = bank["stretch_story"]
            f = stories[sid]["fit"].get(c, 0)
            rows.append({"comp": c, "level": f, "story": sid, "claimed": 2})
            continue
        cands = []
        for sid in rung["stories"]:
            st = stories[sid]
            f = st["fit"].get(c, 0) if rung["tagged"] else (st["fit"].get(c, 0) if st["headline"] == c else 0)
            if f > 0:
                cands.append((f, sid))
        if not cands:
            rows.append({"comp": c, "level": 0, "story": None, "claimed": 0})
            continue
        best = max(f for f, _ in cands)
        pool = [sid for f, sid in cands if f == best]
        pool.sort(key=lambda sid: (stories[sid]["secs"], order.index(sid)))
        rows.append({"comp": c, "level": best, "story": pool[0], "claimed": best})
    n = len(comps)
    honest = sum(w[r["level"]] for r in rows) / n
    claimed = sum(w[r["claimed"]] for r in rows) / n
    told = [r["story"] for r in rows if r["story"] and (r["level"] > 0 or stretch)]
    reuse = max((told.count(s) for s in set(told)), default=0)
    fits = sum(1 for r in rows if r["level"] > 0 and secs(r["story"]) <= limit)
    return {
        "jd": jd_id, "rung": rung_id, "stretch": stretch,
        "covered": sum(1 for r in rows if r["level"] == 2),
        "thin": sum(1 for r in rows if r["level"] == 1),
        "missing": sum(1 for r in rows if r["level"] == 0),
        "honest": round(honest, 4), "claimed": round(claimed, 4),
        "distinct": len(set(told)), "maxReuse": reuse, "fitsTime": fits,
        "levels": [r["level"] for r in rows],
    }


def canon():
    sample = load_sample()
    con = build_db(sample)
    out = {"sqlite": sqlite3.sqlite_version, "counts": {}, "sql": [], "coverage": []}
    for name, t in sample["tables"].items():
        out["counts"][name] = len(t["rows"])
    for q in sample["questions"]:
        rec = {"id": q["id"], "ref": run(con, q["ref"])}
        if q["trap"]:
            rec["trap"] = run(con, q["trap"])
        out["sql"].append(rec)
    bank = sample["bank"]
    for r in bank["rungs"]:
        out["coverage"].append(coverage(bank, "A", r["id"]))
    out["coverage"].append(coverage(bank, "A", "r8t", stretch=True))
    for r in bank["rungs"]:
        out["coverage"].append(coverage(bank, "B", r["id"]))
    out["coverage"].append(coverage(bank, "B", "r8t", stretch=True))
    # extra facts quoted on pages
    out["facts"] = {
        "people": run(con, "SELECT COUNT(DISTINCT customer_unique_id) FROM customers")[0][0],
        "undelivered": run(con, "SELECT COUNT(*) FROM orders WHERE delivered_date IS NULL")[0][0],
        "dec31_2017": run(con, "SELECT COUNT(*) FROM orders WHERE substr(purchase_ts,1,10)='2017-12-31'")[0][0],
        "multi_item_orders": run(con, "SELECT COUNT(*) FROM (SELECT order_id FROM order_items GROUP BY order_id HAVING COUNT(*)>1)")[0][0],
        "sellers": run(con, "SELECT COUNT(DISTINCT seller_id) FROM order_items")[0][0],
        "date_range": run(con, "SELECT MIN(purchase_ts), MAX(purchase_ts) FROM orders")[0],
    }
    return out


if __name__ == "__main__":
    c = canon()
    if "--json" in sys.argv:
        print(json.dumps(c, sort_keys=True))
    else:
        print("sqlite", c["sqlite"], c["counts"], c["facts"])
        for r in c["sql"]:
            print(r["id"], "ref rows", len(r["ref"]), r["ref"][:13])
            if "trap" in r:
                print("   trap rows", len(r["trap"]), r["trap"][:13])
        for r in c["coverage"]:
            print(r)
