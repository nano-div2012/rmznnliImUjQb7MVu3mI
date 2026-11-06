(function () {
  const m = KL.page({ title: 'Tentang KLM Connect', back: 'index.html' });
  const ph = (n, t, d, items) => '<section class="card"><div class="phase p' + n + '"><b>Fase ' + n + '</b><span>' + t + '</span></div><h3>' + d + '</h3>' + items.map(i => '<div class="li"><span>' + i + '</span></div>').join('') + '</section>';
  m.innerHTML = '<section class="card"><h2>Keunggulan KLM Connect</h2>' + [['users', 'Mudah digunakan', 'Tampilan sederhana untuk semua level anggota.'], ['shield', 'Aman dan transparan', 'Sistem terpercaya dengan verifikasi pembayaran.'], ['chart', 'Potensi penghasilan', 'Komisi dan reward yang berkelanjutan.'], ['headset', 'Dukungan penuh', 'Tim profesional siap membantu.']].map(x => '<div class="why"><span class="wi">' + KL.ic(x[0], 22) + '</span><div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>').join('') + '</section>' +
    '<h2 class="sec">Roadmap implementasi 90 hari</h2>' +
    ph(1, 'Hari 1-30', 'Validasi bisnis', ['Riset produk', 'Analisis pasar', 'Hitung unit ekonomi']) +
    ph(2, 'Hari 31-60', 'Bangun sistem', ['Pengembangan MVP', 'Integrasi pembayaran', 'Uji keamanan']) +
    ph(3, 'Hari 61-90', 'Pilot dan optimasi', ['Onboarding reseller', 'Transaksi nyata', 'Evaluasi kinerja']) +
    '<div class="note">Prinsip desain: retail-first. Komisi bersumber dari penjualan produk, bukan dari perekrutan anggota.</div><a class="btn" href="index.html">Kembali</a>';
})();
