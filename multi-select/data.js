window.MDI = window.MDI || {};

MDI.msData = (function () {

  const profiles = {
    'All|All': {
      n: 847, months: 3.2,
      earnings: { medianWage: 7800, employmentRate: 72.4, quarters: [4200, 6100, 7300, 7800] },
      gender: { Female: 33.4, Male: 65.1, Other: 1.5 },
      race: { White: 19.3, 'Hispanic/Latino': 18.9, 'Black/Af. Am.': 24.4, Asian: 12.4, Multiracial: 6.1, 'AIAN': 1.3, Other: 17.6 },
      education: { 'HS/GED': 61.4, 'Some College': 25.9, "Associate's": 6.9, 'Other/Unknown': 3.3, "Bachelor's+": 2.5 },
      completion: { Yes: 75.6, No: 24.4 },
      homeless: { No: 94.9, 'Missing/NULL': 5.0, Yes: 0.1 },
      benefits: { No: 62.4, Yes: 37.6 },
    },
    'ActivateWork|All': {
      n: 234, months: 2.8,
      earnings: { medianWage: 8200, employmentRate: 76.1, quarters: [4500, 6500, 7600, 8200] },
      gender: { Female: 62.0, Male: 34.6, Other: 3.4 },
      race: { White: 18.4, 'Hispanic/Latino': 16.2, 'Black/Af. Am.': 29.5, Asian: 14.1, Multiracial: 8.5, AIAN: 1.3, Other: 12.0 },
      education: { 'HS/GED': 47.9, 'Some College': 31.2, "Associate's": 8.1, 'Other/Unknown': 4.2, "Bachelor's+": 8.6 },
      completion: { Yes: 82.1, No: 17.9 },
      homeless: { No: 93.6, 'Missing/NULL': 3.8, Yes: 2.6 },
      benefits: { No: 58.1, Yes: 41.9 },
    },
    'ActivateWork|IT Certification': {
      n: 98, months: 2.1,
      earnings: { medianWage: 10400, employmentRate: 82.3, quarters: [5800, 8200, 9700, 10400] },
      gender: { Female: 58.2, Male: 38.8, Other: 3.0 },
      race: { White: 19.4, 'Hispanic/Latino': 14.3, 'Black/Af. Am.': 31.6, Asian: 16.3, Multiracial: 9.2, AIAN: 1.0, Other: 8.2 },
      education: { 'HS/GED': 44.9, 'Some College': 35.7, "Associate's": 9.2, 'Other/Unknown': 2.0, "Bachelor's+": 8.2 },
      completion: { Yes: 85.7, No: 14.3 },
      homeless: { No: 95.9, 'Missing/NULL': 2.1, Yes: 2.0 },
      benefits: { No: 61.2, Yes: 38.8 },
    },
    'ActivateWork|Cybersecurity Bootcamp': {
      n: 12, months: 3.0,
      earnings: { medianWage: 11200, employmentRate: 75.0, quarters: [6100, 8900, 10500, 11200] },
      gender: { Female: 75.0, Male: 25.0, Other: 0.0 },
      race: { White: 8.3, 'Hispanic/Latino': 8.3, 'Black/Af. Am.': 66.7, Asian: 16.7, Multiracial: 0.0, AIAN: 0.0, Other: 0.0 },
      education: { 'HS/GED': 41.7, 'Some College': 41.7, "Associate's": 8.3, 'Other/Unknown': 0.0, "Bachelor's+": 8.3 },
      completion: { Yes: 83.3, No: 16.7 },
      homeless: { No: 91.7, 'Missing/NULL': 0.0, Yes: 8.3 },
      benefits: { No: 66.7, Yes: 33.3 },
    },
    'ActivateWork|Admin & Office Skills': {
      n: 124, months: 2.5,
      earnings: { medianWage: 7100, employmentRate: 71.8, quarters: [3900, 5600, 6400, 7100] },
      gender: { Female: 65.3, Male: 31.5, Other: 3.2 },
      race: { White: 17.7, 'Hispanic/Latino': 18.5, 'Black/Af. Am.': 27.4, Asian: 12.9, Multiracial: 8.9, AIAN: 1.6, Other: 13.0 },
      education: { 'HS/GED': 50.0, 'Some College': 28.2, "Associate's": 7.3, 'Other/Unknown': 5.6, "Bachelor's+": 8.9 },
      completion: { Yes: 79.8, No: 20.2 },
      homeless: { No: 92.7, 'Missing/NULL': 4.1, Yes: 3.2 },
      benefits: { No: 54.8, Yes: 45.2 },
    },
    'Servicios de la Raza|All': {
      n: 187, months: 4.1,
      earnings: { medianWage: 7400, employmentRate: 68.2, quarters: [4000, 5700, 6800, 7400] },
      gender: { Female: 26.7, Male: 72.2, Other: 1.1 },
      race: { White: 8.0, 'Hispanic/Latino': 76.5, 'Black/Af. Am.': 9.1, Asian: 2.1, Multiracial: 2.1, AIAN: 0.5, Other: 1.7 },
      education: { 'HS/GED': 58.3, 'Some College': 13.9, "Associate's": 2.1, 'Other/Unknown': 24.1, "Bachelor's+": 1.6 },
      completion: { Yes: 72.2, No: 27.8 },
      homeless: { No: 88.2, 'Missing/NULL': 4.8, Yes: 7.0 },
      benefits: { No: 68.4, Yes: 31.6 },
    },
    'Servicios de la Raza|Construction Trades': {
      n: 145, months: 4.5,
      earnings: { medianWage: 8600, employmentRate: 72.4, quarters: [4800, 6900, 8100, 8600] },
      gender: { Female: 17.2, Male: 82.1, Other: 0.7 },
      race: { White: 6.9, 'Hispanic/Latino': 80.0, 'Black/Af. Am.': 7.6, Asian: 1.4, Multiracial: 2.1, AIAN: 0.7, Other: 1.3 },
      education: { 'HS/GED': 57.2, 'Some College': 11.7, "Associate's": 1.4, 'Other/Unknown': 28.3, "Bachelor's+": 1.4 },
      completion: { Yes: 74.5, No: 25.5 },
      homeless: { No: 87.6, 'Missing/NULL': 4.8, Yes: 7.6 },
      benefits: { No: 72.4, Yes: 27.6 },
    },
    'Servicios de la Raza|Customer Service': {
      n: 42, months: 2.8,
      earnings: { medianWage: 6200, employmentRate: 64.3, quarters: [3400, 5000, 5700, 6200] },
      gender: { Female: 52.4, Male: 42.9, Other: 4.7 },
      race: { White: 9.5, 'Hispanic/Latino': 66.7, 'Black/Af. Am.': 14.3, Asian: 4.8, Multiracial: 2.4, AIAN: 0.0, Other: 2.3 },
      education: { 'HS/GED': 61.9, 'Some College': 19.0, "Associate's": 2.4, 'Other/Unknown': 14.3, "Bachelor's+": 2.4 },
      completion: { Yes: 66.7, No: 33.3 },
      homeless: { No: 90.5, 'Missing/NULL': 4.7, Yes: 4.8 },
      benefits: { No: 59.5, Yes: 40.5 },
    },
    'Servicios de la Raza|Workforce Navigation': {
      n: 8, months: 1.5,
      earnings: { medianWage: 5800, employmentRate: 62.5, quarters: [3100, 4500, 5300, 5800] },
      gender: { Female: 75.0, Male: 25.0, Other: 0.0 },
      race: { White: 0.0, 'Hispanic/Latino': 75.0, 'Black/Af. Am.': 25.0, Asian: 0.0, Multiracial: 0.0, AIAN: 0.0, Other: 0.0 },
      education: { 'HS/GED': 62.5, 'Some College': 25.0, "Associate's": 0.0, 'Other/Unknown': 12.5, "Bachelor's+": 0.0 },
      completion: { Yes: 87.5, No: 12.5 },
      homeless: { No: 87.5, 'Missing/NULL': 0.0, Yes: 12.5 },
      benefits: { No: 62.5, Yes: 37.5 },
    },
    'Warren Village|All': {
      n: 156, months: 5.2,
      earnings: { medianWage: 6900, employmentRate: 65.4, quarters: [3600, 5200, 6200, 6900] },
      gender: { Female: 78.2, Male: 18.6, Other: 3.2 },
      race: { White: 15.4, 'Hispanic/Latino': 22.4, 'Black/Af. Am.': 48.7, Asian: 5.8, Multiracial: 5.1, AIAN: 0.6, Other: 2.0 },
      education: { 'HS/GED': 51.3, 'Some College': 30.8, "Associate's": 6.4, 'Other/Unknown': 6.4, "Bachelor's+": 5.1 },
      completion: { Yes: 68.6, No: 31.4 },
      homeless: { No: 74.4, 'Missing/NULL': 5.1, Yes: 20.5 },
      benefits: { No: 41.0, Yes: 59.0 },
    },
    'Warren Village|Employment Readiness': {
      n: 89, months: 4.8,
      earnings: { medianWage: 6400, employmentRate: 62.9, quarters: [3300, 4900, 5800, 6400] },
      gender: { Female: 76.4, Male: 20.2, Other: 3.4 },
      race: { White: 13.5, 'Hispanic/Latino': 20.2, 'Black/Af. Am.': 52.8, Asian: 5.6, Multiracial: 5.6, AIAN: 0.0, Other: 2.3 },
      education: { 'HS/GED': 48.3, 'Some College': 30.3, "Associate's": 6.7, 'Other/Unknown': 7.9, "Bachelor's+": 6.8 },
      completion: { Yes: 64.0, No: 36.0 },
      homeless: { No: 71.9, 'Missing/NULL': 5.6, Yes: 22.5 },
      benefits: { No: 44.9, Yes: 55.1 },
    },
    'Warren Village|Financial Skills + Employment': {
      n: 67, months: 5.8,
      earnings: { medianWage: 7600, employmentRate: 68.7, quarters: [4100, 5800, 6900, 7600] },
      gender: { Female: 80.6, Male: 16.4, Other: 3.0 },
      race: { White: 17.9, 'Hispanic/Latino': 25.4, 'Black/Af. Am.': 43.3, Asian: 6.0, Multiracial: 4.5, AIAN: 1.5, Other: 1.4 },
      education: { 'HS/GED': 55.2, 'Some College': 31.3, "Associate's": 6.0, 'Other/Unknown': 4.5, "Bachelor's+": 3.0 },
      completion: { Yes: 74.6, No: 25.4 },
      homeless: { No: 77.6, 'Missing/NULL': 4.5, Yes: 17.9 },
      benefits: { No: 35.8, Yes: 64.2 },
    },
    'Denver Urban League|All': {
      n: 181, months: 3.8,
      earnings: { medianWage: 7600, employmentRate: 73.5, quarters: [4100, 5900, 7000, 7600] },
      gender: { Female: 40.3, Male: 58.0, Other: 1.7 },
      race: { White: 5.5, 'Hispanic/Latino': 13.8, 'Black/Af. Am.': 72.4, Asian: 4.4, Multiracial: 2.2, AIAN: 0.6, Other: 1.1 },
      education: { 'HS/GED': 58.6, 'Some College': 22.1, "Associate's": 4.4, 'Other/Unknown': 11.0, "Bachelor's+": 3.9 },
      completion: { Yes: 76.2, No: 23.8 },
      homeless: { No: 89.5, 'Missing/NULL': 5.0, Yes: 5.5 },
      benefits: { No: 62.4, Yes: 37.6 },
    },
    'Denver Urban League|Workforce Development': {
      n: 112, months: 4.2,
      earnings: { medianWage: 8100, employmentRate: 75.9, quarters: [4400, 6400, 7500, 8100] },
      gender: { Female: 40.2, Male: 57.1, Other: 2.7 },
      race: { White: 4.5, 'Hispanic/Latino': 11.6, 'Black/Af. Am.': 75.9, Asian: 4.5, Multiracial: 1.8, AIAN: 0.9, Other: 0.8 },
      education: { 'HS/GED': 60.7, 'Some College': 21.4, "Associate's": 4.5, 'Other/Unknown': 10.7, "Bachelor's+": 2.7 },
      completion: { Yes: 77.7, No: 22.3 },
      homeless: { No: 90.2, 'Missing/NULL': 4.4, Yes: 5.4 },
      benefits: { No: 65.2, Yes: 34.8 },
    },
    'Denver Urban League|Youth Employment': {
      n: 69, months: 3.1,
      earnings: { medianWage: 6800, employmentRate: 69.6, quarters: [3700, 5300, 6200, 6800] },
      gender: { Female: 40.6, Male: 59.4, Other: 0.0 },
      race: { White: 7.2, 'Hispanic/Latino': 17.4, 'Black/Af. Am.': 66.7, Asian: 4.3, Multiracial: 2.9, AIAN: 0.0, Other: 1.5 },
      education: { 'HS/GED': 55.1, 'Some College': 23.2, "Associate's": 4.3, 'Other/Unknown': 11.6, "Bachelor's+": 5.8 },
      completion: { Yes: 73.9, No: 26.1 },
      homeless: { No: 88.4, 'Missing/NULL': 5.8, Yes: 5.8 },
      benefits: { No: 58.0, Yes: 42.0 },
    },
    'TechForce Colorado|All': {
      n: 89, months: 4.8,
      earnings: { medianWage: 12400, employmentRate: 85.4, quarters: [6800, 9600, 11400, 12400] },
      gender: { Female: 26.9, Male: 72.0, Other: 1.1 },
      race: { White: 28.1, 'Hispanic/Latino': 18.0, 'Black/Af. Am.': 16.9, Asian: 24.7, Multiracial: 7.9, AIAN: 0.0, Other: 4.4 },
      education: { 'HS/GED': 31.5, 'Some College': 38.2, "Associate's": 12.4, 'Other/Unknown': 1.1, "Bachelor's+": 16.8 },
      completion: { Yes: 84.3, No: 15.7 },
      homeless: { No: 96.6, 'Missing/NULL': 2.3, Yes: 1.1 },
      benefits: { No: 78.7, Yes: 21.3 },
    },
    'TechForce Colorado|Software Development': {
      n: 56, months: 5.3,
      earnings: { medianWage: 13800, employmentRate: 87.5, quarters: [7500, 10700, 12600, 13800] },
      gender: { Female: 23.2, Male: 75.0, Other: 1.8 },
      race: { White: 30.4, 'Hispanic/Latino': 16.1, 'Black/Af. Am.': 14.3, Asian: 26.8, Multiracial: 8.9, AIAN: 0.0, Other: 3.5 },
      education: { 'HS/GED': 28.6, 'Some College': 37.5, "Associate's": 14.3, 'Other/Unknown': 0.0, "Bachelor's+": 19.6 },
      completion: { Yes: 87.5, No: 12.5 },
      homeless: { No: 98.2, 'Missing/NULL': 1.8, Yes: 0.0 },
      benefits: { No: 82.1, Yes: 17.9 },
    },
    'TechForce Colorado|Data Analytics': {
      n: 33, months: 4.0,
      earnings: { medianWage: 11200, employmentRate: 81.8, quarters: [6100, 8800, 10500, 11200] },
      gender: { Female: 33.3, Male: 66.7, Other: 0.0 },
      race: { White: 24.2, 'Hispanic/Latino': 21.2, 'Black/Af. Am.': 21.2, Asian: 21.2, Multiracial: 6.1, AIAN: 0.0, Other: 6.1 },
      education: { 'HS/GED': 36.4, 'Some College': 39.4, "Associate's": 9.1, 'Other/Unknown': 3.0, "Bachelor's+": 12.1 },
      completion: { Yes: 78.8, No: 21.2 },
      homeless: { No: 93.9, 'Missing/NULL': 3.1, Yes: 3.0 },
      benefits: { No: 72.7, Yes: 27.3 },
    },
  };

  const orgs = ['All', 'ActivateWork', 'Servicios de la Raza', 'Warren Village', 'Denver Urban League', 'TechForce Colorado'];

  const programsByOrg = {
    'All':                    ['All'],
    'ActivateWork':           ['All', 'IT Certification', 'Cybersecurity Bootcamp', 'Admin & Office Skills'],
    'Servicios de la Raza':   ['All', 'Construction Trades', 'Customer Service', 'Workforce Navigation'],
    'Warren Village':         ['All', 'Employment Readiness', 'Financial Skills + Employment'],
    'Denver Urban League':    ['All', 'Workforce Development', 'Youth Employment'],
    'TechForce Colorado':     ['All', 'Software Development', 'Data Analytics'],
  };

  function filteredN(profile, genderSel, raceSel) {
    let gFrac = 1, rFrac = 1;
    if (genderSel.length && genderSel.length < Object.keys(profile.gender).length) {
      gFrac = genderSel.reduce((s, g) => s + (profile.gender[g] || 0), 0) / 100;
    }
    if (raceSel.length && raceSel.length < Object.keys(profile.race).length) {
      rFrac = raceSel.reduce((s, r) => s + (profile.race[r] || 0), 0) / 100;
    }
    return Math.max(1, Math.round(profile.n * gFrac * rFrac));
  }

  function get(org, program) {
    return profiles[`${org}|${program}`] || profiles['All|All'];
  }

  return { orgs, programsByOrg, get, filteredN };
})();
