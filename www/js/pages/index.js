(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'KLM Connect' });
  m.innerHTML = '<section class="card hero">' + KL.logo.replace('class="logo"', 'class="logo big"') + '<h2>KLM Connect</h2><p class="tag">Retail-First Network Commerce</p><p class="mute">Belanja, berbagi, tumbuh bersama. Pilih peran untuk melihat desain aplikasi.</p></section>' +
    '<a class="btn" href="u-pilih.html">Masuk sebagai Anggota</a><button class="btn navy" data-act="admin">Masuk sebagai Admin</button>' +
    '<a class="btn green" href="tentang.html">Konsep, keunggulan, dan roadmap</a><button class="btn plain" data-act="reset">Reset data contoh</button>';
  KL.acts({
    admin() { st.role = 'admin'; st.me = null; S.save(); KL.go('a-dashboard.html'); },
    reset() { if (confirm('Kembalikan semua data contoh ke awal?')) { S.reset(); location.reload(); } }
  });
})();
