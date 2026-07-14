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
- Version: `1.1.0`
- Build number: `4`
- Runtime version: `1.1.0`
- Supports tablet: yes
- Export compliance: `ITSAppUsesNonExemptEncryption=false`

Release notes per TestFlight:

```text
Via la Maschera includes one daily question, a reflection available after 20 minutes, a private archive, optional sharing with initials, reporting tools, privacy pages, light and dark modes, five languages, Google Sign-In, and Sign in with Apple on iOS.
```

Novità della versione `1.1.0`:

```text
Testi italiani e inglesi più chiari e accessibili. La riflessione ora è disponibile dopo 20 minuti. Migliorati anche percorsi, messaggi di accesso, privacy e condivisione con la community.
```

Versione inglese:

```text
Clearer, more accessible Italian and English copy. Reflections are now available after 20 minutes. Paths, sign-in messages, privacy, and community sharing have also been improved.
```

Review notes:

```text
Via la Maschera is a personal reflection app. It is not medical, diagnostic, or therapeutic. Users can answer a daily question locally. Sign-in is used for cloud archive, protected sharing, reporting, and in-app account deletion.

For Guideline 1.2, the app now requires users to accept Terms and Community Rules before signing in. The terms state zero tolerance for objectionable content and abusive users. Shared answers are optional, filtered before publishing, visible with initials only, and become readable only after the reviewer answers the same question. Every shared answer includes Report and Block Author actions. Reporting or blocking hides the content immediately for the user and writes a moderation report for developer review within 24 hours.

For Guideline 5.1.1(v), account deletion is available in the app at Profile > Privacy > Account and data deletion. A signed-in user can delete the app account and associated data from that page without sending email or contacting support.
```

## Rejection 2026-05-08 - correzioni richieste

Apple ha respinto la versione `1.0 (1)` per:

- `Guideline 2.3.6`: Age Rating non coerente, manca `User-Generated Content = Yes`.
- `Guideline 1.2`: UGC con precauzioni insufficienti.

Correzioni tecniche inserite nella build successiva:

- consenso ai termini prima del login Google/Apple;
- termini con tolleranza zero verso contenuti offensivi o utenti abusivi;
- filtro locale prima della pubblicazione di una risposta condivisa;
- pulsante `Segnala`;
- pulsante `Blocca autore`;
- blocco autore persistente per l'utente;
- segnalazioni/blocchi scritti nella collection `reports` per revisione;
- contenuto segnalato o bloccato nascosto subito dal feed dell'utente.

Da fare in App Store Connect:

1. `Informazioni sull'app > Classificazione per età`: impostare `User-Generated Content` su `Sì`.
2. Caricare nuova build iOS `1.0.0 (2)`.
3. Registrare da iPhone fisico un video che mostra:
   - checkbox termini prima del login;
   - pagina termini/regole community;
   - risposta condivisa;
   - pulsante `Segnala`;
   - pulsante `Blocca autore`.
4. Inserire il video nelle `Note` della sezione `Informazioni per il team di verifica`.
5. Rispondere ad Apple nel Centro risoluzioni.

Risposta consigliata ad Apple:

```text
Hello App Review team,

Thank you for the review. We have addressed Guideline 1.2 and Guideline 2.3.6 in the new build.

Changes made:
- Age Rating has been updated to select "Yes" for User-Generated Content.
- Users must accept Terms and Community Rules before signing in with Google or Apple.
- The Terms state zero tolerance for objectionable content and abusive users.
- Shared answers are filtered before being posted.
- Every shared answer includes a Report action.
- Every shared answer includes a Block Author action.
- Reporting or blocking hides the content immediately from the user's feed and creates a moderation report for developer review.
- Reports are reviewed within 24 hours; offending content may be removed and responsible users may be removed from the shared room.

The app does not include public profiles, direct messaging, following, tagging, or unrestricted posting. Shared answers are optional, visible with initials only, and only after the reviewer has answered the same daily question.

A screen recording from a physical device has been attached in the App Review Information notes.
Thank you.
```

## Rejection 2026-05-09 - correzioni richieste

Apple ha respinto la versione `1.0 (2)` per:

- `Guideline 5.1.1(v)`: l'app supporta account, ma la cancellazione richiedeva ancora l'invio di una email.

Correzioni tecniche inserite nella build successiva:

- pulsante `Elimina account e dati` nella pagina `/delete-account`;
- conferma esplicita dentro l'app;
- rimozione del requisito email per completare la cancellazione;
- cancellazione dell'account Firebase Authentication corrente;
- cancellazione dell'archivio cloud utente;
- cancellazione delle risposte condivise pubblicate dall'utente;
- cancellazione delle risposte locali salvate sul dispositivo;
- localizzazioni aggiornate in tutte le lingue supportate.

Da fare in App Store Connect:

1. Caricare nuova build iOS `1.0.0 (3)`.
2. Selezionare la build `1.0.0 (3)` nella versione iOS `1.0`.
3. Aggiornare le Review notes con il percorso:
   - `Profile > Privacy > Account and data deletion`.
4. Rispondere ad Apple nel Centro risoluzioni.

Risposta consigliata ad Apple:

```text
Hello App Review team,

Thank you for the review. We have addressed Guideline 5.1.1(v) in the new build.

The app no longer requires users to send an email to complete account deletion. We added an in-app account deletion flow at:

Profile > Privacy > Account and data deletion

When a signed-in user opens this page, the app shows a "Delete account and data" button. The user confirms the action in the app. The flow deletes the user's app account, cloud archive, personal answers, shared answers, associated initials, sync data, and local answers saved on the device. It then deletes the current Firebase Authentication account.

The page text was updated in all supported languages to explain that account deletion is completed inside the app without contacting support.

Thank you.
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

- EAS build: `3a1ffe3f-0d2b-4c19-895e-b244dc350d3a`
- EAS submission: `9c91c9f5-6fa9-41ca-b6aa-d02ebf863528`
- App Store Connect app ID: `6767053235`
- TestFlight URL: `https://appstoreconnect.apple.com/apps/6767053235/testflight/ios`
- Expo page: `https://expo.dev/accounts/via_lamaschera/projects/via-la-maschera/builds/3a1ffe3f-0d2b-4c19-895e-b244dc350d3a`
- Artifact URL: `https://expo.dev/artifacts/eas/8bibbEwwQtPdmh6gBMpu4m.ipa`
- Local file: `release/builds/via-la-maschera-ios-1.0.0-2.ipa`
- Status checked on 2026-05-08: `FINISHED` and submitted to App Store Connect for processing

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
