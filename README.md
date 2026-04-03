# Princess Diary Web

Local proof-build for the three-week same-princess test.

## Commands

```bash
npm install --include=dev
npm run check
npm run dev
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## Scope

- Weeks 1-3 only
- Exactly three picks per week
- One save slot backed by IndexedDB
- One diary page plus one ending-cause page that should describe the same princess

This workspace currently runs with `NODE_ENV=production`, so the explicit `--include=dev` flag is required to install Vite locally.

Reload now treats IndexedDB as untrusted input: the saved run must match the fixed week-by-week choice contract or it gets discarded and rebuilt from canonical content.
