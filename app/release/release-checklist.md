# Release checklist

## Stato app

- Nome app: `Via la Maschera`
- Versione pubblica: `1.0.0`
- iOS bundle identifier: `com.vialamaschera.app`
- iOS build number: `1`
- Android package: `com.vialamaschera.app`
- Android version code: `1`
- Web locale: `http://localhost:8082/`
- Privacy locale: `http://localhost:8082/privacy`
- Cancellazione dati locale: `http://localhost:8082/delete-account`
- Termini community locale: `http://localhost:8082/terms`
- Web pubblico previsto: `https://voloia.github.io/via-la-maschera/`
- Privacy pubblica prevista: `https://voloia.github.io/via-la-maschera/privacy`
- Cancellazione dati pubblica prevista: `https://voloia.github.io/via-la-maschera/delete-account`
- Termini community pubblici previsti: `https://voloia.github.io/via-la-maschera/terms`

## Prima della build

- Verificare che `app/.env` contenga le chiavi Firebase e Google reali.
- Verificare che le regole Firestore siano pubblicate.
- Decidere email pubblica di supporto.
- Pubblicare URL pubblico stabile della privacy policy.
- Pubblicare URL pubblico stabile per richiesta cancellazione account/dati.
- Sostituire i placeholder `INSERIRE_*` nei file release.
- Sostituire i placeholder di contatto nelle pagine app `privacy` e `delete-account`.
- Controllare che il logo e le icone siano quelli definitivi.
- Verificare in GitHub che Pages usi `GitHub Actions` come sorgente.
- Verificare che la pagina `terms` sia pubblica prima di inviare la build allo store.

## Controlli tecnici

```powershell
npm.cmd run check
npm.cmd run export:web
npx.cmd expo config --type public
```

## Build interne

```powershell
eas login
eas build:configure
npm.cmd run build:android:preview
```

## Build store

```powershell
npm.cmd run build:android:production
npm.cmd run build:ios:production
```

## Store

- Preparare screenshot per Home, Percorsi, Archivio, Profilo, tema scuro e lingue.
- Usare `release/google-play-submission.md` come dossier per Play Console.
- Compilare App Privacy in App Store Connect.
- Compilare Data safety in Play Console.
- Caricare privacy policy pubblica.
- Caricare URL pubblico per richiesta cancellazione account/dati.
- Verificare che la scheda store non prometta diagnosi, terapia o consulenza psicologica.
- Dichiarare che la stanza condivisa mostra solo iniziali, richiede risposta alla stessa domanda, accettazione regole e segnalazione in-app.

## Bloccanti prima del 100%

- Account Apple Developer attivo.
- Account Google Play Console attivo.
- Progetto Expo/EAS collegato.
- GitHub Pages attivo e deploy web completato.
- Firebase reale configurato.
- Privacy policy pubblicata a un URL stabile.
- Pagina pubblica di cancellazione account/dati pubblicata a un URL stabile.
- Pagina pubblica termini e regole community pubblicata a un URL stabile.
- Prima build Android/iOS generata e installata su dispositivo reale.
