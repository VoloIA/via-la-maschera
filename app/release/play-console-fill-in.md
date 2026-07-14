# Play Console - guida di compilazione

Ultimo controllo operativo: 2026-05-06.

Questa guida serve a compilare Google Play Console per la prima pubblicazione Android di `Via la Maschera`. Non sostituisce una revisione legale, ma traduce l'app reale nei campi richiesti dallo store.

## Fonti ufficiali

- Creazione app e scheda store: https://support.google.com/googleplay/android-developer/answer/9859152
- Preparazione app per review e App content: https://support.google.com/googleplay/android-developer/answer/9859455
- Test interno, chiuso e aperto: https://support.google.com/googleplay/android-developer/answer/9845334
- Requisiti test per nuovi account personali: https://support.google.com/googleplay/android-developer/answer/14151465
- Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- User Data policy: https://support.google.com/googleplay/android-developer/answer/9888076
- Account deletion requirement: https://support.google.com/googleplay/android-developer/answer/13327111
- User-generated content policy: https://support.google.com/googleplay/android-developer/answer/9876937

## Creazione app

Usa questi valori nella schermata `Create app`.

- App name: `Via la Maschera`
- Default language: `Italian (Italy)`
- App or game: `App`
- Free or paid: `Free`
- Support email: `volodymyr.ilchenko.it@gmail.com`
- Developer Program Policies: accept
- US export laws: accept
- Play App Signing: accept

Valori tecnici da verificare prima dell'upload:

- Package name: `com.vialamaschera.app`
- Version name: `1.1.0`
- Version code: `2`
- Build type: Android App Bundle `.aab`
- EAS project: `@via_lamaschera/via-la-maschera`

## Store listing

Categoria consigliata:

- Category: `Lifestyle`
- Tags: scegli tag sobri legati a journaling, reflection, wellbeing solo se disponibili e coerenti.

Contatti e link pubblici:

- Website: `https://voloia.github.io/via-la-maschera/`
- Privacy policy: `https://voloia.github.io/via-la-maschera/privacy`
- Account and data deletion: `https://voloia.github.io/via-la-maschera/delete-account`
- Terms and community rules: `https://voloia.github.io/via-la-maschera/terms`
- Support email: `volodymyr.ilchenko.it@gmail.com`
- Instagram: `https://www.instagram.com/via_lamaschera/`

Short description consigliata:

```text
Una domanda al giorno, risposte private e una riflessione dopo 20 minuti.
```

Full description: usa la bozza in `release/store-listing.md`.

Asset grafici pronti:

- Feature graphic: `release/play-store-assets/feature-graphic-it.png`
- Specifica verificata: `1024x500`, PNG 24-bit senza alpha.
- Screenshot: seguire la shot list in `release/play-store-assets/README.md`.

Evita nella scheda store:

- terapia;
- diagnosi;
- consulenza psicologica;
- cura;
- risultati emotivi garantiti;
- promesse mediche o cliniche.

## App content

### Privacy Policy

Inserisci:

```text
https://voloia.github.io/via-la-maschera/privacy
```

Google richiede una privacy policy pubblica, attiva, non geobloccata e coerente con il Data safety form.

### App Access

Scelta consigliata:

- Se Play Console chiede se parti dell'app sono limitate: `All or some functionality is restricted`.
- Motivo: l'accesso Google serve per recuperare archivio cloud e stanza condivisa.

Istruzioni per reviewer:

```text
The app can be opened without a paid account. Google Sign-In is used for cloud archive, sharing, reporting, and account deletion requests. To test the protected features, sign in with a Google account, answer the daily question, open the Archive, and optionally share the answer with initials only. Shared answers become visible only after the reviewer has answered the same question.
```

Se Google richiede credenziali di test e non accetta il login personale del reviewer, prepara un account Google dedicato ai test e inseriscilo nella sezione `App access`.

### Ads

Risposta:

```text
No, my app does not contain ads.
```

### Content Rating

Risposte consigliate, se il questionario corrisponde:

- No gambling.
- No real-money purchases.
- No dating or sexual content.
- No violence.
- No illegal drug promotion.
- No medical diagnosis or treatment.
- UGC present: yes, limited written answers visible only after reciprocity and with reporting.

Nota importante: se una domanda chiede se gli utenti possono pubblicare contenuti visibili ad altri utenti, rispondi `Yes`, perché la stanza condivisa è UGC anche se è molto protetta.

### Target Audience

Scelta prudente consigliata:

```text
18 and over
```

Motivo: l'app tratta riflessione personale e contenuti scritti dagli utenti. Non è progettata specificamente per bambini.

Se in futuro vuoi includere minori, serve una revisione dedicata di privacy, moderazione, copy e policy Families.

### News Apps

Risposta:

```text
No.
```

### COVID-19, Health, Government, Financial Features

Risposte consigliate:

```text
No.
```

L'app non deve essere presentata come strumento sanitario, clinico, finanziario o governativo.

## Data safety

### Data collection

Dichiara la raccolta dei dati solo per le funzioni effettivamente attive.

Categorie probabili da dichiarare:

- Personal info: name, email address.
- App activity / user content: written answers, shared answers, reports.
- Device or other IDs: Firebase/Auth technical identifiers, se il modulo li richiede per gli SDK usati.

Possibili dati tecnici trattati dai servizi:

- Firebase UID;
- Google account email;
- Google display name;
- eventuale immagine profilo Google se resa disponibile dall'account;
- risposte personali;
- stato di condivisione;
- segnalazioni;
- data e metadati minimi delle risposte.

### Purposes

Per Personal info:

- App functionality;
- Account management;
- Security, fraud prevention, and compliance.

Per User content:

- App functionality;
- Moderation;
- Security, fraud prevention, and compliance.

Per Device or other IDs, se dichiarati:

- App functionality;
- Security, fraud prevention, and compliance.

### Sharing

Da dichiarare con attenzione:

- Service providers: Google/Firebase/Expo per autenticazione, sincronizzazione cloud, hosting e infrastruttura tecnica.
- Other users: solo testo della risposta condivisa e iniziali, dentro la stanza della stessa domanda.

Frase operativa:

```text
Shared answers are optional. Other users can see only the shared answer text and initials, and only after answering the same question. Full name, email address, and Google profile are not shown in shared answers.
```

### Security practices

Risposte consigliate:

- Data is encrypted in transit: `Yes`, se Firebase/HTTPS rimane la configurazione di produzione.
- Users can request data deletion: `Yes`.
- Data deletion URL:

```text
https://voloia.github.io/via-la-maschera/delete-account
```

### Account deletion

L'app consente accesso con Google, quindi va dichiarato il percorso di cancellazione.

Percorso in-app:

```text
Profile > Privacy > Delete account and data
```

Percorso web:

```text
https://voloia.github.io/via-la-maschera/delete-account
```

Testo breve per Play Console:

```text
Users can delete their Via la Maschera account and associated data from the in-app delete account page. The in-app flow deletes the app account, cloud archive, shared answers, sync data, and local answers saved on the device without requiring an email to support.
```

## User-generated content

Risposta:

```text
Yes, the app contains limited user-generated content.
```

Descrizione moderazione:

```text
Via la Maschera allows optional sharing of written answers with initials only. Users must accept community rules before sharing. The app prohibits harassment, hate, threats, explicit sexual content, illegal content, personal data of others, and targeted abuse. Users can report every shared answer from inside the app; reported content is hidden locally and stored for moderation review. Sharing can be revoked by the author from the Archive.
```

Punti forti da controllare in app prima dell'invio:

- regole community visibili;
- accettazione termini prima della condivisione;
- pulsante `Segnala` su ogni risposta condivisa;
- possibilità di rendere privata una risposta condivisa;
- iniziali soltanto per gli altri utenti.

## Test Track

Ordine consigliato:

1. Internal testing.
2. Closed testing, se richiesto dall'account.
3. Production.

Internal testing:

- usa fino a 100 tester fidati;
- carica l'Android App Bundle `.aab`;
- aggiungi email Gmail o Google Workspace;
- verifica link opt-in dopo la pubblicazione.

Closed testing:

- se l'account Play Console è personale e creato dopo il 13 novembre 2023, Google richiede un closed test con almeno 12 tester opt-in per 14 giorni continuativi prima di chiedere accesso alla produzione.
- durante il test, fai provare login Google, risposta quotidiana, archivio, condivisione, segnalazione, cancellazione dati, tema chiaro/scuro e lingue.

## Checklist prima di inviare in review

- `.aab` production generato da EAS.
- Build installata e provata su un dispositivo Android reale.
- Google Sign-In funzionante.
- Firestore funzionante con regole pubblicate.
- Privacy, Terms e Delete Account pubblici.
- Data safety coerente con privacy policy.
- App access compilato.
- UGC dichiarato.
- Screenshots pronti per tema chiaro e scuro.
- Store listing italiano completato.
- Traduzioni store aggiunte o pianificate per inglese, ucraino, russo e spagnolo.
- Nessuna promessa di terapia o diagnosi.
