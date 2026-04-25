# Check 16: Rifinitura UI e Tono

Obiettivo:

Rendere Via la Maschera piu coerente, magnetica e meno tecnica nell'esperienza utente.

## Perche serviva

Dopo logo, archivio e percorsi, alcune schermate contenevano ancora testi da progetto in costruzione.

In una app reale l'utente non deve vedere:

- percentuali di sviluppo;
- spiegazioni sui costi API;
- note troppo tecniche;
- motivazioni marketing interne.

Deve sentire:

```text
sono dentro un rito
```

## File creato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\brand.ts
```

Contiene:

- colori brand;
- nome progetto;
- promessa principale.

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\theme.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
```

## Cosa abbiamo migliorato

- palette coerente;
- tab bar brandizzata;
- Home piu rituale;
- Percorsi piu narrativi;
- Archivio piu pulito;
- testi meno tecnici;
- superfici e bordi piu uniformi.

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
55%
```

Siamo al 55% perche l'app ha funzioni iniziali, archivio, percorsi, logo e una UI piu coerente.

