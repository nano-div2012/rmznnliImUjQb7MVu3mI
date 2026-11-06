(function () {
  const st = KL.S.get(), m = KL.page({ title: 'Belanja Produk' }), n = st.cart.reduce((a, c) => a + c.q, 0);
  m.innerHTML = '<a class="card cartbar" href="u-keranjang.html">' + KL.ic('cart', 20) + '<b>Keranjang</b><span class="badge ok">' + n + ' item</span></a><div class="pgrid">' +
    st.products.filter(p => p.on).map(p => '<a class="card prod" href="u-produk.html?id=' + p.id + '"><span class="thumb">' + KL.esc(p.name.slice(0, 2).toUpperCase()) + '</span><b>' + KL.esc(p.name) + '</b><span class="price">' + KL.rp(p.price) + '</span><small>+' + KL.pts(p.price) + ' poin</small></a>').join('') + '</div>';
})();
