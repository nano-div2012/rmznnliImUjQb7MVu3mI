(function () {
  const S = KL.S, set = S.get().settings, m = KL.page({ title: 'Pengaturan Sistem', back: 'a-menu.html', tab: 'a-menu.html' });
  m.innerHTML = '<section class="card"><label for="km">Komisi satu tingkat (persen)</label><input id="km" inputmode="decimal" value="' + set.komisi + '"><label for="pp">Poin per belanja (Rp per 1 poin)</label><input id="pp" inputmode="numeric" value="' + set.ptsPer + '"><label for="bk">Rekening penerima pembayaran</label><input id="bk" value="' + KL.esc(set.bank) + '">' +
    '<label for="wa">Nomor WhatsApp admin</label><input id="wa" inputmode="tel" value="' + KL.esc(set.waAdmin) + '" placeholder="08xx xxxx xxxx"><div class="err" id="err"></div><button class="btn" data-act="save">Simpan pengaturan</button></section>';
  KL.acts({
    save() {
      const k = parseFloat(KL.$('#km').value.replace(',', '.')), p = parseInt(KL.$('#pp').value, 10), e = KL.$('#err');
      if (!(k >= 0 && k <= 100) || !(p > 0)) { e.textContent = 'Komisi 0-100 persen dan nilai poin harus lebih dari 0.'; return; }
      Object.assign(set, { komisi: k, ptsPer: p, bank: KL.$('#bk').value.trim(), waAdmin: KL.$('#wa').value.trim() }); S.save(); e.textContent = 'Pengaturan disimpan.';
    }
  });
})();
