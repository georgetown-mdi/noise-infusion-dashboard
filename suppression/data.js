window.MDI = window.MDI || {};

// Pre-K assessment results and enrollment for 8 fictional school districts.
// assessmentPct: % of students meeting benchmark (by race group)
// enrollment:    count of students assessed (by race group)
// Totals are exact sums.
MDI.suppData = (function () {

  // [White, Black, Hispanic, Asian, AIAN, Multiracial, Total]
  // enrollment counts
  const enrollment = [
    { name: 'Lakewood ISD',    White: 214, Black: 88,  Hispanic: 72,  Asian: 28,  AIAN: 6,  Multi: 18,  Total: 426 },
    { name: 'Brightfield ISD', White: 156, Black: 14,  Hispanic: 38,  Asian: 31,  AIAN: 9,  Multi: 22,  Total: 270 },
    { name: 'Ridgecrest ISD',  White: 112, Black: 46,  Hispanic: 138, Asian: 8,   AIAN: 5,  Multi: 11,  Total: 320 },
    { name: 'Thornwood ISD',   White: 76,  Black: 104, Hispanic: 98,  Asian: 31,  AIAN: 2,  Multi: 9,   Total: 320 },
    { name: 'Mapleton ISD',    White: 98,  Black: 7,   Hispanic: 114, Asian: 37,  AIAN: 11, Multi: 13,  Total: 280 },
    { name: 'Cedarville ISD',  White: 140, Black: 57,  Hispanic: 49,  Asian: 8,   AIAN: 4,  Multi: 22,  Total: 280 },
    { name: 'Pineview ISD',    White: 183, Black: 22,  Hispanic: 80,  Asian: 37,  AIAN: 9,  Multi: 19,  Total: 350 },
    { name: 'Westgrove ISD',   White: 109, Black: 38,  Hispanic: 59,  Asian: 7,   AIAN: 3,  Multi: 24,  Total: 240 },
  ];

  // % meeting benchmark by race group (separate from enrollment counts)
  const assessment = [
    { name: 'Lakewood ISD',    White: 72, Black: 61, Hispanic: 58, Asian: 84, AIAN: 67, Multi: 72, Total: 67 },
    { name: 'Brightfield ISD', White: 78, Black: 57, Hispanic: 61, Asian: 81, AIAN: 56, Multi: 73, Total: 71 },
    { name: 'Ridgecrest ISD',  White: 65, Black: 52, Hispanic: 49, Asian: 75, AIAN: 60, Multi: 64, Total: 56 },
    { name: 'Thornwood ISD',   White: 54, Black: 44, Hispanic: 47, Asian: 71, AIAN: 50, Multi: 61, Total: 50 },
    { name: 'Mapleton ISD',    White: 68, Black: 43, Hispanic: 42, Asian: 78, AIAN: 55, Multi: 62, Total: 53 },
    { name: 'Cedarville ISD',  White: 71, Black: 62, Hispanic: 59, Asian: 75, AIAN: 50, Multi: 68, Total: 67 },
    { name: 'Pineview ISD',    White: 76, Black: 64, Hispanic: 56, Asian: 82, AIAN: 67, Multi: 74, Total: 70 },
    { name: 'Westgrove ISD',   White: 63, Black: 55, Hispanic: 51, Asian: 71, AIAN: 33, Multi: 67, Total: 59 },
  ];

  const GROUPS      = ['White', 'Black', 'Hispanic', 'Asian', 'AIAN', 'Multi'];
  const GROUP_LABELS = { White: 'White', Black: 'Black', Hispanic: 'Hispanic', Asian: 'Asian', AIAN: 'Am. Indian/AN', Multi: 'Multiracial' };
  const THRESHOLD   = 10;

  // Which groups are suppressed for each school (enrollment < threshold)
  function suppressed(row) {
    return new Set(GROUPS.filter(g => row[g] < THRESHOLD));
  }

  // For complementary suppression: suppress Total if back-calc would expose exactly one group.
  // We also suppress Total when any primary cell is suppressed (conservative).
  function suppressTotal(row) {
    return suppressed(row).size > 0;
  }

  // Build attack descriptions for each school (groups that can be back-calculated)
  function attacks() {
    return enrollment.map(row => {
      const supp    = suppressed(row);
      if (!supp.size) return null;

      const visible   = GROUPS.filter(g => !supp.has(g));
      const visibleN  = visible.reduce((s, g) => s + row[g], 0);
      const combined  = row.Total - visibleN;
      const suppGroups = [...supp].map(g => GROUP_LABELS[g]);

      if (supp.size === 1) {
        const g = [...supp][0];
        return {
          school: row.name, groups: [g],
          exact: true, value: combined,
          equation: `${row.Total} − ${visible.map(g => `${GROUP_LABELS[g]} (${row[g]})`).join(' − ')} = ${combined}`
        };
      } else {
        return {
          school: row.name, groups: [...supp],
          exact: false, value: combined,
          equation: `${row.Total} − ${visible.map(g => `${GROUP_LABELS[g]} (${row[g]})`).join(' − ')} = ${combined} (${suppGroups.join(' + ')})`
        };
      }
    }).filter(Boolean);
  }

  return { enrollment, assessment, GROUPS, GROUP_LABELS, THRESHOLD, suppressed, suppressTotal, attacks };
})();
