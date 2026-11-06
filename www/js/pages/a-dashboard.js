(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Dashboard & Analitik' });
  const wait = st.orders.filter(o => o.status === 'menunggu').length + st.wd.filter(w => w.status === 'menunggu').length;
  const kom = st.wallet.filter(w => w.type === 'komisi').reduce((a, w) => a + w.amt, 0);
  const box = (ic, v, l, c) => '<div class="card stat"><span class="si ' + c + '">' + KL.ic(ic, 20) + '</span><b>' + v + '</b><small>' + l + '</small></div>';
  m.innerHTML = '<div class="stats">' + box('users', st.members.filter(x => x.on).length, 'Anggota aktif', 'b') + box('cart', KL.jt(st.sales7.reduce((a, x) => a + x, 0)), 'Penjualan 7 hari', 'g') +
    box('receipt', wait, 'Menunggu verifikasi', 'o') + box('wallet', KL.jt(kom), 'Komisi tercatat', 'p') + '</div>' +
    '<section class="card"><h2>Penjualan 7 hari terakhir</h2>' + KL.bars(st.sales7.map(x => x / 1e6), KL.days7()) + '<p class="mute">Satuan: juta rupiah.</p></section>' +
    (wait ? '<a class="btn gold" href="a-verifikasi.html">Ada ' + wait + ' item perlu diverifikasi</a>' : '<div class="note">Tidak ada yang perlu diverifikasi.</div>');
})();
