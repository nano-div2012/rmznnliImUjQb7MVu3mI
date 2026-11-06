(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Customer Support', back: 'u-beranda.html', tab: 'u-beranda.html' });
  const faq = [['Bagaimana cara mendapat komisi?', 'Komisi didapat dari pembelian produk oleh anggota yang kamu referensikan langsung, sebesar ' + st.settings.komisi + '% setelah pembayaran terverifikasi.'], ['Kapan poin masuk?', 'Poin masuk otomatis setelah admin memverifikasi pembayaran.'], ['Berapa lama penarikan saldo?', 'Pengajuan penarikan diproses admin. Minimal penarikan Rp 50.000.'], ['Bagaimana menukar hadiah?', 'Buka menu Tukar Hadiah, pilih hadiah, lalu ajukan. Admin akan memproses penukaran.']];
  const wa = KL.waLink(st.settings.waAdmin, 'Halo admin KLM Connect, saya butuh bantuan.');
  m.innerHTML = '<section class="card"><h2>Pertanyaan umum</h2>' + faq.map(f => '<details><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>').join('') + '</section>' +
    '<section class="card"><h2>Hubungi admin</h2>' + (wa ? '<a class="btn green" target="_blank" rel="noopener" href="' + KL.esc(wa) + '">Chat admin lewat WhatsApp</a>' : '<div class="note">Nomor WhatsApp admin belum diisi. Isi di Admin, Lainnya, Pengaturan sistem.</div>') + '</section>';
})();
