// Runs the Python reference and the node engine and compares every value numerically.
//   node materials/ip-compare.js <path-to-node_modules/sql.js>
const { execFileSync } = require("child_process"), path = require("path");
const here = __dirname;
const py = JSON.parse(execFileSync("python3", [path.join(here, "ip_reference.py"), "--json"]));
const js = JSON.parse(execFileSync("node", [path.join(here, "ip-node.js"), process.argv[2] || "sql.js"]));
let n = 0, bad = 0;
function eq(a, b, where) {
  if (typeof a === "number" && typeof b === "number") { n++; if (Math.abs(a - b) > 1e-9) { bad++; console.log("DIFF", where, a, b); } return; }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) { bad++; console.log("LEN", where, a.length, b.length); return; }
    a.forEach((x, i) => eq(x, b[i], where + "[" + i + "]")); return;
  }
  if (a && typeof a === "object" && b && typeof b === "object") {
    Object.keys(a).forEach(k => { if (k !== "sqlite") eq(a[k], b[k], where + "." + k); }); return;
  }
  n++; if (a !== b) { bad++; console.log("DIFF", where, a, b); }
}
eq(py.counts, js.counts, "counts"); eq(py.sql, js.sql.map(r => { const o = { id: r.id, ref: r.ref }; if (r.trap) o.trap = r.trap; return o; }), "sql");
eq(py.coverage, js.coverage, "coverage"); eq(py.facts, js.facts, "facts");
console.log("python sqlite " + py.sqlite + ", sql.js sqlite " + js.sqliteVersion + ": " + n + " values compared, " + bad + " differ");
console.log("trap queries that pass the checker (must all be false): " + JSON.stringify(js.sql.map(r => [r.id, r.trapPasses])));
process.exit(bad ? 1 : 0);
