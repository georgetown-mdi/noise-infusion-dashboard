import csv, sys, os

CSV_PATH = os.path.join(os.path.dirname(__file__), 'fake_texas_data.csv')

with open(CSV_PATH, newline='') as f:
    rows = list(csv.DictReader(f))

if 'DISTRICT_NAME' in rows[0]:
    print('DISTRICT_NAME already exists — nothing to do.')
    sys.exit()

codes = sorted(set(r['DIST_CODE'] for r in rows))

prefixes = ['Maple','River','Lake','Oak','Pine','Cedar','Elm','Birch','Aspen','Willow',
            'Stone','Crest','Valley','Ridge','Meadow','Forest','Harbor','Sunset','Silver',
            'Golden','Clear','Green','Blue','Red','High','North','South','East','West','Twin',
            'Mill','Spring','Brook','Glen','Hill','Mound','Prairie','Plains','Sand','Rock']
suffixes = ['wood','ville','ton','field','dale','burg','ford','shire','gate','vale',
            'creek','view','park','haven','land','side','port','grove','mount','berry',
            'cliff','lake','ridge','falls','beach','hollow','hurst','more','wick','ham']
types    = ['ISD','USD','CSD','ISD','ISD']

names, pi, si, ti = [], 0, 0, 0
while len(names) < len(codes):
    n = prefixes[pi % len(prefixes)] + suffixes[si % len(suffixes)] + ' ' + types[ti % len(types)]
    if n not in names:
        names.append(n)
    pi += 1; si += 3; ti += 1

name_map = dict(zip(codes, names))

fieldnames = ['DIST_CODE', 'DISTRICT_NAME'] + [k for k in rows[0].keys() if k != 'DIST_CODE']
with open(CSV_PATH, 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=fieldnames)
    w.writeheader()
    for r in rows:
        r['DISTRICT_NAME'] = name_map[r['DIST_CODE']]
        w.writerow(r)

print(f'Done. {len(codes)} districts named.')
for c in codes[:6]:
    print(f'  {c} -> {name_map[c]}')
