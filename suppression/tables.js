window.MDI = window.MDI || {};

MDI.suppTables = (function () {
  const { GROUPS, GROUP_LABELS, THRESHOLD, suppressed, suppressTotal, attacks } = MDI.suppData;

  function th(label, cls = '') {
    return `<th class="${cls}">${label}</th>`;
  }

  function colHeaders() {
    return `<tr>
      ${th('District', 'col-district')}
      ${GROUPS.map(g => th(GROUP_LABELS[g])).join('')}
      ${th('All Students', 'col-total')}
    </tr>`;
  }

  // ── Tab 1: Assessment Results (suppressed, total visible) ──────────────
  // This is the "main" tab users see. Small cells hidden. Total shown.
  // The problem: total is in the ENROLLMENT tab (Tab 2), which is a separate page
  // but the same student population — enabling back-calculation.
  function renderAssessment(tbodyId, showAttackHighlight = false) {
    const { assessment } = MDI.suppData;
    let rows = '';

    assessment.forEach(row => {
      const supp = suppressed(MDI.suppData.enrollment.find(e => e.name === row.name));
      const cells = GROUPS.map(g => {
        if (supp.has(g)) {
          const cls = showAttackHighlight ? 'cell-supp cell-exposed' : 'cell-supp';
          return `<td class="${cls}" data-school="${row.name}" data-group="${g}">—</td>`;
        }
        return `<td>${row[g]}%</td>`;
      }).join('');
      rows += `<tr><td class="col-district">${row.name}</td>${cells}<td class="col-total">${row.Total}%</td></tr>`;
    });

    document.getElementById(tbodyId).innerHTML = rows;
  }

  // ── Tab 2: Enrollment Counts (the "separate tab" for totals) ───────────
  // This tab shows enrollment N by group. No suppression here — enrollment
  // is considered "public" data. But combined with Tab 1's suppressions, it
  // enables back-calculation.
  function renderEnrollment(tbodyId) {
    const { enrollment } = MDI.suppData;
    let rows = '';

    enrollment.forEach(row => {
      const cells = GROUPS.map(g => `<td>${row[g].toLocaleString()}</td>`).join('');
      rows += `<tr><td class="col-district">${row.name}</td>${cells}<td class="col-total">${row.Total.toLocaleString()}</td></tr>`;
    });

    document.getElementById(tbodyId).innerHTML = rows;
  }

  // ── Tab 3: Complementary suppression (assessment, total also suppressed) ─
  function renderCompSupp(tbodyId) {
    const { assessment, enrollment } = MDI.suppData;
    let rows = '';

    assessment.forEach(row => {
      const enrRow = enrollment.find(e => e.name === row.name);
      const supp       = suppressed(enrRow);
      const suppTot    = suppressTotal(enrRow);

      const cells = GROUPS.map(g => {
        if (supp.has(g)) return `<td class="cell-supp">—</td>`;
        return `<td>${row[g]}%</td>`;
      }).join('');

      const totalCell = suppTot
        ? `<td class="col-total cell-comp-supp">—</td>`
        : `<td class="col-total">${row.Total}%</td>`;

      rows += `<tr><td class="col-district">${row.name}</td>${cells}${totalCell}</tr>`;
    });

    document.getElementById(tbodyId).innerHTML = rows;
  }

  // ── Tab 4: Noise-infused (all cells shown with ~) ──────────────────────
  function renderNoise(tbodyId) {
    const { assessment, enrollment } = MDI.suppData;
    let rows = '';

    assessment.forEach(row => {
      const cells = GROUPS.map(g => {
        const delta = MDI.noise.int(`${row.name}|${g}|pct`, 2, -10);
        const v = Math.min(99, Math.max(1, row[g] + delta));
        return `<td class="cell-noise">~${v}%</td>`;
      }).join('');

      const tDelta = MDI.noise.int(`${row.name}|Total|pct`, 2, -5);
      const tVal = Math.min(99, Math.max(1, row.Total + tDelta));
      rows += `<tr><td class="col-district">${row.name}</td>${cells}<td class="col-total cell-noise-total">~${tVal}%</td></tr>`;
    });

    document.getElementById(tbodyId).innerHTML = rows;
  }

  // ── Attack panel ───────────────────────────────────────────────────────
  function renderAttacks(containerId) {
    const list = attacks();
    const el   = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = list.map(a => {
      const groupStr = a.groups.map(g => GROUP_LABELS[g]).join(' + ');
      const exactMsg = a.exact
        ? `<strong>${groupStr}</strong> enrollment is suppressed, but subtracting all visible groups from the total gives the exact count:`
        : `<strong>${groupStr}</strong> are both suppressed. Their combined count can still be calculated:`;
      return `
        <div class="attack-item">
          <span class="attack-school">${a.school}</span> — ${exactMsg}
          <div class="attack-eq">${a.equation}
            ${a.exact ? `<span class="attack-result">→ ${GROUP_LABELS[a.groups[0]]} = ${a.value}</span>` : `<span class="attack-result">→ combined = ${a.value}</span>`}
          </div>
        </div>`;
    }).join('');
  }

  return { colHeaders, renderAssessment, renderEnrollment, renderCompSupp, renderNoise, renderAttacks };
})();
