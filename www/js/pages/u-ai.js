(function () {
  const st = KL.S.get(), me = KL.me(), m = KL.page({ title: 'AI Business Assistant', back: 'u-beranda.html', tab: 'u-beranda.html' });
  const top = st.products[1].name, kids = KL.children(me.id).length;
  const ANS = {
    target: 'Fokus pada produk unggulan dengan margin terbaik, tambah 50 pelanggan baru dalam 30 hari, dan rutin follow-up pelanggan lama.',
    produk: 'Produk yang paling mudah dijual saat ini: ' + top + ' dan Paket Sembako Hemat. Tawarkan sebagai paket supaya nilai belanja naik.',
    pelanggan: 'Saat ini kamu punya ' + kids + ' anggota langsung. Ajak 5 orang baru per minggu lewat link referral dan WhatsApp.',
    promosi: 'Optimalkan promosi di WhatsApp dan media sosial: kirim testimoni, foto produk, dan ajakan belanja di jam 19.00-21.00.',
    komisi: 'Saldo komisimu ' + KL.rp(me.saldo) + '. Komisi satu tingkat naik seiring pembelian anggota yang kamu referensikan.'
  };
  m.innerHTML = '<section class="card"><div class="bot">' + KL.ic('bot', 30) + '<p>Halo, Partner! Saya siap membantu Anda mencapai target.</p></div></section><div class="msgs" id="msgs"></div>' +
    '<div class="chips2">' + [['target', 'Target bulan ini'], ['produk', 'Produk unggulan'], ['pelanggan', 'Cari pelanggan'], ['promosi', 'Ide promosi'], ['komisi', 'Cek komisi']].map(x => '<button class="btn plain small" data-act="ask" data-k="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' +
    '<div class="row sendrow"><input id="txt" placeholder="Tanya AI..." autocomplete="off"><button class="btn small" data-act="send">Kirim</button></div><p class="mute">Simulasi: jawaban contoh, belum terhubung ke model AI.</p>';
  const add = (c, t) => { const d = document.createElement('div'); d.className = 'msg' + (c ? ' me' : ''); d.textContent = t; KL.$('#msgs').appendChild(d); d.scrollIntoView({ block: 'nearest' }); };
  const reply = k => setTimeout(() => add(0, ANS[k] || 'Pertanyaan bagus. Pada versi asli, jawaban dibuat dari data penjualan dan jaringanmu.'), 500);
  KL.acts({
    ask(b) { add(1, b.textContent); reply(b.dataset.k); },
    send() { const t = KL.$('#txt').value.trim(); if (!t) return; KL.$('#txt').value = ''; add(1, t); const l = t.toLowerCase(); reply(Object.keys(ANS).find(k => l.indexOf(k) >= 0 || (k === 'target' && l.indexOf('capai') >= 0))); }
  });
})();
