(function () {
  const st = KL.S.get(), me = KL.me(), m = KL.page({ title: 'Laporan Penjualan', back: 'u-beranda.html', tab: 'u-beranda.html' });
  const mine = st.orders.filter(o => o.mid === me.id), ok = mine.filter(o => o.status === 'terverifikasi'), bd = s => '<span class="badge ' + (s === 'terverifikasi' ? 'ok' : s === 'ditolak' ? 'no' : 'wait') + '">' + s + '</span>';
  m.innerHTML = '<div class="stats"><div class="card"><small>Pembelian saya</small><b>' + KL.jt(ok.reduce((a, o) => a + o.total, 0)) + '</b></div><div class="card"><small>Jumlah pesanan</small><b>' + mine.length + '</b></div></div>' +
    '<section class="card"><h2>Penjualan jaringan (7 hari)</h2>' + KL.bars(st.sales7.map(x => x / 1e6), KL.days7()) + '<p class="mute">Satuan: juta rupiah.</p></section>' +
    '<section class="card"><h2>Pesanan saya</h2>' + (mine.length ? mine.map(o => '<div class="li"><span><b>' + o.id + '</b><small>' + KL.dt(o.at) + ' - ' + o.items.reduce((a, i) => a + i.q, 0) + ' item</small></span><span>' + KL.rp(o.total) + '<br>' + bd(o.status) + '</span></div>').join('') : '<p class="mute">Belum ada pesanan. Mulai dari menu Belanja.</p>') + '</section>';
})();
