/* ==========================================================================
   ITAJA ADMIN · dashboard.js
   Static prototype: tabs, drawers, bilingual labels (EN/FR), multi-currency
   formatting, and mock-data rendering. No network, no build step.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- i18n */
  var I18N = {
    en: {
      "overview.label": "Overview",
      "overview.refresh": "Data refreshed —",
      "overview.eyebrow": "Consolidated financial operations",
      "overview.title": "Overview",
      "overview.desc": "Unified view of inbound collections, outbound payouts and merchant activity across the Itaja payment orchestration stack.",
      "period.today": "Today", "period.7d": "Last 7 days", "period.30d": "Last 30 days",
      "period.mtd": "Month to date", "period.custom": "Custom…",
      "ccy.all": "All currencies",
      "search.placeholder": "Search ref, merchant, PSP…",
      "search.ref": "Search reference…",
      "search.merchant": "Search merchant…",
      "action.export": "Export CSV", "action.refresh": "Refresh data",
      "kpi.globalIn": "Money In · GMV", "kpi.globalOut": "Money Out · Payouts",
      "kpi.globalUsers": "Users · Merchants", "kpi.active": "active",
      "kpi.vsPrev": "vs previous period", "kpi.thisPeriod": "this period",
      "tab.moneyIn": "Money In", "tab.moneyOut": "Money Out", "tab.users": "Users",
      "in.gmv": "GMV", "in.success": "Success rate", "in.failed": "Failed txns",
      "in.avgTicket": "Average ticket", "in.ofTotal": "of total volume",
      "in.perTxn": "per successful transaction", "in.txTitle": "Transactions",
      "in.revTitle": "Revenue", "in.derived": "derived from GMV",
      "in.gross": "Gross revenue", "in.fees": "Itaja fees", "in.net": "Net revenue",
      "in.takeRate": "Itaja take rate", "in.trend": "Daily volume trend", "in.last14": "last 14 days",
      "out.volume": "Payout volume", "out.success": "Success rate", "out.pending": "Pending payouts",
      "out.unrecon": "Unreconciled", "out.awaiting": "awaiting settlement", "out.diff": "ledger vs PSP",
      "kudelo.title": "Kudelo · Payment orchestration", "kudelo.psps": "PSPs connected",
      "kudelo.latency": "Routing latency", "kudelo.uptime": "24h uptime", "kudelo.sync": "Last data sync",
      "out.pspCost": "PSP cost", "out.liquidity": "Liquidity", "out.netFlow": "Net flow",
      "out.coverage": "Recon coverage", "out.sumFees": "Σ PSP fees", "out.sumBalances": "Σ PSP balances",
      "out.inMinusOut": "Money In − Money Out", "out.autoMatched": "auto-matched lines",
      "out.pspTitle": "PSP Network", "out.pspHint": "click a row for detail",
      "out.reconTitle": "Reconciliation", "out.ledger": "internal ledger",
      "u.kyc": "KYC queue", "u.pendingReview": "pending review", "u.active": "Active merchants",
      "u.ofBase": "of merchant base", "u.inactive": "Dormant merchants",
      "u.noActivity": "no activity in 30d", "u.activity": "Activity rate",
      "u.weekly": "merchants transacting weekly", "u.title": "Merchants",
      "col.ref": "Reference", "col.merchant": "Merchant", "col.psp": "PSP",
      "col.method": "Method", "col.status": "Status", "col.amount": "Amount",
      "col.date": "Date", "col.volume": "Volume", "col.fees": "Fees",
      "col.balance": "Balance", "col.cost": "Cost %", "col.country": "Country",
      "col.kyc": "KYC", "col.account": "Account status", "col.lastActivity": "Last activity",
      "col.ledgerAmt": "Ledger", "col.pspAmt": "PSP",
      "filter.all": "All",
      "foot.ledger": "Source: internal ledger + Kudelo orchestration feed"
    },
    fr: {
      "overview.label": "Vue d'ensemble",
      "overview.refresh": "Données actualisées —",
      "overview.eyebrow": "Opérations financières consolidées",
      "overview.title": "Vue d'ensemble",
      "overview.desc": "Vue unifiée des encaissements, des décaissements et de l'activité marchands sur l'orchestration de paiement Itaja.",
      "period.today": "Aujourd'hui", "period.7d": "7 derniers jours", "period.30d": "30 derniers jours",
      "period.mtd": "Mois en cours", "period.custom": "Personnalisé…",
      "ccy.all": "Toutes devises",
      "search.placeholder": "Rechercher réf, marchand, PSP…",
      "search.ref": "Rechercher une référence…",
      "search.merchant": "Rechercher un marchand…",
      "action.export": "Exporter CSV", "action.refresh": "Actualiser",
      "kpi.globalIn": "Encaissements · GMV", "kpi.globalOut": "Décaissements · Payouts",
      "kpi.globalUsers": "Utilisateurs · Marchands", "kpi.active": "actifs",
      "kpi.vsPrev": "vs période précédente", "kpi.thisPeriod": "sur la période",
      "tab.moneyIn": "Encaissements", "tab.moneyOut": "Décaissements", "tab.users": "Utilisateurs",
      "in.gmv": "GMV", "in.success": "Taux de succès", "in.failed": "Txns échouées",
      "in.avgTicket": "Panier moyen", "in.ofTotal": "du volume total",
      "in.perTxn": "par transaction réussie", "in.txTitle": "Transactions",
      "in.revTitle": "Revenus", "in.derived": "dérivé du GMV",
      "in.gross": "Revenu brut", "in.fees": "Frais Itaja", "in.net": "Revenu net",
      "in.takeRate": "Taux de commission Itaja", "in.trend": "Tendance volume journalier", "in.last14": "14 derniers jours",
      "out.volume": "Volume payouts", "out.success": "Taux de succès", "out.pending": "Payouts en attente",
      "out.unrecon": "Non rapproché", "out.awaiting": "en attente de règlement", "out.diff": "ledger vs PSP",
      "kudelo.title": "Kudelo · Orchestration de paiement", "kudelo.psps": "PSP connectés",
      "kudelo.latency": "Latence routage", "kudelo.uptime": "Dispo 24h", "kudelo.sync": "Dernière synchro",
      "out.pspCost": "Coût PSP", "out.liquidity": "Liquidité", "out.netFlow": "Flux net",
      "out.coverage": "Couverture rappro.", "out.sumFees": "Σ frais PSP", "out.sumBalances": "Σ soldes PSP",
      "out.inMinusOut": "Encaissements − Décaissements", "out.autoMatched": "lignes auto-rapprochées",
      "out.pspTitle": "Réseau PSP", "out.pspHint": "cliquez une ligne pour le détail",
      "out.reconTitle": "Rapprochement", "out.ledger": "ledger interne",
      "u.kyc": "File KYC", "u.pendingReview": "en revue", "u.active": "Marchands actifs",
      "u.ofBase": "de la base marchands", "u.inactive": "Marchands dormants",
      "u.noActivity": "sans activité 30j", "u.activity": "Taux d'activité",
      "u.weekly": "marchands actifs chaque semaine", "u.title": "Marchands",
      "col.ref": "Référence", "col.merchant": "Marchand", "col.psp": "PSP",
      "col.method": "Méthode", "col.status": "Statut", "col.amount": "Montant",
      "col.date": "Date", "col.volume": "Volume", "col.fees": "Frais",
      "col.balance": "Solde", "col.cost": "Coût %", "col.country": "Pays",
      "col.kyc": "KYC", "col.account": "Statut compte", "col.lastActivity": "Dernière activité",
      "col.ledgerAmt": "Ledger", "col.pspAmt": "PSP",
      "filter.all": "Tous",
      "foot.ledger": "Source : ledger interne + flux d'orchestration Kudelo"
    }
  };

  var lang = "en";
  var t = function (k) { return (I18N[lang] && I18N[lang][k]) || k; };

  /* ------------------------------------------------------- currency fmt */
  var CCY = {
    XAF: { locale: "fr-CM", decimals: 0 },
    XOF: { locale: "fr-SN", decimals: 0 },
    EUR: { locale: "fr-FR", decimals: 0 },
    USD: { locale: "en-US", decimals: 0 }
  };

  // approximate display rates (mock, base = XAF)
  var RATES = { XAF: 1, XOF: 1, EUR: 0.00152, USD: 0.00165 };

  var activeCcy = "ALL";

  function convert(amountXAF, ccy) {
    return amountXAF * (RATES[ccy] || 1);
  }

  function formatMoney(amountXAF, ccy, showCcy) {
    ccy = ccy && ccy !== "ALL" ? ccy : "XAF";
    var cfg = CCY[ccy] || CCY.XAF;
    var v = convert(amountXAF, ccy);
    var str = new Intl.NumberFormat(cfg.locale, {
      minimumFractionDigits: cfg.decimals,
      maximumFractionDigits: cfg.decimals
    }).format(v);
    return showCcy === false ? str : str + " " + ccy;
  }

  function bare(amountXAF, ccy) { return formatMoney(amountXAF, ccy, false); }

  function formatCount(n) {
    return new Intl.NumberFormat("en-US").format(n);
  }

  function pct(n, d) { return (n).toFixed(d == null ? 1 : d) + "%"; }

  /* ------------------------------------------------------ mock dataset */
  var DATA = {
    meta: {
      gmvTotal: 4820000000, gmvDelta: 12.4, payoutTotal: 3615000000, payoutDelta: 8.1,
      merchantTotal: 1284, merchantDelta: 37,
      tabCountIn: 18420, tabCountOut: 9674, tabCountUsers: 1284,
      inTrend: [42, 55, 48, 61, 70, 58, 66, 80, 74, 88, 79, 92, 85, 97]
    },
    moneyIn: {
      gmv: 4820000000, gmvDelta: 12.4,
      success: 94.6, successRaw: "17 430 / 18 420",
      failed: 615, failedShare: 3.3,
      avg: 276540,
      gross: 4820000000, fees: 144600000, net: 4675400000, takeRate: 3.0
    },
    moneyOut: {
      volume: 3615000000, volumeDelta: 8.1,
      success: 97.2, successRaw: "9 403 / 9 674",
      pending: 182, pendingValue: 42800000,
      unrecon: 14, unreconValue: 3120000,
      pspCost: 54225000, pspCostRate: 1.5,
      liquidity: 806400000, netFlow: 1205000000, coverage: 96.8,
      kudelo: {
        status: "Healthy · active routing on 5 acquirers (EN default)",
        psps: 5, latency: 186, uptime: 99.94, lastSync: "2 min ago"
      }
    },
    users: {
      kyc: 47, kycDelta: "+6", active: 986, activeShare: 76.8,
      dormant: 214, activity: 61.4
    },
    txns: [
      { ref: "TX-98213741", merchant: "Kmer Market", psp: "Kudelo→Flutterwave", method: "Card", status: "success", amount: 1250000, ccy: "XAF", date: "2026-09-26 14:02" },
      { ref: "TX-98213698", merchant: "Awa Beauty", psp: "Kudelo→CinetPay", method: "Mobile Money", status: "success", amount: 420000, ccy: "XAF", date: "2026-09-26 13:57" },
      { ref: "TX-98213655", merchant: "Dakar Foods", psp: "Kudelo→PayDunya", method: "Mobile Money", status: "pending", amount: 890000, ccy: "XOF", date: "2026-09-26 13:41" },
      { ref: "TX-98213601", merchant: "Tech Hub CM", psp: "Kudelo→Flutterwave", method: "Card", status: "failed", amount: 2100000, ccy: "XAF", date: "2026-09-26 13:22" },
      { ref: "TX-98213570", merchant: "Nord Cosmetics", psp: "Kudelo→CinetPay", method: "Card", status: "success", amount: 156000, ccy: "XAF", date: "2026-09-26 12:58" },
      { ref: "TX-98213512", merchant: "Sahel Retail", psp: "Kudelo→PayDunya", method: "Wallet", status: "success", amount: 78000, ccy: "XOF", date: "2026-09-26 12:30" },
      { ref: "TX-98213488", merchant: "Kmer Market", psp: "Kudelo→Flutterwave", method: "Card", status: "failed", amount: 340000, ccy: "XAF", date: "2026-09-26 12:11" },
      { ref: "TX-98213402", merchant: "Lagos Digital", psp: "Kudelo→Paystack", method: "Card", status: "success", amount: 5200000, ccy: "XAF", date: "2026-09-26 11:49" },
      { ref: "TX-98213377", merchant: "Edu Plus", psp: "Kudelo→CinetPay", method: "Mobile Money", status: "success", amount: 250000, ccy: "XAF", date: "2026-09-26 11:20" },
      { ref: "TX-98213310", merchant: "Ada Crafts", psp: "Kudelo→Paystack", method: "Card", status: "pending", amount: 615000, ccy: "XAF", date: "2026-09-26 10:55" },
      { ref: "TX-98213288", merchant: "Faso Boutique", psp: "Kudelo→PayDunya", method: "Wallet", status: "success", amount: 132000, ccy: "XOF", date: "2026-09-26 10:32" },
      { ref: "TX-98213201", merchant: "Medi Store", psp: "Kudelo→Flutterwave", method: "Card", status: "success", amount: 940000, ccy: "XAF", date: "2026-09-26 10:04" }
    ],
    psps: [
      { name: "Flutterwave", status: "on", volume: 1520000000, fees: 22800000, balance: 310400000, cost: 1.5, sla: 99.9, settlement: "T+1", region: "West & Central Africa" },
      { name: "Paystack", status: "on", volume: 980000000, fees: 14700000, balance: 205600000, cost: 1.5, sla: 99.8, settlement: "T+1", region: "Nigeria / Ghana" },
      { name: "CinetPay", status: "on", volume: 720000000, fees: 10800000, balance: 158000000, cost: 1.5, sla: 99.6, settlement: "T+2", region: "Francophone Africa" },
      { name: "PayDunya", status: "warn", volume: 320000000, fees: 4800000, balance: 96400000, cost: 1.5, sla: 98.4, settlement: "T+2", region: "Senegal / Côte d'Ivoire" },
      { name: "M-Pesa", status: "on", volume: 75000000, fees: 1125000, balance: 36000000, cost: 1.5, sla: 99.7, settlement: "T+1", region: "Kenya / Tanzania" }
    ],
    recon: [
      { date: "2026-09-26", psp: "Flutterwave", ledger: 50200000, pspAmt: 50200000, status: "matched" },
      { date: "2026-09-26", psp: "Paystack", ledger: 32800000, pspAmt: 32680000, status: "mismatch" },
      { date: "2026-09-26", psp: "CinetPay", ledger: 24100000, pspAmt: 24100000, status: "matched" },
      { date: "2026-09-26", psp: "PayDunya", ledger: 15600000, pspAmt: 15320000, status: "mismatch" },
      { date: "2026-09-25", psp: "Flutterwave", ledger: 48900000, pspAmt: 48900000, status: "matched" },
      { date: "2026-09-25", psp: "M-Pesa", ledger: 4200000, pspAmt: 4200000, status: "matched" },
      { date: "2026-09-25", psp: "Paystack", ledger: 31200000, pspAmt: 31180000, status: "pending" }
    ],
    merchants: [
      { name: "Kmer Market", country: "CM", kyc: "approved", account: "active", volume: 412000000, last: "2 min ago" },
      { name: "Lagos Digital", country: "NG", kyc: "approved", account: "active", volume: 685000000, last: "8 min ago" },
      { name: "Dakar Foods", country: "SN", kyc: "pending", account: "restricted", volume: 84000000, last: "1 h ago" },
      { name: "Tech Hub CM", country: "CM", kyc: "approved", account: "active", volume: 238000000, last: "12 min ago" },
      { name: "Awa Beauty", country: "CI", kyc: "rejected", account: "suspended", volume: 12500000, last: "3 d ago" },
      { name: "Sahel Retail", country: "BF", kyc: "pending", account: "active", volume: 56000000, last: "5 h ago" },
      { name: "Edu Plus", country: "CM", kyc: "approved", account: "active", volume: 97000000, last: "24 min ago" },
      { name: "Ada Crafts", country: "GH", kyc: "approved", account: "active", volume: 43000000, last: "40 min ago" },
      { name: "Faso Boutique", country: "BF", kyc: "pending", account: "restricted", volume: 18900000, last: "2 d ago" },
      { name: "Medi Store", country: "CM", kyc: "approved", account: "active", volume: 154000000, last: "6 min ago" },
      { name: "Nord Cosmetics", country: "CM", kyc: "rejected", account: "suspended", volume: 21000000, last: "6 d ago" },
      { name: "Atlantic Trade", country: "SN", kyc: "approved", account: "active", volume: 312000000, last: "18 min ago" }
    ]
  };

  /* --------------------------------------------------------- rendering */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function setText(el, v) { if (el) el.textContent = v; }

  function applyI18n() {
    $$("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $$("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    setText($("#langLabel"), lang.toUpperCase());
    document.documentElement.lang = lang;
  }

  var STATUS_BADGE = {
    success: { cls: "badge--success", label: { en: "Success", fr: "Réussi" } },
    pending: { cls: "badge--warning", label: { en: "Pending", fr: "En attente" } },
    failed: { cls: "badge--danger", label: { en: "Failed", fr: "Échoué" } },
    matched: { cls: "badge--success", label: { en: "Matched", fr: "Rapproché" } },
    mismatch: { cls: "badge--danger", label: { en: "Mismatch", fr: "Écart" } },
    approved: { cls: "badge--success", label: { en: "Approved", fr: "Approuvé" } },
    rejected: { cls: "badge--danger", label: { en: "Rejected", fr: "Rejeté" } },
    active: { cls: "badge--success", label: { en: "Active", fr: "Actif" } },
    restricted: { cls: "badge--warning", label: { en: "Restricted", fr: "Restreint" } },
    suspended: { cls: "badge--danger", label: { en: "Suspended", fr: "Suspendu" } }
  };

  function badge(status) {
    var s = STATUS_BADGE[status] || { cls: "badge--neutral", label: { en: status, fr: status } };
    return '<span class="badge ' + s.cls + '">' + s.label[lang] + "</span>";
  }

  function deltaChip(v) {
    var up = v >= 0;
    return '<span class="delta ' + (up ? "delta--up" : "delta--down") + '">' +
      (up ? "▲ " : "▼ ") + Math.abs(v) + "%</span>";
  }

  function renderKpis() {
    var m = DATA.meta, i = DATA.moneyIn, o = DATA.moneyOut, u = DATA.users;

    setText($('[data-bind="gmvTotal"]'), bare(m.gmvTotal, activeCcy));
    setText($("#gmvCcy"), activeCcy === "ALL" ? "XAF" : activeCcy);
    setText($('[data-bind="gmvDelta"]'), "▲ " + m.gmvDelta + "%");

    setText($('[data-bind="payoutTotal"]'), bare(m.payoutTotal, activeCcy));
    setText($("#payoutCcy"), activeCcy === "ALL" ? "XAF" : activeCcy);
    setText($('[data-bind="payoutDelta"]'), "▲ " + m.payoutDelta + "%");

    setText($('[data-bind="merchantTotal"]'), formatCount(m.merchantTotal));
    setText($('[data-bind="merchantDelta"]'), "+" + m.merchantDelta + "%");

    setText($('[data-bind="tabCountIn"]'), formatCount(m.tabCountIn));
    setText($('[data-bind="tabCountOut"]'), formatCount(m.tabCountOut));
    setText($('[data-bind="tabCountUsers"]'), formatCount(m.tabCountUsers));

    // Money In
    var ccy = activeCcy === "ALL" ? "XAF" : activeCcy;
    setText($('[data-bind="inGmv"]'), bare(i.gmv, activeCcy));
    setText($("#inGmvCcy"), ccy);
    setText($('[data-bind="inGmvDelta"]'), "▲ " + i.gmvDelta + "%");
    setText($('[data-bind="inSuccess"]'), i.success.toFixed(1));
    setText($('[data-bind="inSuccessRaw"]'), i.successRaw.replace("/", lang === "fr" ? "sur" : "/"));
    setText($('[data-bind="inFailed"]'), formatCount(i.failed));
    setText($('[data-bind="inFailedShare"]'), i.failedShare.toFixed(1) + "%");
    setText($('[data-bind="inAvg"]'), bare(i.avg, activeCcy));
    setText($("#inAvgCcy"), ccy);
    setText($('[data-bind="inTxHint"]'), formatCount(m.tabCountIn) + " " + t("in.txTitle").toLowerCase());

    setText($('[data-bind="inGross"]'), bare(i.gross, activeCcy) + " " + ccy);
    setText($('[data-bind="inFees"]'), bare(i.fees, activeCcy) + " " + ccy);
    setText($('[data-bind="inNet"]'), bare(i.net, activeCcy) + " " + ccy);
    setText($('[data-bind="inTakeRate"]'), pct(i.takeRate));
    var fill = $('[data-bind-width="inTakeRate"]');
    if (fill) fill.style.width = Math.min(100, i.takeRate * 8) + "%";

    var spark = $('[data-spark="inTrend"]');
    if (spark) {
      var max = Math.max.apply(null, m.inTrend);
      spark.innerHTML = m.inTrend.map(function (v) {
        return '<i style="height:' + Math.round((v / max) * 100) + '%"></i>';
      }).join("");
    }

    // Money Out
    setText($('[data-bind="outVolume"]'), bare(o.volume, activeCcy));
    setText($("#outVolumeCcy"), ccy);
    setText($('[data-bind="outVolumeDelta"]'), "▲ " + o.volumeDelta + "%");
    setText($('[data-bind="outSuccess"]'), o.success.toFixed(1));
    setText($('[data-bind="outSuccessRaw"]'), o.successRaw.replace("/", lang === "fr" ? "sur" : "/"));
    setText($('[data-bind="outPending"]'), formatCount(o.pending));
    setText($('[data-bind="outPendingValue"]'), bare(o.pendingValue, activeCcy) + " " + ccy);
    setText($('[data-bind="outUnrecon"]'), formatCount(o.unrecon));
    setText($('[data-bind="outUnreconValue"]'), bare(o.unreconValue, activeCcy) + " " + ccy);

    setText($('[data-bind="outPspCost"]'), bare(o.pspCost, activeCcy));
    setText($("#pspCostCcy"), ccy);
    setText($('[data-bind="outPspCostRate"]'), pct(o.pspCostRate));
    setText($('[data-bind="outLiquidity"]'), bare(o.liquidity, activeCcy));
    setText($("#liquidityCcy"), ccy);
    setText($('[data-bind="outNetFlow"]'), bare(o.netFlow, activeCcy));
    setText($("#netFlowCcy"), ccy);
    setText($('[data-bind="outCoverage"]'), o.coverage.toFixed(1));

    setText($('[data-bind="kudeloStatus"]'), lang === "fr"
      ? "Sain · routage actif sur 5 acquéreurs"
      : o.kudelo.status.replace(" (EN default)", ""));
    setText($('[data-bind="kudeloPsps"]'), o.kudelo.psps);
    setText($('[data-bind="kudeloLatency"]'), o.kudelo.latency + " ms");
    setText($('[data-bind="kudeloUptime"]'), o.kudelo.uptime + "%");
    setText($('[data-bind="kudeloLastSync"]'), lang === "fr" ? "il y a 2 min" : o.kudelo.lastSync);

    // Users
    setText($('[data-bind="uKyc"]'), formatCount(u.kyc));
    setText($('[data-bind="uKycDelta"]'), "▼ " + u.kycDelta);
    setText($('[data-bind="uActive"]'), formatCount(u.active));
    setText($('[data-bind="uActiveShare"]'), pct(u.activeShare));
    setText($('[data-bind="uDormant"]'), formatCount(u.dormant));
    setText($('[data-bind="uActivity"]'), u.activity.toFixed(1));
    setText($('[data-bind="uHint"]'), formatCount(DATA.merchants.length) + " / " + formatCount(m.tabCountUsers));
  }

  /* ----------------------------------------------------------- tables */
  var tables = { tx: { filter: "all", query: "" }, psp: {}, recon: {}, merchant: { filter: "all", query: "" } };

  function renderTxTable() {
    var tb = $("#txTable tbody");
    var f = tables.tx.filter, q = tables.tx.query.toLowerCase();
    var rows = DATA.txns.filter(function (x) {
      if (f !== "all" && x.status !== f) return false;
      if (q && (x.ref + x.merchant + x.psp).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (!rows.length) {
      tb.innerHTML = '<tr><td colspan="7"><div class="empty"><strong>' +
        (lang === "fr" ? "Aucune transaction" : "No transactions") + "</strong>" +
        (lang === "fr" ? "Ajustez les filtres." : "Adjust your filters.") + "</div></td></tr>";
      return;
    }
    tb.innerHTML = rows.map(function (x) {
      return '<tr class="is-clickable" data-drawer="tx" data-ref="' + x.ref + '">' +
        '<td class="cell-strong cell-mono">' + x.ref + "</td>" +
        '<td>' + x.merchant + "</td>" +
        '<td class="cell-ref">' + x.psp + "</td>" +
        "<td>" + x.method + "</td>" +
        "<td>" + badge(x.status) + "</td>" +
        '<td class="num cell-strong">' + bare(x.amount, activeCcy) + ' <span class="cell-ccy">' + (activeCcy === "ALL" ? x.ccy : activeCcy) + "</span></td>" +
        '<td class="cell-ref">' + x.date + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderPspTable() {
    var tb = $("#pspTable tbody");
    tb.innerHTML = DATA.psps.map(function (p) {
      var dotCls = p.status === "on" ? "dot--on" : "dot--warn";
      return '<tr class="is-clickable" data-drawer="psp" data-name="' + p.name + '">' +
        '<td class="cell-strong">' + p.name + "</td>" +
        '<td><span class="row row--gap" style="gap:6px"><span class="dot ' + dotCls + '"></span>' +
          (p.status === "on" ? (lang === "fr" ? "Actif" : "Live") : (lang === "fr" ? "Dégradé" : "Degraded")) + "</span></td>" +
        '<td class="num">' + bare(p.volume, activeCcy) + "</td>" +
        '<td class="num">' + bare(p.fees, activeCcy) + "</td>" +
        '<td class="num cell-strong">' + bare(p.balance, activeCcy) + "</td>" +
        '<td class="num">' + p.cost.toFixed(1) + "%</td>" +
        "</tr>";
    }).join("");
  }

  function renderReconTable() {
    var tb = $("#reconTable tbody");
    tb.innerHTML = DATA.recon.map(function (r) {
      var diff = r.pspAmt - r.ledger;
      var cls = r.status === "matched" ? "delta--flat" : "delta--down";
      var chip = diff === 0 ? "—" : '<span class="delta ' + cls + '">' + (diff > 0 ? "+" : "") + bare(diff, activeCcy) + "</span>";
      return '<tr class="is-clickable" data-drawer="recon" data-psp="' + r.psp + '" data-date="' + r.date + '">' +
        '<td class="cell-ref">' + r.date + "</td>" +
        '<td class="cell-strong">' + r.psp + "</td>" +
        '<td class="num">' + bare(r.ledger, activeCcy) + "</td>" +
        '<td class="num">' + bare(r.pspAmt, activeCcy) + "</td>" +
        "<td>" + badge(r.status) + " " + chip + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderMerchantTable() {
    var tb = $("#merchantTable tbody");
    var f = tables.merchant.filter, q = tables.merchant.query.toLowerCase();
    var rows = DATA.merchants.filter(function (m) {
      if (f !== "all" && m.kyc !== f) return false;
      if (q && (m.name + m.country).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (!rows.length) {
      tb.innerHTML = '<tr><td colspan="6"><div class="empty"><strong>' +
        (lang === "fr" ? "Aucun marchand" : "No merchants") + "</strong>" +
        (lang === "fr" ? "Ajustez les filtres KYC." : "Adjust your KYC filter.") + "</div></td></tr>";
      return;
    }
    tb.innerHTML = rows.map(function (m) {
      return '<tr class="is-clickable" data-drawer="merchant" data-name="' + m.name + '">' +
        '<td class="cell-strong">' + m.name + "</td>" +
        '<td class="cell-ref">' + m.country + "</td>" +
        "<td>" + badge(m.kyc) + "</td>" +
        "<td>" + badge(m.account) + "</td>" +
        '<td class="num">' + bare(m.volume, activeCcy) + "</td>" +
        '<td class="cell-ref">' + m.last + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderAll() {
    renderKpis();
    renderTxTable();
    renderPspTable();
    renderReconTable();
    renderMerchantTable();
  }

  /* ------------------------------------------------------------ drawer */
  var overlay = $("#overlay"), drawer = $("#drawer");
  var dEyebrow = $("#drawerEyebrow"), dTitle = $("#drawerTitle"), dSub = $("#drawerSub");
  var dBody = $("#drawerBody"), dFoot = $("#drawerFoot");

  function openDrawer() {
    overlay.classList.add("is-open");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }

  function dl(rows) {
    return '<div class="dl">' + rows.map(function (r) {
      return '<div class="dl__row"><span class="dl__k">' + r[0] + '</span><span class="dl__v">' + r[1] + "</span></div>";
    }).join("") + "</div>";
  }

  function openTx(ref) {
    var x = DATA.txns.filter(function (t) { return t.ref === ref; })[0];
    if (!x) return;
    dEyebrow.textContent = lang === "fr" ? "Transaction" : "Transaction";
    dTitle.textContent = x.ref;
    dSub.textContent = x.merchant + " · " + x.date;
    dBody.innerHTML = dl([
      [lang === "fr" ? "Statut" : "Status", badge(x.status)],
      [lang === "fr" ? "Montant" : "Amount", "<strong>" + bare(x.amount, activeCcy) + " " + (activeCcy === "ALL" ? x.ccy : activeCcy) + "</strong>"],
      ["PSP", x.psp],
      [lang === "fr" ? "Méthode" : "Method", x.method],
      [lang === "fr" ? "Marchand" : "Merchant", x.merchant],
      [lang === "fr" ? "Devise source" : "Source currency", x.ccy]
    ]) +
    "<h3 class='mt-6 mb-4'>" + (lang === "fr" ? "Cycle de vie" : "Lifecycle") + "</h3>" +
    '<div class="timeline">' +
      '<div class="tl-item"><div class="tl-time">' + x.date + '</div><div class="tl-text"><strong>' + (lang === "fr" ? "Créée" : "Created") + "</strong></div></div>" +
      '<div class="tl-item tl-item--gold"><div class="tl-time">+0.4 s</div><div class="tl-text">' + (lang === "fr" ? "Routée par Kudelo" : "Routed by Kudelo") + "</div></div>" +
      '<div class="tl-item ' + (x.status === "failed" ? "tl-item--danger" : "") + '"><div class="tl-time">+1.8 s</div><div class="tl-text">' +
        (x.status === "success" ? (lang === "fr" ? "Autorisée" : "Authorized") : x.status === "pending" ? (lang === "fr" ? "En attente PSP" : "Awaiting PSP") : (lang === "fr" ? "Refusée" : "Declined")) +
      "</div></div>" +
    "</div>";
    dFoot.innerHTML = '<button class="btn" data-close>' + (lang === "fr" ? "Fermer" : "Close") + "</button>" +
      '<button class="btn btn--gold">' + (lang === "fr" ? "Voir dans le ledger" : "View in ledger") + "</button>";
    openDrawer();
  }

  function openPsp(name) {
    var p = DATA.psps.filter(function (x) { return x.name === name; })[0];
    if (!p) return;
    dEyebrow.textContent = "PSP";
    dTitle.textContent = p.name;
    dSub.textContent = p.region + " · SLA " + p.sla + "%";
    dBody.innerHTML = dl([
      [lang === "fr" ? "Statut" : "Status", p.status === "on" ? '<span class="badge badge--success">Live</span>' : '<span class="badge badge--warning">Degraded</span>'],
      [lang === "fr" ? "Volume" : "Volume", "<strong>" + bare(p.volume, activeCcy) + "</strong>"],
      [lang === "fr" ? "Frais" : "Fees", bare(p.fees, activeCcy)],
      [lang === "fr" ? "Solde" : "Balance", bare(p.balance, activeCcy)],
      [lang === "fr" ? "Coût" : "Cost", p.cost.toFixed(1) + "%"],
      [lang === "fr" ? "Règlement" : "Settlement", p.settlement]
    ]) +
    "<h3 class='mt-6 mb-4'>" + (lang === "fr" ? "Répartition du volume" : "Volume split") + "</h3>" +
    '<div class="rate"><div class="rate__track"><div class="rate__fill" style="width:' + Math.round((p.volume / DATA.psps[0].volume) * 100) + '%"></div></div></div>';
    dFoot.innerHTML = '<button class="btn" data-close>' + (lang === "fr" ? "Fermer" : "Close") + "</button>";
    openDrawer();
  }

  function openRecon(psp, date) {
    var r = DATA.recon.filter(function (x) { return x.psp === psp && x.date === date; })[0];
    if (!r) return;
    var diff = r.pspAmt - r.ledger;
    dEyebrow.textContent = lang === "fr" ? "Rapprochement" : "Reconciliation";
    dTitle.textContent = psp;
    dSub.textContent = date;
    dBody.innerHTML = dl([
      [lang === "fr" ? "Statut" : "Status", badge(r.status)],
      [lang === "fr" ? "Montant ledger" : "Ledger amount", bare(r.ledger, activeCcy)],
      [lang === "fr" ? "Montant PSP" : "PSP amount", bare(r.pspAmt, activeCcy)],
      [lang === "fr" ? "Écart" : "Difference", '<strong class="' + (diff === 0 ? "" : "gold") + '">' + (diff === 0 ? "0" : (diff > 0 ? "+" : "") + bare(diff, activeCcy)) + "</strong>"]
    ]) +
    '<p class="muted mt-4" style="font-size:12px;">' +
      (diff === 0
        ? (lang === "fr" ? "Ligne rapprochée automatiquement entre le ledger interne et le report PSP." : "Line auto-matched between internal ledger and PSP report.")
        : (lang === "fr" ? "Écart détecté : vérifier frais, devise de règlement ou timing T+1/T+2." : "Difference detected: check fees, settlement currency or T+1/T+2 timing.")) +
    "</p>";
    dFoot.innerHTML = '<button class="btn" data-close>' + (lang === "fr" ? "Fermer" : "Close") + "</button>" +
      (diff !== 0 ? '<button class="btn btn--primary">' + (lang === "fr" ? "Créer un ajustement" : "Create adjustment") + "</button>" : "");
    openDrawer();
  }

  function openMerchant(name) {
    var m = DATA.merchants.filter(function (x) { return x.name === name; })[0];
    if (!m) return;
    dEyebrow.textContent = lang === "fr" ? "Marchand" : "Merchant";
    dTitle.textContent = m.name;
    dSub.textContent = m.country + " · " + m.last;
    dBody.innerHTML = dl([
      ["KYC", badge(m.kyc)],
      [lang === "fr" ? "Compte" : "Account", badge(m.account)],
      [lang === "fr" ? "Volume" : "Volume", "<strong>" + bare(m.volume, activeCcy) + "</strong>"],
      [lang === "fr" ? "Dernière activité" : "Last activity", m.last],
      [lang === "fr" ? "Pays" : "Country", m.country]
    ]) +
    "<h3 class='mt-6 mb-4'>" + (lang === "fr" ? "Vérifications KYC" : "KYC checks") + "</h3>" +
    '<div class="timeline">' +
      '<div class="tl-item"><div class="tl-time">J-12</div><div class="tl-text">' + (lang === "fr" ? "Identité soumise" : "Identity submitted") + "</div></div>" +
      '<div class="tl-item tl-item--gold"><div class="tl-time">J-9</div><div class="tl-text">' + (lang === "fr" ? "Documents société vérifiés" : "Company documents verified") + "</div></div>" +
      '<div class="tl-item ' + (m.kyc === "rejected" ? "tl-item--danger" : "") + '"><div class="tl-time">J-2</div><div class="tl-text">' +
        (m.kyc === "approved" ? (lang === "fr" ? "KYC approuvé" : "KYC approved") : m.kyc === "rejected" ? (lang === "fr" ? "KYC rejeté" : "KYC rejected") : (lang === "fr" ? "En revue manuelle" : "Manual review")) +
      "</div></div>" +
    "</div>";
    dFoot.innerHTML = '<button class="btn" data-close>' + (lang === "fr" ? "Fermer" : "Close") + "</button>" +
      (m.kyc === "pending" ? '<button class="btn btn--gold">' + (lang === "fr" ? "Approuver KYC" : "Approve KYC") + "</button>" : "");
    openDrawer();
  }

  /* -------------------------------------------------------------- tabs */
  function selectTab(name) {
    $$(".tab").forEach(function (btn) {
      var on = btn.getAttribute("data-tab") === name;
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    var map = { in: "#panel-in", out: "#panel-out", users: "#panel-users" };
    Object.keys(map).forEach(function (k) {
      $(map[k]).classList.toggle("hidden", k !== name);
    });
  }

  /* ------------------------------------------------------------ events */
  function bindEvents() {
    $$(".tab").forEach(function (btn) {
      btn.addEventListener("click", function () { selectTab(btn.getAttribute("data-tab")); });
    });

    document.addEventListener("click", function (e) {
      var tr = e.target.closest("[data-drawer]");
      if (tr) {
        var kind = tr.getAttribute("data-drawer");
        if (kind === "tx") openTx(tr.getAttribute("data-ref"));
        else if (kind === "psp") openPsp(tr.getAttribute("data-name"));
        else if (kind === "recon") openRecon(tr.getAttribute("data-psp"), tr.getAttribute("data-date"));
        else if (kind === "merchant") openMerchant(tr.getAttribute("data-name"));
        return;
      }
      if (e.target.closest("[data-close]")) closeDrawer();
    });

    overlay.addEventListener("click", closeDrawer);
    $("#drawerClose").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

    $$(".seg").forEach(function (seg) {
      seg.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        $$("button", seg).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        var key = seg.getAttribute("data-seg");
        if (key === "in") { tables.tx.filter = btn.getAttribute("data-filter"); renderTxTable(); }
        if (key === "kyc") { tables.merchant.filter = btn.getAttribute("data-filter"); renderMerchantTable(); }
      });
    });

    $$('input[type="search"]').forEach(function (inp) {
      inp.addEventListener("input", function () {
        var panel = inp.closest("section").id;
        if (panel === "panel-in") { tables.tx.query = inp.value; renderTxTable(); }
        if (panel === "panel-users") { tables.merchant.query = inp.value; renderMerchantTable(); }
      });
    });

    $("#currencySelect").addEventListener("change", function (e) {
      activeCcy = e.target.value;
      renderAll();
    });

    $("#langBtn").addEventListener("click", function () {
      lang = lang === "en" ? "fr" : "en";
      applyI18n();
      renderAll();
      // refresh open drawer labels if any
    });

    $("#periodSelect").addEventListener("change", function () {
      setText($("#lastRefresh"), t("overview.refresh") + " " + new Date().toLocaleTimeString());
    });

    $("#searchBtn").addEventListener("click", function () {
      var q = window.prompt(t("search.placeholder"));
      if (q == null) return;
      var m = DATA.txns.filter(function (x) { return x.ref.indexOf(q) !== -1; })[0];
      if (m) { selectTab("in"); openTx(m.ref); }
    });
  }

  /* --------------------------------------------------------------- init */
  function init() {
    applyI18n();
    renderAll();
    bindEvents();
    setText($("#lastRefresh"), t("overview.refresh") + " " + new Date().toLocaleTimeString());
    var env = document.documentElement.getAttribute("data-env");
    setText($("#envLabel"), env.charAt(0).toUpperCase() + env.slice(1));
    setText($("#buildStamp"), "build " + new Date().toISOString().slice(0, 7));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
