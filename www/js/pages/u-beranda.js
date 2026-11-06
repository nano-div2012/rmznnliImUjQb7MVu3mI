(function () {
  const st = KL.S.get(), me = KL.me(), m = KL.page({ title: 'KLM Connect' });
  const tx = st.wallet.filter(w => w.mid === me.id && w.type !== 'poin').slice(-2).reverse();
  const menu = [['cart', 'Belanja Produk', 'u-belanja.html'], ['link', 'Referral Link', 'u-referral.html'], ['wallet', 'Komisi & Saldo Wallet', 'u-wallet.html'], ['gift', 'Reward Points', 'u-reward.html'],
    ['chart', 'Laporan Penjualan', 'u-laporan.html'], ['trophy', 'Tukar Hadiah', 'u-hadiah.html'], ['headset', 'Customer Support', 'u-bantuan.html'], ['user', 'Pengaturan Profil', 'u-profil.html']];
  m.innerHTML = '<section class="card saldo"><small>Halo, ' + KL.esc(me.name) + ' (' + KL.LVL[me.lvl] + ')</small><div class="lbl">Saldo Komisi</div><div class="amt">' + KL.rp(me.saldo) + '</div><div class="up">+12,5% dari bulan lalu</div></section>' +
    '<section class="card"><h2>Tren penjualan (7 hari terakhir)</h2>' + KL.line(st.sales7.map(x => x / 1e6), KL.days7()) + '<p class="mute">Satuan: juta rupiah, jaringan KLM Connect.</p></section>' +
    '<h2 class="sec">Menu</h2><div class="tiles">' + menu.map(x => '<a class="tile" href="' + x[2] + '">' + KL.ic(x[0], 26) + '<span>' + x[1] + '</span></a>').join('') + '</div>' +
    '<a class="card ai" href="u-ai.html">' + KL.ic('bot', 30) + '<div><b>AI Business Assistant</b><small>Rekomendasi bisnis untuk mencapai targetmu</small></div></a>' +
    '<section class="card"><h2>Transaksi terbaru</h2>' + (tx.length ? tx.map(w => '<div class="li"><span>' + KL.esc(w.note) + '<small>' + KL.dt(w.at) + '</small></span><span class="' + (w.amt < 0 ? 'neg' : 'pos') + '">' + (w.amt < 0 ? '-' : '+') + KL.rp(Math.abs(w.amt)) + '</span></div>').join('') : '<p class="mute">Belum ada transaksi.</p>') + '<a href="u-wallet.html">Lihat semua</a></section>';
})();
