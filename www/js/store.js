/* Penyimpanan lokal (localStorage). Tanpa server, tanpa database. */
(function () {
  'use strict';
  const KEY = 'klm_dummy_v1', DAY = 864e5;
  let mem = null;

  function seed() {
    const m = (id, name, lvl, sp, saldo, pts, wa) => ({ id, name, lvl, sp, saldo, pts, wa: wa || '', bank: '', on: true, joined: Date.now() - 40 * DAY });
    const prod = (id, name, price, desc) => ({ id, name, price, desc, on: true });
    const now = Date.now();
    return {
      role: null, me: null, cart: [], seq: { o: 0, w: 0, r: 0, d: 0, p: 8, m: 4 },
      members: [
        m('DU-001', 'Budi Santoso', 'distributor', null, 4850750, 1840), m('AG-001', 'Siti Rahma', 'agen', 'DU-001', 1250000, 620),
        m('AG-002', 'Andi Pratama', 'agen', 'DU-001', 980000, 410), m('RS-001', 'Dewi Lestari', 'reseller', 'AG-001', 420000, 210),
        m('RS-002', 'Rudi Hartono', 'reseller', 'AG-001', 310000, 150), m('RS-003', 'Maya Putri', 'reseller', 'AG-002', 275000, 120),
        m('K-001', 'Eko Prasetyo', 'konsumen', 'RS-001', 0, 40), m('K-002', 'Fitri Handayani', 'konsumen', 'RS-002', 0, 25),
        m('K-003', 'Gilang Ramadhan', 'konsumen', 'RS-003', 0, 18), m('K-004', 'Hana Wijaya', 'konsumen', 'RS-003', 0, 12)
      ],
      products: [
        prod(1, 'Paket Sembako Hemat', 85000, 'Beras, minyak, gula, dan teh dalam satu paket hemat untuk kebutuhan mingguan.'),
        prod(2, 'Kopi Nusantara 250 g', 48000, 'Kopi bubuk pilihan dari petani lokal, aroma kuat dan rasa seimbang.'),
        prod(3, 'Minyak Goreng 2 L', 38000, 'Minyak goreng kemasan 2 liter, jernih dan tidak mudah berbusa.'),
        prod(4, 'Beras Premium 5 kg', 72000, 'Beras pulen kualitas premium, kemasan 5 kilogram.'),
        prod(5, 'Teh Herbal Celup', 32000, 'Isi 25 kantong, campuran jahe dan serai tanpa pemanis buatan.'),
        prod(6, 'Sabun Cuci Piring 800 ml', 18000, 'Sabun cuci piring cair, mengangkat lemak dengan cepat.'),
        prod(7, 'Madu Murni 500 ml', 95000, 'Madu murni tanpa campuran, dikemas dalam botol kaca.'),
        prod(8, 'Snack Box Keluarga', 55000, 'Aneka camilan lokal dalam satu kotak untuk keluarga.')
      ],
      rewards: [
        { id: 1, name: 'Voucher Belanja Rp 50.000', pts: 25, tag: 'VC' }, { id: 2, name: 'Gold Bar', pts: 100, tag: 'GB' },
        { id: 3, name: 'Scooter', pts: 2500, tag: 'SC' }, { id: 4, name: 'Car', pts: 15000, tag: 'CR' }
      ],
      orders: [], wd: [], redeem: [],
      wallet: [
        { id: 1, mid: 'DU-001', type: 'komisi', amt: 200000, note: 'Pembelian produk', at: now - 2 * DAY },
        { id: 2, mid: 'DU-001', type: 'komisi', amt: 150000, note: 'Referral AG-001', at: now - 3 * DAY },
        { id: 3, mid: 'DU-001', type: 'poin', amt: 120, note: 'Poin dari transaksi valid', at: now - 3 * DAY }
      ],
      sales7: [3200000, 4100000, 3800000, 5200000, 6000000, 5600000, 7100000],
      settings: { komisi: 5, ptsPer: 10000, bank: 'BCA 1234567890 a.n. KLM Connect (contoh)', waAdmin: '' }
    };
  }

  function get() {
    if (mem) return mem;
    try { const raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : seed(); } catch (e) { mem = seed(); }
    return mem;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* data hanya di memori */ } }

  window.Store = { get, save, reset() { mem = seed(); save(); } };
})();
