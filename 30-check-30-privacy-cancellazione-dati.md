# Check 30: privacy e cancellazione dati dentro l'app

Stato:

Superato.

Obiettivo:

Rendere raggiungibili dentro l'app le informazioni privacy e la procedura di richiesta cancellazione account/dati, in tutte le lingue supportate.

File creati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\privacy.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\delete-account.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\components\legal-page.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\constants\legal.ts
C:\Users\intel i7 11700\Desktop\AppMobile\30-check-30-privacy-cancellazione-dati.md
```

File aggiornati:

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\_layout.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\app\(tabs)\profile.tsx
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\release-checklist.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\data-safety-notes.md
C:\Users\intel i7 11700\Desktop\AppMobile\00-percorso-app-mobile.md
C:\Users\intel i7 11700\Desktop\AppMobile\01-diario-checkpoint.md
```

Cosa cambia:

- dal Profilo si aprono due pagine dedicate: privacy policy e richiesta cancellazione dati;
- le pagine usano la lingua scelta dall'utente: italiano, inglese, ucraino, russo e spagnolo;
- la pagina privacy chiarisce dati locali, account Google/Firebase, risposte personali, stanza condivisa, segnalazioni e contatti;
- la pagina cancellazione dati spiega cosa può essere cancellato, cosa può restare per obblighi legittimi e come inviare la richiesta;
- la checklist release ora distingue tra pagina in-app già pronta e URL pubblico ancora da pubblicare prima dello store.

Nota importante:

Le pagine sono pronte dentro l'app, ma prima della pubblicazione sugli store bisogna sostituire i placeholder di contatto e pubblicare almeno un URL pubblico stabile per privacy policy e cancellazione dati.

Verifiche:

```powershell
npm.cmd run check
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-legal-pages
```

Percentuale progetto:

```text
98%
```
