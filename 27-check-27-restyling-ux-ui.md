# Check 27: restyling UX/UI e fiducia

## Stato

Superato.

## Obiettivo

Rivedere l'intero design di `Via la Maschera` con una logica più vicina a un prodotto consumer maturo: emozione, fiducia, chiarezza e desiderio di ritorno.

## Direzione di design

Il restyling prende ispirazione da più settori:

- app di journaling e benessere: ritmo calmo, poco rumore, domanda centrale;
- prodotti social: reciprocità chiara prima di leggere le risposte altrui;
- prodotti fintech/privacy: stati leggibili, controllo, consenso reversibile;
- editoria digitale: tipografia più protagonista e gerarchia più narrativa;
- app retention/gamification: progressi, percorsi e stati immediatamente scansionabili.

## Cosa è cambiato

- palette più ricca, meno monotona e con accenti distinti;
- spaziature, ombre, raggi e superfici centralizzati in `brand.ts`;
- header più chiari, con monogramma stabile e leggibile su web;
- Home più forte nella promessa del rituale;
- Percorsi trasformati in esperienza di scoperta;
- Archivio reso più leggibile come memoria personale;
- Profilo più orientato a fiducia, privacy e controllo;
- tab bar più pulita;
- modale coerente con il nuovo linguaggio;
- testo corretto anche quando il sistema usa tema scuro;
- rimosso l'effetto parallax perché rendeva fragile la resa del testo nell'hero web.

## File principali aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\brand.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\theme.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\parallax-scroll-view.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
```

## Verifiche

Comandi superati:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-redesign-final
curl.exe -I --max-time 20 http://localhost:8082
```

Verifica visiva:

```text
Home, Percorsi, Archivio e Profilo controllati nel browser locale su viewport mobile.
```

Risultato:

```text
HTTP/1.1 200 OK
```

## Percentuale progetto

```text
92%
```
