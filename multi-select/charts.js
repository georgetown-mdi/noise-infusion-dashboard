window.MDI = window.MDI || {};

// Renders and updates the four demographic panels on the Demographics tab.
// Each render function takes (canvasId, data, noiseMode, profileKey) and manages its own Chart instance.
MDI.msCharts = (function () {

  const instances = {};

  const COLORS = ['#003da5','#e07b20','#007d9c','#862633','#4d8108','#63666a','#86A9CD'];

  function destroy(id) {
    if (instances[id]) { instances[id].destroy(); delete instances[id]; }
  }

  // ── Gender circles (not a chart — pure DOM) ──────────────────────────
  function renderGender(containerId, genderData, noiseMode, profileKey) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const keys   = Object.keys(genderData);
    const colors = ['#e07b20', '#003da5', '#63666a'];
    const icons  = { Female: '♀', Male: '♂', Other: '⚧' };

    el.innerHTML = keys.map((k, i) => {
      let pct = genderData[k];
      if (noiseMode) pct = Math.min(100, Math.max(0, pct + MDI.noise.pct(`${profileKey}|g|${k}`, 3)));
      const display = noiseMode ? `~${pct.toFixed(1)}%` : `${pct.toFixed(2)}%`;
      return `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="font-size:12px;width:44px;color:var(--gray)">${k}</span>
          <div style="width:48px;height:48px;border-radius:50%;background:${colors[i]};
               display:flex;align-items:center;justify-content:center;
               font-size:12px;font-weight:700;color:#fff;flex-shrink:0">${display}</div>
        </div>`;
    }).join('');
  }

  // ── Race bar chart ────────────────────────────────────────────────────
  function renderRace(canvasId, raceData, noiseMode, profileKey) {
    destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = Object.keys(raceData);
    const values = labels.map(k => {
      const v = raceData[k];
      return noiseMode ? Math.min(100, Math.max(0, v + MDI.noise.pct(`${profileKey}|r|${k}`, 3))) : v;
    });

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
          borderRadius: 2,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => `${c.raw.toFixed(1)}%${noiseMode ? ' (approx.)' : ''}` } },
        },
        scales: {
          y: {
            min: 0,
            max: Math.ceil(Math.max(...values) / 10) * 10 + 10,
            title: { display: true, text: '% of Total Participants', font: { size: 9 }, color: '#63666a' },
            ticks: { callback: v => v + '%', font: { size: 9 } },
            grid: { color: '#EBF0F7' },
          },
          x: {
            ticks: { font: { size: 9 }, maxRotation: 30 },
            grid: { display: false },
          }
        }
      }
    });

    // Draw percentage labels above bars
    const vals = instances[canvasId].data.datasets[0].data;
    vals.forEach((v, i) => {
      if (v > 1) instances[canvasId].data.datasets[0].label = '';
    });
  }

  // ── Completion donut ──────────────────────────────────────────────────
  function renderCompletion(canvasId, completionData, noiseMode, profileKey) {
    destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = Object.keys(completionData);
    const values = labels.map(k => {
      const v = completionData[k];
      return noiseMode ? Math.min(100, Math.max(0, v + MDI.noise.pct(`${profileKey}|c|${k}`, 3))) : v;
    });

    instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#4d8108', '#e07b20'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 8 } },
          tooltip: { callbacks: { label: c => `${c.label}: ${c.raw.toFixed(1)}%` } },
        }
      }
    });
  }

  // ── Education horizontal bars (DOM, not canvas) ──────────────────────
  function renderEducation(containerId, eduData, noiseMode, profileKey) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const keys   = Object.keys(eduData);
    const colors = ['#003da5', '#e07b20', '#4d8108', '#007d9c', '#86A9CD', '#63666a'];

    el.innerHTML = keys.map((k, i) => {
      let pct = eduData[k];
      if (noiseMode) pct = Math.min(100, Math.max(0, pct + MDI.noise.pct(`${profileKey}|e|${k}`, 3)));
      const display = noiseMode ? `~${pct.toFixed(1)}%` : `${pct.toFixed(2)}%`;
      const barW    = Math.max(2, pct);
      return `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:10px;color:var(--gray);width:130px;flex-shrink:0;text-align:right">${k}</span>
          <div style="flex:1;height:10px;background:#EBF0F7;border-radius:2px;overflow:hidden">
            <div style="width:${barW}%;height:100%;background:${colors[i % colors.length]};border-radius:2px"></div>
          </div>
          <span style="font-size:10px;font-weight:700;color:var(--text);width:44px">${display}</span>
        </div>`;
    }).join('');
  }

  // ── Two-row stat table (Homeless, Benefits) ──────────────────────────
  function renderStatTable(containerId, data, noiseMode, profileKey, dim) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const keys = Object.keys(data);
    el.innerHTML = keys.map(k => {
      let pct = data[k];
      if (noiseMode) pct = Math.min(100, Math.max(0, pct + MDI.noise.pct(`${profileKey}|${dim}|${k}`, 3)));
      const display = noiseMode ? `~${pct.toFixed(1)}%` : `${pct.toFixed(2)}%`;
      return `
        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--bg);font-size:11px">
          <span style="color:var(--gray)">${k}</span>
          <span style="font-weight:700">${display}</span>
        </div>`;
    }).join('');
  }

  // ── Earnings quarterly bar chart ─────────────────────────────────────
  function renderEarnings(canvasId, earningsData, noiseMode, profileKey) {
    destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = ['Q1 Post-Exit', 'Q2 Post-Exit', 'Q3 Post-Exit', 'Q4 Post-Exit'];
    const values = earningsData.quarters.map((v, i) => {
      return noiseMode ? Math.max(1000, v + MDI.noise.int(`${profileKey}|eq${i}`, 300, -150)) : v;
    });

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#86A9CD', '#007d9c', '#003da5', '#041e42'],
          borderRadius: 3,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: {
            label: c => `$${c.raw.toLocaleString()}${noiseMode ? ' (approx.)' : ''}`
          }},
        },
        scales: {
          y: {
            min: 0,
            title: { display: true, text: 'Median Quarterly Wage ($)', font: { size: 9 }, color: '#63666a' },
            ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k', font: { size: 9 } },
            grid: { color: '#EBF0F7' },
          },
          x: {
            ticks: { font: { size: 10 } },
            grid: { display: false },
          }
        }
      }
    });
  }

  return { renderGender, renderRace, renderCompletion, renderEducation, renderStatTable, renderEarnings };
})();
