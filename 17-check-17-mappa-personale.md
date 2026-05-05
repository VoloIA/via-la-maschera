# Check 17: Mappa personale

Obiettivo:

Rendere l'Archivio piu vivo, non solo una lista di risposte salvate.

## Perche serviva

Dopo rituale, percorsi e archivio, l'utente poteva vedere le singole risposte, ma non ancora una piccola lettura d'insieme.

La mappa personale serve a far emergere:

- quale maschera compare piu spesso;
- quante tracce sono gia state lasciate;
- quando si aprira il prossimo specchio sigillato;
- il senso di continuita del percorso.

## File aggiornato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
```

## Cosa abbiamo aggiunto

- pannello `Mappa personale`;
- calcolo della maschera piu ricorrente;
- conteggio delle tracce salvate;
- indicazione del prossimo specchio da aprire;
- messaggio quando tutti gli specchi sono gia aperti.

## Scelta tecnica

La mappa usa solo i dati locali gia salvati nell'Archivio.

Non aggiunge:

- account;
- server;
- API esterne;
- costi;
- nuove dipendenze.

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
60%
```

Siamo al 60% perche l'app ora non conserva solo risposte, ma inizia a restituire una lettura personale del percorso.
