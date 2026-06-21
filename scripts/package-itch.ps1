$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$dist = Join-Path $root "dist-itch"
$fullDir = Join-Path $dist "flylife-itch-full"
$launcherDir = Join-Path $dist "flylife-itch-launcher"
$fullZip = Join-Path $dist "flylife-itch-full.zip"
$launcherZip = Join-Path $dist "flylife-itch-launcher.zip"
$launchUrl = if ($env:FLYLIFE_ITCH_URL) { $env:FLYLIFE_ITCH_URL } else { "https://flightrace.netlify.app/?itchStatus=1#play" }

if (Test-Path $dist) {
  Remove-Item -LiteralPath $dist -Recurse -Force
}

New-Item -ItemType Directory -Path $fullDir, $launcherDir | Out-Null

$staticFiles = @(
  "index.html",
  "styles.css",
  "app.js",
  "fly-session-guard.js",
  "countries.geo.json",
  "country-boundaries.geo.json",
  "rocket-countries.json",
  "_redirects"
)

foreach ($file in $staticFiles) {
  Copy-Item -LiteralPath (Join-Path $root $file) -Destination (Join-Path $fullDir $file)
}

Copy-Item -LiteralPath (Join-Path $root "assets") -Destination (Join-Path $fullDir "assets") -Recurse
Copy-Item -LiteralPath (Join-Path $root "itch-netlify-launcher\index.html") -Destination (Join-Path $launcherDir "index.html")
(Get-Content -LiteralPath (Join-Path $launcherDir "index.html") -Raw).Replace("__FLYLIFE_LAUNCH_URL__", $launchUrl) | Set-Content -LiteralPath (Join-Path $launcherDir "index.html") -NoNewline

Compress-Archive -Path (Join-Path $fullDir "*") -DestinationPath $fullZip -Force
Compress-Archive -Path (Join-Path $launcherDir "*") -DestinationPath $launcherZip -Force

Write-Host "Created:"
Write-Host "  $fullZip"
Write-Host "  $launcherZip"
