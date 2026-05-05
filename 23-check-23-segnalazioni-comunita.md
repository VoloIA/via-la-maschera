# Check 23: Segnalazioni nella stanza condivisa

Obiettivo:

Rendere la stanza condivisa più sicura aggiungendo una prima forma di moderazione.

## Perché serviva

Se l’app permette di leggere risposte di altre persone, anche anonime, deve dare all’utente un modo semplice per reagire a contenuti fuori tono, offensivi o disturbanti.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\README.md
```

## Cosa abbiamo aggiunto

- pulsante `Segnala` sotto ogni risposta condivisa;
- rimozione immediata della risposta segnalata dalla vista locale;
- creazione di un report remoto in Firestore;
- regole Firestore per permettere solo la creazione del proprio report;
- blocco lettura pubblica dei report;
- nessun dato personale visibile nel report oltre al `reporterUid` tecnico.

## Struttura report

```text
reports/{questionKey_answerId_reporterUid}
```

Il report contiene:

- `answerId`;
- `questionKey`;
- `dateKey`;
- `reporterUid`;
- `status: open`;
- `createdAt`.

## Nota

Questa è una moderazione iniziale.

In futuro servirà una piccola console admin o una Cloud Function per:

- contare report multipli;
- oscurare automaticamente una risposta dopo una soglia;
- revisionare manualmente i contenuti.

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

## Percentuale progetto

```text
85%
```

Siamo all’85% perché la stanza condivisa ha ora consenso, privacy e una prima rete di sicurezza.
