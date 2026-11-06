(function () {
  const S = KL.S, st = S.get(), p = KL.prod(KL.q('id')), m = KL.page({ title: p ? 'Ubah produk' : 'Tambah produk', back: 'a-produk.html', tab: 'a-produk.html' });
  m.innerHTML = '<section class="card"><label for="nm">Nama produk</label><input id="nm"><label for="hg">Harga (Rp)</label><input id="hg" inputmode="numeric"><label for="ds">Deskripsi</label><textarea id="ds"></textarea><div class="err" id="err"></div><button class="btn" data-act="save">Simpan</button></section>';
  if (p) { KL.$('#nm').value = p.name; KL.$('#hg').value = p.price; KL.$('#ds').value = p.desc; }
  KL.acts({
    save() {
      const n = KL.$('#nm').value.trim(), h = parseInt(KL.$('#hg').value.replace(/\D/g, ''), 10) || 0; if (!n || h <= 0) { KL.$('#err').textContent = 'Isi nama dan harga produk.'; return; }
      if (p) Object.assign(p, { name: n, price: h, desc: KL.$('#ds').value.trim() }); else st.products.push({ id: ++st.seq.p, name: n, price: h, desc: KL.$('#ds').value.trim(), on: true });
      S.save(); KL.go('a-produk.html');
    }
  });
})();
