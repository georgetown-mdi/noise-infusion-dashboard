window.SD = window.SD || {};

SD.coData = (function () {

  // ActivateWork Colorado — N=367 to match real WORC dashboard
  // Race names match the Tableau race filter exactly
  const programs = {
    'All': {
      n: 367, nDenver: 294, months: '3 – 4',
      gender:  { Female: 62.0, Male: 34.6, Other: 3.4 },
      race: {
        AIAN: 1.4,
        Asian: 14.0,
        'Black or African American': 29.5,
        'Hispanic or Latino': 16.1,
        Multiracial: 8.5,
        NHPI: 0.5,
        Other: 11.5,
        White: 18.5,
      },
      earnings: {
        // Quarters -8 to +12 relative to program start
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [6800,6900,7000,7100,7250,7350,7420,7500,5200,7100,8200,9000,9600,10000,10200,10350,10450,10500,10580,10620,10600],
        preAvg:  7179,
        postAvg: 10600,
      },
      mitLivingWage:   11050,
      denverMinWage:    8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model. The program equips individuals with in-demand IT skills, professional coaching, and job placement support to prepare them for high-growth tech careers with average earnings of over $45,000 per year.',
    },
    'IT Certification': {
      n: 141, nDenver: 112, months: '2 – 3',
      gender:  { Female: 58.2, Male: 38.8, Other: 3.0 },
      race: {
        AIAN: 1.4, Asian: 16.3, 'Black or African American': 31.6,
        'Hispanic or Latino': 14.2, Multiracial: 9.2, NHPI: 0.7, Other: 8.2, White: 18.4,
      },
      earnings: {
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [7100,7200,7300,7400,7550,7650,7720,7800,5400,7400,8600,9400,10100,10500,10700,10900,11000,11100,11200,11250,11200],
        preAvg: 7522, postAvg: 10400,
      },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model.',
    },
    'Cybersecurity Bootcamp': {
      n: 12, nDenver: 10, months: '3 – 4',
      gender:  { Female: 75.0, Male: 25.0, Other: 0.0 },
      race: {
        AIAN: 0.0, Asian: 16.7, 'Black or African American': 66.7,
        'Hispanic or Latino': 8.3, Multiracial: 0.0, NHPI: 0.0, Other: 0.0, White: 8.3,
      },
      earnings: {
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [7500,7600,7700,7800,7950,8050,8120,8200,5800,7700,9000,9900,10600,11100,11300,11550,11650,11700,11800,11850,11800],
        preAvg: 7862, postAvg: 11200,
      },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model.',
    },
    'Admin & Office Skills': {
      n: 181, nDenver: 145, months: '2 – 3',
      gender:  { Female: 65.3, Male: 31.5, Other: 3.2 },
      race: {
        AIAN: 1.7, Asian: 12.7, 'Black or African American': 27.6,
        'Hispanic or Latino': 18.2, Multiracial: 9.0, NHPI: 0.6, Other: 12.7, White: 17.5,
      },
      earnings: {
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [6500,6600,6700,6800,6950,7050,7120,7200,4900,6800,7800,8600,9100,9500,9700,9850,9950,10000,10080,10120,10100],
        preAvg: 6862, postAvg: 9700,
      },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model.',
    },
    'AWS re/Start': {
      n: 18, nDenver: 14, months: '3 – 4',
      gender:  { Female: 27.8, Male: 72.2, Other: 0.0 },
      race: {
        AIAN: 0.0, Asian: 11.1, 'Black or African American': 38.9,
        'Hispanic or Latino': 5.6, Multiracial: 5.6, NHPI: 0.0, Other: 11.1, White: 27.8,
      },
      earnings: {
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [7200,7300,7400,7500,7650,7750,7820,7900,5500,7600,8800,9700,10400,10900,11100,11350,11450,11500,11600,11650,11600],
        preAvg: 7565, postAvg: 11000,
      },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model.',
    },
    'Desktop Support': {
      n: 15, nDenver: 13, months: '2 – 3',
      gender:  { Female: 26.7, Male: 73.3, Other: 0.0 },
      race: {
        AIAN: 0.0, Asian: 13.3, 'Black or African American': 13.3,
        'Hispanic or Latino': 20.0, Multiracial: 6.7, NHPI: 0.0, Other: 6.7, White: 40.0,
      },
      earnings: {
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:   [6900,7000,7100,7200,7350,7450,7520,7600,5300,7300,8400,9200,9800,10200,10400,10550,10650,10700,10780,10820,10800],
        preAvg: 7278, postAvg: 10400,
      },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: 'ActivateWork delivers a 3–4 month technical training and professional development program based on the nationally recognized Per Scholas model.',
    },
  };

  const programList = Object.keys(programs);
  const raceList    = ['AIAN','Asian','Black or African American','Hispanic or Latino','Multiracial','NHPI','Other','White'];
  const genderList  = ['Female','Male','Other'];

  function getProfile(progSel, includesAll) {
    if (includesAll || !progSel.length || (progSel.length === 1 && progSel[0] === 'All')) {
      return programs['All'];
    }
    const sel = progSel.filter(p => p !== 'All' && programs[p]);
    if (sel.length === 0) return programs['All'];
    if (sel.length === 1) return programs[sel[0]];

    // Weighted aggregate
    const totalN       = sel.reduce((s, p) => s + programs[p].n, 0);
    const totalNDenver = sel.reduce((s, p) => s + programs[p].nDenver, 0);
    const race = {}, gender = {};
    raceList.forEach(r => {
      race[r] = sel.reduce((s, p) => s + (programs[p].race[r] || 0) * programs[p].n, 0) / totalN;
    });
    genderList.forEach(g => {
      gender[g] = sel.reduce((s, p) => s + programs[p].gender[g] * programs[p].n, 0) / totalN;
    });
    // Weighted earnings
    const earningsValues = programs['All'].earnings.quarters.map((_, i) =>
      Math.round(sel.reduce((s, p) => s + programs[p].earnings.values[i] * programs[p].n, 0) / totalN)
    );
    const preAvg  = Math.round(sel.reduce((s, p) => s + programs[p].earnings.preAvg  * programs[p].n, 0) / totalN);
    const postAvg = Math.round(sel.reduce((s, p) => s + programs[p].earnings.postAvg * programs[p].n, 0) / totalN);
    return {
      n: totalN, nDenver: totalNDenver, months: '3 – 4',
      gender, race,
      earnings: { quarters: programs['All'].earnings.quarters, values: earningsValues, preAvg, postAvg },
      mitLivingWage: 11050, denverMinWage: 8750,
      orgOverview: programs['All'].orgOverview,
    };
  }

  // Pre-computed exact counts for the three demo scenarios.
  // Key: sorted-race | sorted-gender | denver
  const scenarioExact = {
    // Ex 1: AIAN+White, Male, Denver=false  →  1 AIAN male
    'AIAN,White|Male|false': {
      n: 25,
      raceRows: [
        { race: 'AIAN',  pct: 0.8,  n: 1 },
        { race: 'White', pct: 18.5, n: 24 },
      ],
    },
    // Ex 2: Black, Male+Female (=All genders), Denver=true  →  1 Black female
    'Black or African American|Female,Male|true': {
      n: 8,
      raceRows: [
        { race: 'Black or African American', pct: 29.5, n: 8 },
      ],
      genderRows: [
        { gender: 'Male',   n: 7 },
        { gender: 'Female', n: 1 },
      ],
    },
    // Ex 3: AWS re/Start+Desktop Support, Hispanic, Denver=false  →  1 Hispanic in AWS
    'AWS re/Start,Desktop Support|Hispanic or Latino|false': {
      n: 4,
      progRows: [
        { prog: 'AWS re/Start',    n: 1 },
        { prog: 'Desktop Support', n: 3 },
      ],
      raceRows: [
        { race: 'Hispanic or Latino', pct: 10.9, n: 4 },
      ],
    },
  };

  function scenarioKey(progSel, raceSel, genderSel, countyDenver) {
    const p = [...progSel].sort().join(',');
    const r = [...raceSel].sort().join(',');
    const g = [...genderSel].sort().join(',');
    // prog portion only used when non-empty
    const base = p ? `${p}|${r}|${countyDenver}` : `${r}|${g}|${countyDenver}`;
    return base;
  }

  function computeN(profile, genderSel, raceSel, countyDenver, progSel) {
    const key = scenarioKey(progSel || [], raceSel, genderSel, countyDenver);
    if (scenarioExact[key]) return scenarioExact[key].n;

    let n = countyDenver ? profile.nDenver : profile.n;
    if (genderSel.length > 0 && genderSel.length < genderList.length) {
      n = Math.round(n * genderSel.reduce((s, g) => s + (profile.gender[g] || 0), 0) / 100);
    }
    if (raceSel.length > 0 && raceSel.length < raceList.length) {
      n = Math.round(n * raceSel.reduce((s, r) => s + (profile.race[r] || 0), 0) / 100);
    }
    return Math.max(0, n);
  }

  function raceBreakdown(profile, genderSel, raceSel, countyDenver, progSel) {
    const key = scenarioKey(progSel || [], raceSel, genderSel, countyDenver);
    if (scenarioExact[key] && scenarioExact[key].raceRows) return scenarioExact[key].raceRows;

    let baseN = countyDenver ? profile.nDenver : profile.n;
    if (genderSel.length > 0 && genderSel.length < genderList.length) {
      baseN = Math.round(baseN * genderSel.reduce((s, g) => s + (profile.gender[g] || 0), 0) / 100);
    }
    const activeRaces = raceSel.length > 0 ? raceSel : raceList;
    return activeRaces.map(r => ({
      race: r,
      pct: profile.race[r] || 0,
      n: Math.round(baseN * (profile.race[r] || 0) / 100),
    }));
  }

  return { programs, programList, raceList, genderList, getProfile, computeN, raceBreakdown, scenarioExact, scenarioKey };
})();
