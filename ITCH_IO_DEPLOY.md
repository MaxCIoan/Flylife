# itch.io Deployment

Run:

```powershell
npm run package:itch
```

Upload one of these files from `dist-itch/`:

- `flylife-itch-full.zip`: full static game hosted by itch.io. Leaderboards and official Fly submissions still use the FlightRace Netlify API automatically.
- `flylife-itch-launcher.zip`: tiny package that opens the live Netlify game. Use this if you want itch.io to be a portal page only.

For an unstable/branch Netlify URL, build the launcher like this:

```powershell
$env:FLYLIFE_ITCH_URL="https://flightrace.netlify.app/?itchStatus=1#play"
npm run package:itch
```

Recommended itch.io settings:

- Kind of project: `HTML`
- Upload: the ZIP file
- Check: `This file will be played in the browser`
- Viewport: `1280 x 720` minimum
- Fullscreen button: on for the full static ZIP
- Open in new window/browser: on for the launcher ZIP
- Enable scrollbars: on only if itch is embedding the full static ZIP in a small frame
- Orientation: landscape

No itch.io environment variables are required. FlightRace Netlify still owns the official leaderboard API.
