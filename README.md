# Chat-App-mern
"A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) using Socket.io for live messaging and user presence."

## Local development

The backend needs `MONGO_URI` and `JWT_SECRET` in `backend/.env` and listens on
port `5000` by default. Start it from the `backend` directory with `npm install`
and `npm run dev`. In a second terminal, start the frontend from `frontend` with
`npm install` and `npm run dev`. The Vite development server proxies API calls
to the local backend.
