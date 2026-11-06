(function () {
  const S = KL.S, me = KL.me(), m = KL.page({ title: 'Profil' });
  m.innerHTML = '<section class="card center"><span class="av big">' + KL.esc(me.name.split(' ').map(w => w[0]).slice(0, 2).join('')) + '</span><h2>' + KL.esc(me.name) + '</h2><span class="badge n-' + me.lvl + '">' + KL.LVL[me.lvl] + '</span><p class="mute">' + me.id + '</p></section>' +
    '<section class="card"><h2>Pengaturan profil</h2><label for="nm">Nama</label><input id="nm" value="' + KL.esc(me.name) + '"><label for="wa">Nomor WhatsApp</label><input id="wa" inputmode="tel" value="' + KL.esc(me.wa) + '" placeholder="08xx xxxx xxxx"><label for="bk">Rekening penarikan</label><input id="bk" value="' + KL.esc(me.bank) + '" placeholder="Bank, nomor rekening, atas nama"><div class="err" id="err"></div><button class="btn" data-act="save">Simpan</button></section>' +
    '<a class="btn plain" href="tentang.html">Tentang KLM Connect</a>';
  KL.acts({ save() { const n = KL.$('#nm').value.trim(); if (!n) { KL.$('#err').textContent = 'Nama tidak boleh kosong.'; return; } me.name = n; me.wa = KL.$('#wa').value.trim(); me.bank = KL.$('#bk').value.trim(); S.save(); KL.$('#err').textContent = 'Tersimpan.'; } });
})();
