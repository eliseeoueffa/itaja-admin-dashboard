# Itaja Admin — Structure

## Arborescence des fichiers

```
itaja-admin/
├─ index.html                    Page unique : header + bandeau KPI + 3 onglets + 3 drawers
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css              Variables de la charte Itaja
│  │  ├─ base.css                Reset, typo Rubik, grilles, utilitaires
│  │  └─ components.css          KPI, tables, tabs, badges, panels, drawer, status-band
│  └─ js/
│     └─ dashboard.js            Données mock, rendu, onglets, drawers, i18n, multi-devise
└─ docs/
   ├─ STRUCTURE.md               Ce fichier
   ├─ BRANDING.md                Charte appliquée
   └─ LOGIC.md                   Logique métier par onglet
```

## Mapping diagramme → interface

| Nœud du diagramme | Type | Emplacement UI |
|---|---|---|
| ITAJA ADMIN OVERVIEW | Racine | En-tête + bandeau KPI global |
| 💰 MONEY IN | Domaine | Onglet « Money In » |
| TRANSACTIONS · GMV / Success Rate / Failed Txns | Métriques | Rangée KPI de l'onglet 1 + table Transactions |
| REVENUE → Gross Revenue / Itaja Fees | Dérivé du GMV | Panel « Revenue » (Gross, Itaja Fees, Net, take rate) |
| 💵 MONEY OUT | Domaine | Onglet « Money Out » |
| PAYOUTS · Volume / Success Rate / Pending | Métriques | Rangée KPI de l'onglet 2 |
| PSP NETWORK · Volume / Fees / Balance | Sous-module + métriques | Table PSP Network (drill-down drawer) |
| PSP COST (← Fees) | Dérivé | Carte KPI « PSP cost » |
| LIQUIDITY (← Balance) | Dérivé | Carte KPI « Liquidity » |
| KUDELO (orchestrateur) | Infra | Bandeau statut d'orchestration |
| RECONCILIATION (ledger interne vs PSP) | Sous-module | Table Reconciliation (drill-down drawer) |
| 👥 USERS | Domaine | Onglet « Users » |
| MERCHANTS · KYC / Status / Activity | Métriques | Rangée KPI de l'onglet 3 + table Marchands |
| KYC Pending / Approved / Rejected | Statuts | Badges + filtre segmenté |

## Anatomie de la page unique

1. **Header** (sticky, Deep Green) — marque, période, devise, recherche, langue, avatar.
2. **Page head** — eyebrow, titre, description, actions (Export CSV, Refresh).
3. **Bandeau KPI global** — 3 tuiles toujours visibles (Money In, Money Out, Users).
4. **Barre d'onglets** — Money In / Money Out / Users (avec compteur).
5. **Panneau d'onglet actif** — sections KPI + tables + panels dérivés.
6. **Drawer latéral** (460 px) — détail transaction / PSP / ligne de rapprochement / marchand.
7. **Footer** — source des données.

## Navigation & drill-downs

- Pas de changement de page : tout reste dans `index.html`.
- Les lignes cliquables (`Transactions`, `PSP Network`, `Reconciliation`, `Merchants`) ouvrent le **drawer**.
- Fermeture : bouton ✕, clic sur l'overlay, ou touche `Esc`.

## États prévus

| État | Implémentation |
|---|---|
| Vide | Bloc `.empty` (tables filtrées sans résultat) |
| Chargement | Squelettes `.skeleton` (à brancher sur API) |
| Erreur | À afficher dans un panel avec badge `--danger` |
| Actif / focus | `aria-selected` (tabs), `aria-pressed` (filtres), `:focus-visible` |
