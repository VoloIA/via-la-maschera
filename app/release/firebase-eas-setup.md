# Firebase + EAS setup

Questa guida serve a collegare Google Login, Firebase e la build Android di produzione.

## 1. Crea o apri il progetto Firebase

Vai su:

```text
https://console.firebase.google.com/
```

Crea un progetto chiamato:

```text
Via la Maschera
```

## 2. Abilita Google Login

Nel progetto Firebase:

1. Apri `Authentication`.
2. Apri `Sign-in method`.
3. Abilita `Google`.
4. Seleziona una email di supporto.
5. Salva.

## 3. Crea Cloud Firestore

Nel progetto Firebase:

1. Apri `Firestore Database`.
2. Crea il database.
3. Scegli production mode.
4. Scegli una regione europea se disponibile e coerente con il progetto.
5. Apri la tab `Rules`.
6. Incolla il contenuto di `firebase/firestore.rules`.
7. Pubblica.

## 4. Aggiungi una app Web in Firebase

In `Project settings > General > Your apps`:

1. Premi l'icona Web.
2. Nickname consigliato: `Via la Maschera Web`.
3. Copia il blocco `firebaseConfig`.
4. Crea `app/.env` partendo da `app/.env.example`.
5. Compila questi valori:

```text
EXPO_PUBLIC_FIREBASE_API_KEY=apiKey
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=authDomain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=projectId
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=storageBucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=messagingSenderId
EXPO_PUBLIC_FIREBASE_APP_ID=appId
```

## 5. Recupera il Web Client ID Google

Nel progetto Google Cloud collegato a Firebase:

```text
APIs & Services > Credentials
```

Cerca un OAuth client di tipo `Web application`.

Copia il `Client ID` in:

```text
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
```

## 6. Recupera il client Android

Per Android serve un OAuth client di tipo `Android`.

Valori richiesti:

```text
Package name: com.vialamaschera.app
SHA-1: impronta del certificato di firma Android
```

Se EAS non ha ancora generato il certificato, il percorso più semplice è:

1. lanciare una prima build Android anche con login disattivato;
2. aprire le credenziali Android EAS;
3. copiare SHA-1;
4. creare il client Android in Google Cloud;
5. inserire il suo Client ID in `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`;
6. rilanciare la build definitiva.

## 7. Carica le variabili su EAS

Quando `app/.env` è compilato, dalla cartella `app` esegui:

```powershell
npm.cmd run eas:env:push
```

Poi controlla:

```powershell
npx.cmd eas-cli@latest env:list production
```

## 8. Build Android

Quando le variabili sono presenti su EAS:

```powershell
npm.cmd run build:android:production
```

La build production genera un file `.aab`, quello da caricare su Google Play Console.
