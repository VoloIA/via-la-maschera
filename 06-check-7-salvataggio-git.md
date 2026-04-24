# Check 7: Salvataggio Ordinato con Git

Obiettivo di questo checkpoint:

Installare Git e salvare il primo stato buono del progetto.

## Cos'e Git

Git e un sistema di controllo versione.

In parole semplici:

- salva la storia dei cambiamenti;
- permette di tornare indietro se qualcosa si rompe;
- mostra quali file sono stati modificati;
- aiuta a lavorare in modo ordinato.

## Perche ci serve ora

Abbiamo gia superato punti importanti:

- progetto Expo creato;
- app avviata;
- app vista nel browser;
- prima modifica fatta.

Questo e un buon momento per salvare una prima versione stabile.

## Stato attuale

Il comando:

```powershell
git --version
```

inizialmente non funzionava.

Poi Git e stato installato correttamente.

Versione verificata:

```text
git version 2.54.0.windows.1
```

## Passo 1: scaricare Git

Vai al sito ufficiale:

```text
https://git-scm.com/install/windows.html
```

Scarica la versione per Windows x64.

Al 2026-04-25, il sito ufficiale mostra Git per Windows 2.54.0 come versione recente.

## Passo 2: installare Git

Apri il file scaricato.

Durante l'installazione, per ora lascia le opzioni predefinite.

Se vedi una schermata che chiede l'editor predefinito, puoi lasciare quello proposto oppure scegliere Visual Studio Code se lo hai.

La cosa importante e mantenere l'opzione che permette di usare Git da PowerShell.

## Passo 3: verificare Git

Dopo l'installazione:

1. Chiudi PowerShell.
2. Riapri PowerShell.
3. Esegui:

```powershell
git --version
```

Se appare un numero di versione, Git e installato.

## Passo 4: primo salvataggio

Eseguito.

Comandi usati:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile"
git init
git status
git add .
git commit -m "Primo salvataggio app Expo"
```

## Nota di sicurezza Git

Git puo mostrare un avviso se una cartella `.git` e stata creata da un utente tecnico diverso dall'utente Windows reale.

Per evitare questo avviso, abbiamo aggiunto AppMobile alle cartelle sicure di Git:

```powershell
git config --global --add safe.directory "C:/Users/intel i7 11700/Desktop/AppMobile"
```

## File preparato

Abbiamo creato:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\.gitignore
```

Questo file evita di salvare cose inutili o troppo pesanti.

## Esito

Check 7 superato.

Il progetto ora ha un primo salvataggio Git.
