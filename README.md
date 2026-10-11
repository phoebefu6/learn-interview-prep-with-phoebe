<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of 161 free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# Learn Interview Prep with Phoebe

Six 45-minute sessions on the candidate side of data and AI interviews, by Phoebe Fu.

1. What the interview is actually measuring
2. A story bank that covers the job
3. The SQL round
4. The practice-round bench
5. Stats, experiments and the product case
6. Take-homes, your questions, and the review after

The running case, Ren, is constructed. No real employer's process is described and nothing here is
about pay.

## The bench (session 4)

- **SQL round:** six interview-style questions run in SQLite compiled to WebAssembly (sql.js 1.10.3
  from cdnjs) on a seeded sample of the Brazilian E-Commerce Public Dataset by Olist (Kaggle,
  CC BY-NC-SA 4.0): 2,000 people and all 2,085 of their orders, ids renumbered. Each answer is
  checked against a reference result set and the first differing row is printed. Five questions
  carry a planted trap.
- **Story bank:** Ren's constructed stories crossed with a constructed job description; coverage,
  an anti-lever and a break button.

`materials/ip_reference.py` (Python sqlite3) and `materials/ip-node.js` (node + sql.js) produce the
same canon; `node materials/ip-compare.js <path-to-node_modules/sql.js>` compares them.
`materials/build_ip_sample.py` rebuilds `assets/ip-sample.js` from the Olist CSVs.

Static HTML, no build step. Open `index.html`.
