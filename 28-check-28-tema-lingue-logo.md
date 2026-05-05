# Check 28: tema, lingue e logo header

## Stato

Superato.

## Obiettivo

Rendere `Via la Maschera` più solida come prodotto reale:

- logo sempre visibile nelle testate;
- tema chiaro e tema scuro selezionabili;
- testi disponibili in Italiano, Inglese, Ucraino, Russo e Spagnolo;
- piena leggibilità su web durante il cambio tema.

## Cosa è cambiato

- creato un asset header dedicato per il logo;
- sostituite le testate che usavano il logo grande con `via-la-maschera-logo-header-light.png`;
- creato `SettingsProvider` per salvare tema e lingua;
- aggiunto pannello `Aspetto` nella schermata Profilo;
- aggiunto pannello `Lingua` nella schermata Profilo;
- localizzati testi principali, tab, stati, pulsanti e messaggi della stanza condivisa;
- localizzate domande giornaliere e percorsi emotivi;
- aggiunti file locale Expo per `en`, `es`, `it`, `ru`, `uk`;
- corretto il tema web: ora segue la scelta dell'utente e non il tema del sistema operativo.

## File principali aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\hooks\use-color-scheme.web.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\settings-context.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\localization.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\brand.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-questions.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-paths.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
```

## Verifiche

Comandi superati:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-theme-i18n
curl.exe -I --max-time 30 http://localhost:8082
```

Verifica browser:

```text
http://localhost:8082/
```

Controlli fatti:

- Home in inglese con logo visibile;
- label corretta `Mask Fear`;
- Profilo con tema chiaro realmente chiaro;
- Profilo con tema scuro leggibile;
- selezione lingua ucraina con caratteri cirillici corretti;
- ritorno finale alla lingua italiana.

## Percentuale progetto

```text
95%
```
