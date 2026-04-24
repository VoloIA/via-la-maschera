# Check 4: Avvio App Expo

Obiettivo di questo checkpoint:

Avviare l'app Expo appena creata.

## Prima cosa importante

Nel PowerShell dell'utente e rimasto scritto:

```text
ac
```

Se non hai ancora premuto Invio, cancellalo con Backspace.

Se hai gia premuto Invio e PowerShell sembra bloccato o chiede altre informazioni, premi:

```text
Ctrl + C
```

Questo annulla il comando corrente e ti riporta alla riga normale.

## Passo 1: entrare nella cartella dell'app

Da PowerShell, esegui:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile\app"
```

Dopo il comando, la riga dovrebbe diventare simile a:

```text
PS C:\Users\intel i7 11700\Desktop\AppMobile\app>
```

## Passo 2: avviare Expo

Useremo `npx.cmd` per evitare il blocco di PowerShell su `npm.ps1`.

Esegui:

```powershell
npx.cmd expo start
```

## Cosa dovrebbe succedere

Expo avviera un server locale.

Di solito vedrai:

- un QR code;
- alcune istruzioni;
- opzioni come `a` per Android, `w` per web, `r` per ricaricare.

## Cosa fare dopo

Quando appare il QR code o le istruzioni Expo, non chiudere PowerShell.

Copia qui le ultime righe che vedi, oppure dimmi:

```text
Expo avviato
```

Poi decideremo insieme se provarla sul telefono con Expo Go oppure nel browser web.
