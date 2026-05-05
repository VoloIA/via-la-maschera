# Check 31: deploy web automatico su GitHub Pages

Stato:

Preparato. Bloccato dall'abilitazione GitHub Pages sul repository con il piano GitHub attuale.

Obiettivo:

Preparare un canale pubblico per la versione web statica dell'app, utile anche come URL stabile per privacy policy e richiesta cancellazione dati.

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

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\package.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\README.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\release-checklist.md
C:\Users\intel i7 11700\Desktop\AppMobile\00-percorso-app-mobile.md
C:\Users\intel i7 11700\Desktop\AppMobile\01-diario-checkpoint.md
```

Cosa cambia:

- ogni push su `main` può generare una build web statica;
- GitHub Actions esegue installazione, controlli e export prima del deploy;
- il workflow prova ad abilitare GitHub Pages se il repository non lo ha ancora attivo;
- l'export GitHub usa il base path `/via-la-maschera`, necessario per GitHub Pages su repository;
- l'export locale resta senza base path, quindi lo sviluppo su `localhost` non cambia;
- le pagine privacy e cancellazione dati hanno URL pubblici prevedibili appena GitHub Pages viene attivato.

Esito GitHub:

Il workflow supera installazione, controlli ed export web. Il deploy si ferma quando GitHub deve creare Pages:

```text
Your current plan does not support GitHub Pages for this repository.
```

Nota importante:

Per completare questo check serve una delle tre scelte: rendere il repository pubblico, usare un piano GitHub che abiliti Pages per questo repository, oppure pubblicare lo stesso export su un hosting alternativo.

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
