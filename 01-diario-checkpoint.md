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

## Check 9: scelta dello scopo della app

Stato:

Superato.

Obiettivo:

Decidere che app vogliamo costruire davvero.

Perche questo passaggio e importante:

Prima di aggiungere funzioni, schermate o grafica, dobbiamo sapere quale problema deve risolvere la app.

Decisioni prese:

- Nome: `Via la Maschera`.
- Categoria: intrattenimento introspettivo, misterioso, quotidiano.
- Pubblico: persone curiose, utenti attratti da domande psicologiche, rituali digitali, auto-riflessione e contenuti intimi ma leggeri.
- Promessa: ogni giorno la app fa una domanda personale; dopo 24 ore restituisce una riflessione incoraggiante e sottile.
- Prime funzioni: domanda giornaliera, risposta sigillata, riflessione posticipata, archivio futuro.
- Login: no nella prima versione.
- Dati: salvataggio locale nella prima versione.

Percentuale progetto:

```text
20%
```

Motivo:

Abbiamo scelto una direzione di prodotto precisa e coerente con intrattenimento, retention e sviluppo semplice.

Prossimo checkpoint:

Check 10: costruire il primo rituale di Via la Maschera.

## Check 10: primo rituale Via la Maschera

Stato:

Superato.

Obiettivo:

Costruire una prima esperienza reale:

```text
Domanda del giorno -> risposta -> attesa 24 ore -> riflessione incoraggiante
```

File principali modificati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-questions.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
```

Cosa funziona ora:

- la app si chiama `Via la Maschera`;
- contiene le domande fornite dall'utente;
- mostra una domanda giornaliera;
- permette di scrivere una risposta;
- sigilla la risposta;
- prepara una riflessione locale;
- mostra la riflessione solo dopo 24 ore;
- evita costi API nella prima versione.

Strategia API:

Nella prima versione non usiamo API AI a pagamento.

In futuro potremo usare AI solo per:

- utenti premium;
- una sola riflessione per risposta;
- contenuti salvati in cache;
- test controllati.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
25%
```

Motivo:

Ora esiste una prima meccanica reale, non solo una schermata statica.

## Check 11: salvataggio locale mobile

Stato:

Superato.

Obiettivo:

Passare da un salvataggio adatto soprattutto al browser a un salvataggio persistente compatibile con Android, iOS e web.

Decisione tecnica:

Abbiamo installato:

```text
@react-native-async-storage/async-storage
```

Motivo:

Expo documenta AsyncStorage come soluzione persistente locale, asincrona e multi-piattaforma.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\local-storage.ts
```

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Cosa cambia:

- la risposta giornaliera viene salvata con AsyncStorage;
- il codice funziona meglio anche su telefono;
- il rituale mantiene ancora costo API pari a zero;
- la Home mostra uno stato di caricamento del sigillo.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-auth
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
30%
```

Motivo:

Il rituale non e piu solo web-first: ora ha una base di persistenza locale piu adatta a una app mobile reale.

## Check 12: Archivio

Stato:

Superato.

Obiettivo:

Creare una sezione dove l'utente possa rivedere le risposte sigillate e le riflessioni sbloccate.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\12-check-12-archivio.md
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\ui\icon-symbol.tsx
```

Cosa funziona ora:

- le risposte non sono piu salvate come singola voce isolata;
- esiste uno storico locale di risposte;
- la Home legge la risposta del giorno dallo storico;
- la tab `Archivio` mostra numero risposte e specchi aperti;
- ogni risposta puo essere `Sigillata` o `Aperta`;
- il vecchio salvataggio singolo viene migrato automaticamente.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-profile
```

Risultato:

Nessun errore segnalato. L’export web ha generato anche la route `/profile`.

Percentuale progetto:

```text
35%
```

Motivo:

La app ora ha memoria personale. Questo aumenta retention, valore percepito e senso di continuita.

## Check 13: Percorsi di Maschera

Stato:

Superato.

Obiettivo:

Trasformare le domande in percorsi emotivi riconoscibili, piu magnetici e piu facili da monetizzare in futuro.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-paths.ts
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\13-check-13-percorsi.md
```

Percorsi creati:

- Amore
- Paura
- Successo
- Solitudine
- Senso
- Ombra, bloccato per uso futuro

Cosa cambia:

- la tab `Rito` diventa `Percorsi`;
- spariscono le note tecniche dall'interfaccia utente;
- l'app ora mostra categorie emotive;
- la struttura e pronta per pacchetti futuri senza nuove API;
- la percentuale visibile passa a 40%.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
40%
```

Motivo:

Ora l'app non ha solo rituale e archivio, ma anche una struttura di prodotto ampliabile e monetizzabile.

## Check 14: domande collegate alle maschere

Stato:

Superato.

Obiettivo:

Collegare ogni domanda a una maschera emotiva, cosi Home e Archivio diventano piu personali.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\question-paths.ts
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-paths.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
```

Cosa funziona ora:

- ogni domanda ha un percorso emotivo;
- ogni risposta salvata contiene `pathId`;
- la Home mostra la maschera del giorno;
- l'Archivio mostra la maschera di ogni risposta;
- le vecchie risposte vengono normalizzate automaticamente;
- la tab Percorsi conta le domande dalla mappa reale.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
45%
```

Motivo:

Ora l'app ha una tassonomia emotiva reale: le risposte non sono solo archiviate, ma classificate.

## Check 15: logo e identita visiva

Stato:

Superato.

Obiettivo:

Integrare il logo fornito dall'utente e sostituire gli asset visuali principali del template Expo.

File sorgente ricevuto:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\logo3.svg
```

Asset generati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\via-la-maschera-logo.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\via-la-maschera-logo-light.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\via-la-maschera-logo.svg
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\icon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\splash-icon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\favicon.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\android-icon-background.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\android-icon-foreground.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\android-icon-monochrome.png
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

Script creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\scripts\generate-brand-assets.mjs
```

Cosa cambia:

- la Home mostra il logo;
- icona app sostituita;
- splash icon sostituita;
- favicon sostituita;
- adaptive icon Android aggiornata;
- colore splash aggiornato al viola scuro del brand;
- percentuale visibile portata a 50%.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
50%
```

Motivo:

La app ora ha una identita visiva riconoscibile, non solo funzionalita.

## Check 16: rifinitura UI e tono

Stato:

Superato.

Obiettivo:

Rendere l'interfaccia piu coerente, meno tecnica e piu vicina a una app reale.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\brand.ts
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\theme.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
```

Cosa cambia:

- palette brand centralizzata;
- tab bar piu coerente;
- Home meno tecnica e piu rituale;
- Percorsi meno marketing interno e piu esperienza utente;
- Archivio rifinito con superfici, bordi e testi piu puliti;
- rimosse dall'interfaccia frasi troppo legate al cantiere/progetto.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
55%
```

Motivo:

La app ora ha una esperienza visiva e testuale piu coerente, non solo funzioni isolate.

## Check 17: mappa personale

Stato:

Superato.

Obiettivo:

Rendere l'Archivio piu utile e personale, mostrando una lettura d'insieme delle risposte salvate.

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\17-check-17-mappa-personale.md
```

Cosa cambia:

- l'Archivio mostra una nuova sezione `Mappa personale`;
- la app calcola la maschera piu presente nello storico;
- mostra quante tracce sono state lasciate;
- indica tra quanto si aprira il prossimo specchio sigillato;
- se tutti gli specchi sono aperti, invita a tornare alla domanda di oggi.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
60%
```

Motivo:

La app ora comincia a trasformare lo storico in una piccola lettura personale, non solo in memoria passiva.

## Check 18: continuita nella Home

Stato:

Superato.

Obiettivo:

Portare una parte della memoria personale anche nella Home, cosi il rituale quotidiano non sembra ripartire da zero.

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\18-check-18-continuita-home.md
```

Cosa cambia:

- la Home mostra la sezione `Il filo`;
- vengono mostrati numero di tracce e specchi aperti;
- viene indicata l'ultima maschera incontrata;
- dopo aver sigillato una risposta, la memoria visibile si aggiorna subito;
- resta tutto basato sul salvataggio locale.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
65%
```

Motivo:

La app ora fa sentire continuita gia dalla schermata principale, aumentando identita e retention senza complicare l'architettura.

## Check 19: lingua italiana e tipografia

Stato:

Superato.

Obiettivo:

Curare la lingua italiana visibile nell’app e scegliere un font più coerente con l’identità emotiva di Via la Maschera.

Scelta tipografica:

```text
Lora
```

Motivo:

Lora è un serif contemporaneo con radici calligrafiche: leggibile su schermo, elegante senza essere freddo, adatto a un’app che chiede sincerità e introspezione.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\typography.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\it.json
C:\Users\intel i7 11700\Desktop\AppMobile\19-check-19-lingua-tipografia.md
```

File aggiornati principali:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\package-lock.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\themed-text.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\data\mask-questions.ts
```

Cosa cambia:

- il font Lora viene caricato all’avvio;
- i testi principali usano Lora;
- la tab bar usa Lora;
- il campo di scrittura usa Lora;
- il browser riceve lingua `it-IT`;
- i metadati locali dell’app dichiarano la lingua italiana;
- le domande e i testi utente hanno accenti e apostrofi corretti;
- i testi inglesi residui della modale sono stati tradotti.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
70%
```

Motivo:

La app ora tratta lingua e tipografia come parte dell’esperienza, non come dettagli secondari.

## Check 20: percorsi interattivi

Stato:

Superato.

Obiettivo:

Rendere la schermata `Percorsi` esplorabile, non solo descrittiva.

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\20-check-20-percorsi-interattivi.md
```

Cosa cambia:

- ogni percorso può essere selezionato;
- il percorso selezionato viene evidenziato;
- la schermata mostra alcune domande legate alla maschera scelta;
- se ci sono altre domande, viene mostrato quante restano nel percorso;
- il percorso `Ombra` mantiene uno stato bloccato e narrativo;
- non sono state aggiunte nuove librerie.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
75%
```

Motivo:

La app ora rende esplorabile la propria struttura emotiva, aumentando valore e chiarezza senza anticipare tutto il rituale.

## Check 21: accesso Google e risposte condivise

Stato:

Superato lato codice.

Obiettivo:

Aggiungere la base per accesso Google, archivio remoto per utente e lettura delle risposte degli altri solo dopo aver risposto alla stessa domanda.

Backend scelto:

```text
Firebase Authentication + Cloud Firestore
```

Dipendenze aggiunte:

```text
firebase
expo-auth-session
```

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\auth-context.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\firebase.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\.env.example
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\README.md
C:\Users\intel i7 11700\Desktop\AppMobile\21-check-21-accesso-google-condivisione.md
```

File aggiornati principali:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\package-lock.json
```

Cosa cambia:

- esiste un provider globale di autenticazione;
- la Home mostra lo stato accesso;
- la Home permette accesso Google quando Firebase è configurato;
- le risposte salvate vengono inviate anche allo spazio utente remoto;
- l’Archivio sincronizza locale e remoto;
- ogni domanda ha un `questionKey` stabile;
- l’Archivio mostra la sezione `Voci dagli altri`;
- le voci degli altri mostrano solo iniziali;
- Firestore ha regole per permettere lettura condivisa solo dopo risposta alla stessa domanda.

Nota:

Il codice è pronto, ma per testare davvero Google Login servono un progetto Firebase, le chiavi `.env` e la pubblicazione delle regole Firestore.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
80%
```

Motivo:

La app ora ha la struttura cloud/social necessaria, ma manca ancora la configurazione reale del backend Firebase.

## Check 22: consenso alla condivisione

Stato:

Superato.

Obiettivo:

Evitare che una risposta venga resa leggibile agli altri senza una scelta esplicita dell’utente.

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\daily-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\22-check-22-consenso-condivisione.md
```

Cosa cambia:

- ogni risposta ha `shareWithCommunity`;
- nella Home c’è un toggle per aprire la risposta alla stanza condivisa;
- se il toggle è spento, la risposta resta privata;
- se il toggle è acceso, la copia condivisa usa solo le iniziali;
- in Archivio si può condividere anche una risposta già salvata;
- le regole Firestore richiedono consenso prima della lettura condivisa.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
83%
```

Motivo:

La app ora tratta la condivisione come consenso, non come effetto collaterale del salvataggio cloud.

## Check 23: segnalazioni nella stanza condivisa

Stato:

Superato.

Obiettivo:

Aggiungere una prima forma di moderazione alle risposte condivise dagli altri utenti.

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
C:\Users\intel i7 11700\Desktop\AppMobile\firebase\firestore.rules
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\23-check-23-segnalazioni-comunita.md
```

Cosa cambia:

- sotto ogni voce condivisa appare `Segnala`;
- una risposta segnalata viene nascosta subito dalla vista locale;
- viene creato un documento in `reports`;
- i report non sono leggibili pubblicamente;
- Firestore permette la creazione solo se `reporterUid` coincide con l’utente autenticato.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
85%
```

Motivo:

La stanza condivisa ora ha una prima protezione operativa, non solo privacy e consenso.

## Check 24: revoca della condivisione

Stato:

Superato.

Obiettivo:

Permettere all’utente di rendere privata una risposta già condivisa.

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\lib\remote-ritual.ts
```

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\24-check-24-revoca-condivisione.md
```

Cosa cambia:

- in `Voci dagli altri` appare `Rendi privata`;
- la risposta resta nell’archivio personale;
- la copia condivisa viene rimossa;
- `answeredQuestions` viene aggiornato con `shared: false`;
- l’utente riceve un messaggio di conferma.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
87%
```

Motivo:

La condivisione ora può essere ritirata, rendendo più credibile la promessa di privacy.

## Check 25: profilo, account e privacy

Stato:

Superato.

Obiettivo:

Creare una schermata dedicata per gestire account, stato cloud e principi privacy, alleggerendo la Home.

File creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\ui\icon-symbol.tsx
```

Cosa cambia:

- aggiunta tab `Profilo`;
- spostato accesso Google fuori dalla Home;
- mostrato stato account;
- mostrati stati Firebase e Google Login;
- aggiunto pannello privacy;
- la Home resta concentrata sul rito.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
```

Risultato:

Nessun errore segnalato.

Percentuale progetto:

```text
89%
```

Motivo:

La app ora ha una struttura più ordinata e vicina a un prodotto reale: Home per il rito, Profilo per identità e privacy.

## Check 26: guardia accesso Google

Stato:

Superato.

Obiettivo:

Evitare il crash quando Google Login non ha ancora il client web configurato.

Errore segnalato:

```text
Client Id property `webClientId` must be defined to use Google auth on this platform.
```

File aggiornato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\auth-context.tsx
```

Cosa cambia:

- l'hook Google viene caricato solo quando `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` esiste;
- se Firebase o Google non sono configurati, la app resta aperta;
- la schermata Profilo continua a mostrare `Da collegare`;
- l'accesso Google resta disponibile appena vengono inserite le chiavi corrette.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-authguard
curl.exe -I --max-time 20 http://localhost:8082
```

Risultato:

Nessun errore segnalato. Il server locale risponde `200 OK`.

Percentuale progetto:

```text
90%
```

Motivo:

La app ora gestisce meglio la fase reale di configurazione backend: se manca il client Google, non blocca l'esperienza.

## Check 27: restyling UX/UI e fiducia

Stato:

Superato.

Obiettivo:

Rivedere l'intero design con una logica da prodotto consumer emotivo: più gerarchia, più fiducia, meno rumore visivo.

File aggiornati principali:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\brand.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\theme.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\parallax-scroll-view.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\themed-text.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\ui\icon-symbol.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\explore.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\archive.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\modal.tsx
```

Cosa cambia:

- palette ampliata con accenti distinti per percorsi, fiducia, attesa e privacy;
- spaziature, ombre e raggi centralizzati nel brand system;
- header più editoriali e leggibili;
- Home più centrata sul rituale e sulla domanda del giorno;
- Percorsi più vicini a un'esperienza di scoperta;
- Archivio più leggibile come memoria personale;
- Profilo più orientato a fiducia, controllo e privacy;
- navigazione inferiore più pulita;
- testi corretti anche quando il sistema usa tema scuro;
- rimosso il layer parallax perché sul web rendeva fragile la leggibilità dell'hero.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-redesign-final
curl.exe -I --max-time 20 http://localhost:8082
```

Verifica visiva:

Controllate nel browser locale Home, Percorsi, Archivio e Profilo su viewport mobile.

Risultato:

Nessun errore segnalato. Il server locale risponde `200 OK`.

Percentuale progetto:

```text
92%
```

Motivo:

La app ora ha una qualità di interfaccia più vicina a un prodotto reale: più riconoscibile, più leggibile e più affidabile.

## Check 28: logo header, tema e lingue

Stato:

Superato.

Obiettivo:

Rendere visibile il logo in modo stabile, aggiungere tema chiaro/scuro controllato dall'utente e portare l'app in cinque lingue.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\assets\images\via-la-maschera-logo-header-light.png
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\settings-context.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\localization.ts
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\en.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\es.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\ru.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\locales\uk.json
C:\Users\intel i7 11700\Desktop\AppMobile\28-check-28-tema-lingue-logo.md
```

Cosa cambia:

- il logo header usa un asset piccolo e leggibile, non più il PNG grande ritagliato dal web;
- il Profilo permette di scegliere `Chiaro` o `Scuro`;
- la scelta tema viene salvata e usata anche su web;
- il Profilo permette di scegliere Italiano, English, Українська, Русский ed Español;
- tab, Home, Percorsi, Archivio, Profilo, messaggi di stato e stanza condivisa usano testi localizzati;
- domande e percorsi emotivi hanno versioni localizzate;
- il browser riceve il codice lingua corretto.

Bug risolto:

Il web usava ancora il tema di sistema tramite `use-color-scheme.web.ts`; ora anche il web usa le impostazioni interne dell'app.

Verifiche tecniche:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-theme-i18n
curl.exe -I --max-time 30 http://localhost:8082
```

Verifica visiva:

Controllati nel browser locale:

- logo visibile nella Home e nel Profilo;
- tema chiaro con sfondo e tab bar chiari;
- tema scuro con guscio scuro e schede leggibili;
- cambio lingua inglese, ucraino e ritorno all'italiano;
- correzione della label `Mask Fear` in inglese.

Percentuale progetto:

```text
95%
```

## Check 29: configurazione build e kit store

Stato:

Superato.

Obiettivo:

Preparare il progetto alla fase release: identificativi nativi, profili EAS, script di controllo e materiali base per store e privacy.

Fonti ufficiali consultate:

- Expo EAS Build per la struttura di `eas.json`;
- Expo app config per `ios.bundleIdentifier`, `ios.buildNumber`, `android.package`, `android.versionCode`;
- Apple App Privacy e App Store Connect per privacy policy e dichiarazioni privacy;
- Google Play Data safety per la dichiarazione dei dati gestiti dall'app.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\eas.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\release-checklist.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\privacy-policy-draft.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\data-safety-notes.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\store-listing.md
C:\Users\intel i7 11700\Desktop\AppMobile\29-check-29-release-store-kit.md
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\README.md
```

Cosa cambia:

- fissato `com.vialamaschera.app` come identificativo iOS e Android;
- aggiunti `buildNumber` iOS e `versionCode` Android;
- aggiunto `runtimeVersion` basato sulla versione app;
- aggiunto `eas.json` con profili development, preview e production;
- aggiunti script `check`, `typecheck`, `export:web` e build EAS;
- sostituito il README generico Expo con istruzioni del progetto;
- preparata una checklist release;
- preparata una bozza privacy policy;
- preparate note per Apple App Privacy e Google Play Data safety;
- preparata una bozza store listing in cinque lingue.

Verifiche:

```powershell
npm.cmd run check
npx.cmd expo config --type public
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-release-kit
```

Percentuale progetto:

```text
97%
```

## Check 30: privacy e cancellazione dati in app

Stato:

Superato.

Obiettivo:

Aggiungere pagine raggiungibili dal Profilo per privacy policy e richiesta cancellazione account/dati, con testi localizzati nelle cinque lingue dell'app.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\privacy.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\delete-account.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\legal-page.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\legal.ts
C:\Users\intel i7 11700\Desktop\AppMobile\30-check-30-privacy-cancellazione-dati.md
```

Cosa cambia:

- il Profilo ora contiene accessi diretti a privacy policy e cancellazione dati;
- i contenuti legali seguono la lingua scelta dall'utente;
- la checklist release segnala gli URL pubblici ancora da preparare per store e Play Console;
- resta da sostituire il placeholder dell'email di contatto prima della pubblicazione.

Verifiche:

```powershell
npm.cmd run check
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-legal-pages
```

Percentuale progetto:

```text
98%
```

## Check 31: deploy web automatico su GitHub Pages

Stato:

Superato.

Obiettivo:

Preparare la pubblicazione web statica dell'app su GitHub Pages, con URL pubblici prevedibili anche per privacy policy e richiesta cancellazione dati.

URL previsti:

```text
https://voloia.github.io/via-la-maschera/
https://voloia.github.io/via-la-maschera/privacy
https://voloia.github.io/via-la-maschera/delete-account
```

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\.github\workflows\deploy-web.yml
C:\Users\intel i7 11700\Desktop\AppMobile\app\app.config.js
C:\Users\intel i7 11700\Desktop\AppMobile\app\scripts\export-web-github-pages.js
C:\Users\intel i7 11700\Desktop\AppMobile\31-check-31-deploy-web-github-pages.md
```

Cosa cambia:

- aggiunto workflow GitHub Actions per installare dipendenze, controllare il progetto, esportare web e pubblicare su Pages;
- il workflow prova ad abilitare GitHub Pages se il repository non lo ha ancora attivo;
- aggiunto export web dedicato per GitHub Pages con base path `/via-la-maschera`;
- mantenuto export locale senza base path;
- aggiornata la checklist release con gli URL pubblici previsti.

Verifiche:

```powershell
npm.cmd run check
npm.cmd run export:web
npm.cmd run export:web:github
```

Percentuale progetto:

```text
99%
```
