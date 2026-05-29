window.MDI = window.MDI || {};

(function () {
  const { colHeaders, renderAssessment, renderEnrollment, renderCompSupp, renderNoise, renderAttacks } = MDI.suppTables;

  // Inject column headers into all tables
  document.querySelectorAll('.data-thead').forEach(el => {
    el.innerHTML = colHeaders();
  });

  // Render all tables once
  renderAssessment('tbody-assess',   false);
  renderEnrollment('tbody-enroll');
  renderCompSupp('tbody-comp');
  renderNoise('tbody-noise');
  renderAttacks('attackList');

  // Tab switching
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById('pane-' + tab.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  // "Show attack" button on Tab 1 reveals panel with highlights
  document.getElementById('showAttackBtn')?.addEventListener('click', () => {
    renderAssessment('tbody-assess', true);
    const panel = document.getElementById('attackPanel');
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
