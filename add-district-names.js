// Adds a DISTRICT_NAME column to fake_texas_data.csv.
// Run once from repo root: node add-district-names.js
// Safe to re-run — skips if column already exists.

const fs = require('fs');

const CSV_PATH = 'fake_texas_data.csv';
const lines    = fs.readFileSync(CSV_PATH, 'utf8').trim().split('\n');
const headers  = lines[0].split(',');

if (headers.includes('DISTRICT_NAME')) {
  console.log('DISTRICT_NAME column already exists — nothing to do.');
  process.exit(0);
}

const DIST_CODE = headers.indexOf('DIST_CODE');
const codes = [...new Set(lines.slice(1).map(l => l.split(',')[DIST_CODE]))].sort();

// Build 102 unique pseudo names from place-word combos
const prefixes = [
  'Maple','River','Lake','Oak','Pine','Cedar','Elm','Birch','Aspen','Willow',
  'Stone','Crest','Valley','Ridge','Meadow','Forest','Harbor','Sunset','Silver',
  'Golden','Clear','Green','Blue','Red','High','North','South','East','West','Twin',
  'Mill','Spring','Brook','Glen','Hill','Mound','Prairie','Plains','Sand','Rock',
];
const suffixes = [
  'wood','ville','ton','field','dale','burg','ford','shire','gate','vale',
  'creek','view','park','haven','land','side','port','grove','mount','berry',
  'cliff','lake','ridge','falls','beach','hollow','hurst','more','wick','ham',
];
const types = ['ISD','USD','CSD','USD','ISD','ISD','CSD','USD','ISD','ISD'];

const names = [];
let pi = 0, si = 0, ti = 0;
while (names.length < codes.length) {
  const name = `${prefixes[pi % prefixes.length]}${suffixes[si % suffixes.length]} ${types[ti % types.length]}`;
  if (!names.includes(name)) names.push(name);
  pi++; si += 3; ti++;
}

const nameMap = {};
codes.forEach((code, i) => { nameMap[code] = names[i]; });

// Rewrite CSV with new column inserted after DIST_CODE
const newHeaders = [
  headers[0], // DIST_CODE
  'DISTRICT_NAME',
  ...headers.slice(1),
].join(',');

const newLines = lines.slice(1).map(line => {
  const cols = line.split(',');
  return [cols[0], nameMap[cols[0]], ...cols.slice(1)].join(',');
});

fs.writeFileSync(CSV_PATH, [newHeaders, ...newLines].join('\n') + '\n');
console.log(`Added DISTRICT_NAME to ${CSV_PATH} (${codes.length} districts)`);
codes.slice(0, 5).forEach(c => console.log(` ${c} → ${nameMap[c]}`));
console.log(' ...');
