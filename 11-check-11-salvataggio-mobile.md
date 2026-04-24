# Check 11: Salvataggio Locale Mobile

Obiettivo:

Rendere il salvataggio della risposta compatibile con telefono, non solo con browser.

## Problema precedente

Nel Check 10 il prototipo salvava usando una logica adatta soprattutto al web.

Per una app mobile vera serviva una soluzione persistente locale per:

- Android;
- iOS;
- web.

## Soluzione scelta

Abbiamo installato:

```text
@react-native-async-storage/async-storage
```

Comando usato:

```powershell
npx.cmd expo install @react-native-async-storage/async-storage
```

Secondo la documentazione Expo, AsyncStorage e una soluzione persistente, asincrona e non criptata per dati chiave/valore, compatibile con Android, iOS e web.

Fonte:

```text
https://docs.expo.dev/versions/latest/sdk/async-storage/
```

## File creato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\local-storage.ts
```

Questo file contiene tre funzioni:

```text
getLocalItem
setLocalItem
removeLocalItem
```

## File aggiornato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Ora la risposta sigillata usa AsyncStorage.

## Strategia costi API

Resta invariata:

```text
0 chiamate API AI nella prima versione
```

Prima validiamo il rituale.

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

## Percentuale progetto

Nome progetto:

```text
Via la Maschera
```

Percentuale:

```text
30%
```

Siamo al 30% perche ora la prima funzione reale ha anche una base di salvataggio mobile.

