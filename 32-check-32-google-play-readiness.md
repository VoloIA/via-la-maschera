# Check 32: preparazione Google Play e regole community

## Obiettivo

Preparare `Via la Maschera` al primo percorso Google Play, con particolare attenzione alla stanza condivisa.

La stanza condivisa contiene risposte scritte dagli utenti e visibili ad altri utenti che hanno risposto alla stessa domanda. Per Google Play questo rientra nei contenuti generati dagli utenti, quindi servono termini, accettazione esplicita, segnalazione e moderazione.

Fonti operative:

- Google Play User Generated Content: `https://support.google.com/googleplay/android-developer/answer/9876937`
- Test interni, chiusi e aperti: `https://support.google.com/googleplay/android-developer/answer/9845334`
- Data safety: `https://support.google.com/googleplay/answer/11416267`

## Cosa è stato aggiunto

- Pagina `terms` con termini e regole community in Italiano, English, Українська, Русский, Español.
- Link ai termini dentro il Profilo.
- Accettazione esplicita prima di condividere una risposta dalla Home.
- Accettazione esplicita prima di rendere condivisa una risposta già salvata dall'Archivio.
- Versione delle regole salvata sulle risposte condivise: `2026-05-05`.
- Regole Firestore aggiornate per accettare nuove risposte condivise solo con la versione termini richiesta.
- Dossier Google Play in `app/release/google-play-submission.md`.

## Nota prodotto

La scheda store deve restare nella categoria riflessione/personale, evitando promesse cliniche.

Formula consigliata:

```text
Via la Maschera è un rituale quotidiano di riflessione personale.
```

Da evitare:

```text
Terapia, diagnosi, cura, supporto psicologico professionale.
```

## Prossimo passo

Il prossimo blocco operativo è creare la prima build Android di produzione con EAS, poi caricarla su Play Console in test interno.
