# Via la Maschera

App Expo/React Native per un rituale quotidiano di introspezione:

- una domanda personale al giorno;
- una risposta sigillata;
- una riflessione che si apre dopo 24 ore;
- archivio privato;
- percorsi emotivi;
- accesso Google e stanza condivisa opzionale;
- tema chiaro/scuro;
- interfaccia in Italiano, Inglese, Ucraino, Russo e Spagnolo.

## Sviluppo locale

```powershell
npm.cmd install
npm.cmd run web
```

URL web locale:

```text
http://localhost:8082/
```

## Controlli

```powershell
npm.cmd run check
npm.cmd run export:web
npm.cmd run export:web:github
```

## Web pubblico

Il repository contiene un workflow GitHub Actions manuale per pubblicare la versione web statica su GitHub Pages.

URL previsti:

```text
https://voloia.github.io/via-la-maschera/
https://voloia.github.io/via-la-maschera/privacy
https://voloia.github.io/via-la-maschera/delete-account
```

Per GitHub Pages l'export usa il base path `/via-la-maschera`; l'export locale resta invece su `/`. Il deploy richiede un repository/piano GitHub con Pages attivo, oppure un hosting alternativo.

## Build EAS

Prima della build installare e configurare EAS CLI con un account Expo.

```powershell
eas login
eas build:configure
npm.cmd run build:android:preview
npm.cmd run build:android:production
npm.cmd run build:ios:production
```

Identificativi configurati:

```text
iOS bundle identifier: com.vialamaschera.app
Android package: com.vialamaschera.app
```

## Firebase e Google Login

Le chiavi non sono nel repository. Copiare `app/.env.example` in `app/.env` e compilare le variabili `EXPO_PUBLIC_*`.

Finché Firebase o Google Login non sono configurati, l'app resta utilizzabile con archivio locale e mostra lo stato `Da collegare` nel Profilo.
