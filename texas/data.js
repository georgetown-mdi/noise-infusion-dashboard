window.SD = window.SD || {};

SD.txData = (function () {

  // Rows are keyed by subject. Each race entry has both the true value and the suppressed value
  // so the table can toggle between "Race/Ethnicity tab" (suppressed view) and "District Summary tab."
  //
  // Attack: [District Summary total] − [sum of visible race groups] = suppressed groups' combined count.
  // The district summary tab does NOT apply suppression (N is large), exposing the total.
  //
  // Data derived from Texas ECDS public dataset; district identifiers changed.

  const SUBJECTS = [
    'Emergent Literacy Reading',
    'Emergent Literacy Writing',
    'Health and Wellness',
    'Language and Communication',
    'Mathematics',
  ];

  const scenarios = {
    1: {
      label: 'District A — 7 hidden students · 3 proficient exposed',
      districtName: 'District A',
      attackSubject: 'Emergent Literacy Reading',
      // For each subject: four race rows.
      // shown:true/false → whether ECDS/BOY/EOY cells appear on the Race tab.
      // If shown=false, the Race tab displays NA; District Summary tab always shows actual totals.
      subjects: {
        'Emergent Literacy Reading': [
          { race: 'Hispanic/Latino',             ecds: 343, both: 296, boyProf: 80,  eoyProf: 178, shown: true  },
          { race: 'White',                       ecds:  28, both:  18, boyProf:  6,  eoyProf:  16, shown: true,  boyProfHidden: true }, // BOY prof also suppressed
          { race: 'Black or African American',   ecds:   3, both:   2, boyProf:  1,  eoyProf:   1, shown: false },
          { race: 'Other',                       ecds:   4, both:   2, boyProf:  1,  eoyProf:   2, shown: false },
        ],
        'Emergent Literacy Writing': [
          { race: 'Hispanic/Latino',             ecds: 343, both: 295, boyProf: 254, eoyProf: 266, shown: true  },
          { race: 'White',                       ecds:  28, both:  18, boyProf:  14, eoyProf:  18, shown: true  },
          { race: 'Black or African American',   ecds:   3, both:   2, boyProf:   1, eoyProf:   2, shown: false },
          { race: 'Other',                       ecds:   4, both:   2, boyProf:   2, eoyProf:   2, shown: false },
        ],
        'Health and Wellness': [
          { race: 'Hispanic/Latino',             ecds: 343, both: 291, boyProf: 265, eoyProf: 258, shown: true  },
          { race: 'White',                       ecds:  28, both:  18, boyProf:  18, eoyProf:  18, shown: true  },
          { race: 'Black or African American',   ecds:   3, both:   2, boyProf:   2, eoyProf:   2, shown: false },
          { race: 'Other',                       ecds:   4, both:   2, boyProf:   2, eoyProf:   2, shown: false },
        ],
        'Language and Communication': [
          { race: 'Hispanic/Latino',             ecds: 343, both: 296, boyProf:  63, eoyProf: 134, shown: true  },
          { race: 'White',                       ecds:  28, both:  18, boyProf:   8, eoyProf:  16, shown: true,  boyProfHidden: true },
          { race: 'Black or African American',   ecds:   3, both:   2, boyProf:   0, eoyProf:   1, shown: false },
          { race: 'Other',                       ecds:   4, both:   2, boyProf:   1, eoyProf:   2, shown: false },
        ],
        'Mathematics': [
          { race: 'Hispanic/Latino',             ecds: 343, both: 292, boyProf: 186, eoyProf: 237, shown: true  },
          { race: 'White',                       ecds:  28, both:  18, boyProf:  15, eoyProf:  17, shown: true  },
          { race: 'Black or African American',   ecds:   3, both:   2, boyProf:   2, eoyProf:   1, shown: false },
          { race: 'Other',                       ecds:   4, both:   2, boyProf:   1, eoyProf:   2, shown: false },
        ],
      },
    },

    2: {
      label: 'District B — 10 hidden students · 3 proficient exposed',
      districtName: 'District B',
      attackSubject: 'Language and Communication',
      subjects: {
        'Emergent Literacy Reading': [
          { race: 'Hispanic/Latino',             ecds: 920, both: 768, boyProf: 398, eoyProf: 685, shown: true  },
          { race: 'White',                       ecds:  30, both:  27, boyProf:  12, eoyProf:  20, shown: true  },
          { race: 'Black or African American',   ecds:   5, both:   3, boyProf:   1, eoyProf:   3, shown: false },
          { race: 'Other',                       ecds:   5, both:   5, boyProf:   3, eoyProf:   3, shown: false },
        ],
        'Emergent Literacy Writing': [
          { race: 'Hispanic/Latino',             ecds: 920, both: 755, boyProf: 671, eoyProf: 695, shown: true  },
          { race: 'White',                       ecds:  30, both:  27, boyProf:  24, eoyProf:  21, shown: true  },
          { race: 'Black or African American',   ecds:   5, both:   5, boyProf:   5, eoyProf:   5, shown: false },
          { race: 'Other',                       ecds:   5, both:   5, boyProf:   3, eoyProf:   3, shown: false },
        ],
        'Health and Wellness': [
          { race: 'Hispanic/Latino',             ecds: 920, both: 755, boyProf: 693, eoyProf: 681, shown: true  },
          { race: 'White',                       ecds:  30, both:  27, boyProf:  24, eoyProf:  22, shown: true  },
          { race: 'Black or African American',   ecds:   5, both:   5, boyProf:   5, eoyProf:   2, shown: false },
          { race: 'Other',                       ecds:   6, both:   6, boyProf:   3, eoyProf:   6, shown: false },
        ],
        'Language and Communication': [
          { race: 'Hispanic/Latino',             ecds: 920, both: 768, boyProf: 402, eoyProf: 603, shown: true  },
          { race: 'White',                       ecds:  30, both:  27, boyProf:  18, eoyProf:  21, shown: true  },
          { race: 'Black or African American',   ecds:   5, both:   2, boyProf:   1, eoyProf:   1, shown: false },
          { race: 'Other',                       ecds:   5, both:   5, boyProf:   2, eoyProf:   2, shown: false },
        ],
        'Mathematics': [
          { race: 'Hispanic/Latino',             ecds: 920, both: 769, boyProf: 652, eoyProf: 727, shown: true  },
          { race: 'White',                       ecds:  30, both:  26, boyProf:  20, eoyProf:  20, shown: true  },
          { race: 'Black or African American',   ecds:   5, both:   5, boyProf:   3, eoyProf:   5, shown: false },
          { race: 'Other',                       ecds:   5, both:   4, boyProf:   2, eoyProf:   3, shown: false },
        ],
      },
    },

    3: {
      label: 'District C — 15 hidden students · 5 proficient exposed',
      districtName: 'District C',
      attackSubject: 'Emergent Literacy Reading',
      subjects: {
        'Emergent Literacy Reading': [
          { race: 'Hispanic/Latino',             ecds: 340, both: 291, boyProf: 117, eoyProf: 221, shown: true  },
          { race: 'White',                       ecds:  21, both:  19, boyProf:  10, eoyProf:  13, shown: true  },
          { race: 'Black or African American',   ecds:  12, both:   5, boyProf:   2, eoyProf:   3, shown: false },
          { race: 'Other',                       ecds:   3, both:   2, boyProf:   2, eoyProf:   2, shown: false },
        ],
        'Emergent Literacy Writing': [
          { race: 'Hispanic/Latino',             ecds: 340, both: 289, boyProf: 249, eoyProf: 250, shown: true  },
          { race: 'White',                       ecds:  21, both:  19, boyProf:  10, eoyProf:  10, shown: true  },
          { race: 'Black or African American',   ecds:  12, both:   5, boyProf:   5, eoyProf:   5, shown: false },
          { race: 'Other',                       ecds:   6, both:   6, boyProf:   6, eoyProf:   6, shown: false },
        ],
        'Health and Wellness': [
          { race: 'Hispanic/Latino',             ecds: 340, both: 288, boyProf: 257, eoyProf: 263, shown: true  },
          { race: 'White',                       ecds:  21, both:  19, boyProf:  19, eoyProf:   9, shown: true,  eoyProfHidden: true },
          { race: 'Black or African American',   ecds:  12, both:   6, boyProf:   3, eoyProf:   6, shown: false },
          { race: 'Other',                       ecds:   6, both:   6, boyProf:   2, eoyProf:   6, shown: false },
        ],
        'Language and Communication': [
          { race: 'Hispanic/Latino',             ecds: 340, both: 288, boyProf: 127, eoyProf: 174, shown: true  },
          { race: 'White',                       ecds:  21, both:  18, boyProf:   9, eoyProf:   8, shown: true,  boyProfHidden: true, eoyProfHidden: true },
          { race: 'Black or African American',   ecds:  12, both:   5, boyProf:   2, eoyProf:   5, shown: false },
          { race: 'Other',                       ecds:   4, both:   4, boyProf:   1, eoyProf:   4, shown: false },
        ],
        'Mathematics': [
          { race: 'Hispanic/Latino',             ecds: 340, both: 283, boyProf: 212, eoyProf: 251, shown: true  },
          { race: 'White',                       ecds:  21, both:  18, boyProf:   9, eoyProf:   9, shown: true,  boyProfHidden: true, eoyProfHidden: true },
          { race: 'Black or African American',   ecds:  12, both:   5, boyProf:   5, eoyProf:   5, shown: false },
          { race: 'Other',                       ecds:   5, both:   5, boyProf:   5, eoyProf:   5, shown: false },
        ],
      },
    },
  };

  // Compute district-level totals for a scenario (what the "District Summary" tab shows)
  function districtTotals(scenario) {
    const result = {};
    SUBJECTS.forEach(subj => {
      const rows = scenario.subjects[subj];
      result[subj] = {
        ecds:    rows.reduce((s, r) => s + r.ecds, 0),
        both:    rows.reduce((s, r) => s + r.both, 0),
        boyProf: rows.reduce((s, r) => s + r.boyProf, 0),
        eoyProf: rows.reduce((s, r) => s + r.eoyProf, 0),
      };
    });
    return result;
  }

  // For a given scenario + subject: compute the complementary disclosure numbers
  function attackCalc(scenario, subject) {
    const rows  = scenario.subjects[subject];
    const totals = districtTotals(scenario);
    const t      = totals[subject];

    const visEcds    = rows.filter(r => r.shown).reduce((s, r) => s + r.ecds, 0);
    const visEoyProf = rows.filter(r => r.shown && !r.eoyProfHidden).reduce((s, r) => s + r.eoyProf, 0);
    const suppRows   = rows.filter(r => !r.shown);

    return {
      totalEcds:    t.ecds,
      totalEoyProf: t.eoyProf,
      visEcds,
      visEoyProf,
      suppEcds:     t.ecds - visEcds,
      suppEoyProf:  t.eoyProf - visEoyProf,
      suppRows,
      visRows: rows.filter(r => r.shown),
    };
  }

  return { scenarios, SUBJECTS, districtTotals, attackCalc };
})();
