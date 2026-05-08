# Apple Review Response - 2026-05-08

Rifiuto ricevuto per versione `1.0 (1)`:

- `Guideline 2.3.6 - Accurate Metadata`
- `Guideline 1.2 - Safety: User Generated Content`

## Correzioni nel codice

Build correttiva:

- Versione: `1.0.0`
- Build number: `2`
- EAS build: `3a1ffe3f-0d2b-4c19-895e-b244dc350d3a`
- EAS submission: `9c91c9f5-6fa9-41ca-b6aa-d02ebf863528`
- IPA: `release/builds/via-la-maschera-ios-1.0.0-2.ipa`

Modifiche:

- consenso a termini e regole community prima del login Google/Apple;
- termini aggiornati con tolleranza zero per contenuti offensivi o utenti abusivi;
- filtro locale prima della pubblicazione di risposte condivise;
- salvataggio `moderationStatus` e `moderationVersion` sulle risposte pubbliche;
- pulsante `Segnala` su ogni risposta condivisa;
- pulsante `Blocca autore` su ogni risposta condivisa;
- blocco persistente dell'autore per l'utente corrente;
- report/blocchi scritti in Firestore nella collection `reports`;
- rimozione immediata dal feed locale quando un contenuto viene segnalato o bloccato.

## Correzioni in App Store Connect

Da fare manualmente:

1. Apri `Informazioni generali > Informazioni sull'app`.
2. Vai su `Età consigliata` / `Classificazioni per età dell'app`.
3. Clicca `Modifica`.
4. Imposta `User-Generated Content` su `Sì`.
5. Salva.
6. Torna alla versione `1.0`.
7. Seleziona la nuova build `1.0.0 (2)`.

## Screen recording richiesto

Apple chiede un video da dispositivo fisico che mostri:

- EULA/termini prima del login;
- meccanismo per segnalare contenuti;
- meccanismo per bloccare utenti abusivi.

Sequenza consigliata da registrare su iPhone:

1. Apri l'app.
2. Vai su `Profilo`.
3. Mostra che i pulsanti login sono disabilitati finché non si accettano i termini.
4. Tocca `Leggi termini e regole`.
5. Mostra la sezione su tolleranza zero, blocco e moderazione entro 24 ore.
6. Torna indietro.
7. Accetta i termini.
8. Esegui login.
9. Vai in `Archivio`.
10. Apri una risposta condivisa.
11. Mostra `Segnala`.
12. Mostra `Blocca autore`.

## Risposta consigliata ad Apple

```text
Hello App Review team,

Thank you for the review. We have addressed Guideline 1.2 and Guideline 2.3.6 in the new build.

Changes made:
- Age Rating has been updated to select "Yes" for User-Generated Content.
- Users must accept Terms and Community Rules before signing in with Google or Apple.
- The Terms state zero tolerance for objectionable content and abusive users.
- Shared answers are filtered before being posted.
- Every shared answer includes a Report action.
- Every shared answer includes a Block Author action.
- Reporting or blocking hides the content immediately from the user's feed and creates a moderation report for developer review.
- Reports are reviewed within 24 hours; offending content may be removed and responsible users may be removed from the shared room.

The app does not include public profiles, direct messaging, following, tagging, or unrestricted posting. Shared answers are optional, visible with initials only, and only after the reviewer has answered the same daily question.

A screen recording from a physical device has been attached in the App Review Information notes.
Thank you.
```
