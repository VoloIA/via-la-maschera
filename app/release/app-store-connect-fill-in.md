# App Store Connect - guida iOS

Ultimo controllo operativo: 2026-05-06.

Questa guida prepara `Via la Maschera` per App Store Connect e TestFlight. Non sostituisce una revisione legale.

## Fonti ufficiali

- Apple Developer enrollment: https://developer.apple.com/support/enrollment/
- Apple Developer Program: https://developer.apple.com/programs/enroll/
- App information e privacy URL: https://developer.apple.com/help/app-store-connect/reference/app-information/
- App Privacy in App Store Connect: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Expo Apple Authentication: https://docs.expo.dev/versions/v54.0.0/sdk/apple-authentication/
- Firebase Apple Authentication: https://firebase.google.com/docs/auth/web/apple

## Punto critico per iOS

L'app usa Google Sign-In per l'account principale. Le linee guida Apple richiedono che un'app con login social o di terze parti offra anche un'opzione equivalente che permetta di limitare la raccolta a nome/email, nascondere l'email e non tracciare per advertising senza consenso.

Preparazione tecnica fatta nel progetto:

- aggiunto `expo-apple-authentication`;
- aggiunto `expo-crypto` per il nonce SHA-256;
- attivato `ios.usesAppleSignIn`;
- aggiunto il config plugin `expo-apple-authentication`;
- aggiunto Sign in with Apple nel profilo e nella stanza condivisa su iOS;
- aggiornata la privacy in-app per parlare di accesso Google o Apple.

Da fare fuori dal codice:

- creare o completare Apple Developer Program;
- abilitare `Sign in with Apple` per il bundle ID `com.vialamaschera.app`;
- abilitare Apple come provider in Firebase Authentication.

## Apple Developer Program

Se pubblichi come persona fisica:

- usa il tuo nome legale reale;
- Apple mostra il nome legale come seller sull'App Store;
- serve Apple Account con autenticazione a due fattori;
- il programma è annuale.

Se vuoi che nello store appaia una società come seller, serve un account organizzazione con entità legale valida.

## App Store Connect - nuova app

Valori consigliati:

- Platform: `iOS`
- Name: `Via la Maschera`
- Primary language: `Italian`
- Bundle ID: `com.vialamaschera.app`
- Apple ID: `6767053235`
- SKU: `via-la-maschera-ios`
- User Access: `Full Access`

Informazioni pubbliche:

- Category primaria: `Lifestyle`
- Category secondaria: vuota o `Health & Fitness` solo se la scheda resta chiaramente non medica.
- Support URL: `https://voloia.github.io/via-la-maschera/`
- Marketing URL: `https://voloia.github.io/via-la-maschera/`
- Privacy Policy URL: `https://voloia.github.io/via-la-maschera/privacy`
- Privacy Choices URL: `https://voloia.github.io/via-la-maschera/delete-account`

Evita nella scheda App Store:

- terapia;
- diagnosi;
- consulenza psicologica;
- cura;
- risultato emotivo garantito.

## Versione iOS

Valori tecnici correnti:

- Bundle identifier: `com.vialamaschera.app`
- Version: `1.0.0`
- Build number: `1`
- Runtime version: `1.0.0`
- Supports tablet: yes
- Export compliance: `ITSAppUsesNonExemptEncryption=false`

Release notes per TestFlight:

```text
First TestFlight build for Via la Maschera. Includes daily question, sealed answers, personal archive, protected sharing with initials, reporting, privacy pages, dark/light mode, five languages, Google Sign-In, and Sign in with Apple on iOS.
```

Review notes:

```text
Via la Maschera is a personal reflection app. It is not medical, diagnostic, or therapeutic. Users can answer a daily question locally. Sign-in is used for cloud archive, protected sharing, reporting, and account/data deletion requests. Shared answers are optional, visible with initials only, and become readable only after the reviewer answers the same question. Every shared answer includes an in-app report action.
```

## App Privacy

Dichiara che l'app raccoglie dati.

Categorie probabili:

- Contact Info: email address, name.
- User Content: answers, shared answers, reports.
- Identifiers: Firebase user ID and sign-in provider identifiers.
- Diagnostics: solo se vengono attivati servizi diagnostici aggiuntivi.

Uso dati:

- App Functionality;
- Account Management;
- Safety, Security, and Compliance;
- Analytics solo se in futuro si attivano analytics reali.

Linked to user:

- Contact Info: yes;
- User Content: yes;
- Identifiers: yes.

Tracking:

- `No`, finché non vengono aggiunti SDK pubblicitari o tracciamento cross-app.

Data sharing:

- Service providers: Firebase/Google/Expo/Apple per autenticazione, cloud sync, infrastruttura tecnica e build.
- Other users: solo risposta condivisa e iniziali, su scelta esplicita dell'utente.

## Sign in with Apple e Firebase

Prima della build iOS:

1. In Apple Developer, apri `Certificates, Identifiers & Profiles`.
2. Seleziona o crea App ID per `com.vialamaschera.app`.
3. Attiva `Sign in with Apple`.
4. In Firebase Console, vai in `Authentication > Sign-in method`.
5. Abilita `Apple`.
6. Segui i campi richiesti da Firebase per configurare Service ID, Team ID, Key ID e private key Apple, se richiesti.

Nota: Apple può fornire un'email privata `privaterelay.appleid.com`. L'app deve trattarla come email valida dell'account.

## TestFlight

Ordine consigliato:

1. Creare account Apple Developer.
2. Creare app in App Store Connect.
3. Configurare Sign in with Apple e Firebase.
4. Generare build iOS con EAS.
5. Caricare su App Store Connect.
6. Aprire TestFlight interno.
7. Testare su iPhone reale.

Latest production iOS build:

- EAS build: `c900afe7-c750-4605-9c76-a4622695c43b`
- EAS submission: `9fdf136f-64c8-4703-a78a-144d7b2841a9`
- App Store Connect app ID: `6767053235`
- TestFlight URL: `https://appstoreconnect.apple.com/apps/6767053235/testflight/ios`
- Expo page: `https://expo.dev/accounts/via_lamaschera/projects/via-la-maschera/builds/c900afe7-c750-4605-9c76-a4622695c43b`
- Artifact URL: `https://expo.dev/artifacts/eas/qPAJf96Xq82b3nreYx54gr.ipa`
- Local file: `release/builds/via-la-maschera-ios-1.0.0-1.ipa`
- Status checked on 2026-05-07: `FINISHED`

Comando build:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile\app"
npm.cmd run check
npm.cmd run build:ios:production
```

Prima build iOS:

- la prima generazione delle credenziali Apple richiede una build EAS interattiva;
- EAS può chiedere login Apple Developer, team, certificato distribuzione e provisioning profile;
- scegliere gestione automatica quando proposta.

Test obbligatori:

- apertura app;
- tema chiaro/scuro;
- cambio lingua;
- Sign in with Apple su iPhone reale;
- Google Sign-In se configurato anche su iOS;
- risposta quotidiana;
- archivio;
- condivisione con iniziali;
- segnalazione;
- privacy policy;
- cancellazione dati;
- termini community;
- link Instagram.

## Screenshot iOS

Prepara almeno questi schermi:

- Home con domanda quotidiana;
- Archivio;
- Stanza condivisa;
- Profilo con privacy e login;
- tema chiaro;
- tema scuro;
- selezione lingua.

Gli screenshot devono mostrare l'app reale, senza promesse extra e senza testo medico/terapeutico.
