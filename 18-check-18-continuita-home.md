# Check 18: Continuita nella Home

Obiettivo:

Far sentire che il rituale non ricomincia da zero ogni giorno.

## Perche serviva

Dopo la mappa personale nell'Archivio, mancava un piccolo richiamo della memoria anche nella Home.

La Home e il primo luogo che l'utente vede. Se mostra solo la domanda del giorno, funziona. Se mostra anche una traccia del cammino gia fatto, diventa piu personale.

## File aggiornato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

## Cosa abbiamo aggiunto

- sezione `Il filo`;
- conteggio delle tracce salvate;
- conteggio degli specchi gia aperti;
- ultima maschera incontrata;
- aggiornamento immediato della memoria dopo il salvataggio della risposta.

## Scelta tecnica

La Home usa lo stesso archivio locale gia esistente.

Non aggiunge:

- login;
- server;
- API esterne;
- nuove librerie;
- logiche premium premature.

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
65%
```

Siamo al 65% perche la app ora comunica continuita anche nella schermata principale, non solo nell'Archivio.
