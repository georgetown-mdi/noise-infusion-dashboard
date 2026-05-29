window.MDI = window.MDI || {};

(function () {
  const THRESHOLD    = 10;
  const SUPPRESS_MIN = 5;

  // ── State ───────────────────────────────────────────────────────────────
  const state = {
    org:           'All',
    program:       'All',
    activeTab:     'earnings',
    demoFiltersOn: false,
    genderSel:     [],
    raceSel:       [],
    noiseMode:     false,
  };

  // ── DOM refs ────────────────────────────────────────────────────────────
  const orgSel      = document.getElementById('orgSelect');
  const progSel     = document.getElementById('progSelect');
  const nDisplay    = document.getElementById('matchedN');
  const monthsDisp  = document.getElementById('avgMonths');
  const statWage    = document.getElementById('statMedianWage');
  const statEmp     = document.getElementById('statEmpRate');
  const earnQ4El    = document.getElementById('earnQ4');
  const earnAnnEl   = document.getElementById('earnAnnual');
  const earnRateEl  = document.getElementById('earnRate');
  const riskBanner  = document.getElementById('riskBanner');
  const noiseToggle = document.getElementById('noiseToggle');
  const demoToggle  = document.getElementById('demoFilterToggle');
  const demoPanel   = document.getElementById('demoFilterPanel');
  const genderMulti = document.getElementById('genderMulti');
  const raceMulti   = document.getElementById('raceMulti');

  // ── Tab switching ────────────────────────────────────────────────────────
  document.querySelectorAll('.dash-tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      state.activeTab = tab.dataset.tab;
      const pane = document.getElementById('pane-' + tab.dataset.tab);
      if (pane) pane.classList.add('active');
      render();
    });
  });

  // ── Populate org dropdown ───────────────────────────────────────────────
  MDI.msData.orgs.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o === 'All' ? '(All Organizations)' : o;
    orgSel.appendChild(opt);
  });

  // ── Populate program dropdown based on org ──────────────────────────────
  function refreshPrograms() {
    const programs = MDI.msData.programsByOrg[state.org] || ['All'];
    progSel.innerHTML = '';
    programs.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p === 'All' ? '(All Programs)' : p;
      progSel.appendChild(opt);
    });
    state.program = 'All';
  }

  // ── Populate demographic multi-selects from profile ──────────────────────
  function refreshDemoOptions(profile) {
    const genders = Object.keys(profile.gender);
    const races   = Object.keys(profile.race);

    genderMulti.innerHTML = genders.map(g =>
      `<label style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:11px;cursor:pointer">
         <input type="checkbox" value="${g}" style="accent-color:var(--blue)"> ${g}
       </label>`
    ).join('');

    raceMulti.innerHTML = races.map(r =>
      `<label style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:11px;cursor:pointer">
         <input type="checkbox" value="${r}" style="accent-color:var(--blue)"> ${r}
       </label>`
    ).join('');

    genderMulti.querySelectorAll('input').forEach(el =>
      el.addEventListener('change', () => {
        state.genderSel = Array.from(genderMulti.querySelectorAll('input:checked')).map(e => e.value);
        render();
      })
    );

    raceMulti.querySelectorAll('input').forEach(el =>
      el.addEventListener('change', () => {
        state.raceSel = Array.from(raceMulti.querySelectorAll('input:checked')).map(e => e.value);
        render();
      })
    );

    state.genderSel = [];
    state.raceSel   = [];
  }

  // ── Main render ─────────────────────────────────────────────────────────
  function render() {
    const profile    = MDI.msData.get(state.org, state.program);
    const profileKey = `${state.org}|${state.program}`;
    const nm         = state.noiseMode;

    // Matched N (apply demo filters if on)
    const n = state.demoFiltersOn
      ? MDI.msData.filteredN(profile, state.genderSel, state.raceSel)
      : profile.n;

    const suppressed = n < SUPPRESS_MIN;
    const atRisk     = n < THRESHOLD;

    // Stats bar
    nDisplay.textContent  = nm ? `~${Math.max(2, n - 2)}–${n + 3}` : n.toLocaleString();
    nDisplay.style.color  = suppressed ? 'var(--danger)' : atRisk ? '#8b5a00' : 'var(--navy)';
    monthsDisp.textContent = profile.months.toFixed(1);

    // Earnings stats in stats bar
    const wage = nm
      ? Math.max(1000, profile.earnings.medianWage + MDI.noise.int(profileKey + '|mw', 400, -200))
      : profile.earnings.medianWage;
    const empRate = nm
      ? Math.min(100, Math.max(0, profile.earnings.employmentRate + MDI.noise.pct(profileKey + '|er', 2)))
      : profile.earnings.employmentRate;

    statWage.textContent = '$' + wage.toLocaleString();
    statEmp.textContent  = empRate.toFixed(1) + '%';

    // Risk banner (show when demo filters are on and N is low)
    riskBanner.style.display = '';
    const earnInfo = document.getElementById('earnNoiseInfo');
    if (earnInfo) earnInfo.style.display = nm ? 'block' : 'none';

    if (nm) {
      riskBanner.className = 'risk-banner noise';
      riskBanner.textContent = 'Noise-infused mode — ~ values are deliberately perturbed before publication. The agency knows the true figure but releases a shifted version. Back-calculation (e.g. Total − visible groups) returns noise, not the true count.';
    } else if (suppressed) {
      riskBanner.className = 'risk-banner suppressed';
      riskBanner.textContent = `N = ${n} — below minimum display threshold (${SUPPRESS_MIN}). Dashboard hides all values to protect confidentiality.`;
    } else if (atRisk) {
      riskBanner.className = 'risk-banner risk';
      riskBanner.textContent = `N = ${n} — below disclosure threshold (${THRESHOLD}). The demographic breakdown below may identify specific individuals.`;
    } else {
      riskBanner.style.display = 'none';
    }

    // ── Earnings pane ──────────────────────────────────────────────────────
    if (document.getElementById('pane-earnings').classList.contains('active')) {
      MDI.msCharts.renderEarnings('earningsChart', profile.earnings, nm, profileKey);

      earnQ4El.textContent  = '$' + wage.toLocaleString();
      earnAnnEl.textContent = '$' + (wage * 4).toLocaleString();
      earnRateEl.textContent = empRate.toFixed(1) + '%';
    }

    // ── Demographics pane ──────────────────────────────────────────────────
    if (document.getElementById('pane-demographics').classList.contains('active')) {
      const showCharts = nm || !suppressed;
      document.getElementById('demoPanels').style.opacity      = showCharts ? '1' : '0.25';
      document.getElementById('demoPanels').style.pointerEvents = showCharts ? '' : 'none';

      if (showCharts) {
        MDI.msCharts.renderGender('genderCircles',       profile.gender,     nm, profileKey);
        MDI.msCharts.renderRace('raceChart',             profile.race,       nm, profileKey);
        MDI.msCharts.renderCompletion('completionChart', profile.completion, nm, profileKey);
        MDI.msCharts.renderEducation('eduBars',          profile.education,  nm, profileKey);
        MDI.msCharts.renderStatTable('homelessTable',    profile.homeless,   nm, profileKey, 'homeless');
        MDI.msCharts.renderStatTable('benefitsTable',    profile.benefits,   nm, profileKey, 'benefits');
      }
    }
  }

  // ── Filter events ────────────────────────────────────────────────────────
  orgSel.addEventListener('change', () => {
    state.org = orgSel.value;
    refreshPrograms();
    refreshDemoOptions(MDI.msData.get(state.org, state.program));
    render();
  });

  progSel.addEventListener('change', () => {
    state.program = progSel.value;
    refreshDemoOptions(MDI.msData.get(state.org, state.program));
    render();
  });

  noiseToggle.addEventListener('change', () => {
    state.noiseMode = noiseToggle.checked;
    render();
  });

  demoToggle.addEventListener('change', () => {
    state.demoFiltersOn = demoToggle.checked;
    demoPanel.style.display = state.demoFiltersOn ? 'grid' : 'none';
    render();
  });

  // ── Init ─────────────────────────────────────────────────────────────────
  refreshPrograms();
  refreshDemoOptions(MDI.msData.get('All', 'All'));
  render();
})();
