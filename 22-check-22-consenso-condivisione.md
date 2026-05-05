# Check 22: Consenso alla condivisione

Obiettivo:

Rendere la stanza condivisa più rispettosa: le risposte restano private salvo scelta esplicita dell’utente.

## Perché serviva

Le risposte di `Via la Maschera` possono essere intime.

Anche se mostriamo solo le iniziali, non è corretto trattare ogni risposta salvata nel cloud come automaticamente condivisibile.

## Nuova regola

Una risposta viene sempre salvata nello spazio personale dell’utente.

Diventa leggibile dagli altri solo se l’utente sceglie esplicitamente di aprirla alla stanza condivisa.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\README.md
```

## Cosa abbiamo aggiunto

- campo `shareWithCommunity` su ogni risposta;
- toggle nella Home prima di sigillare la risposta;
- testo chiaro su cosa succede se la condivisione è attiva;
- salvataggio privato anche quando la condivisione è spenta;
- creazione della copia pubblica solo con consenso;
- pulsante in Archivio per condividere una risposta già salvata;
- lettura delle voci altrui solo se quella domanda è stata condivisa;
- regole Firestore aggiornate per richiedere `shared == true`.

## Privacy

La risposta privata resta in:

```text
users/{uid}/entries/{entryId}
```

La copia condivisa nasce solo con consenso e resta in:

```text
questions/{questionKey}/answers/{uid_dateKey}
```

La copia condivisa mostra:

- iniziali;
- risposta;
- domanda;
- percorso;
- data.

Non mostra:

- nome completo;
- email;
- profilo Google.

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
83%
```

Siamo all’83% perché la parte cloud/social ora ha una base privacy più credibile, ma manca ancora la configurazione Firebase reale e un test end-to-end con due utenti.
