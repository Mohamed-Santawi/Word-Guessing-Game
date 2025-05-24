package com.example.wordgame.controller;

import com.example.wordgame.model.Score;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private static final Logger LOGGER = Logger.getLogger(ScoreController.class.getName());
    private List<Score> scores;
    private final String filePath;

    public ScoreController(@Value("${file.storage.path:}") String storagePath) {
        this.filePath = storagePath + File.separator + "scores.ser";
    }

    @SuppressWarnings("unchecked")
    @PostConstruct
    public void init() {
        File file = new File(filePath);
        File directory = file.getParentFile();

        // Ensure data directory exists
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (!created) {
                LOGGER.severe("Failed to create directory: " + directory.getAbsolutePath());
                scores = new ArrayList<>();
                return;
            }
        }

        // Load scores.ser if it exists
        if (file.exists()) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath))) {
                scores = (List<Score>) ois.readObject();
                LOGGER.info("Loaded " + scores.size() + " scores from " + filePath);
            } catch (FileNotFoundException e) {
                LOGGER.severe("scores.ser not found at " + filePath + ": " + e.getMessage());
                scores = new ArrayList<>();
            } catch (IOException | ClassNotFoundException e) {
                LOGGER.severe("Error loading scores.ser: " + e.getMessage());
                scores = new ArrayList<>();
            }
        } else {
            // Initialize empty scores.ser
            scores = new ArrayList<>();
            saveScores();
            LOGGER.info("Initialized empty scores.ser at " + filePath);
        }
    }

    private void saveScores() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(scores);
            LOGGER.info("Saved " + scores.size() + " scores to " + filePath);
        } catch (IOException e) {
            LOGGER.severe("Error saving scores.ser: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Score> saveScore(@RequestBody Map<String, Object> scoreData) {
        try {
            String playerName = null;
            if (scoreData.containsKey("playerName")) {
                playerName = (String) scoreData.get("playerName");
            } else if (scoreData.containsKey("nickname")) {
                playerName = (String) scoreData.get("nickname");
            }

            Object scoreValue = scoreData.get("score");
            if (playerName == null || playerName.trim().isEmpty() || scoreValue == null) {
                LOGGER.warning("Invalid score data received: " + scoreData);
                return ResponseEntity.badRequest().build();
            }

            int score = 0;
            if (scoreValue instanceof Number) {
                score = ((Number) scoreValue).intValue();
            } else if (scoreValue instanceof String) {
                try {
                    score = Integer.parseInt((String) scoreValue);
                } catch (NumberFormatException e) {
                    LOGGER.warning("Invalid score value: " + scoreValue);
                    return ResponseEntity.badRequest().build();
                }
            }

            if (score < 0) {
                LOGGER.warning("Negative score received: " + score);
                return ResponseEntity.badRequest().build();
            }

            Score newScore = new Score(playerName.trim(), score);
            newScore.setTimestamp(new Date());
            scores.add(newScore);
            saveScores();
            LOGGER.info("Saved score for player: " + playerName + ", score: " + score);
            return ResponseEntity.status(HttpStatus.CREATED).body(newScore);
        } catch (Exception e) {
            LOGGER.severe("Error saving score: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Score>> getHighScores() {
        try {
            if (scores.isEmpty()) {
                LOGGER.warning("No scores available; returning empty list");
                return ResponseEntity.ok(new ArrayList<>());
            }
            List<Score> sortedScores = scores.stream()
                    .sorted(Comparator.comparingInt(Score::getScore).reversed()
                            .thenComparing(Score::getTimestamp))
                    .limit(10)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(sortedScores);
        } catch (Exception e) {
            LOGGER.severe("Error getting high scores: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}