# Check 19: Lingua italiana e tipografia

Obiettivo:

Trattare l’italiano come parte dell’esperienza, non come semplice contenuto inserito nell’interfaccia.

## Perché serviva

L’app aveva già una direzione emotiva chiara, ma molti testi erano ancora scritti senza accenti e senza apostrofi corretti.

Per una app introspettiva, la lingua non è decorazione:

- crea fiducia;
- abbassa la distanza;
- rende il rito più credibile;
- fa sentire che ogni parola è stata scelta.

## Font scelto

```text
Lora
```

Motivo:

Lora è un serif contemporaneo con radici calligrafiche. È leggibile su schermo, ma ha una voce più umana e letteraria di un sans tecnico.

La scelta segue l’idea raccontata anche in `Sei proprio il mio Typo`: i caratteri non sono neutri, portano tono, memoria ed emozione.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\package-lock.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\modal.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\themed-text.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-questions.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-paths.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
```

## File creati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\typography.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\it.json
```

## Cosa abbiamo migliorato

- installato `@expo-google-fonts/lora`;
- caricato Lora all’avvio dell’app;
- applicato Lora ai testi principali, alla tab bar e al campo di scrittura;
- impostato la lingua web su `it-IT`;
- aggiunta lingua italiana nei metadati locali dell’app;
- corretti accenti, apostrofi e testi inglesi residui;
- usato l’apostrofo tipografico `’`;
- usato il punto di sospensione tipografico `…`.

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test
```

Risultato:

Nessun errore segnalato.

## Percentuale progetto

```text
70%
```

Siamo al 70% perché l’app ora ha una voce italiana più curata e una tipografia coerente con la sua identità.
