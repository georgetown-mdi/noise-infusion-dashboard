# Disclosure Risk Demos

Interactive demos illustrating how public data dashboards can leak individual-level information even when every published cell passes suppression rules.

## Demos

| Demo | Attack | Domain |
|------|--------|--------|
| [`back-calc/`](back-calc/) | Back-calculation via two valid queries | Workforce earnings |
| [`suppression/`](suppression/) | Complementary disclosure across breakdowns | Early childhood assessment |

## Structure

```
snokedashboard/
├── index.html              # Landing page
├── shared/                 # Shared CSS (Georgetown MDI theme)
├── back-calc/
│   ├── index.html          # Demo 1 dashboard
│   └── data.js             # Synthetic scenario data
└── suppression/
    ├── index.html          # Demo 2 dashboard
    ├── data.js             # Generated district data (102 districts)
    ├── build-data.js       # Regenerate data.js from CSVs
    ├── fake_data.csv       # Synthetic assessment source data
    └── district_names.csv  # District code → name mapping
```

## Development

```bash
npm start   # Serves on http://localhost:8080
```

All data is synthetic. No real individual information is used.
