/* Deterministic Laplace noise — same key always returns same value */
window.MDI = window.MDI || {};

MDI.noise = (function () {
  function hash32(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  // Returns a Laplace(0, scale) sample deterministically from key string.
  function sample(key, scale) {
    const h1 = hash32(key);
    const h2 = hash32(key + '_s');
    const u    = (h1 % 9997 + 2) / 10000; // (0, 1)
    const sign = h2 % 2 === 0 ? 1 : -1;
    return sign * scale * Math.log(1 / u);
  }

  // Integer noise: rounds Laplace sample, clamps to [min, ∞)
  function int(key, scale, min = 1) {
    return Math.max(min, Math.round(sample(key, scale)));
  }

  // Percent noise: keeps value in [0, 100] range
  function pct(key, scale) {
    return parseFloat(Math.min(100, Math.max(0, sample(key, scale))).toFixed(1));
  }

  return { sample, int, pct };
})();
