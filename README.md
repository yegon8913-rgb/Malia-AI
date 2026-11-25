# Malia AI — starter PWA

A mobile-first installable web app with chat, on-device chat history, speech input where supported, spoken replies, theme settings and a server-side AI API proxy.

## Run locally
1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Set `OPENAI_API_KEY` as an environment variable (never put the key in `public/`).
4. Run `npm start` and open `http://localhost:3000`.

## Deploy with Replit
1. Create a new Node.js app in Replit and upload/extract this project.
2. In Replit Secrets, add `OPENAI_API_KEY` with your own API key. Optionally add `OPENAI_MODEL`.
3. Run `npm install`, then `npm start` (or configure the run command as `npm start`).
4. Open the generated web URL. On Android Chrome, use menu ⋮ → Add to Home screen / Install app.

## Important notes
- This is a working starter project, not a deployed public website. A live URL requires deployment on a hosting account.
- AI replies require a valid API key and may incur provider usage charges.
- Offline mode caches the app shell only; sending messages still requires internet and the AI API.
- Female voice selection depends on voices installed by Android/Chrome. The app chooses a likely feminine English voice when available; it cannot guarantee every device offers one.
- Chat history stays in the browser's local storage unless the user disables it or clears it. Do not enter highly sensitive information.
- The uploaded `sw.js` is preserved as `public/sw-uploaded-original.js`; the active `public/sw.js` is an improved version used by the app.
