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
@CrossOrigin(origins = "http://localhost:5173")
public class ScoreController {

    private static final Logger LOGGER = Logger.getLogger(ScoreController.class.getName());
    private List<Score> scores;
    private final String filePath;

    public ScoreController(@Value("${file.storage.path}") String storagePath) {
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
    public ResponseEntity<Score> saveScore(@RequestBody Score score) {
        if (score == null || score.getPlayerName() == null || score.getScore() < 0) {
            LOGGER.warning("Invalid score data received");
            return ResponseEntity.badRequest().build();
        }
        score.setTimestamp(new Date());
        scores.add(score);
        saveScores();
        LOGGER.info("Saved score for player: " + score.getPlayerName() + ", score: " + score.getScore());
        return ResponseEntity.status(HttpStatus.CREATED).body(score);
    }

    @GetMapping
    public ResponseEntity<List<Score>> getHighScores() {
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
    }
}