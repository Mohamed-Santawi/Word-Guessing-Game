Word Guessing Game

Project Overview

This is a single-page word guessing game combining Hangman and Wordle mechanics, built with React (using Vite) for the frontend and Spring Boot for the backend. Players can guess letters or whole words, select categories, manage words, and view a leaderboard. The app uses Bootstrap for responsive design and Java ObjectStreams for data persistence.

Scoring Formula

The score is calculated as follows:

Score = max(0, 1000 - (time_taken_in_seconds _ 10) - (incorrectGuesses _ 50) - (usedHint \* 100))

time_taken_in_seconds: Time from game start to completion (capped at 100 seconds).

incorrectGuesses: Number of incorrect guesses (max 6).

usedHint: 1 if the hint was used, 0 otherwise.

Minimum score: 0.

Example: Completing in 20 seconds with 2 incorrect guesses and 1 hint:

Score = max(0, 1000 - (20 _ 10) - (2 _ 50) - (1 \* 100)) = 600

Setup Instructions

Backend:

Run the Spring Boot application (WordGameApplication.java) using IntelliJ or ./mvnw spring-boot:run.

Initialize words.ser by running WordInit.java.

The API runs on http://localhost:8080.

Frontend:

Navigate to the frontend folder.

Install dependencies: npm install.

Start the Vite dev server: npm run dev.

Access the app at http://localhost:5173 (default Vite port).

Build for production: npm run build.

Dependencies:

Backend: Java 17, Spring Boot, Maven.

Frontend: Node.js, Vite, React 18, Bootstrap 5, React Router 6.

Error Handling

Server unavailable: Modal blocks game start.

No words/empty category: Modal redirects to landing page.

Score save failure: Modal informs user without crashing.

Notes

The .idea folder is included for IntelliJ run configurations.

Check console and network tabs for debugging.

The UI is responsive using Bootstrap’s grid system.
