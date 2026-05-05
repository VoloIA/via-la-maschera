# Check 24: Revoca della condivisione

Obiettivo:

Permettere all’utente di cambiare idea dopo aver condiviso una risposta.

## Perché serviva

Il consenso non è davvero consenso se non può essere ritirato.

Una risposta può sembrare condivisibile oggi e troppo personale domani. L’app deve rispettare questa possibilità.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
```

## Cosa abbiamo aggiunto

- pulsante `Rendi privata` nella sezione `Voci dagli altri`;
- aggiornamento locale della risposta con `shareWithCommunity: false`;
- aggiornamento remoto del documento privato;
- cancellazione della copia condivisa in `questions/{questionKey}/answers`;
- aggiornamento di `answeredQuestions` con `shared: false`;
- messaggio di conferma dopo la revoca.

## Effetto

La risposta resta in:

```text
users/{uid}/entries/{entryId}
```

Ma viene rimossa da:

```text
questions/{questionKey}/answers/{uid_dateKey}
```

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
87%
```

Siamo all’87% perché la condivisione ora è reversibile: l’utente può aprire e richiudere una risposta senza perdere il proprio archivio personale.
