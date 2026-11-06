(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Transaksi & Komisi' });
  const bd = s => '<span class="badge ' + (s === 'terverifikasi' ? 'ok' : s === 'ditolak' ? 'no' : 'wait') + '">' + s + '</span>', kom = st.wallet.filter(w => w.type === 'komisi').slice().reverse().slice(0, 6);
  m.innerHTML = '<section class="card"><h2>Transaksi pembelian</h2>' + (st.orders.length ? st.orders.map(o => '<div class="li"><span><b>' + o.id + '</b><small>' + KL.esc(KL.mem(o.mid).name) + ' - ' + KL.dt(o.at) + '</small></span><span>' + KL.rp(o.total) + '<br>' + bd(o.status) + '</span></div>').join('') : '<p class="mute">Belum ada transaksi baru. Buat dari sisi Anggota.</p>') + '</section>' +
    '<section class="card"><h2>Komisi terbaru</h2>' + kom.map(w => '<div class="li"><span>' + KL.esc(w.note) + '<small>' + w.mid + ' - ' + KL.dt(w.at) + '</small></span><span class="pos">+' + KL.rp(w.amt) + '</span></div>').join('') + '</section>';
})();
