<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-mvp-social-community-web-app
</h1>
<h4 align="center">A web application for setting, tracking, and sharing fitness goals.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="Framework used: React" />
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend technologies: JavaScript, HTML, CSS" />
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend framework: Node.js" />
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="LLMs used: Custom, Gemini, OpenAI" />
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-mvp-social-community-web-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-mvp-social-community-web-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-mvp-social-community-web-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the source code for a "fitness-tracker-mvp-social-community-web-app", a web application that allows users to set and track fitness goals, monitor progress, and connect with a community of like-minded individuals. It was built using the following technologies:
  - **Frontend:** React, JavaScript, HTML, CSS
  - **Backend:** Node.js
  - **Database:** PostgreSQL
  - **Authentication:** NextAuth.js with Google OAuth
  - **State Management:** Zustand
  - **API Development:** Express.js
  - **Error Tracking and Monitoring:** Sentry

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** |  Secure user login and signup with Google OAuth, enabling users to create accounts and manage their personal data.    |
| 🎯 | **Personalized Goal Setting** |  Users can set and customize their fitness goals, such as weight loss, muscle gain, distance targets, or specific exercise routines.  |
| 📊 | **Progress Tracking** |  A comprehensive system to track workouts, monitor progress against goals, and analyze performance over time. |
| 💬 | **Social Interaction** |  Features like a social feed, group challenges, and user profiles allow users to connect, share achievements, and motivate each other. |
| 🔌 | **Third-Party Integrations** |  The application integrates with popular fitness trackers like Fitbit and Apple Watch to automatically import activity data, providing a more comprehensive picture of user progress. |
| 📈 | **Data Analytics** |  Users can access personalized analytics dashboards to track their progress, identify patterns, and optimize their training strategies. |
| 🎨 | **Customizable UI** |  A user-friendly and visually appealing interface with a modern design that is responsive across different devices. |
| ⚡ | **Performance Optimization** |  The application is optimized for speed and efficiency, ensuring a smooth user experience and minimal load times. |
| 🔒 | **Data Security** |  Robust security measures, including data encryption, secure authentication, and regular security audits, protect user data and privacy. |
| 🚀 | **Scalability** |  The application is designed to accommodate future growth and expanding user base, ensuring the platform can handle increasing traffic and data storage demands. |

## 📂 Structure
```text
fitness-tracker-mvp-social-community-web-app/
├── pages
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].ts
│   │   ├── goals
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   ├── activities
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   └── users
│   │       ├── [id].ts
│   │       └── index.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── settings.tsx
├── components
│   ├── layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── features
│   │   ├── goals
│   │   │   ├── GoalForm.tsx
│   │   │   └── GoalList.tsx
│   │   ├── activities
│   │   │   ├── ActivityForm.tsx
│   │   │   └── ActivityList.tsx
│   │   └── auth
│   │       ├── LoginForm.tsx
│   │       └── SignupForm.tsx
├── lib
│   ├── auth
│   │   └── auth.ts
│   ├── hooks
│   │   ├── useUser.ts
│   │   ├── useGoals.ts
│   │   └── useActivities.ts
│   └── utils
│       ├── formatters.ts
│       └── validators.ts
├── styles
│   ├── globals.css
│   └── theme.ts
├── public
│   ├── fonts
│   └── images
├── .env
├── .eslintrc.js
├── next.config.js
├── prisma
│   └── schema.prisma
└── package.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/fitness-tracker-mvp-social-community-web-app.git`
2. Navigate to the project directory:
   - `cd fitness-tracker-mvp-social-community-web-app`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Application
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `.env` file and create a `.env.local` file for local development configurations.

### 📚 Examples
- 📝 **Example 1**: How to create a fitness goal:
  - Log in to the application.
  - Navigate to the "Goals" section.
  - Click "Add Goal".
  - Enter details like goal type, target value, and timeframe.
  - Submit the form to create the goal.

- 📝 **Example 2**: How to track a workout:
  - Log in to the application.
  - Navigate to the "Activities" section.
  - Click "Log Activity".
  - Enter workout details like activity type, duration, and calories burned.
  - Submit the form to log the activity.

- 📝 **Example 3**: How to connect with other users:
  - Log in to the application.
  - Navigate to the "Social Feed" section.
  - View posts from other users, share your achievements, and join group challenges.
  - Follow other users to stay motivated and track their progress.


## 🌐 Hosting
### 🚀 Deployment Instructions
1. **Deploying to Vercel:**
   - Log in to Vercel (or create an account) and choose "New Project".
   - Select the "GitHub" option and connect your GitHub account.
   - Select the `fitness-tracker-mvp-social-community-web-app` repository.
   - Follow the Vercel deployment instructions to create and deploy your project.

2. **Deploying to Netlify:**
   - Log in to Netlify (or create an account) and choose "New site from Git".
   - Select the "GitHub" option and connect your GitHub account.
   - Select the `fitness-tracker-mvp-social-community-web-app` repository.
   - Follow the Netlify deployment instructions to create and deploy your project.

3. **Deploying to GitHub Pages:**
   - Ensure your project has a `gh-pages` branch.
   - Add the following configuration to your `package.json` file:
     ```json
     "homepage": "https://your-username.github.io/fitness-tracker-mvp-social-community-web-app",
     "scripts": {
       "build:gh-pages": "npm run build && npm run build:gh-pages",
       "deploy:gh-pages": "gh-pages -d build"
     }
     ```
   - Install `gh-pages` as a dev dependency:
     ```bash
     npm install --save-dev gh-pages
     ```
   - Run the following command to build and deploy to GitHub Pages:
     ```bash
     npm run deploy:gh-pages
     ```

4. **Deploying to Heroku:**
   - Install the Heroku CLI:
     - `npm install -g heroku`
   - Login to Heroku:
     - `heroku login`
   - Create a new Heroku app:
     - `heroku create`
   - Deploy the code:
     - `git push heroku main`

### 🔑 Environment Variables
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`:  Your Google OAuth client ID.
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
- `DATABASE_URL`:  Your PostgreSQL database connection string.
- `SENTRY_DSN`: Your Sentry DSN for error tracking.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/users/[id]:** Retrieves user data by ID.
- **POST /api/users:** Creates a new user account.
- **GET /api/goals:** Retrieves a list of goals for the current user.
- **POST /api/goals:** Creates a new goal.
- **GET /api/goals/[id]:** Retrieves a specific goal by ID.
- **PUT /api/goals/[id]:** Updates a goal by ID.
- **DELETE /api/goals/[id]:** Deletes a goal by ID.
- **GET /api/activities:** Retrieves a list of activities for the current user.
- **POST /api/activities:** Creates a new activity.
- **GET /api/activities/[id]:** Retrieves a specific activity by ID.
- **PUT /api/activities/[id]:** Updates an activity by ID.
- **DELETE /api/activities/[id]:** Deletes an activity by ID.

### 🔒 Authentication
Use JWT tokens for authentication.

### 📝 Examples
- `curl -X GET http://localhost:3000/api/goals`
- `curl -X POST http://localhost:3000/api/activities -H "Content-Type: application/json" -d '{"type": "Running", "duration": 30, "caloriesBurned": 200}'`

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: fitness-tracker-mvp-social-community-web-app

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>