# AI Video Directory

This repository stores tooling used to prototype the **AI Video Directory** vibe library.

## Seed the vibe directory locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your Firebase service account key JSON file. Keep this file outside the repository so it never gets committed.

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccountKey.json"
   ```

3. Run the seeding script to insert the curated vibes into your Firestore database:

   ```bash
   npm run seed
   ```

The script will upsert twelve vibes into the `vibes` collection, including prompt templates, tags, supported models, curation flags, and structured JSON metadata for each entry.

## Project structure

```
├── package.json
├── scripts
│   └── seedVibes.ts
├── tsconfig.json
└── README.md
```

> **Note**: The Firebase service account key must remain private. Add it to your Codex Cloud workspace but do not check it into version control. The `.gitignore` already blocks common Firebase Admin SDK filenames (including `*-firebase-adminsdk-*.json`), but double-check that your key lives outside the repo before running Git commands.
