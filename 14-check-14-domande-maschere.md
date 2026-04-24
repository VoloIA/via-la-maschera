# Check 14: Domande Collegate alle Maschere

Obiettivo:

Associare ogni domanda a una maschera emotiva.

## Perche e importante

Prima avevamo:

```text
domande + percorsi separati
```

Ora abbiamo:

```text
ogni domanda appartiene a una maschera
```

Questo rende l'app piu personale, piu leggibile e piu pronta per funzioni premium.

## Maschere usate

```text
Amore
Paura
Successo
Solitudine
Senso
```

`Ombra` resta un percorso futuro.

## File creato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\question-paths.ts
```

Contiene la mappa tra indice della domanda e maschera emotiva.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-paths.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
```

## Cosa vede l'utente

Nella Home:

```text
Maschera [Nome]
La maschera che...
```

Nell'Archivio:

```text
Maschera Amore / Paura / Successo / Solitudine / Senso
```

## Valore marketing

Questo permette messaggi come:

```text
Oggi hai risposto alla maschera Paura.
```

```text
Il tuo archivio parla piu spesso di Solitudine che di Amore.
```

In futuro potremo trasformarlo in insight premium senza chiamare API per ogni schermata.

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
45%
```

Siamo al 45% perche la app ora non conserva solo risposte, ma le classifica in percorsi emotivi.

