# Check 15: Logo e Branding

Obiettivo:

Integrare il logo fornito dall'utente e sostituire gli asset visuali principali di Expo.

## Logo sorgente

File ricevuto:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\logo3.svg
```

Il logo e un SVG quadrato:

```text
1920 x 1920
```

## Asset generati

Sono stati generati PNG per:

- icona app;
- splash screen;
- favicon web;
- adaptive icon Android;
- logo scuro;
- logo chiaro.

File principali:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\icon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\splash-icon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\favicon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\via-la-maschera-logo-light.png
```

## Script creato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\scripts\generate-brand-assets.mjs
```

Serve a rigenerare gli asset partendo dal logo SVG.

## UI aggiornata

La Home ora mostra il logo nella parte alta.

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

## Expo aggiornato

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
```

Cambiamenti:

- `icon.png` ora usa il logo;
- `splash-icon.png` ora usa il logo;
- background splash viola scuro;
- favicon aggiornata;
- adaptive icon Android aggiornata.

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

## Nome progetto

```text
Via la Maschera
```

## Percentuale progetto

```text
50%
```

Siamo al 50% perche ora la app ha funzionalita principali iniziali, memoria personale, percorsi emotivi e identita visiva.

