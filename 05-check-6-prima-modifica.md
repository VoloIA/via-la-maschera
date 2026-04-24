# Check 6: Prima Modifica Semplice

Obiettivo di questo checkpoint:

Cambiare un testo nella schermata iniziale dell'app e vedere l'aggiornamento nel browser.

## File da modificare

La schermata iniziale indica questo file:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Expo lo mostra anche nella pagina:

```text
Edit app/(tabs)/index.tsx to see changes.
```

## Cosa faremo

Faremo una modifica molto piccola, per esempio cambiare:

```text
Welcome!
```

in:

```text
La mia prima app
```

## Regola importante

Non modifichiamo tanti file insieme.

Prima facciamo una modifica minima, poi controlliamo nel browser che funzioni.

## Check finale

Il Check 6 sara superato quando vedremo il nuovo testo nella pagina.

## Modifica eseguita

File modificato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Riga modificata:

```tsx
<ThemedText type="title">La mia prima app</ThemedText>
```

Ora bisogna controllare il browser.

Se la pagina non si aggiorna da sola, premere:

```text
F5
```

## Verifica tecnica

Eseguito controllo lint:

```powershell
npm.cmd run lint
```

Risultato:

Nessun errore segnalato.

## Esito

Check 6 superato.

Il titolo della schermata iniziale e stato cambiato in:

```text
La mia prima app
```
