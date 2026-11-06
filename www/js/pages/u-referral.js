(function () {
  const st = KL.S.get(), me = KL.me(), m = KL.page({ title: 'Referral Link' });
  const link = 'https://klmconnect.example/daftar?ref=' + me.id, kids = KL.children(me.id);
  m.innerHTML = '<section class="card center"><p class="mute">Kode referral kamu</p><div class="code">' + me.id + '</div><input id="lnk" readonly value="' + link + '" aria-label="Link referral"><button class="btn" data-act="copy">Salin link</button>' +
    '<a class="btn green" target="_blank" rel="noopener" href="' + KL.esc(KL.waLink('', '') || 'https://wa.me/?text=' + encodeURIComponent('Yuk belanja hemat di KLM Connect: ' + link)) + '">Bagikan lewat WhatsApp</a><div class="err" id="msg"></div></section>' +
    '<div class="note">Komisi satu tingkat: kamu mendapat ' + st.settings.komisi + '% dari pembelian produk oleh anggota yang kamu referensikan langsung.</div>' +
    '<section class="card"><h2>Anggota referensimu (' + kids.length + ')</h2>' + (kids.length ? kids.map(k => '<div class="li"><span>' + KL.esc(k.name) + '<small>' + k.id + '</small></span><span class="badge n-' + k.lvl + '">' + KL.LVL[k.lvl] + '</span></div>').join('') : '<p class="mute">Belum ada anggota.</p>') + '</section>';
  KL.acts({ copy() { const i = KL.$('#lnk'); i.select(); (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.reject()).then(() => { KL.$('#msg').textContent = 'Link disalin.'; }, () => { KL.$('#msg').textContent = 'Tekan lama pada link untuk menyalin.'; }); } });
})();
