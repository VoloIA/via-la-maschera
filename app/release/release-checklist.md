# Release checklist

## Stato app

- Nome app: `Via la Maschera`
- Versione pubblica: `1.0.0`
- iOS bundle identifier: `com.vialamaschera.app`
- iOS build number: `1`
- Android package: `com.vialamaschera.app`
- Android version code: `1`
- Web locale: `http://localhost:8082/`

## Prima della build

- Verificare che `app/.env` contenga le chiavi Firebase e Google reali.
- Verificare che le regole Firestore siano pubblicate.
- Decidere email pubblica di supporto.
- Decidere URL pubblico della privacy policy.
- Sostituire i placeholder `INSERIRE_*` nei file release.
- Controllare che il logo e le icone siano quelli definitivi.

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
- Compilare App Privacy in App Store Connect.
- Compilare Data safety in Play Console.
- Caricare privacy policy pubblica.
- Verificare che la scheda store non prometta diagnosi, terapia o consulenza psicologica.
- Dichiarare che la stanza condivisa mostra solo iniziali e richiede risposta alla stessa domanda.

## Bloccanti prima del 100%

- Account Apple Developer attivo.
- Account Google Play Console attivo.
- Progetto Expo/EAS collegato.
- Firebase reale configurato.
- Privacy policy pubblicata a un URL stabile.
- Prima build Android/iOS generata e installata su dispositivo reale.
