# Check 10: Primo Rituale Giornaliero

Obiettivo:

Costruire la prima meccanica vera di Via la Maschera.

## Meccanica implementata

```text
Domanda del giorno -> risposta -> risposta sigillata -> riflessione dopo 24 ore
```

## Cosa fa ora la app

- mostra una domanda giornaliera;
- permette di scrivere una risposta;
- richiede almeno 8 caratteri;
- sigilla la risposta;
- salva la risposta su web con `localStorage`;
- prepara una riflessione locale;
- mostra la riflessione solo dopo 24 ore;
- comunica chiaramente che non e terapia.

## Domande caricate

Le domande fornite dall'utente sono state inserite in:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-questions.ts
```

Numero domande:

```text
58
```

## Strategia costi API

Prima versione:

```text
0 chiamate API AI
```

Futuro:

- una chiamata AI per risposta;
- solo dopo 24 ore;
- cache della risposta;
- funzione premium o limitata;
- fallback locale.

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
25%
```

Siamo al 25% perche ora esiste una prima funzione reale. Mancano ancora salvataggio mobile robusto, archivio completo, design definitivo, privacy, test su telefono, build e pubblicazione store.

