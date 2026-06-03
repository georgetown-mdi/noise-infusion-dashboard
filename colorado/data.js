window.SD = window.SD || {};

SD.coData = (function () {

  // Each scenario stores TWO query states: A+B (includes the target person) and A (excludes them).
  // The difference is exactly 1 person, so simple subtraction reveals that individual's data.
  const scenarios = {
    1: {
      label: 'AIAN / White · Male · All Programs · All County',
      // Query A+B: Race = AIAN + White, Gender = Male
      ab: {
        desc:    'Race: AIAN + White  |  Gender: Male',
        filters: { race: ['AIAN', 'White'], gender: ['Male'], prog: [], denver: false },
        n:       25,
        avgQ4:   10160,
        preAvg:   7050,
        postAvg: 10160,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6700,6800,6900,7050,7150,7200,7300,7400,5100,7000,8000,8900,9500,9900,10000,10100,10200,10100,10200,10200,10160],
      },
      // Query A: Race = White only, Gender = Male  (remove AIAN → N drops by 1)
      a: {
        desc:    'Race: White only  |  Gender: Male',
        filters: { race: ['White'], gender: ['Male'], prog: [], denver: false },
        n:       24,
        avgQ4:   10250,
        preAvg:   7100,
        postAvg: 10250,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6750,6850,6950,7100,7200,7250,7350,7450,5150,7050,8100,9000,9600,10000,10100,10200,10300,10200,10300,10300,10250],
      },
      // Derived: target individual's data  =  (ab.avgQ4 × ab.n) − (a.avgQ4 × a.n)
      target: {
        race:    'AIAN',
        gender:  'Male',
        note:    'The 1 AIAN male participant',
      },
    },

    2: {
      label: 'Black · Male + Female · All Programs · Denver County: Yes',
      ab: {
        desc:    'Race: Black  |  Gender: Male + Female  |  Denver: Yes',
        filters: { race: ['Black or African American'], gender: ['Male', 'Female'], prog: [], denver: true },
        n:       8,
        avgQ4:   9713,
        preAvg:   6600,
        postAvg:  9713,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6200,6300,6400,6550,6650,6700,6800,6900,4800,6700,7700,8500,9100,9500,9600,9700,9800,9700,9750,9750,9713],
      },
      a: {
        desc:    'Race: Black  |  Gender: Male only  |  Denver: Yes',
        filters: { race: ['Black or African American'], gender: ['Male'], prog: [], denver: true },
        n:       7,
        avgQ4:   9900,
        preAvg:   6700,
        postAvg:  9900,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6300,6400,6500,6650,6750,6800,6900,7000,4900,6800,7800,8600,9200,9600,9700,9800,9900,9800,9850,9850,9900],
      },
      target: {
        race:   'Black or African American',
        gender: 'Female',
        note:   'The 1 Black female living in Denver County',
      },
    },

    3: {
      label: 'Hispanic · AWS re/Start + Desktop Support · All Gender · All County',
      ab: {
        desc:    'Program: AWS re/Start + Desktop Support  |  Race: Hispanic',
        filters: { race: ['Hispanic or Latino'], gender: [], prog: ['AWS re/Start', 'Desktop Support'], denver: false },
        n:       4,
        avgQ4:   9650,
        preAvg:   6500,
        postAvg:  9650,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6100,6200,6300,6450,6550,6600,6700,6800,4700,6600,7600,8400,9000,9400,9500,9600,9700,9600,9650,9650,9650],
      },
      a: {
        desc:    'Program: Desktop Support only  |  Race: Hispanic',
        filters: { race: ['Hispanic or Latino'], gender: [], prog: ['Desktop Support'], denver: false },
        n:       3,
        avgQ4:   9800,
        preAvg:   6600,
        postAvg:  9800,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6200,6300,6400,6550,6650,6700,6800,6900,4800,6700,7700,8500,9100,9500,9600,9700,9800,9700,9750,9750,9800],
      },
      target: {
        race:   'Hispanic or Latino',
        prog:   'AWS re/Start',
        note:   'The 1 Hispanic participant in AWS re/Start',
      },
    },
  };

  // Compute the back-calculation result for a scenario
  function backCalc(s) {
    const { ab, a } = s;
    return (ab.avgQ4 * ab.n) - (a.avgQ4 * a.n);
  }

  const mitLivingWage  = 11050;
  const denverMinWage  =  8750;

  const orgOverview = 'ActivateWork delivers a 3–4 month technical training and professional ' +
    'development program based on the nationally recognized Per Scholas model. The program equips ' +
    'individuals with in-demand IT skills, professional coaching, and job placement support to ' +
    'prepare them for high-growth tech careers with average earnings of over $45,000 per year.';

  return { scenarios, backCalc, mitLivingWage, denverMinWage, orgOverview };
})();
