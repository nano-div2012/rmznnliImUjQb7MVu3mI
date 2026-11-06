(function () {
  const S = KL.S, st = S.get(), me = KL.me(), m = KL.page({ title: 'Keranjang', back: 'u-belanja.html', tab: 'u-belanja.html' });
  const total = () => st.cart.reduce((a, c) => a + c.q * KL.prod(c.pid).price, 0);
  function draw() {
    if (!st.cart.length) { m.innerHTML = '<section class="card center"><p class="mute">Keranjang masih kosong.</p></section><a class="btn" href="u-belanja.html">Mulai belanja</a>'; return; }
    m.innerHTML = '<section class="card">' + st.cart.map((c, i) => { const p = KL.prod(c.pid); return '<div class="li"><span><b>' + KL.esc(p.name) + '</b><small>' + KL.rp(p.price) + '</small></span><span class="qty"><button class="btn plain small" data-act="min" data-i="' + i + '" aria-label="Kurangi">-</button><b>' + c.q + '</b><button class="btn plain small" data-act="plus" data-i="' + i + '" aria-label="Tambah">+</button></span></div>'; }).join('') +
      '<div class="li"><b>Total</b><b>' + KL.rp(total()) + '</b></div><p class="mute">Estimasi poin: ' + KL.pts(total()) + '</p></section>' +
      '<section class="card"><h2>Pembayaran transfer</h2><p class="mute">Transfer ke rekening berikut, lalu isi nama pengirim.</p><div class="note">' + KL.esc(st.settings.bank) + '</div><label for="snd">Nama pengirim</label><input id="snd" value="' + KL.esc(me.name) + '"><div class="err" id="err"></div><button class="btn green" data-act="pay">Saya sudah transfer</button></section>';
  }
  draw();
  KL.acts({
    plus(b) { st.cart[+b.dataset.i].q++; S.save(); draw(); },
    min(b) { const c = st.cart[+b.dataset.i]; c.q--; if (c.q < 1) st.cart.splice(+b.dataset.i, 1); S.save(); draw(); },
    pay() {
      const snd = KL.$('#snd').value.trim(); if (!snd) { KL.$('#err').textContent = 'Isi nama pengirim.'; return; }
      const o = { id: 'KLM-' + String(++st.seq.o).padStart(4, '0'), mid: me.id, items: st.cart.map(c => ({ pid: c.pid, q: c.q, price: KL.prod(c.pid).price })), total: total(), sender: snd, status: 'menunggu', at: Date.now() };
      st.orders.unshift(o); st.cart = []; S.save();
      m.innerHTML = '<section class="card center"><div class="okmark" role="img" aria-label="Berhasil"></div><h2>Pesanan ' + o.id + ' diterima</h2><p class="mute">Pembayaran ' + KL.rp(o.total) + ' menunggu verifikasi admin. Poin dan komisi masuk setelah terverifikasi.</p></section><a class="btn" href="u-laporan.html">Lihat pesanan saya</a>';
    }
  });
})();
