# Itaja Admin — Logique métier

Conventions UI : libellés **EN par défaut**, bascule **FR** ; montants **multi-devise** (code affiché) ; drill-downs en **drawer**.

---

## Barre globale (header)

| Contrôle | Logique |
|---|---|
| Période | Recalcule toutes les agrégations (Today / 7d / 30d / MTD / Custom). Met à jour l'horodatage. |
| Devise | `ALL` = chaque montant garde sa devise source ; devise unique = conversion d'affichage via taux mock, code affiché. |
| Recherche | Recherche une référence transaction et ouvre le drawer correspondant (onglet Money In). |
| Langue | Bascule EN/FR : libellés, en-têtes, badges et drawers traduits dynamiquement. |

---

## Bandeau KPI global (toujours visible)

| Tuile | Formule / source |
|---|---|
| Money In · GMV | `Σ montants transactions réussies` sur la période |
| Money Out · Payouts | `Σ montants payouts` sur la période |
| Users · Merchants | Nombre de marchands actifs + variation sur la période |

---

## Onglet 1 · Money In

**Données :** flux d'encaissement marchand.

| Élément | Logique |
|---|---|
| GMV | `Σ montants` des transactions réussies |
| Success Rate | `transactions réussies / total` × 100 |
| Failed Txns | `count(statut = failed)` + part du volume total |
| Average Ticket | `GMV / nb transactions réussies` |
| **Revenue** (dérivé du GMV) | **Gross Revenue = GMV** ; **Itaja Fees = GMV × take rate** ; **Net Revenue = Gross − Fees** |
| Take rate | Taux de commission appliqué (mock 3,0 %) |
| Table Transactions | Colonnes : Reference, Merchant, PSP, Method, Status, Amount, Date |
| Filtres | Segmenté All / Success / Pending / Failed + recherche référence |
| Drill-down | Clic ligne → drawer transaction (statut, montant, PSP, méthode, cycle de vie routé par Kudelo) |

**États :** vide si le filtre ne retourne rien ; `pending` = en attente PSP ; `failed` = refusée.

---

## Onglet 2 · Money Out

**Données :** décaissements (payouts) + réseau PSP + rapprochement ledger.

| Élément | Logique |
|---|---|
| Payout Volume | `Σ montants payouts` |
| Success Rate | `payouts réussis / total` × 100 |
| Pending Payouts | `count(pending)` + montant en attente de règlement |
| Unreconciled | Nombre de lignes non rapprochées + écart cumulé |
| **PSP Network** | Une ligne par PSP : Volume, Fees, Balance, Cost %, statut (Live/Degraded) |
| **PSP Cost** (← Fees) | `Σ fees` de tous les PSP ; ratio = `cost / volume` |
| **Liquidity** (← Balance) | `Σ balances` disponibles chez les PSP |
| Net Flow | `Money In − Money Out` |
| **Kudelo** | Bandeau orchestration : statut, nb PSP connectés, latence de routage, uptime 24h, dernière synchro |
| **Reconciliation** | Comparaison **ledger interne vs report PSP** par jour/PSP : statut `matched` / `mismatch` / `pending`, écart affiché |
| Drill-down PSP | Clic ligne → drawer PSP (statut, volume, frais, solde, coût, règlement, région) |
| Drill-down Réconciliation | Clic ligne → drawer écart (ledger vs PSP) + suggestion d'ajustement |

**Règle de rapprochement :** `écart = montant PSP − montant ledger`. `0` = rapproché ; écart ≠ 0 = investiguer frais, devise de règlement ou timing T+1/T+2.

---

## Onglet 3 · Users

**Données :** base marchands.

| Élément | Logique |
|---|---|
| KYC queue | `count(kyc = pending)` (en revue) |
| Active Merchants | `count(account = active)` + part de la base |
| Dormant Merchants | `count(sans activité > 30j)` |
| Activity Rate | % marchands transactant chaque semaine |
| Table Merchants | Colonnes : Merchant, Country, KYC, Account status, Volume, Last activity |
| Filtre KYC | Segmenté All / Pending / Approved / Rejected |
| Drill-down | Clic ligne → drawer marchand (KYC, compte, volume, timeline de vérifications) |

**Statuts KYC :** `pending` (badge alerte), `approved` (badge succès), `rejected` (badge erreur).
**Statuts compte :** `active`, `restricted`, `suspended`.

---

## Rôles & permissions (cible API)

| Rôle | Lecture | Export | Actions KYC | Ajustements recon |
|---|---|---|---|---|
| Viewer | ✓ | — | — | — |
| Operations | ✓ | ✓ | — | — |
| Compliance | ✓ | ✓ | ✓ | — |
| Finance Admin | ✓ | ✓ | ✓ | ✓ |

---

## Points d'intégration à brancher

- `GET /metrics/overview` → bandeau global + KPIs par onglet.
- `GET /transactions` · `GET /payouts` · `GET /merchants` (paginés).
- `GET /psp/network` · `GET /reconciliation`.
- `GET /kudelo/status` → bandeau orchestration.
- `POST /kyc/{id}/approve` · `POST /reconciliation/adjust`.
