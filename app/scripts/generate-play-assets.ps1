param(
  [string]$OutputDir = "./release/play-store-assets"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$outputPath = Join-Path $root $OutputDir
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

$featurePath = Join-Path $outputPath "feature-graphic-it.png"
$logoPath = Join-Path $root "assets/images/via-la-maschera-logo-light.png"
$fontRegularPath = Join-Path $root "node_modules/@expo-google-fonts/lora/400Regular/Lora_400Regular.ttf"
$fontSemiboldPath = Join-Path $root "node_modules/@expo-google-fonts/lora/600SemiBold/Lora_600SemiBold.ttf"

$fonts = New-Object System.Drawing.Text.PrivateFontCollection
$fonts.AddFontFile($fontRegularPath)
$fonts.AddFontFile($fontSemiboldPath)
$fontFamily = $fonts.Families[0]

$bitmap = New-Object System.Drawing.Bitmap 1024, 500, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

try {
  $backgroundRect = New-Object System.Drawing.Rectangle 0, 0, 1024, 500
  $backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $backgroundRect,
    [System.Drawing.Color]::FromArgb(42, 24, 56),
    [System.Drawing.Color]::FromArgb(119, 50, 62),
    22
  )
  $graphics.FillRectangle($backgroundBrush, $backgroundRect)

  $warmGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
  $warmGlow.AddEllipse(604, -126, 520, 520)
  $pathBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($warmGlow)
  $pathBrush.CenterColor = [System.Drawing.Color]::FromArgb(245, 151, 103)
  $pathBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(42, 24, 56))
  $graphics.FillPath($pathBrush, $warmGlow)

  $coolGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
  $coolGlow.AddEllipse(-170, 232, 460, 360)
  $coolBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($coolGlow)
  $coolBrush.CenterColor = [System.Drawing.Color]::FromArgb(41, 100, 111)
  $coolBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(42, 24, 56))
  $graphics.FillPath($coolBrush, $coolGlow)

  $veilPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(92, 236, 202, 164)), 2
  for ($i = 0; $i -lt 8; $i++) {
    $offset = $i * 34
    $graphics.DrawBezier(
      $veilPen,
      440 + $offset,
      486,
      494 + $offset,
      336,
      556 + $offset,
      138,
      610 + $offset,
      4
    )
  }

  $logo = [System.Drawing.Image]::FromFile($logoPath)
  $logoAttributes = New-Object System.Drawing.Imaging.ImageAttributes
  $matrix = New-Object System.Drawing.Imaging.ColorMatrix
  $matrix.Matrix33 = 0.18
  $logoAttributes.SetColorMatrix($matrix)
  $graphics.DrawImage(
    $logo,
    (New-Object System.Drawing.Rectangle 626, 72, 304, 304),
    0,
    0,
    $logo.Width,
    $logo.Height,
    [System.Drawing.GraphicsUnit]::Pixel,
    $logoAttributes
  )

  $cream = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 250, 241, 225))
  $soft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(224, 244, 223, 201))
  $accent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 232, 150, 104))
  $linePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(190, 232, 150, 104)), 3

  $graphics.FillEllipse($accent, 118, 96, 12, 12)
  $graphics.DrawLine($linePen, 138, 102, 214, 102)

  $titleFont = New-Object System.Drawing.Font($fontFamily, 48, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $subtitleFont = New-Object System.Drawing.Font($fontFamily, 26, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $smallFont = New-Object System.Drawing.Font($fontFamily, 19, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

  $graphics.DrawString("Via la Maschera", $titleFont, $cream, 112, 138)
  $graphics.DrawString("Una domanda al giorno.", $subtitleFont, $soft, 116, 228)
  $graphics.DrawString("Una risposta privata.", $subtitleFont, $soft, 116, 268)
  $graphics.DrawString("Cinque lingue disponibili. Tema chiaro e scuro.", $smallFont, $cream, 116, 374)

  $captionPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(160, 250, 241, 225)), 1
  $graphics.DrawLine($captionPen, 116, 350, 455, 350)

  $bitmap.Save($featurePath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  if ($logo) { $logo.Dispose() }
  if ($graphics) { $graphics.Dispose() }
  if ($bitmap) { $bitmap.Dispose() }
  if ($fonts) { $fonts.Dispose() }
}

Write-Host "Generated $featurePath"
