(function () {
  const S = KL.S, st = S.get(), me = KL.me(), m = KL.page({ title: 'Tukar Hadiah', back: 'u-reward.html', tab: 'u-beranda.html' });
  const mine = st.redeem.filter(r => r.mid === me.id).reverse();
  m.innerHTML = '<section class="card saldo"><div class="lbl">Poin tersedia</div><div class="amt">' + me.pts.toLocaleString('id-ID') + ' PTS</div></section><div class="pgrid">' +
    st.rewards.map(r => '<div class="card prod"><span class="thumb gold">' + r.tag + '</span><b>' + KL.esc(r.name) + '</b><span class="price">' + r.pts.toLocaleString('id-ID') + ' PTS</span><button class="btn small" data-act="tukar" data-id="' + r.id + '"' + (me.pts < r.pts ? ' disabled' : '') + '>' + (me.pts < r.pts ? 'Poin kurang' : 'Tukar') + '</button></div>').join('') + '</div>' +
    (mine.length ? '<section class="card"><h2>Pengajuan penukaran</h2>' + mine.map(r => '<div class="li"><span>' + KL.esc(r.name) + '<small>' + KL.dt(r.at) + '</small></span><span class="badge ' + (r.status === 'disetujui' ? 'ok' : r.status === 'ditolak' ? 'no' : 'wait') + '">' + r.status + '</span></div>').join('') + '</section>' : '');
  KL.acts({ tukar(b) { const r = st.rewards.find(x => x.id === +b.dataset.id); if (!r || me.pts < r.pts || !confirm('Tukar ' + r.pts + ' poin dengan ' + r.name + '?')) return; me.pts -= r.pts; st.redeem.push({ id: ++st.seq.r, mid: me.id, rid: r.id, name: r.name, pts: r.pts, status: 'diajukan', at: Date.now() }); S.save(); location.reload(); } });
})();
