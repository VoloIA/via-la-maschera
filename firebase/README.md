# Firebase per Via la Maschera

Questa cartella contiene le regole Firestore per la parte condivisa dell’app.

## Modello dati

```text
users/{uid}
users/{uid}/entries/{entryId}
users/{uid}/answeredQuestions/{questionKey}
questions/{questionKey}/answers/{uid_dateKey}
```

## Regola di prodotto

Un utente può leggere le risposte pubbliche di una domanda solo se ha già risposto a quella stessa domanda.

La risposta privata resta in:

```text
users/{uid}/entries/{entryId}
```

La copia condivisibile resta in:

```text
questions/{questionKey}/answers/{uid_dateKey}
```

La copia condivisibile non contiene il nome completo: contiene solo le iniziali.

Dal check 22, la copia condivisibile nasce solo se la risposta ha:

```text
shareWithCommunity: true
```

La lettura delle risposte altrui richiede che il documento:

```text
users/{uid}/answeredQuestions/{questionKey}
```

contenga:

```text
shared: true
```

## Segnalazioni

Dal check 23, le risposte condivise possono essere segnalate.

I report vengono salvati in:

```text
reports/{questionKey_answerId_reporterUid}
```

I report non sono leggibili pubblicamente. Serviranno in futuro per una console admin o una Cloud Function di moderazione.

## Configurazione richiesta

1. Crea un progetto Firebase.
2. Abilita Authentication con provider Google.
3. Abilita Cloud Firestore.
4. Pubblica `firestore.rules` nelle regole Firestore.
5. Copia `app/.env.example` in `app/.env`.
6. Inserisci le chiavi Firebase e i client ID Google.

Le variabili `.env` iniziano con `EXPO_PUBLIC_` perché devono essere lette dal bundle Expo.
