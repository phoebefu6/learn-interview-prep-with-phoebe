// Node runner: loads assets/ip-sample.js and assets/ip-live.js exactly as the browser does, starts
// sql.js 1.10.3 (the same build the page loads from cdnjs; install with `npm install sql.js@1.10.3`
// in any scratch folder and pass its node_modules/sql.js path), and prints the canon as JSON.
//   node materials/ip-node.js <path-to-node_modules/sql.js> [repo]
// Compare with: python3 materials/ip_reference.py --json   (materials/ip-compare.js does both)
const fs = require("fs"), path = require("path"), vm = require("vm");
const sqljsPath = process.argv[2] || "sql.js";
const repo = process.argv[3] || path.join(__dirname, "..");
const ctx = { window: {} }; ctx.window.window = ctx.window;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(repo, "assets/ip-sample.js"), "utf8"), ctx);
const api = require(path.join(path.resolve(repo), "assets/ip-live.js"));
require(path.resolve(sqljsPath))().then(SQL => {
  process.stdout.write(JSON.stringify(api.canon(ctx.window.IP_SAMPLE, SQL)));
});
