# Check 20: Percorsi interattivi

Obiettivo:

Trasformare la schermata `Percorsi` da semplice elenco narrativo a spazio esplorabile.

## Perché serviva

I percorsi esistevano già, ma l’utente poteva solo guardarli.

Ora può toccare una maschera e vedere quali domande appartengono a quel mondo emotivo.

## File aggiornato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
```

## Cosa abbiamo aggiunto

- selezione dei percorsi;
- evidenza visiva del percorso attivo;
- anteprima delle domande custodite da ogni maschera;
- conteggio delle domande restanti;
- stato narrativo per il percorso `Ombra`, ancora bloccato;
- nessuna nuova dipendenza.

## Scelta di prodotto

Non mostriamo tutto come una lista tecnica.

Mostriamo solo alcune domande del percorso e lasciamo il resto dentro il rito quotidiano. Così la schermata diventa più viva, ma non svuota il meccanismo principale della app.

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
75%
```

Siamo al 75% perché ora anche la sezione Percorsi ha interazione reale, non solo contenuto statico.
