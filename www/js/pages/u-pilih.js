(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Pilih akun contoh', back: 'index.html' });
  m.innerHTML = '<p class="mute">Pilih akun anggota contoh. Tampilan sama, isi jaringan berbeda.</p>' +
    ['DU-001', 'AG-001', 'RS-001', 'K-001'].map(id => { const x = KL.mem(id); return '<button class="card pick" data-act="pick" data-v="' + id + '"><span class="av">' + KL.esc(x.name.split(' ').map(w => w[0]).join('')) + '</span><div><b>' + KL.esc(x.name) + '</b><small>' + x.id + '</small></div><span class="badge n-' + x.lvl + '">' + KL.LVL[x.lvl] + '</span></button>'; }).join('');
  KL.acts({ pick(b) { st.me = b.dataset.v; st.role = 'user'; st.cart = []; S.save(); KL.go('u-beranda.html'); } });
})();
