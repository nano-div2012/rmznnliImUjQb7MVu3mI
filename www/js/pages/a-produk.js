(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Manajemen Produk' });
  m.innerHTML = '<a class="btn" href="a-produk-form.html">+ Tambah produk</a><div style="height:12px"></div>' + st.products.map(p => '<div class="card' + (p.on ? '' : ' off') + '"><div class="ocr"><b>' + KL.esc(p.name) + '</b><span>' + KL.rp(p.price) + '</span></div><p class="mute">' + KL.esc(p.desc) + '</p><a class="btn plain small" href="a-produk-form.html?id=' + p.id + '">Ubah</a><button class="btn plain small" data-act="tog" data-id="' + p.id + '">' + (p.on ? 'Nonaktifkan' : 'Aktifkan') + '</button></div>').join('');
  KL.acts({ tog(b) { const p = KL.prod(b.dataset.id); p.on = !p.on; S.save(); location.reload(); } });
})();
