# Check 26: guardia accesso Google

## Stato

Superato.

## Problema risolto

L'app mostrava questo errore quando Google Login non aveva ancora il client web configurato:

```text
Client Id property `webClientId` must be defined to use Google auth on this platform.
```

## Causa

Il provider di autenticazione caricava subito l'hook Google anche quando mancava:

```text
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
```

Su web, `expo-auth-session` richiede quel valore prima ancora di avviare il login.

## Soluzione

Il flusso Google è stato separato in un componente interno che viene montato solo quando la configurazione Google è completa.

Se le chiavi non sono presenti:

- la app non va in crash;
- Profilo mostra ancora `Da collegare`;
- il pulsante di accesso resta disabilitato;
- il login Google si attiva appena vengono inserite le variabili `.env` corrette.

## File aggiornato

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\contexts\auth-context.tsx
```

## Verifiche

Comandi superati:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-authguard
curl.exe -I --max-time 20 http://localhost:8082
```

Risultato:

```text
HTTP/1.1 200 OK
```

## Percentuale progetto

```text
90%
```
