# Check 29: configurazione build e kit store

## Stato

Superato.

## Obiettivo

Preparare `Via la Maschera` alla fase di release: non ancora pubblicazione effettiva, ma base ordinata per generare build, compilare store e dichiarare privacy/data safety.

## Cosa è stato configurato

- `ios.bundleIdentifier`: `com.vialamaschera.app`
- `ios.buildNumber`: `1`
- `android.package`: `com.vialamaschera.app`
- `android.versionCode`: `1`
- `runtimeVersion`: policy `appVersion`
- profili EAS: development, preview, production
- script di controllo e build nel `package.json`
- README di progetto sostituito al template Expo

## Materiali creati

```text
C:\Users\intel i7 11700\Desktop\AppMobile\app\eas.json
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\release-checklist.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\privacy-policy-draft.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\data-safety-notes.md
C:\Users\intel i7 11700\Desktop\AppMobile\app\release\store-listing.md
```

## Fonti ufficiali consultate

- Expo EAS Build: `eas.json` e profili build.
  https://docs.expo.dev/build/eas-json/
- Expo app config: identificativi iOS/Android e versioni native.
  https://docs.expo.dev/versions/latest/config/app/
- Apple App Privacy Details.
  https://developer.apple.com/app-store/app-privacy-details/
- Apple App Store Connect, App privacy.
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy
- Google Play Data safety.
  https://support.google.com/googleplay/android-developer/answer/10787469

## Verifiche

```powershell
npm.cmd run check
npx.cmd expo config --type public
npx.cmd expo export --platform web --output-dir .expo\codex-export-test-release-kit
```

## Prossimo blocco prima del 100%

- account Expo/EAS;
- account Apple Developer;
- account Google Play Console;
- Firebase reale configurato;
- privacy policy pubblicata a un URL stabile;
- build Android/iOS generata e installata su dispositivo reale.

## Percentuale progetto

```text
97%
```
