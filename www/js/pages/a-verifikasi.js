(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Verifikasi Pembayaran', back: 'a-menu.html', tab: 'a-menu.html' });
  const po = st.orders.filter(o => o.status === 'menunggu'), pw = st.wd.filter(w => w.status === 'menunggu');
  m.innerHTML = '<section class="card"><h2>Pembayaran menunggu (' + po.length + ')</h2>' + (po.map(o => '<div class="vr"><div class="li"><span><b>' + o.id + '</b><small>' + KL.esc(KL.mem(o.mid).name) + ' - pengirim ' + KL.esc(o.sender) + '</small></span><b>' + KL.rp(o.total) + '</b></div><button class="btn green small" data-act="ok" data-id="' + o.id + '">Verifikasi</button><button class="btn red small" data-act="no" data-id="' + o.id + '">Tolak</button></div>').join('') || '<p class="mute">Tidak ada.</p>') + '</section>' +
    '<section class="card"><h2>Penarikan saldo (' + pw.length + ')</h2>' + (pw.map(w => '<div class="vr"><div class="li"><span><b>' + KL.esc(KL.mem(w.mid).name) + '</b><small>' + KL.esc(w.bank) + '</small></span><b>' + KL.rp(w.amt) + '</b></div><button class="btn green small" data-act="wok" data-id="' + w.id + '">Tandai dibayar</button><button class="btn red small" data-act="wno" data-id="' + w.id + '">Tolak</button></div>').join('') || '<p class="mute">Tidak ada.</p>') + '</section>';
  const fin = () => { S.save(); location.reload(); };
  KL.acts({
    ok(b) { KL.verify(st.orders.find(o => o.id === b.dataset.id)); location.reload(); },
    no(b) { st.orders.find(o => o.id === b.dataset.id).status = 'ditolak'; fin(); },
    wok(b) { st.wd.find(w => w.id === +b.dataset.id).status = 'dibayar'; fin(); },
    wno(b) { const w = st.wd.find(x => x.id === +b.dataset.id); w.status = 'ditolak'; KL.mem(w.mid).saldo += w.amt; fin(); }
  });
})();
