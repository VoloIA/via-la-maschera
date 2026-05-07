# Play Store assets

Asset preparati per la scheda Google Play.

## Feature graphic

- File: `feature-graphic-it.png`
- Dimensioni: `1024x500`
- Formato: PNG 24-bit senza alpha
- Lingua: italiano
- Alt text consigliato:

```text
Via la Maschera presenta un rituale quotidiano con una domanda al giorno e risposte private.
```

Rigenerazione:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile\app"
powershell -ExecutionPolicy Bypass -File .\scripts\generate-play-assets.ps1
```

## Screenshot da caricare

Google Play richiede almeno due screenshot e consiglia almeno quattro screenshot app con risoluzione minima `1080x1920` in portrait.

Cartella pronta:

- `phone/`
- Dimensioni: `1080x1920`
- Formato: PNG
- Quantita: 6 screenshot

Shot list consigliata:

- Home con domanda quotidiana.
- Archivio con risposta sigillata.
- Stanza condivisa con iniziali e pulsante di segnalazione.
- Profilo con privacy, lingue, tema chiaro/scuro e Instagram.
- Versione dark mode.
- Versione light mode.

Gli screenshot devono mostrare l'interfaccia reale dell'app, senza cornici dispositivo, badge store o testi promozionali esterni all'app.

Rigenerazione:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile\app"
npm.cmd run screenshots:stores
```
