# Apple Review Response - 2026-06-08

Rifiuto ricevuto per versione `1.0 (2)`:

- `Guideline 5.1.1(v) - Legal: Privacy - Data Collection and Storage`

Apple ha indicato che la pagina di cancellazione richiedeva ancora l'invio di una email. Per App Review questo non basta, perche' l'app supporta account Google/Apple e deve permettere di avviare e completare la cancellazione dall'app, salvo casi altamente regolati che non si applicano a Via la Maschera.

## Correzioni nel codice

Build correttiva da generare:

- Versione: `1.0.0`
- Build number: `3`

Modifiche:

- aggiunto pulsante `Elimina account e dati` nella pagina in-app `/delete-account`;
- aggiunta conferma esplicita prima della cancellazione;
- rimosso il requisito di inviare email per completare la cancellazione;
- cancellazione in-app dell'archivio cloud utente in Firestore;
- cancellazione delle risposte condivise pubblicate dall'utente;
- cancellazione delle risposte locali salvate sul dispositivo;
- cancellazione dell'account Firebase Authentication corrente;
- registrazione di una richiesta `accountDeletionRequests/{uid}` avviata dall'app per eventuali verifiche interne su dati minimi conservabili per sicurezza/abusi/obblighi legali;
- aggiornate le localizzazioni della pagina cancellazione in italiano, inglese, ucraino, russo e spagnolo;
- aggiornate le regole Firestore per `blockedUsers`, `accountDeletionRequests` e report di tipo `block`.

## Da fare in App Store Connect

1. Generare e caricare nuova build iOS `1.0.0 (3)`.
2. Selezionare la build `1.0.0 (3)` nella versione iOS `1.0`.
3. Nelle `Informazioni per il team di verifica`, spiegare dove si trova la cancellazione:
   - `Profile > Privacy > Account and data deletion`;
   - accedere con Google o Apple;
   - aprire la pagina;
   - usare `Delete account and data`;
   - confermare.
4. Rispondere ad Apple nel Centro risoluzioni con il testo sotto.

## Risposta consigliata ad Apple

```text
Hello App Review team,

Thank you for the review. We have addressed Guideline 5.1.1(v) in the new build.

The app no longer requires users to send an email to complete account deletion. We added an in-app account deletion flow at:

Profile > Privacy > Account and data deletion

When a signed-in user opens this page, the app shows a "Delete account and data" button. The user confirms the action in the app. The flow deletes the user's app account, cloud archive, personal answers, shared answers, associated initials, sync data, and local answers saved on the device. It then deletes the current Firebase Authentication account.

The page text was updated in all supported languages to explain that account deletion is completed inside the app without contacting support.

Thank you.
```

## Test consigliato

1. Accedi con un account tester.
2. Salva una risposta.
3. Se possibile, condividi una risposta con iniziali.
4. Vai in `Profilo > Privacy > Cancellazione account e dati`.
5. Tocca `Elimina account e dati`.
6. Tocca `Conferma eliminazione`.
7. Verifica che l'utente venga scollegato e che l'account non sia piu' presente in Firebase Authentication.
