# Diario Checkpoint

Data di lavoro: 2026-04-25

## Check 1: controllo cartella iniziale

Cartella scelta:

```text
C:\Users\intel i7 11700\Desktop\AppMobile
```

Risultato:

- La cartella esiste.
- La cartella era vuota.
- Non c'era ancora un progetto mobile da analizzare.

Conclusione:

Prima di modificare o avviare qualcosa, dobbiamo creare un nuovo progetto da zero.

## Scelta tecnologia

Abbiamo scelto Expo.

Motivo:

- E adatto a chi inizia.
- Permette di creare app mobile con React Native.
- Riduce la configurazione iniziale.
- Permette di provare l'app anche con Expo Go su telefono.

## Check 2: installazione Node.js

Abbiamo scaricato Node.js dal sito ufficiale:

```text
https://nodejs.org/en/download
```

Scelta consigliata:

```text
Windows Installer (.msi)
```

Cartella di installazione usata:

```text
C:\Program Files\nodejs\
```

Abbiamo lasciato le opzioni predefinite dell'installer.

## Verifica Node.js

Comando usato in PowerShell:

```powershell
node --version
```

Risultato:

```text
v24.15.0
```

Esito:

Node.js e installato correttamente.

## Verifica npm

Il comando normale:

```powershell
npm --version
```

ha dato un errore di PowerShell:

```text
L'esecuzione di script e disabilitata nel sistema in uso.
```

Significato:

npm non era rotto. PowerShell stava bloccando lo script `npm.ps1` per una regola di sicurezza.

Soluzione semplice usata:

```powershell
npm.cmd --version
```

Risultato:

```text
11.12.1
```

## Verifica npx

Comando usato:

```powershell
npx.cmd --version
```

Risultato:

```text
11.12.1
```

Esito Check 2:

Superato.

## Check 3: creazione progetto Expo

Stato:

Superato.

Obiettivo:

Creare il progetto Expo dentro una sottocartella chiamata:

```text
app
```

Motivo:

- La cartella principale `AppMobile` contiene la documentazione.
- La sottocartella `app` conterra il codice vero dell'app mobile.

Tentativo fatto da Codex:

```powershell
npx create-expo-app@latest app
```

Risultato:

Il terminale interno di Codex e stato bloccato da un errore di accesso/download.

Conclusione:

Il comando andava lanciato dal PowerShell dell'utente, dove Node.js, npm e npx erano gia stati verificati.

Passaggio manuale eseguito:

1. Aperto PowerShell.
2. Entrati nella cartella del progetto:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile"
```

3. Creato il progetto Expo:

```powershell
npx.cmd create-expo-app@latest app
```

Risultato importante:

```text
Downloaded and extracted project files.
added 910 packages
Your project is ready!
```

## Note sui messaggi npm

Durante l'installazione sono comparsi messaggi come:

```text
npm warn deprecated ...
14 moderate severity vulnerabilities
```

Per ora non interveniamo.

Regola:

Non lanciare questo comando senza controllo:

```powershell
npm audit fix --force
```

Motivo:

Potrebbe aggiornare pacchetti in modo aggressivo e rompere il progetto appena creato.

## Stato attuale

Il progetto Expo esiste nella cartella:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app
```

File/cartelle principali trovati:

- `package.json`
- `app.json`
- `package-lock.json`
- `node_modules`
- `app`
- `assets`
- `components`
- `constants`
- `hooks`

Prossimo checkpoint:

Check 4: avviare l'app.

## Check 4: avvio app Expo

Stato:

Superato.

Comando usato nella cartella dell'app:

```powershell
npx.cmd expo start
```

Risultato:

Expo ha avviato Metro Bundler.

Righe importanti viste nel terminale:

```text
Metro waiting on exp://192.168.1.74:8081
Web is waiting on http://localhost:8081
Logs for your project will appear below. Press Ctrl+C to exit.
```

Significato:

- Il server di sviluppo Expo e attivo.
- Il QR code serve per aprire l'app su telefono con Expo Go.
- L'indirizzo `http://localhost:8081` serve per aprire l'app nel browser.

Nota:

Nel terminale e comparso anche un errore `Get-Process` perche e stata incollata per sbaglio una riga che iniziava con `PS C:\...`. Non e un problema del progetto.

Regola:

Quando si copiano comandi da una guida, copiare solo il comando, non la parte iniziale `PS C:\...`.

Prossimo checkpoint:

Check 5: provare l'app.

## Check 5: prova app nel browser

Stato:

Superato.

Metodo usato:

Abbiamo aperto l'app nel browser all'indirizzo:

```text
http://localhost:8081
```

Risultato visivo:

La schermata iniziale Expo e comparsa correttamente.

Testo visto nella pagina:

```text
Welcome!
Step 1: Try it
Step 2: Explore
Step 3: Get a fresh start
```

Significato:

- Expo funziona.
- Il server locale funziona.
- Il progetto creato e valido.
- Possiamo iniziare a modificare l'app.

Prossimo checkpoint:

Check 6: prima modifica semplice.

## Check 6: prima modifica semplice

Stato:

Superato.

File modificato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Modifica fatta:

```tsx
<ThemedText type="title">La mia prima app</ThemedText>
```

Prima il testo era:

```text
Welcome!
```

Ora il testo e:

```text
La mia prima app
```

Check da fare:

Guardare il browser aperto su:

```text
http://localhost:8081
```

Se il browser non si aggiorna da solo, premere F5.

Verifica tecnica eseguita:

```powershell
npm.cmd run lint
```

Risultato:

Nessun errore segnalato.

## Check 7: salvataggio ordinato

Stato:

Superato.

Motivo:

Ora che l'app parte e la prima modifica funziona, dobbiamo iniziare a salvare il lavoro in modo serio.

Strumento consigliato:

Git.

Cos'e Git in parole semplici:

Git e un sistema che salva la storia del progetto. Permette di tornare indietro se rompiamo qualcosa e di capire quali file sono cambiati.

Controllo fatto:

```powershell
git --version
```

Risultato:

Git non e installato o non e riconosciuto da PowerShell.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\.gitignore
```

Motivo del file `.gitignore`:

Dice a Git di non salvare file inutili o pesanti, come `node_modules`, cache, log e screenshot.

Prossimo passaggio:

Git per Windows e stato installato.

Versione verificata:

```text
git version 2.54.0.windows.1
```

Repository inizializzato:

```powershell
git init
```

File preparati per il primo salvataggio:

```powershell
git add .
```

Nota:

I messaggi `LF will be replaced by CRLF` sono normali su Windows. Significano che Git adattera i fine riga al formato Windows.

Nota di sicurezza Git:

Poiche il repository e stato inizializzato da Codex, Git ha rilevato una differenza tra l'utente tecnico di inizializzazione e l'utente Windows reale.

Per evitare avvisi futuri in PowerShell, abbiamo segnato questa cartella come sicura:

```powershell
git config --global --add safe.directory "C:/Users/intel i7 11700/Desktop/AppMobile"
```

Primo salvataggio creato:

```powershell
git commit -m "Primo salvataggio app Expo"
```

## Check 8: base iniziale app

Stato:

Superato.

Obiettivo:

Togliere la sensazione di template Expo e creare una base iniziale nostra.

File modificati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
```

Cambiamenti:

- Home trasformata in schermata stato progetto.
- Tab `Explore` rinominata in `Percorso`.
- Seconda schermata trasformata in riepilogo checkpoint.
- Nome Expo cambiato da `app` a `AppMobile`.
- Slug cambiato da `app` a `appmobile`.

Verifica tecnica:

```powershell
npm.cmd run lint
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
15%
```

Significato:

La base tecnica funziona, ma non abbiamo ancora deciso lo scopo vero della app, le funzioni principali, il design finale, i test, le build e la pubblicazione store.

Prossimo checkpoint:

Check 9: scegliere lo scopo della app.
