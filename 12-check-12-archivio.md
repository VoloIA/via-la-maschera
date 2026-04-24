# Check 12: Archivio

Obiettivo:

Creare una sezione Archivio dove l'utente possa ritrovare le proprie risposte e le riflessioni sbloccate.

## Perche e importante

Via la Maschera non deve essere solo una domanda al giorno.

Deve diventare:

```text
un luogo dove l'utente ritrova tracce di se stesso
```

L'Archivio aumenta:

- ritorno quotidiano;
- valore emotivo;
- senso di progressione;
- memoria personale;
- possibilita futura di premium.

## Cosa abbiamo costruito

Nuova tab:

```text
Archivio
```

Contiene:

- numero totale di risposte;
- numero di riflessioni aperte;
- lista delle risposte;
- stato `Sigillata` o `Aperta`;
- riflessione visibile solo quando sono passate 24 ore.

## Logica tecnica

Abbiamo creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
```

Questo file contiene:

- tipo `DailyEntry`;
- calcolo della domanda giornaliera;
- creazione della riflessione locale;
- caricamento storico;
- salvataggio storico;
- migrazione dal vecchio salvataggio singolo.

## File creati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
```

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\ui\icon-symbol.tsx
```

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

## Nome progetto

```text
Via la Maschera
```

## Percentuale progetto

```text
35%
```

Siamo al 35% perche ora esiste uno storico personale, fondamentale per retention e valore percepito.

