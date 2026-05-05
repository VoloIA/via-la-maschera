param(
  [string]$Environment = "production",
  [string]$EnvFile = ".env"
)

$ErrorActionPreference = "Stop"

$requiredNames = @(
  "EXPO_PUBLIC_FIREBASE_API_KEY",
  "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
  "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "EXPO_PUBLIC_FIREBASE_APP_ID",
  "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID",
  "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"
)

$optionalNames = @(
  "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"
)

$envPath = Resolve-Path -LiteralPath $EnvFile -ErrorAction SilentlyContinue

if (-not $envPath) {
  throw "File $EnvFile non trovato. Crea app/.env partendo da app/.env.example."
}

$values = @{}

Get-Content -LiteralPath $envPath | ForEach-Object {
  $line = $_.Trim()

  if (-not $line -or $line.StartsWith("#")) {
    return
  }

  $parts = $line -split "=", 2

  if ($parts.Count -ne 2) {
    return
  }

  $name = $parts[0].Trim()
  $value = $parts[1].Trim().Trim('"').Trim("'")

  if ($name -and $value) {
    $values[$name] = $value
  }
}

$missing = $requiredNames | Where-Object { -not $values.ContainsKey($_) }

if ($missing.Count -gt 0) {
  Write-Host "Mancano variabili obbligatorie per Android:" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
  throw "Completa app/.env prima di caricare le variabili su EAS."
}

Write-Host "Carico variabili EAS per ambiente: $Environment" -ForegroundColor Cyan

($requiredNames + $optionalNames) | ForEach-Object {
  $name = $_

  if (-not $values.ContainsKey($name)) {
    Write-Host "Salto ${name}: valore non presente." -ForegroundColor DarkYellow
    return
  }

  Write-Host "Creo/aggiorno $name..." -ForegroundColor Cyan

  & npx.cmd eas-cli@latest env:create $Environment `
    --name $name `
    --value $values[$name] `
    --visibility plaintext `
    --scope project `
    --force `
    --non-interactive | Out-Null
}

Write-Host "Variabili EAS aggiornate. Verifica con: npx.cmd eas-cli@latest env:list $Environment" -ForegroundColor Green
