(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Manajemen Jaringan', back: 'a-menu.html', tab: 'a-menu.html' });
  const c = l => st.members.filter(x => x.lvl === l).length;
  m.innerHTML = '<div class="stats">' + Object.keys(KL.LVL).map(k => '<div class="card"><small>' + KL.LVL[k] + '</small><b>' + c(k) + '</b></div>').join('') + '</div><section class="card"><h2>Struktur jaringan</h2>' + KL.tree('DU-001') + '</section>';
})();
