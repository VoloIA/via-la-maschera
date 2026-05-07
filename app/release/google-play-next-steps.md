# Google Play - prossimi passi

Questa guida riprende il lavoro quando sarà disponibile un telefono Android fisico per completare la verifica del developer account.

## Stato attuale

- Account Google Play personale creato.
- Verifica identità approvata.
- Verifica dispositivo Android ancora da completare.
- Verifica telefono ancora bloccata finché Google non sblocca le attività successive.
- App non ancora creata in Play Console perché l'account richiede le verifiche finali.

## Blocco da completare con Android

Serve un telefono Android reale:

- Android 10 o superiore;
- Google Play Store funzionante;
- app Google Play Console installabile;
- dispositivo non rootato.

Procedura:

1. Apri Play Console da PC.
2. Nella Home clicca `Verify that you have access to an Android mobile device`.
3. Clicca `View details`.
4. Scansiona il QR code con il telefono Android.
5. Installa o apri l'app `Google Play Console`.
6. Accedi con lo stesso account Google del developer account.
7. Seleziona l'account sviluppatore `ViaLaMaschera`.
8. Tocca `Verify`.
9. Torna su PC e aggiorna Play Console.

Fonte ufficiale: https://support.google.com/googleplay/android-developer/answer/14316361

## Subito dopo la verifica Android

1. Completa `Verify your contact phone number`.
2. Crea la prima app:
   - Nome app: `Via la Maschera`
   - Lingua predefinita: `Italiano`
   - Tipo: `App`
   - Prezzo: `Gratis`
   - Email supporto: `volodymyr.ilchenko.it@gmail.com`
3. Accetta Developer Program Policies, US export laws e Play App Signing.

Guida ufficiale creazione app: https://support.google.com/googleplay/android-developer/answer/9859152

## File pronti per Play Console

- Android App Bundle: `release/builds/via-la-maschera-1.0.0-1.aab`
- Feature graphic: `release/play-store-assets/feature-graphic-it.png`
- Screenshot telefono: `release/play-store-assets/phone/`
- Testi scheda store: `release/store-listing.md`
- Guida compilazione campi: `release/play-console-fill-in.md`
- Note Data safety: `release/data-safety-notes.md`

## Track consigliata

Per un account personale nuovo, Google può richiedere un test chiuso prima della produzione.

Ordine consigliato:

1. Test interno, per controllare che l'AAB sia installabile.
2. Test chiuso, se richiesto.
3. Richiesta accesso produzione.
4. Produzione pubblica.

Fonte ufficiale test: https://support.google.com/googleplay/android-developer/answer/9845334

## Se Google richiede 12 tester per 14 giorni

Google richiede ai nuovi account personali un test chiuso con almeno 12 tester che restano iscritti per 14 giorni consecutivi prima di chiedere accesso alla produzione.

Checklist tester:

- raccogli almeno 14 indirizzi Gmail, così hai margine;
- crea una lista tester in Play Console;
- invia il link opt-in;
- chiedi ai tester di accettare il test, installare l'app e aprirla qualche volta durante i 14 giorni;
- fai provare login Google, domanda quotidiana, archivio, condivisione, segnalazione, tema chiaro/scuro e lingue;
- dopo 14 giorni, richiedi accesso alla produzione dalla Dashboard.

Fonte ufficiale requisiti test: https://support.google.com/googleplay/android-developer/answer/14151465

Messaggio breve per invitare tester:

```text
Ciao! Sto testando la prima versione Android di Via la Maschera su Google Play.
Mi aiuteresti entrando nel test chiuso? Basta aprire il link opt-in, installare l'app, provarla qualche volta nei prossimi 14 giorni e dirmi se noti problemi.
L'app è gratuita e serve solo per riflessione personale: una domanda al giorno, archivio privato e condivisione opzionale con iniziali.
```

## Controlli prima dell'invio a Google

- Privacy policy pubblica: `https://voloia.github.io/via-la-maschera/privacy`
- Cancellazione dati pubblica: `https://voloia.github.io/via-la-maschera/delete-account`
- Termini pubblici: `https://voloia.github.io/via-la-maschera/terms`
- Scheda store senza promesse mediche, terapeutiche o diagnostiche.
- UGC dichiarato: risposte condivise opzionali, iniziali, regole community, segnalazione in-app.
- Data safety coerente con Firebase Auth, Firestore, Google Sign-In e condivisione opzionale.
