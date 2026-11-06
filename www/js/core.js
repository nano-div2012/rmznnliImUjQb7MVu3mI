/* Fungsi bersama semua halaman KLM Connect (dummy). */
(function () {
  'use strict';
  const S = window.Store, KL = { S };
  KL.LVL = { distributor: 'Distributor Utama', agen: 'Agen', reseller: 'Reseller', konsumen: 'Konsumen' };

  /* ---------- helper ---------- */
  KL.esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  KL.rp = n => 'Rp ' + Math.round(+n || 0).toLocaleString('id-ID');
  KL.jt = n => (+n >= 1e6 ? 'Rp ' + (n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' JT' : KL.rp(n));
  KL.dt = t => new Date(t).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  KL.q = k => new URLSearchParams(location.search).get(k);
  KL.go = u => { location.href = u; };
  KL.$ = (s, r) => (r || document).querySelector(s);
  KL.me = () => KL.mem(S.get().me);
  KL.mem = id => S.get().members.find(m => m.id === id);
  KL.prod = id => S.get().products.find(p => p.id === +id);
  KL.children = id => S.get().members.filter(m => m.sp === id);
  KL.count = id => KL.children(id).reduce((n, c) => n + 1 + KL.count(c.id), 0);
  KL.pts = total => Math.floor(total / S.get().settings.ptsPer);
  KL.waLink = (n, t) => { let d = String(n || '').replace(/\D/g, ''); if (!d) return ''; if (d[0] === '0') d = '62' + d.slice(1); return 'https://wa.me/' + d + (t ? '?text=' + encodeURIComponent(t) : ''); };
  KL.days7 = () => Array.from({ length: 7 }, (_, i) => ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][new Date(Date.now() - (6 - i) * 864e5).getDay()]);
  KL.acts = map => document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (b && !b.disabled && map[b.dataset.act]) map[b.dataset.act](b, e);
  });

  /* ---------- ikon dan logo ---------- */
  const IC = {
    cart: 'M3 4h2l2.4 11h10.2l2-8H6.2M9 20.01V20M17 20.01V20', link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
    wallet: 'M3 7a2 2 0 012-2h13v4M3 7v10a2 2 0 002 2h15V9H5a2 2 0 01-2-2zM16 14h2', gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0',
    chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2', trophy: 'M8 4h8v5a4 4 0 01-8 0V4zM8 6H4v1a3 3 0 003 3M16 6h4v1a3 3 0 01-3 3M12 13v4M8 20h8M10 17h4',
    headset: 'M4 14v-2a8 8 0 0116 0v2M4 14h3v5H5a1 1 0 01-1-1v-4zM20 14h-3v5h2a1 1 0 001-1v-4z', user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
    users: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20a7 7 0 0114 0M17 11a3 3 0 100-6M18 14a6 6 0 013 6', box: 'M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10',
    receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
    gear: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2', bot: 'M5 9h14v10H5zM12 9V5M9.5 14h.01M14.5 14h.01M2 13v3M22 13v3',
    home: 'M3 11l9-8 9 8M5 10v10h14V10', tree: 'M12 4v4M6 12V8h12v4M6 12v4M18 12v4M12 8v8', star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
    menu: 'M4 7h16M4 12h16M4 17h16', send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'
  };
  KL.ic = (n, s) => '<svg class="ico" viewBox="0 0 24 24" width="' + (s || 22) + '" height="' + (s || 22) + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (IC[n] || '') + '"/></svg>';
  KL.logo = '<svg class="logo" viewBox="0 0 40 40" role="img" aria-label="KLM Connect"><path d="M20 36C8 30 6 16 8 6c10 2 15 9 12 30z" fill="#2e9e4f"/><path d="M20 36c-2-20 3-28 14-30 2 10-2 24-14 30z" fill="#4a90e2"/></svg>';

  /* ---------- kerangka halaman ---------- */
  KL.page = o => {
    const st = S.get(), role = document.body.dataset.role || '';
    if (role === 'u' && !KL.me()) { location.replace('index.html'); return null; }
    if (role === 'a' && st.role !== 'admin') { location.replace('index.html'); return null; }
    const tabs = {
      u: [['u-beranda.html', 'Beranda', 'home'], ['u-belanja.html', 'Belanja', 'cart'], ['u-jaringan.html', 'Jaringan', 'tree'], ['u-wallet.html', 'Wallet', 'wallet'], ['u-profil.html', 'Profil', 'user']],
      a: [['a-dashboard.html', 'Dashboard', 'chart'], ['a-anggota.html', 'Anggota', 'users'], ['a-produk.html', 'Produk', 'box'], ['a-transaksi.html', 'Transaksi', 'receipt'], ['a-menu.html', 'Lainnya', 'menu']]
    }[role];
    const me = location.pathname.split('/').pop() || 'index.html';
    document.title = o.title + ' - KLM Connect';
    document.getElementById('root').innerHTML = '<div class="app"><header class="top">' + (o.back ? '<a class="back" href="' + o.back + '" aria-label="Kembali">&larr;</a>' : KL.logo) +
      '<h1>' + KL.esc(o.title) + '</h1>' + (role ? '<button class="ghost" id="out">Keluar</button>' : '') + '</header><div class="demo">Versi dummy untuk persetujuan desain. Semua data contoh.</div><main id="main"></main>' +
      (tabs ? '<nav class="tabs">' + tabs.map(t => '<a href="' + t[0] + '" class="' + ((o.tab || me) === t[0] ? 'on' : '') + '">' + KL.ic(t[2], 20) + t[1] + '</a>').join('') + '</nav>' : '') + '</div>';
    const out = document.getElementById('out');
    if (out) out.onclick = () => { st.me = null; st.role = null; S.save(); location.href = 'index.html'; };
    return document.getElementById('main');
  };

  /* ---------- grafik SVG ---------- */
  KL.line = (v, l) => {
    const W = 300, H = 130, p = 24, mx = Math.max(...v) * 1.1 || 1, x = i => p + i * (W - 2 * p) / (v.length - 1), y = n => H - 20 - (n / mx) * (H - 36);
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik tren penjualan"><path d="M' + p + ' ' + (H - 20) + 'H' + (W - p) + '" stroke="#d8e0ec"/>' +
      '<polyline points="' + v.map((n, i) => x(i) + ',' + y(n)).join(' ') + '" fill="none" stroke="#1565c0" stroke-width="2.5"/>' +
      v.map((n, i) => '<circle cx="' + x(i) + '" cy="' + y(n) + '" r="3" fill="#1565c0"/>').join('') +
      l.map((t, i) => '<text x="' + x(i) + '" y="' + (H - 5) + '" text-anchor="middle" font-size="9" fill="#5f6f86">' + t + '</text>').join('') + '</svg>';
  };
  KL.bars = (v, l) => {
    const W = 300, H = 130, p = 14, mx = Math.max(...v) * 1.1 || 1, bw = (W - 2 * p) / v.length;
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik batang penjualan">' +
      v.map((n, i) => { const h = (n / mx) * (H - 36); return '<rect x="' + (p + i * bw + 5) + '" y="' + (H - 20 - h) + '" width="' + (bw - 10) + '" height="' + h + '" rx="3" fill="' + (i === v.length - 1 ? '#2e9e4f' : '#1565c0') + '"/>'; }).join('') +
      l.map((t, i) => '<text x="' + (p + i * bw + bw / 2) + '" y="' + (H - 5) + '" text-anchor="middle" font-size="9" fill="#5f6f86">' + t + '</text>').join('') + '</svg>';
  };

  /* ---------- pohon jaringan ---------- */
  KL.treeNode = id => {
    const m = KL.mem(id), ch = KL.children(id);
    return '<li><div class="node n-' + m.lvl + '"><span class="av">' + KL.esc(m.name.split(' ').map(w => w[0]).slice(0, 2).join('')) + '</span><div><b>' + KL.esc(m.name) + '</b><small>' + m.id + ' - ' + KL.LVL[m.lvl] + '</small></div>' +
      (ch.length ? '<em>' + ch.length + '</em>' : '') + '</div>' + (ch.length ? '<ul>' + ch.map(c => KL.treeNode(c.id)).join('') + '</ul>' : '') + '</li>';
  };
  KL.tree = id => '<ul class="tree">' + KL.treeNode(id) + '</ul>';

  /* ---------- efek verifikasi pembayaran: poin pembeli dan komisi satu tingkat ---------- */
  KL.verify = o => {
    const st = S.get(), b = KL.mem(o.mid); o.status = 'terverifikasi';
    const pts = KL.pts(o.total); b.pts += pts;
    if (pts) st.wallet.push({ id: ++st.seq.w, mid: b.id, type: 'poin', amt: pts, note: 'Poin dari ' + o.id, at: Date.now() });
    const sp = b.sp && KL.mem(b.sp);
    if (sp) { const k = Math.round(o.total * st.settings.komisi / 100); sp.saldo += k; st.wallet.push({ id: ++st.seq.w, mid: sp.id, type: 'komisi', amt: k, note: 'Komisi ' + o.id + ' (' + b.name + ')', at: Date.now() }); }
    st.sales7[6] += o.total; S.save();
  };

  window.KL = KL;
})();
