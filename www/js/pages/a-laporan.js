(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Laporan Bisnis', back: 'a-menu.html', tab: 'a-menu.html' });
  const cnt = {}; st.orders.filter(o => o.status === 'terverifikasi').forEach(o => o.items.forEach(i => { cnt[i.pid] = (cnt[i.pid] || 0) + i.q; }));
  const top = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).slice(0, 5), total = st.sales7.reduce((a, x) => a + x, 0);
  m.innerHTML = '<div class="stats"><div class="card"><small>Total penjualan 7 hari</small><b>' + KL.jt(total) + '</b></div><div class="card"><small>Rata-rata per hari</small><b>' + KL.jt(total / 7) + '</b></div></div>' +
    '<section class="card"><h2>Tren penjualan</h2>' + KL.line(st.sales7.map(x => x / 1e6), KL.days7()) + '</section>' +
    '<section class="card"><h2>Produk terlaris (dari transaksi baru)</h2>' + (top.length ? top.map(id => '<div class="li"><span>' + KL.esc(KL.prod(id).name) + '</span><b>' + cnt[id] + ' pcs</b></div>').join('') : '<p class="mute">Belum ada transaksi terverifikasi.</p>') + '</section>' +
    '<section class="card"><h2>Komposisi anggota</h2>' + Object.keys(KL.LVL).map(k => '<div class="li"><span>' + KL.LVL[k] + '</span><b>' + st.members.filter(x => x.lvl === k).length + '</b></div>').join('') + '</section>';
})();
