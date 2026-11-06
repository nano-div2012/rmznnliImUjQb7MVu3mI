(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Manajemen Anggota' });
  m.innerHTML = '<a class="btn" href="a-anggota-form.html">+ Tambah anggota</a><label for="cari">Cari anggota</label><input id="cari" placeholder="Nama atau ID" autocomplete="off"><div id="list" style="margin-top:12px"></div>';
  const draw = () => {
    const q = KL.$('#cari').value.trim().toLowerCase();
    KL.$('#list').innerHTML = st.members.filter(x => !q || (x.name + x.id).toLowerCase().indexOf(q) >= 0).map(x => '<div class="card' + (x.on ? '' : ' off') + '"><div class="ocr"><b>' + KL.esc(x.name) + '</b><span class="badge n-' + x.lvl + '">' + KL.LVL[x.lvl] + '</span></div><p class="mute">' + x.id + (x.sp ? ' - sponsor ' + x.sp : '') + '</p><p class="mute">Saldo ' + KL.rp(x.saldo) + ' - ' + x.pts + ' poin</p><button class="btn plain small" data-act="tog" data-id="' + x.id + '">' + (x.on ? 'Nonaktifkan' : 'Aktifkan') + '</button></div>').join('') || '<p class="mute">Tidak ditemukan.</p>';
  };
  draw(); KL.$('#cari').addEventListener('input', draw);
  KL.acts({ tog(b) { const x = KL.mem(b.dataset.id); x.on = !x.on; S.save(); draw(); } });
})();
