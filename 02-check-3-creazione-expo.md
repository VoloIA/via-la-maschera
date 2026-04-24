# Check 3: Creazione Progetto Expo

Obiettivo di questo checkpoint:

Creare una nuova app Expo dentro questa cartella:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app
```

## Perche usiamo una sottocartella

La cartella principale:

```text
C:\Users\intel i7 11700\Desktop\AppMobile
```

serve come contenitore generale.

Dentro ci teniamo:

- documentazione del percorso;
- progetto vero dell'app;
- eventuali appunti futuri.

Il codice vero dell'app andra nella sottocartella:

```text
app
```

## Passo 1: aprire PowerShell

Apri PowerShell.

Se sei in una cartella tipo:

```text
PS C:\WINDOWS\system32>
```

va benissimo. Ora dobbiamo spostarci nella cartella giusta.

## Passo 2: entrare nella cartella AppMobile

Copia questo comando e premi Invio:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile"
```

Dopo il comando, la riga dovrebbe diventare simile a:

```text
PS C:\Users\intel i7 11700\Desktop\AppMobile>
```

Questo significa che sei nella cartella giusta.

## Passo 3: creare l'app Expo

Copia questo comando e premi Invio:

```powershell
npx.cmd create-expo-app@latest app
```

Se compare una domanda simile a:

```text
Need to install the following packages:
create-expo-app@...
Ok to proceed? (y)
```

scrivi:

```text
y
```

e premi Invio.

## Cosa succedera

Expo scarichera i file iniziali dell'app e creera una nuova cartella:

```text
app
```

Alla fine dovremmo vedere file come:

```text
package.json
app.json
app
assets
```

## Check finale

Quando il comando finisce, non fare altro.

Copia qui le ultime righe che vedi in PowerShell, oppure scrivi:

```text
comando finito
```

Poi faremo insieme il controllo del Check 3.

