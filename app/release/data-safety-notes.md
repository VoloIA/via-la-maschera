# Data safety e App Privacy - note operative

Queste note servono a compilare le schermate privacy degli store. Non sono consulenza legale.

## Fonti ufficiali consultate

- Expo: `eas.json` configura EAS CLI e profili build.
  https://docs.expo.dev/build/eas-json/
- Expo: `ios.bundleIdentifier`, `ios.buildNumber`, `android.package` e `android.versionCode` sono proprietà di app config.
  https://docs.expo.dev/versions/latest/config/app/
- Apple: App Store Connect richiede le informazioni sulle privacy practices per nuove app e aggiornamenti.
  https://developer.apple.com/app-store/app-privacy-details/
- Apple: la Privacy Policy URL è richiesta per tutte le app.
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy
- Google Play: tutti gli sviluppatori devono dichiarare come raccolgono e gestiscono dati utente nel Data safety form.
  https://support.google.com/googleplay/android-developer/answer/10787469

## Dati probabili da dichiarare

### Personal info

- Email: solo con Google Login.
- Name: solo se Google fornisce display name.
- User IDs: Firebase UID.

Uso:

- account management;
- app functionality.

### User content

- Risposte personali;
- risposte condivise;
- segnalazioni.

Uso:

- app functionality;
- moderation e safety per contenuti segnalati.

### App activity o diagnostics

Al momento non sono stati aggiunti analytics proprietari. Verificare eventuali dati tecnici trattati da SDK terzi prima della compilazione finale.

## Dati condivisi

La stanza condivisa mostra solo iniziali e risposta, e solo dopo reciprocità sulla stessa domanda. Questa è comunque una forma di condivisione volontaria di contenuto utente e va dichiarata con attenzione.

Prima della condivisione l'app richiede accettazione esplicita dei termini community. Ogni risposta condivisa contiene la versione termini `2026-05-05` e può essere segnalata in-app.

## Tracking

Al momento non sono stati aggiunti advertising SDK o tracking pubblicitario.

## Security practices

Da verificare e dichiarare solo se vero in produzione:

- dati trasmessi tramite connessioni protette;
- possibilità di richiedere cancellazione dati;
- condivisione opzionale e revocabile;
- accesso alle risposte condivise vincolato a login e stessa domanda.
- pagine in-app già presenti: `/privacy`, `/delete-account` e `/terms`;
- URL pubblico stabile da pubblicare prima dello store per privacy, cancellazione dati e termini community.

## Punti da confermare prima dello store

- URL privacy policy pubblica.
- URL pubblico per richiesta cancellazione account/dati.
- URL pubblico termini e regole community.
- Email supporto.
- Procedura cancellazione account/dati.
- Se l'app sarà accessibile ai minori.
- Se Firebase/Google Login saranno attivi già nella prima release.
- Se verranno aggiunti analytics, crash reporting, notifiche push o pagamenti.
