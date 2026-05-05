# Check 21: Accesso Google e risposte condivise

Obiettivo:

Preparare la app per passare da diario locale a esperienza personale con account Google e stanza condivisa.

## Cosa volevamo ottenere

- accesso tramite Google;
- risposte conservate per ogni utente;
- possibilita di leggere risposte casuali degli altri;
- lettura consentita solo se l’utente ha risposto alla stessa domanda;
- visualizzazione degli altri solo con iniziali, non con nome completo.

## Scelta tecnica

Backend scelto:

```text
Firebase Authentication + Cloud Firestore
```

Motivo:

Firebase permette di collegare Google Login e database con regole di sicurezza, senza costruire subito un server proprietario.

## File creati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\auth-context.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\firebase.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\.env.example
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\README.md
```

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\package-lock.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
```

## Cosa funziona nel codice

- provider globale di autenticazione;
- pulsante `Entra con Google` nella Home;
- stato account nella Home;
- salvataggio remoto delle risposte quando l’utente è entrato;
- sincronizzazione tra archivio locale e remoto;
- identificatore stabile della domanda (`questionKey`);
- stanza `Voci dagli altri` nell’Archivio;
- lettura casuale di risposte alla stessa domanda;
- iniziali al posto del nome completo;
- regole Firestore per proteggere risposte private e letture condivise.

## Regola di privacy

La risposta privata dell’utente vive in:

```text
users/{uid}/entries/{entryId}
```

La copia condivisibile vive in:

```text
questions/{questionKey}/answers/{uid_dateKey}
```

La copia condivisibile contiene:

- risposta;
- iniziali;
- domanda;
- percorso;
- data;
- uid tecnico per sicurezza.

Non contiene il nome completo.

## Cosa manca fuori dal codice

Per far funzionare davvero il login bisogna creare un progetto Firebase reale e compilare:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\.env
```

partendo da:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\.env.example
```

Bisogna anche pubblicare:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
```

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-auth
```

Risultato:

Nessun errore segnalato.

## Percentuale progetto

```text
80%
```

Siamo all’80% perché la struttura social e cloud è pronta nel codice, ma il backend Firebase reale va ancora configurato con chiavi e regole pubblicate.
