# Check 25: Profilo, account e privacy

Obiettivo:

Creare una schermata dedicata per accesso, stato cloud e scelte privacy.

## Perché serviva

La Home stava diventando troppo carica.

Dopo Google Login, salvataggio remoto, consenso, segnalazioni e revoca della condivisione, serviva un luogo stabile dove raccogliere identità e privacy.

## File creati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
```

## File aggiornati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\index.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\ui\icon-symbol.tsx
```

## Cosa abbiamo aggiunto

- nuova tab `Profilo`;
- stato account Google;
- pulsante accesso/uscita;
- badge iniziali utente;
- stato Firebase;
- stato Google Login;
- pannello privacy;
- principi su archivio personale, iniziali e consenso reversibile.

## Cosa abbiamo alleggerito

La Home non contiene più il pannello account.

Resta concentrata su:

- domanda del giorno;
- risposta;
- consenso di condivisione;
- memoria del rito.

## Verifiche tecniche

Comandi eseguiti:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-profile
```

Risultato:

Nessun errore segnalato. L’export web ha generato anche la route `/profile`.

## Percentuale progetto

```text
89%
```

Siamo all’89% perché l’app ora separa meglio rito, archivio, percorsi e profilo.
