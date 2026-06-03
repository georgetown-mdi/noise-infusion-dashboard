window.SD = window.SD || {};

SD.coData = (function () {

  // ActivateWork Colorado — all programs
  // n = total matched, nDenver = participants living in Denver county
  const programs = {
    'All': {
      n: 234, nDenver: 187,
      gender:  { Female: 62.0, Male: 34.6, Other: 3.4 },
      race: { White: 18.4, 'Hispanic/Latino': 16.2, 'Black/Af. Am.': 29.5, Asian: 14.1, Multiracial: 8.5, AIAN: 1.3, Other: 12.0 },
    },
    'IT Certification': {
      n: 91, nDenver: 72,
      gender:  { Female: 58.2, Male: 38.8, Other: 3.0 },
      race: { White: 19.4, 'Hispanic/Latino': 14.3, 'Black/Af. Am.': 31.6, Asian: 16.3, Multiracial: 9.2, AIAN: 1.1, Other: 8.1 },
    },
    'Cybersecurity Bootcamp': {
      n: 12, nDenver: 10,
      gender:  { Female: 75.0, Male: 25.0, Other: 0.0 },
      race: { White: 8.3, 'Hispanic/Latino': 8.3, 'Black/Af. Am.': 66.7, Asian: 16.7, Multiracial: 0.0, AIAN: 0.0, Other: 0.0 },
    },
    'Admin & Office Skills': {
      n: 116, nDenver: 91,
      gender:  { Female: 65.3, Male: 31.5, Other: 3.2 },
      race: { White: 17.7, 'Hispanic/Latino': 18.5, 'Black/Af. Am.': 27.4, Asian: 12.9, Multiracial: 8.9, AIAN: 1.7, Other: 12.9 },
    },
    'AWS re/Start': {
      n: 8, nDenver: 6,
      gender:  { Female: 25.0, Male: 75.0, Other: 0.0 },
      race: { White: 37.5, 'Hispanic/Latino': 12.5, 'Black/Af. Am.': 37.5, Asian: 0.0, Multiracial: 0.0, AIAN: 0.0, Other: 12.5 },
    },
    'Desktop Support': {
      n: 7, nDenver: 5,
      gender:  { Female: 28.6, Male: 71.4, Other: 0.0 },
      race: { White: 42.9, 'Hispanic/Latino': 28.6, 'Black/Af. Am.': 14.3, Asian: 14.2, Multiracial: 0.0, AIAN: 0.0, Other: 0.0 },
    },
  };

  const programList = Object.keys(programs);

  // Compute N from one or more program selections, plus optional gender/race sub-fractions.
  // includesAll: whether "All Programs" was part of the multi-select (the non-exclusive bug).
  function computeN(progSel, genderSel, raceSel, countyDenver, includesAll) {
    // If "All" is in the selection alongside specific programs, the bug means N = All.n
    // (the dashboard uses the "All" record, ignoring the specific program checkboxes).
    const baseKey = (includesAll || progSel.length === 0) ? 'All' : null;
    let base;
    if (baseKey) {
      base = programs['All'];
    } else {
      // Aggregate across selected programs
      const selected = progSel.filter(p => p !== 'All').map(p => programs[p]).filter(Boolean);
      if (selected.length === 0) { base = programs['All']; }
      else if (selected.length === 1) { base = selected[0]; }
      else {
        // Weighted average for combined program selection
        const totalN = selected.reduce((s, p) => s + p.n, 0);
        const totalNDenver = selected.reduce((s, p) => s + p.nDenver, 0);
        const gender = {}, race = {};
        for (const g of Object.keys(selected[0].gender)) {
          gender[g] = selected.reduce((s, p) => s + p.gender[g] * p.n, 0) / totalN;
        }
        for (const r of Object.keys(selected[0].race)) {
          race[r] = selected.reduce((s, p) => s + (p.race[r] || 0) * p.n, 0) / totalN;
        }
        base = { n: totalN, nDenver: totalNDenver, gender, race };
      }
    }

    let n = countyDenver ? base.nDenver : base.n;

    // Apply gender filter fraction
    const allGenders = Object.keys(base.gender);
    if (genderSel.length > 0 && genderSel.length < allGenders.length) {
      const frac = genderSel.reduce((s, g) => s + (base.gender[g] || 0), 0) / 100;
      n = Math.round(n * frac);
    }

    // Apply race filter fraction
    const allRaces = Object.keys(base.race);
    if (raceSel.length > 0 && raceSel.length < allRaces.length) {
      const frac = raceSel.reduce((s, r) => s + (base.race[r] || 0), 0) / 100;
      n = Math.round(n * frac);
    }

    return Math.max(0, n);
  }

  // Break down N by each race group given filters
  function raceBreakdown(progSel, genderSel, raceSel, countyDenver, includesAll) {
    const baseKey = (includesAll || progSel.length === 0) ? 'All' : null;
    let base;
    if (baseKey) {
      base = programs['All'];
    } else {
      const selected = progSel.filter(p => p !== 'All').map(p => programs[p]).filter(Boolean);
      if (!selected.length) base = programs['All'];
      else if (selected.length === 1) base = selected[0];
      else {
        const totalN = selected.reduce((s, p) => s + p.n, 0);
        const totalNDenver = selected.reduce((s, p) => s + p.nDenver, 0);
        const race = {};
        for (const r of Object.keys(selected[0].race)) {
          race[r] = selected.reduce((s, p) => s + (p.race[r] || 0) * p.n, 0) / totalN;
        }
        const gender = {};
        for (const g of Object.keys(selected[0].gender)) {
          gender[g] = selected.reduce((s, p) => s + p.gender[g] * p.n, 0) / totalN;
        }
        base = { n: totalN, nDenver: totalNDenver, gender, race };
      }
    }

    let baseN = countyDenver ? base.nDenver : base.n;

    // Apply gender fraction first
    const allGenders = Object.keys(base.gender);
    let gFrac = 1;
    if (genderSel.length > 0 && genderSel.length < allGenders.length) {
      gFrac = genderSel.reduce((s, g) => s + (base.gender[g] || 0), 0) / 100;
    }
    baseN = Math.round(baseN * gFrac);

    const rows = Object.entries(base.race).map(([r, pct]) => {
      const n = Math.round(baseN * pct / 100);
      const shown = (raceSel.length === 0 || raceSel.includes(r)) ? true : false;
      return { race: r, pct, n, shown };
    });

    return rows;
  }

  return { programs, programList, computeN, raceBreakdown };
})();
