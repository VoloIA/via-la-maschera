# App Store screenshots

Cartella pronta per App Store Connect, sezione "Anteprime e screenshot" > iPhone > Display da 6,5".

I file in `iphone-65/` sono PNG da 1242 x 2688 px:

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
