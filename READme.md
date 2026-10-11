# FormIt — Survey Builder

FormIt is a full-stack web application that allows users to create surveys, share them through links, collect responses, and review submitted answers from a dashboard.

## Features

- **User Authentication** — Register, log in, and log out securely.
- **Survey Creation** — Create surveys with questions and answer options.
- **Survey Sharing** — Share surveys using unique links.
- **Multiple Question Types** — Support for multiple-choice, checkbox, and text questions.
- **Response Collection** — Allow respondents to submit answers to surveys.
- **Response Management** — View individual submissions and expand each response to see its questions and answers.
- **Dashboard** — View survey statistics, recent surveys, and response counts.
- **Survey Search** — Search through your created surveys.
- **Profile Page** — Access your profile from the sidebar.
- **Responsive Interface** — A simple interface designed around black and lime-green colors.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT-based authentication
- bcrypt for password hashing
- Cookie-based authentication

## Live Demo

- **Frontend:** https://survey-app-two-phi.vercel.app/
- **Backend:** https://formatit.onrender.com

## Getting Started

Follow these steps to run FormIt locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL database or a hosted PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/kalkidan404/survey_App.git
cd survey_App
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure your environment variables:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Replace the example values with your actual database connection string and a secure JWT secret. Add any other environment variables required by your backend configuration.

Generate the Prisma Client and apply your database migrations if needed:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the backend:

```bash
npm run dev
```

Make sure the backend's `package.json` defines the `dev` script.

### 3. Set Up the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

This variable tells the frontend where to send API requests during local development.

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Project Structure

```text
survey_App/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   └── router/
│   ├── prisma/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   └── package.json
│
└── README.md
```

## Application Workflow

1. Register an account or log in.
2. Open the dashboard.
3. Create a survey and add questions.
4. Share the survey link with respondents.
5. Respondents open the link and submit their answers.
6. Return to the dashboard to see the response count.
7. Open a survey's responses to view individual submissions and their answers.

## Design

FormIt uses a minimal interface with a black background and lime-green accents.

- **Primary background:** `#000000`
- **Accent color:** `#C6FF33`

The interface focuses on making survey creation, sharing, and reviewing responses straightforward.

## Deployment

The frontend is deployed on Vercel, while the backend is deployed on Render.

The frontend uses the `VITE_API_URL` environment variable to communicate with the backend. For production, configure it with the deployed backend URL and ensure the backend's CORS and cookie settings support the deployed frontend.

## Future Improvements

- Survey analytics and visualizations.
- More question types and customization options.
- Improved response filtering and reporting.
- Additional survey management features.

## Author

**Kalkidan Shewit**

- GitHub: https://github.com/kalkidan404
- LinkedIn: https://www.linkedin.com/in/kalkidan-shewit-9601a8367/
