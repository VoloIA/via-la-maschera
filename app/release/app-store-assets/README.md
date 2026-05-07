# App Store screenshots

Cartella pronta per App Store Connect, sezione "Anteprime e screenshot".

I file in `iphone-65/` sono PNG da 1242 x 2688 px per iPhone > Display da 6,5".

I file in `ipad-13/` sono PNG da 2048 x 2732 px per iPad > Display da 13".

- `01-domanda-quotidiana.png`
- `02-risposta-sigillata.png`
- `03-archivio-personale.png`
- `04-percorsi-emotivi.png`
- `05-lingue-tema.png`
- `06-condivisione-protetta.png`

Rigenera gli screenshot con:

```powershell
npm.cmd run screenshots:ios
```

Lo script usa Chrome o Edge in modalita headless e verifica automaticamente le dimensioni richieste da Apple.

La sezione Apple Watch puo restare vuota se l'app non include una app watchOS.
