(function () {
  const S = KL.S, st = S.get(), me = KL.me(), m = KL.page({ title: 'Komisi & Wallet' });
  const hist = st.wallet.filter(w => w.mid === me.id && w.type !== 'poin').slice().reverse(), wds = st.wd.filter(w => w.mid === me.id).reverse();
  const bd = s => '<span class="badge ' + (s === 'dibayar' ? 'ok' : s === 'ditolak' ? 'no' : 'wait') + '">' + s + '</span>';
  m.innerHTML = '<section class="card saldo"><div class="lbl">Saldo Komisi</div><div class="amt" id="amt">' + KL.rp(me.saldo) + '</div></section>' +
    '<section class="card"><h2>Tarik saldo</h2><label for="jml">Jumlah (Rp)</label><input id="jml" inputmode="numeric" placeholder="Minimal 50000"><label for="bank">Rekening tujuan</label><input id="bank" value="' + KL.esc(me.bank) + '" placeholder="Bank, nomor rekening, atas nama"><div class="err" id="err"></div><button class="btn green" data-act="wd">Ajukan penarikan</button></section>' +
    (wds.length ? '<section class="card"><h2>Pengajuan penarikan</h2>' + wds.map(w => '<div class="li"><span>' + KL.rp(w.amt) + '<small>' + KL.dt(w.at) + '</small></span>' + bd(w.status) + '</div>').join('') + '</section>' : '') +
    '<section class="card"><h2>Riwayat komisi</h2>' + (hist.length ? hist.map(w => '<div class="li"><span>' + KL.esc(w.note) + '<small>' + KL.dt(w.at) + '</small></span><span class="' + (w.amt < 0 ? 'neg' : 'pos') + '">' + (w.amt < 0 ? '-' : '+') + KL.rp(Math.abs(w.amt)) + '</span></div>').join('') : '<p class="mute">Belum ada riwayat.</p>') + '</section>';
  KL.acts({
    wd() {
      const a = parseInt(KL.$('#jml').value.replace(/\D/g, ''), 10) || 0, bank = KL.$('#bank').value.trim(), e = KL.$('#err');
      if (a < 50000) { e.textContent = 'Minimal penarikan Rp 50.000.'; return; } if (a > me.saldo) { e.textContent = 'Saldo tidak cukup.'; return; } if (!bank) { e.textContent = 'Isi rekening tujuan.'; return; }
      me.saldo -= a; me.bank = bank; st.wd.push({ id: ++st.seq.d, mid: me.id, amt: a, bank, status: 'menunggu', at: Date.now() });
      st.wallet.push({ id: ++st.seq.w, mid: me.id, type: 'tarik', amt: -a, note: 'Penarikan saldo', at: Date.now() }); S.save(); location.reload();
    }
  });
})();
