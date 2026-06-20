# itch.io Deployment

Run:

```powershell
npm run package:itch
```

Upload one of these files from `dist-itch/`:

- `flylife-itch-full.zip`: full static game hosted by itch.io. Leaderboards and official Fly submissions still use the Netlify production API automatically.
- `flylife-itch-launcher.zip`: tiny package that opens the live Netlify game. Use this if you want itch.io to be a portal page only.

Recommended itch.io settings:

- Kind of project: `HTML`
- Upload: the ZIP file
- Check: `This file will be played in the browser`
- Viewport: `1280 x 720` minimum, fullscreen button enabled
- Orientation: landscape

No itch.io environment variables are required. Netlify still owns the official leaderboard API.
