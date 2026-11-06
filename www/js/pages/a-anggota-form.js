(function () {
  const S = KL.S, st = S.get(), m = KL.page({ title: 'Tambah anggota', back: 'a-anggota.html', tab: 'a-anggota.html' });
  const PRE = { distributor: 'DU', agen: 'AG', reseller: 'RS', konsumen: 'K' };
  m.innerHTML = '<section class="card"><label for="nm">Nama</label><input id="nm"><label for="lv">Level</label><select id="lv">' + Object.keys(KL.LVL).filter(k => k !== 'distributor').map(k => '<option value="' + k + '">' + KL.LVL[k] + '</option>').join('') + '</select>' +
    '<label for="sp">Sponsor (pereferensi langsung)</label><select id="sp">' + st.members.map(x => '<option value="' + x.id + '">' + KL.esc(x.name) + ' (' + x.id + ')</option>').join('') + '</select><label for="wa">Nomor WhatsApp (opsional)</label><input id="wa" inputmode="tel"><div class="err" id="err"></div><button class="btn" data-act="save">Simpan</button></section>';
  KL.acts({
    save() {
      const n = KL.$('#nm').value.trim(), lv = KL.$('#lv').value; if (!n) { KL.$('#err').textContent = 'Isi nama anggota.'; return; }
      let i = st.members.filter(x => x.lvl === lv).length + 1, id; do { id = PRE[lv] + '-' + String(i++).padStart(3, '0'); } while (KL.mem(id));
      st.members.push({ id, name: n, lvl: lv, sp: KL.$('#sp').value, saldo: 0, pts: 0, wa: KL.$('#wa').value.trim(), bank: '', on: true, joined: Date.now() }); S.save(); KL.go('a-anggota.html');
    }
  });
})();
