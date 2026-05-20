<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bf9aeb25-ecbe-422d-b68f-f366f30af461

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Reviews Backend

Player reviews use the Express backend in `server.ts` and a SQLite database at `data/reviews.sqlite` by default. Static hosting by itself will not save reviews for other computers.

For public reviews, deploy the Node backend with persistent disk storage and run `npm run start`. You can set `REVIEWS_DATABASE_PATH` if your host gives you a persistent volume path.
