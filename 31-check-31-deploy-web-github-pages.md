# Check 31: deploy web automatico su GitHub Pages

Stato:

Superato.

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

- ogni push su `main` genera una build web statica;
- GitHub Actions esegue installazione, controlli e export prima del deploy;
- il workflow prova ad abilitare GitHub Pages se il repository non lo ha ancora attivo;
- l'export GitHub usa il base path `/via-la-maschera`, necessario per GitHub Pages su repository;
- l'export locale resta senza base path, quindi lo sviluppo su `localhost` non cambia;
- le pagine privacy e cancellazione dati hanno URL pubblici prevedibili appena GitHub Pages viene attivato.

Esito GitHub:

Repository reso pubblico, GitHub Pages abilitato e deploy completato.

```text
https://voloia.github.io/via-la-maschera/
https://voloia.github.io/via-la-maschera/privacy
https://voloia.github.io/via-la-maschera/delete-account
```

Nota importante:

Il repository è pubblico. Prima di inserire chiavi reali, continuare a tenerle fuori da Git e usare solo `.env` locale o segreti del servizio di build.

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
