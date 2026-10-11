#!/usr/bin/env python3
"""Build assets/ip-sample.js for learn-interview-prep-with-phoebe.

Internal build script. Not linked from any audience-facing page.

Usage
-----
  python3 materials/build_ip_sample.py <dir-with-olist-csvs>

The directory holds the Kaggle CSVs of the Brazilian E-Commerce Public Dataset by Olist
(CC BY-NC-SA 4.0), downloaded with no login via
  kagglehub.dataset_download("olistbr/brazilian-ecommerce")

What ships (all derived, ids renumbered, no names, no free text):
  customers    customer_id, customer_unique_id, state
  orders       order_id, customer_id, status, purchase_ts, delivered_date, estimated_date
  order_items  order_id, item_no, product_id, seller_id, price

Sample: 2,000 people (customer_unique_id) drawn with numpy.random.default_rng(20261010), plus
every order they placed. Drawing people rather than orders keeps repeat customers repeat.

The same file also carries, generated here with json.dumps:
  QUESTIONS  the six SQL-round questions, each with a reference query and a planted trap query
  BANK       the constructed story bank: competency library, two constructed job descriptions,
             Ren's eight constructed stories with their fit per competency and spoken length.
Both engines (materials/ip_reference.py in Python + sqlite3, assets/ip-live.js in the browser
or node + sql.js) read QUESTIONS and BANK from this one file.
"""
import json
import os
import sys

import numpy as np
import pandas as pd

SEED = 20261010
N_PEOPLE = 2000
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

QUESTIONS = [
    {
        "id": "q1", "title": "Orders by status", "ordered": False, "trap_kind": None,
        "ask": "Count the orders in each order status. Return two columns, the status and then the number of orders, one row per status.",
        "starter": "SELECT status, COUNT(*) AS n_orders\nFROM orders\nGROUP BY status;",
        "ref": "SELECT status, COUNT(*) AS n_orders FROM orders GROUP BY status;",
        "trap": None,
        "trap_note": None,
    },
    {
        "id": "q2", "title": "Orders with a pricey item", "ordered": False, "trap_kind": "join duplicates",
        "ask": "How many orders include at least one item priced above 100? Return one number.",
        "starter": "SELECT ...\nFROM orders o\nJOIN order_items i ON i.order_id = o.order_id\nWHERE i.price > 100;",
        "ref": "SELECT COUNT(DISTINCT o.order_id) AS n_orders FROM orders o JOIN order_items i ON i.order_id = o.order_id WHERE i.price > 100;",
        "trap": "SELECT COUNT(*) AS n_orders FROM orders o JOIN order_items i ON i.order_id = o.order_id WHERE i.price > 100;",
        "trap_note": "The join returns one row per ITEM. An order with two pricey items is counted twice.",
    },
    {
        "id": "q3", "title": "On-time share", "ordered": False, "trap_kind": "NULLs in an average",
        "ask": "Of the orders that were delivered (delivered_date is not NULL), what share arrived on or before estimated_date? Round to 3 decimals.",
        "starter": "SELECT ROUND(AVG(...), 3) AS on_time_share\nFROM orders;",
        "ref": "SELECT ROUND(AVG(CASE WHEN delivered_date <= estimated_date THEN 1.0 ELSE 0.0 END), 3) AS on_time_share FROM orders WHERE delivered_date IS NOT NULL;",
        "trap": "SELECT ROUND(AVG(CASE WHEN delivered_date <= estimated_date THEN 1.0 ELSE 0.0 END), 3) AS on_time_share FROM orders;",
        "trap_note": "For an undelivered order the comparison is NULL, CASE falls through to ELSE 0, and the order is scored late.",
    },
    {
        "id": "q4", "title": "Sellers with a high average price", "ordered": False, "trap_kind": "filter before vs after aggregation",
        "ask": "Which sellers sold at least 5 items AND have an average item price above 150? Return seller_id and the average price rounded to 2 decimals.",
        "starter": "SELECT seller_id, ROUND(AVG(price), 2) AS avg_price\nFROM order_items\nGROUP BY seller_id\n...;",
        "ref": "SELECT seller_id, ROUND(AVG(price), 2) AS avg_price FROM order_items GROUP BY seller_id HAVING COUNT(*) >= 5 AND AVG(price) > 150;",
        "trap": "SELECT seller_id, ROUND(AVG(price), 2) AS avg_price FROM order_items WHERE price > 150 GROUP BY seller_id HAVING COUNT(*) >= 5;",
        "trap_note": "WHERE drops the cheap items BEFORE grouping, so every surviving average is above 150 by construction and the count of 5 is a count of pricey items only.",
    },
    {
        "id": "q5", "title": "Orders per month, 2017", "ordered": True, "trap_kind": "a date range that loses the last day",
        "ask": "How many orders were placed in each month of 2017? Return month as YYYY-MM and the count, in month order.",
        "starter": "SELECT substr(purchase_ts, 1, 7) AS month, COUNT(*) AS n_orders\nFROM orders\nWHERE ...\nGROUP BY month\nORDER BY month;",
        "ref": "SELECT substr(purchase_ts, 1, 7) AS month, COUNT(*) AS n_orders FROM orders WHERE purchase_ts >= '2017-01-01' AND purchase_ts < '2018-01-01' GROUP BY month ORDER BY month;",
        "trap": "SELECT substr(purchase_ts, 1, 7) AS month, COUNT(*) AS n_orders FROM orders WHERE purchase_ts BETWEEN '2017-01-01' AND '2017-12-31' GROUP BY month ORDER BY month;",
        "trap_note": "purchase_ts carries a time. '2017-12-31 09:14:00' sorts after '2017-12-31', so BETWEEN drops every order placed on 31 December.",
    },
    {
        "id": "q6", "title": "Repeat customers", "ordered": False, "trap_kind": "the id that is not a person",
        "ask": "How many customers placed more than one order? Return one number.",
        "starter": "SELECT COUNT(*) AS repeat_customers\nFROM (\n  SELECT ...\n  FROM orders o\n  JOIN customers c ON c.customer_id = o.customer_id\n  GROUP BY ...\n  HAVING COUNT(*) > 1\n);",
        "ref": "SELECT COUNT(*) AS repeat_customers FROM (SELECT c.customer_unique_id FROM orders o JOIN customers c ON c.customer_id = o.customer_id GROUP BY c.customer_unique_id HAVING COUNT(*) > 1);",
        "trap": "SELECT COUNT(*) AS repeat_customers FROM (SELECT o.customer_id FROM orders o GROUP BY o.customer_id HAVING COUNT(*) > 1);",
        "trap_note": "In this data customer_id is issued per order, so no customer_id ever has two orders. The person is customer_unique_id.",
    },
]

# ---- constructed story bank (Ren is fictional; every value below is constructed) ----
COMPETENCIES = [
    ["sql", "SQL and data wrangling"],
    ["exp", "Experiment design and statistics"],
    ["metric", "Metric choice and product sense"],
    ["comm", "Explaining results to non-specialists"],
    ["push", "Disagreeing and pushing back"],
    ["ambig", "Turning a vague ask into a question"],
    ["own", "Owning work end to end"],
    ["fail", "Learning from a mistake"],
    ["model", "Building predictive models"],
    ["pipe", "Production data pipelines"],
    ["mentor", "Helping others get better"],
    ["rigor", "Data quality and rigour"],
    ["mlsys", "ML system design"],
    ["deploy", "Deploying and monitoring models"],
]
JDS = [
    {"id": "A", "title": "Data scientist, product analytics (constructed)",
     "comps": ["sql", "exp", "metric", "comm", "push", "ambig", "fail", "rigor"]},
    {"id": "B", "title": "Machine learning engineer (constructed)",
     "comps": ["model", "pipe", "mlsys", "deploy", "own", "mentor", "sql", "rigor"]},
]
# fit: 2 = strong evidence, 1 = thin evidence; anything absent is 0. secs = spoken length untrimmed.
STORIES = [
    {"id": "S1", "title": "The dashboard nobody trusted", "headline": "rigor", "secs": 230,
     "fit": {"rigor": 2, "sql": 2, "comm": 1, "own": 1}},
    {"id": "S2", "title": "The A/B test that was stopped early", "headline": "exp", "secs": 260,
     "fit": {"exp": 2, "push": 2, "metric": 1}},
    {"id": "S3", "title": "Choosing the one metric for a launch", "headline": "metric", "secs": 200,
     "fit": {"metric": 2, "comm": 2, "ambig": 1}},
    {"id": "S4", "title": "The report query rewritten in three days", "headline": "sql", "secs": 150,
     "fit": {"sql": 2, "own": 2, "pipe": 1}},
    {"id": "S5", "title": "The forecast I got wrong", "headline": "fail", "secs": 180,
     "fit": {"fail": 2, "model": 1, "exp": 1}},
    {"id": "S6", "title": "Saying no to a misleading chart", "headline": "push", "secs": 140,
     "fit": {"push": 2, "comm": 2}},
    {"id": "S7", "title": "The churn question nobody had defined", "headline": "ambig", "secs": 210,
     "fit": {"ambig": 1, "metric": 2, "comm": 1}},
    {"id": "S8", "title": "Teaching the team window functions", "headline": "mentor", "secs": 110,
     "fit": {"mentor": 2, "sql": 1}},
]
RUNGS = [
    {"id": "r3", "label": "3 stories, untagged", "stories": ["S1", "S2", "S3"], "tagged": False, "trimmed": False},
    {"id": "r5", "label": "5 stories, untagged", "stories": ["S1", "S2", "S3", "S4", "S5"], "tagged": False, "trimmed": False},
    {"id": "r8", "label": "8 stories, tagged", "stories": [s["id"] for s in STORIES], "tagged": True, "trimmed": False},
    {"id": "r8t", "label": "8 tagged, trimmed to 2 minutes", "stories": [s["id"] for s in STORIES], "tagged": True, "trimmed": True},
]
BANK = {"competencies": COMPETENCIES, "jds": JDS, "stories": STORIES, "rungs": RUNGS,
        "stretch_story": "S2", "time_limit_secs": 120, "trimmed_secs": 115,
        "weights": {"strong": 1.0, "thin": 0.5}}


def main(src):
    rng = np.random.default_rng(SEED)
    cust = pd.read_csv(os.path.join(src, "olist_customers_dataset.csv"))
    orders = pd.read_csv(os.path.join(src, "olist_orders_dataset.csv"))
    items = pd.read_csv(os.path.join(src, "olist_order_items_dataset.csv"))

    people = np.sort(cust["customer_unique_id"].unique())
    pick = set(rng.choice(people, size=N_PEOPLE, replace=False))
    c = cust[cust["customer_unique_id"].isin(pick)].copy()
    o = orders[orders["customer_id"].isin(set(c["customer_id"]))].copy()
    it = items[items["order_id"].isin(set(o["order_id"]))].copy()

    # renumber every id by sorted original value (deterministic, no hashes shipped)
    def ids(series, start):
        u = sorted(series.unique())
        return {v: start + k for k, v in enumerate(u)}
    m_person = ids(c["customer_unique_id"], 5001)
    m_cust = ids(c["customer_id"], 10001)
    m_order = ids(o["order_id"], 50001)
    m_prod = ids(it["product_id"], 70001)
    m_sell = ids(it["seller_id"], 901)

    c_rows = sorted([[m_cust[r.customer_id], m_person[r.customer_unique_id], r.customer_state]
                     for r in c.itertuples()])

    def day(v):
        return None if pd.isna(v) else str(v)[:10]
    o_rows = sorted([[m_order[r.order_id], m_cust[r.customer_id], r.order_status,
                      str(r.order_purchase_timestamp)[:19], day(r.order_delivered_customer_date),
                      day(r.order_estimated_delivery_date)] for r in o.itertuples()])
    i_rows = sorted([[m_order[r.order_id], int(r.order_item_id), m_prod[r.product_id],
                      m_sell[r.seller_id], round(float(r.price), 2)] for r in it.itertuples()])

    sample = {
        "source": "Brazilian E-Commerce Public Dataset by Olist (Kaggle olistbr/brazilian-ecommerce), CC BY-NC-SA 4.0. "
                  "Derived sample: 2,000 people drawn with seed 20261010 and all their orders; ids renumbered; no names or text.",
        "tables": {
            "customers": {"cols": ["customer_id", "customer_unique_id", "state"],
                          "types": ["INTEGER", "INTEGER", "TEXT"], "rows": c_rows},
            "orders": {"cols": ["order_id", "customer_id", "status", "purchase_ts", "delivered_date", "estimated_date"],
                       "types": ["INTEGER", "INTEGER", "TEXT", "TEXT", "TEXT", "TEXT"], "rows": o_rows},
            "order_items": {"cols": ["order_id", "item_no", "product_id", "seller_id", "price"],
                            "types": ["INTEGER", "INTEGER", "INTEGER", "INTEGER", "REAL"], "rows": i_rows},
        },
        "questions": QUESTIONS,
        "bank": BANK,
    }
    out = os.path.join(REPO, "assets", "ip-sample.js")
    body = json.dumps(sample, separators=(",", ":"), ensure_ascii=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write("/* ip-sample.js - generated by materials/build_ip_sample.py with json.dumps. Do not edit by hand.\n"
                " * Olist rows: CC BY-NC-SA 4.0, derived and renumbered. Story bank and job descriptions: constructed. */\n")
        f.write("window.IP_SAMPLE = " + body + ";\n")
    print(out, os.path.getsize(out), "bytes;", len(c_rows), "customers,", len(o_rows), "orders,",
          len(i_rows), "items")


if __name__ == "__main__":
    main(sys.argv[1])
