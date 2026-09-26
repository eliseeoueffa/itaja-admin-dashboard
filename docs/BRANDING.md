# Itaja Admin — Branding

Identité : **Deep Green + Ivory + White + Gold accent + Rubik + data-dense UI + rounded cards + minimal fintech.**

## Palette

| Rôle | Token | Hex |
|---|---|---|
| Vert profond (primaire) | `--green-deep` | `#0B3D2E` |
| Vert 900 (fond bandeau) | `--green-900` | `#06251C` |
| Vert 700 / 600 / 500 | — | `#0F4A38` / `#16624A` / `#1E7C5E` |
| Ivoire (fond app) | `--ivory` | `#F8F7F2` |
| Ivoire 200 | `--ivory-200` | `#EFEDE4` |
| Blanc (cartes) | `--white` | `#FFFFFF` |
| Or (accent) | `--gold` | `#C8A44A` |
| Or fort / doux / tint | — | `#B08D34` / `#E4CF92` / `#F6EFDC` |

### Sémantique

| État | Hex | Fond |
|---|---|---|
| Succès | `#1E8E5A` | `#E4F3EB` |
| Alerte | `#C2410C` | `#FBEAE0` |
| Erreur | `#B91C1C` | `#FBE6E6` |
| Info | `#1D4ED8` | `#E7ECFC` |
| Neutre | `#6B7280` | `#EEF0EF` |

### Texte

`--text-primary #12211B` · `--text-secondary #4B5B54` · `--text-muted #8A968F`
Sur fond sombre : `#F3F7F4` et `#A9C2B8`.

## Typographie — Rubik

- Chipline : `400 / 500 / 600 / 700` (Google Fonts).
- Chiffres **tabulaires** (`font-variant-numeric: tabular-nums`) sur toutes les valeurs financières et colonnes numériques.
- Tailles : `13px` base de travail, `28px` valeurs KPI, `10–11px` labels/micro-copies.

## Formes & densité

- Rayons : carte `16px`, badge/pill `999px`, input/contrôle `10px`.
- Ombres douces : `--shadow-sm` sur cartes, `--shadow-drawer` pour le panneau latéral.
- Densité : hauteur de ligne tableau `36px`, gaps `8/12/16`, grille KPI 4 colonnes.
- Cartes arrondies, filets fins (`--border #E3E2DA`), fonds alternés ivoire/blanc.

## Signature visuelle Itaja

- **Filet d'accent** en haut de chaque carte KPI : dégradé Vert → Or (ou sémantique).
- **Trait or** (`--gold`) devant chaque titre de panel.
- **Bandeau d'orchestration Kudelo** en Vert 900 avec accent doré.
- Dégradés réservés aux accents, jamais aux fonds de texte (lisibilité data-dense).

## Règles d'usage

1. L'or signale la valeur/attention (frais Itaja, accent, CTA secondaire), jamais l'erreur.
2. Le vert profond = marque + actions principales + données saines.
3. Couleurs sémantiques réservées aux statuts (succès/alerte/erreur).
4. Contraste minimum respecté texte sur fond (WCAG AA visé).
