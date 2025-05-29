# Word Guessing Game

A modern word guessing game that combines elements of Hangman and Wordle, built with React and Spring Boot.

## Features

- 🎮 Multiple word categories (Animals, Fruits, Football Players)
- ⏱️ Real-time timer for scoring
- 💡 Hint system
- 🏆 Global leaderboard
- 📝 Word management system
- 📱 Responsive design using Bootstrap
- 🔄 Continuous gameplay
- 🎯 Dynamic category switching

## Technical Stack

### Frontend

- React
- React Router for navigation
- Bootstrap for responsive design
- Font Awesome for icons

### Backend

- Spring Boot
- REST API architecture
- Java ObjectStreams for data persistence
- Maven for dependency management

## Project Structure

```
word-guessing-game/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/       # Configuration files
│   │   └── App.jsx       # Main application component
│   └── package.json      # Frontend dependencies
│
└── backend/              # Spring Boot backend application
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/
    │       │       └── example/
    │       │           └── wordgame/
    │       │               ├── controller/  # REST controllers
    │       │               ├── model/       # Data models
    │       │               └── init/        # Initialization classes
    │       └── resources/
    │           └── application.properties
    └── pom.xml           # Backend dependencies
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Node.js 14 or higher
- Maven

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the project:
   ```bash
   ./mvnw clean package
   ```
3. Run the application:
   ```bash
   java -jar target/wordgame-0.0.1-SNAPSHOT.jar
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Game Rules

1. Enter your nickname on the landing page
2. Select a word category
3. Guess letters or the entire word
4. Use hints if needed (affects final score)
5. Try to guess the word before running out of attempts

## Scoring System

The game uses a sophisticated scoring system that takes into account:

- Time taken to solve
- Number of incorrect guesses
- Hint usage

### Scoring Formula

```
Final Score = 1000 - (Time Taken × 10) - (Incorrect Guesses × 50) - (Hint Used × 100)
```

- Base score: 1000 points
- Time penalty: -10 points per second
- Incorrect guess penalty: -50 points per wrong guess
- Hint penalty: -100 points if hint is used

## Error Handling

The application implements comprehensive error handling:

- Server unavailable before game start → Game start blocked
- Server unavailable after game end → Score cannot be saved
- No words available → Game start blocked
- Invalid input → Clear error messages with Bootstrap modals

## Word Management

The word management system allows:

- Adding new categories
- Adding/editing/deleting words
- Validation for letters a-z only
- Case-insensitive word handling
- Prevention of duplicate words

## API Endpoints

### Words

- `GET /api/words/categories` - Get all categories
- `GET /api/words/random?category={category}` - Get random word from category
- `GET /api/words` - Get all words
- `POST /api/words` - Add new word
- `DELETE /api/words?category={category}&word={word}` - Delete word

### Scores

- `GET /api/scores` - Get leaderboard
- `POST /api/scores` - Save new score

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
