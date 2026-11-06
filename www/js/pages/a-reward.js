(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Manajemen Reward', back: 'a-menu.html', tab: 'a-menu.html' });
  const rq = st.redeem.filter(r => r.status === 'diajukan');
  m.innerHTML = '<section class="card"><h2>Daftar hadiah</h2>' + st.rewards.map(r => '<div class="li"><span><b>' + KL.esc(r.name) + '</b></span><span class="row" style="max-width:130px"><input data-r="' + r.id + '" inputmode="numeric" value="' + r.pts + '" aria-label="Poin ' + KL.esc(r.name) + '"><small>PTS</small></span></div>').join('') + '<button class="btn" data-act="save">Simpan poin</button></section>' +
    '<section class="card"><h2>Pengajuan penukaran (' + rq.length + ')</h2>' + (rq.map(r => '<div class="vr"><div class="li"><span><b>' + KL.esc(r.name) + '</b><small>' + KL.esc(KL.mem(r.mid).name) + ' - ' + r.pts + ' PTS</small></span></div><button class="btn green small" data-act="ok" data-id="' + r.id + '">Setujui</button><button class="btn red small" data-act="no" data-id="' + r.id + '">Tolak</button></div>').join('') || '<p class="mute">Tidak ada.</p>') + '</section>';
  KL.acts({
    save() { document.querySelectorAll('[data-r]').forEach(i => { const v = parseInt(i.value, 10); if (v > 0) st.rewards.find(r => r.id === +i.dataset.r).pts = v; }); S.save(); location.reload(); },
    ok(b) { st.redeem.find(r => r.id === +b.dataset.id).status = 'disetujui'; S.save(); location.reload(); },
    no(b) { const r = st.redeem.find(x => x.id === +b.dataset.id); r.status = 'ditolak'; KL.mem(r.mid).pts += r.pts; S.save(); location.reload(); }
  });
})();
