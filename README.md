# ironlog

Treningslogg for både styrke- og kondisjonstrening. PWA (installérbar app) bygget med
React 18 + TypeScript + Vite + Tailwind CSS, med Supabase som backend og Dexie
(IndexedDB) for offline-logging. Samme stack og mønstre som
[bjeil/belast](https://github.com/bjeil/belast).

## Funksjoner (planlagt)

- Øvelseskatalog (styrke/cardio, base/isolasjon, kroppsdel)
- Planlagte økter med supersets og redigerbar rekkefølge
- Logging av økter (kalender, planlagt eller egendefinert økt, sett/reps/vekt i kg
  for styrke – tid/intensitet for cardio), også offline med synkronisering
- Historikk, vekttrend per øvelse, vurdering (1–10) + kommentar per økt
- Statistikk med periodefilter (7/30/90 dager, all-time) og 30-dagerstabell
- Eksport til CSV via share sheet
- Mørk/lys-modus, flere brukere med innlogging (brukernavn + passord)

## Utvikling lokalt

```bash
npm install
cp .env.example .env   # fyll inn Supabase-verdier (se nedenfor)
npm run dev
npm test               # kjører tester (vitest)
npm run build          # typecheck + produksjonsbygg
```

## Supabase-oppsett

1. Opprett et nytt Supabase-prosjekt (eget prosjekt for IronLog).
2. I Supabase Dashboard → SQL Editor: kjør `supabase/schema.sql` én gang.
3. Hent **Project URL** og **publishable anon key** fra Project Settings → API.
4. Legg dem i `.env` (se `.env.example`). `.env` committes aldri.
5. Aktiver innlogging med brukernavn + passord i Authentication → Providers
   (skru av e-postbekreftelse); brukere legges til direkte i Supabase.

## Deploy

Push til `main` kjører `.github/workflows/deploy-pages.yml`, som bygger appen og
deployes til GitHub Pages på `https://bjeil.github.io/ironlog/`. Aktiver Pages →
"GitHub Actions" i repo-innstillingene. CI (`.github/workflows/ci.yml`) kjører
tester og bygg på PR-er.

## PWA-ikoner

Ikonene ligger i `public/icons/`. Ved endring av `icon.svg`:

```bash
npm run icons   # genererer icon-192.png, icon-512.png, icon-512-maskable.png
```
