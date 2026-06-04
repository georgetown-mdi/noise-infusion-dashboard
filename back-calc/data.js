window.SD = window.SD || {};

SD.coData = (function () {

  const scenarios = {
    1: {
      label: 'AIAN / White · Male · All Programs · All Region',
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
      target: {
        race:    'AIAN',
        gender:  'Male',
        note:    'The 1 AIAN male participant',
      },
    },

    2: {
      label: 'Black · Male + Female · Metro Area: Yes',
      ab: {
        desc:    'Race: Black  |  Gender: Male + Female  |  Metro Area: Yes',
        filters: { race: ['Black or African American'], gender: ['Male', 'Female'], prog: [], denver: true },
        n:       8,
        avgQ4:   9713,
        preAvg:   6600,
        postAvg:  9713,
        quarters: [-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12],
        values:  [6200,6300,6400,6550,6650,6700,6800,6900,4800,6700,7700,8500,9100,9500,9600,9700,9800,9700,9750,9750,9713],
      },
      a: {
        desc:    'Race: Black  |  Gender: Male only  |  Metro Area: Yes',
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
        note:   'The 1 Black female in the metro area',
      },
    },
  };

  function backCalc(s) {
    const { ab, a } = s;
    return (ab.avgQ4 * ab.n) - (a.avgQ4 * a.n);
  }

  const mitLivingWage  = 11050;
  const denverMinWage  =  8750;

  return { scenarios, backCalc, mitLivingWage, denverMinWage };
})();
