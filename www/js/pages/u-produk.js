(function () {
  const S = KL.S, st = S.get(), p = KL.prod(KL.q('id')), m = KL.page({ title: 'Detail produk', back: 'u-belanja.html', tab: 'u-belanja.html' });
  if (!p) { m.innerHTML = '<p class="mute">Produk tidak ditemukan.</p>'; return; }
  m.innerHTML = '<section class="card"><div class="hero-thumb">' + KL.esc(p.name.slice(0, 2).toUpperCase()) + '</div><h2>' + KL.esc(p.name) + '</h2><div class="price">' + KL.rp(p.price) + '</div><p>' + KL.esc(p.desc) + '</p>' +
    '<p class="mute">Dapat ' + KL.pts(p.price) + ' poin per item setelah pembayaran terverifikasi.</p><label for="q">Jumlah</label><input id="q" type="number" min="1" value="1" inputmode="numeric"></section>' +
    '<button class="btn" data-act="add">Tambah ke keranjang</button><button class="btn green" data-act="buy">Beli sekarang</button>';
  const add = () => { const q = Math.max(1, parseInt(KL.$('#q').value, 10) || 1), c = st.cart.find(x => x.pid === p.id); if (c) c.q += q; else st.cart.push({ pid: p.id, q }); S.save(); };
  KL.acts({ add() { add(); KL.go('u-belanja.html'); }, buy() { add(); KL.go('u-keranjang.html'); } });
})();
