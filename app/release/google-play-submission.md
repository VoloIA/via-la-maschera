# Google Play submission notes

## App identity

- App name: `Via la Maschera`
- Package name: `com.vialamaschera.app`
- Version name: `1.1.0`
- Version code: `2`
- Recommended category: `Lifestyle`
- Price: free
- Ads: no
- In-app purchases: no, not in this first release
- Support email: `volodymyr.ilchenko.it@gmail.com`

## Public URLs

- Website: `https://voloia.github.io/via-la-maschera/`
- Privacy policy: `https://voloia.github.io/via-la-maschera/privacy`
- Account and data deletion: `https://voloia.github.io/via-la-maschera/delete-account`
- Terms and community rules: `https://voloia.github.io/via-la-maschera/terms`
- Instagram: `https://www.instagram.com/via_lamaschera/`

## Store positioning

Recommended short description:

```text
Una domanda al giorno, risposte private e una riflessione dopo 20 minuti.
```

Recommended English short description:

```text
One daily question, private answers, and a reflection after 20 minutes.
```

Release notes `1.1.0`:

```text
Testi italiani e inglesi più chiari e accessibili. La riflessione ora è disponibile dopo 20 minuti. Migliorati anche percorsi, messaggi di accesso, privacy e condivisione con la community.
```

Avoid claims such as:

- therapy
- diagnosis
- medical advice
- professional psychological support
- guaranteed emotional improvement

## User-generated content declaration

The app includes a limited user-generated content feature called the shared room.

Current safeguards:

- Users can share an answer only after Google sign-in.
- Users must answer the same question before reading compatible shared answers.
- Sharing is optional.
- Sharing can be revoked from the Archive.
- Other users see initials only.
- Full Google name, email, and profile image are not shown in shared answers.
- Before sharing, users must accept terms and community rules in the app.
- Shared answers include `termsVersion: 2026-05-05`.
- Every visible shared answer has an in-app report action.
- Reported answers are hidden locally and written to the `reports` collection for review.
- There is no direct messaging, tagging, following, public profile, or one-to-one user interaction.

Moderation note for Play Console:

```text
Via la Maschera allows optional sharing of written answers with initials only. Users must accept community rules before sharing. The app prohibits harassment, hate, threats, explicit sexual content, illegal content, personal data of others, and targeted abuse. Users can report every shared answer from inside the app; reported content is hidden locally and stored for moderation review. Sharing can be revoked by the author from the Archive.
```

## Data safety draft

Likely collected data when Google/Firebase are configured:

- Personal info: name, email address, user ID, profile image from Google sign-in.
- App activity / other user-generated content: written answers, questions answered, sharing status, reports.
- App info and performance: only if Expo/Firebase diagnostics are enabled in the final build configuration.
- Device or other IDs: Firebase/Auth technical identifiers may apply.

Likely purposes:

- App functionality
- Account management
- Fraud prevention, security, and compliance
- Analytics/diagnostics only if enabled by the final Firebase/Expo setup

Likely sharing:

- Service providers: Google/Firebase/Expo infrastructure for authentication, cloud sync, and build/submission infrastructure.
- Other users: only initials and the shared answer text, only inside the same-question shared room.

Deletion:

- User-facing page: `https://voloia.github.io/via-la-maschera/delete-account`
- Support contact shown in app and public pages: `volodymyr.ilchenko.it@gmail.com`

## First Android track

Recommended order:

1. Run local checks.
2. Create production Android build.
3. Upload to Play Console internal testing.
4. Verify login, archive, sharing, reporting, theme, and languages on a real Android device.
5. Move to closed testing if required by the account.

Commands:

```powershell
cd "C:\Users\intel i7 11700\Desktop\AppMobile\app"
npm.cmd run check
npx.cmd expo config --type public
npm.cmd run build:android:production
```

If EAS Submit is configured later:

```powershell
eas submit --platform android --profile production
```

Latest production Android build:

- EAS build: `52f118e0-4bd2-4845-a714-cf989af4795d`
- Expo page: `https://expo.dev/accounts/via_lamaschera/projects/via-la-maschera/builds/52f118e0-4bd2-4845-a714-cf989af4795d`
- Artifact URL: `https://expo.dev/artifacts/eas/bf379aNHpg8Wj5rn99BG5v.aab`
- Local file for Play Console upload: `release/builds/via-la-maschera-1.0.0-1.aab`
- Status checked on 2026-05-06: `FINISHED`

## Play Console checklist

- Use `release/play-console-fill-in.md` as the step-by-step Play Console guide.
- Create app in Play Console with package `com.vialamaschera.app`.
- Upload the `.aab` from EAS production build.
- Complete store listing in the five supported languages.
- Upload feature graphic `release/play-store-assets/feature-graphic-it.png`.
- Upload screenshots for Home, Percorsi, Archivio, Profilo, dark mode, and language selection.
- Add privacy policy URL.
- Add data deletion URL.
- Complete Data safety.
- Complete content rating questionnaire.
- Declare user-generated content and describe moderation.
- Add support email: `volodymyr.ilchenko.it@gmail.com`.
- Add tester feedback email or URL.
- Start internal testing first.

Note: Instagram is a project/social presence, not the primary support channel. Keep support and privacy requests on email and public web pages.

Note:

Google states that personal developer accounts created after November 13, 2023 must meet specific testing requirements before production access. If this account falls in that case, plan a closed test before public release.
