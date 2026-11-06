(function () {
  const me = KL.me(), m = KL.page({ title: 'Jaringan Saya' });
  m.innerHTML = '<div class="stats"><div class="card"><small>Langsung</small><b>' + KL.children(me.id).length + '</b></div><div class="card"><small>Total jaringan</small><b>' + KL.count(me.id) + '</b></div></div>' +
    '<section class="card"><h2>Pohon jaringan</h2>' + KL.tree(me.id) + '</section><div class="note">Tracking real-time dan komisi satu tingkat dihitung otomatis pada versi asli.</div>';
})();
