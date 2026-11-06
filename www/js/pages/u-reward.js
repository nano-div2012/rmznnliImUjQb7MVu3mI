(function () {
  const st = KL.S.get(), me = KL.me(), m = KL.page({ title: 'Reward Points' });
  const next = st.rewards.slice().sort((a, b) => a.pts - b.pts).find(r => r.pts > me.pts), hist = st.wallet.filter(w => w.mid === me.id && w.type === 'poin').slice().reverse();
  m.innerHTML = '<section class="card saldo"><div class="lbl">Poin kamu</div><div class="amt">' + me.pts.toLocaleString('id-ID') + ' PTS</div>' +
    (next ? '<div class="bar"><i style="width:' + Math.min(100, me.pts / next.pts * 100) + '%"></i></div><div class="up">' + (next.pts - me.pts).toLocaleString('id-ID') + ' poin lagi menuju ' + KL.esc(next.name) + '</div>' : '<div class="up">Semua hadiah sudah bisa ditukar</div>') + '</section>' +
    '<section class="card"><h2>Benefit</h2><div class="li"><span>Poin dari transaksi valid</span></div><div class="li"><span>Bisa ditukar hadiah menarik</span></div><div class="li"><span>Program loyalitas jangka panjang</span></div></section>' +
    '<a class="btn green" href="u-hadiah.html">Tukar hadiah</a><section class="card" style="margin-top:12px"><h2>Riwayat poin</h2>' + (hist.length ? hist.map(w => '<div class="li"><span>' + KL.esc(w.note) + '<small>' + KL.dt(w.at) + '</small></span><span class="pos">+' + w.amt + '</span></div>').join('') : '<p class="mute">Belum ada riwayat poin.</p>') + '</section>';
})();
