(function () {
  const m = KL.page({ title: 'Menu Admin' });
  const items = [['tree', 'Manajemen Jaringan', 'a-jaringan.html'], ['shield', 'Verifikasi Pembayaran', 'a-verifikasi.html'], ['chart', 'Laporan Bisnis', 'a-laporan.html'], ['gift', 'Manajemen Reward', 'a-reward.html'], ['gear', 'Pengaturan Sistem', 'a-pengaturan.html'], ['star', 'Tentang dan Roadmap', 'tentang.html']];
  m.innerHTML = '<div class="tiles">' + items.map(x => '<a class="tile" href="' + x[2] + '">' + KL.ic(x[0], 26) + '<span>' + x[1] + '</span></a>').join('') + '</div>';
})();
