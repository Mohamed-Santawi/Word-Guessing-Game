package com.example.wordgame.controller;

import com.example.wordgame.model.Word;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.util.*;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/words")
public class WordController {
    private static final Logger LOGGER = Logger.getLogger(WordController.class.getName());
    private static final String WORDS_FILE = "words.ser";

    @Value("${file.storage.path:}")
    private String fileStoragePath;

    private Map<String, List<Word>> wordsByCategory = new HashMap<>();

    public WordController() {
        loadWords();
    }

    @SuppressWarnings("unchecked")
    private void loadWords() {
        String filePath = getFilePath();
        LOGGER.info("Loading words from: " + filePath);

        File file = new File(filePath);
        File directory = file.getParentFile();

        // Ensure directory exists
        if (directory != null && !directory.exists()) {
            boolean created = directory.mkdirs();
            if (!created) {
                LOGGER.severe("Failed to create directory: " + directory.getAbsolutePath());
            }
        }

        try {
            if (file.exists()) {
                try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath))) {
                    wordsByCategory = (Map<String, List<Word>>) ois.readObject();
                    LOGGER.info("Loaded " + wordsByCategory.values().stream().mapToInt(List::size).sum() + " words from " + filePath);
                }
            } else {
                LOGGER.info("Words file not found at: " + filePath + ", initializing with default words");
                initializeDefaultWords();
            }
        } catch (Exception e) {
            LOGGER.severe("Error loading words: " + e.getMessage());
            initializeDefaultWords();
        }
    }

    private void initializeDefaultWords() {
        wordsByCategory = new HashMap<>();

        // Animals category
        List<Word> animals = new ArrayList<>();
        animals.add(new Word("Animals", "cat", "A small domesticated carnivorous mammal"));
        animals.add(new Word("Animals", "dog", "Man's best friend"));
        animals.add(new Word("Animals", "elephant", "The largest land animal"));
        animals.add(new Word("Animals", "lion", "King of the jungle"));
        animals.add(new Word("Animals", "tiger", "A striped big cat"));
        wordsByCategory.put("Animals", animals);

        // Fruits category
        List<Word> fruits = new ArrayList<>();
        fruits.add(new Word("Fruits", "apple", "Keeps the doctor away"));
        fruits.add(new Word("Fruits", "banana", "A yellow curved fruit"));
        fruits.add(new Word("Fruits", "orange", "A citrus fruit"));
        fruits.add(new Word("Fruits", "grape", "Used to make wine"));
        fruits.add(new Word("Fruits", "mango", "A tropical fruit"));
        wordsByCategory.put("Fruits", fruits);

        // Countries category
        List<Word> countries = new ArrayList<>();
        countries.add(new Word("Countries", "france", "Home of the Eiffel Tower"));
        countries.add(new Word("Countries", "japan", "Land of the rising sun"));
        countries.add(new Word("Countries", "brazil", "Home of the Amazon rainforest"));
        countries.add(new Word("Countries", "egypt", "Home of the pyramids"));
        countries.add(new Word("Countries", "australia", "The land down under"));
        wordsByCategory.put("Countries", countries);

        saveWords();
    }

    private String getFilePath() {
        if (fileStoragePath == null || fileStoragePath.trim().isEmpty()) {
            LOGGER.warning("fileStoragePath is null or empty, using default path: " + WORDS_FILE);
            return WORDS_FILE;
        }
        return fileStoragePath + File.separator + WORDS_FILE;
    }

    private void saveWords() {
        String filePath = getFilePath();
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(wordsByCategory);
            LOGGER.info("Saved " + wordsByCategory.values().stream().mapToInt(List::size).sum() + " words to " + filePath);
        } catch (IOException e) {
            LOGGER.severe("Error saving words: " + e.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        try {
            List<String> categories = new ArrayList<>(wordsByCategory.keySet());
            if (categories.isEmpty()) {
                LOGGER.warning("No categories available");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            LOGGER.severe("Error getting categories: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/random")
    public ResponseEntity<Word> getRandomWord(@RequestParam String category) {
        try {
            List<Word> words = wordsByCategory.getOrDefault(category, new ArrayList<>());
            if (words.isEmpty()) {
                LOGGER.warning("No words found for category: " + category);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Random rand = new Random();
            Word word = words.get(rand.nextInt(words.size()));
            LOGGER.info("Selected random word for category " + category + ": " + word.getWord());
            return ResponseEntity.ok(word);
        } catch (Exception e) {
            LOGGER.severe("Error getting random word: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Word>> getAllWords() {
        try {
            List<Word> allWords = new ArrayList<>();
            wordsByCategory.values().forEach(allWords::addAll);
            return ResponseEntity.ok(allWords);
        } catch (Exception e) {
            LOGGER.severe("Error getting all words: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Word> addWord(@RequestBody Word word) {
        try {
            if (word == null || word.getCategory() == null || word.getWord() == null) {
                LOGGER.warning("Invalid word data received");
                return ResponseEntity.badRequest().build();
            }
            if (!word.getCategory().matches("^[a-zA-Z]+$") || !word.getWord().matches("^[a-zA-Z]+$")) {
                LOGGER.warning("Invalid word or category format");
                return ResponseEntity.badRequest().build();
            }
            wordsByCategory.computeIfAbsent(word.getCategory(), k -> new ArrayList<>()).add(word);
            saveWords();
            LOGGER.info("Added new word: " + word.getWord() + " to category: " + word.getCategory());
            return ResponseEntity.ok(word);
        } catch (Exception e) {
            LOGGER.severe("Error adding word: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWord(@RequestParam String category, @RequestParam String word) {
        try {
            List<Word> words = wordsByCategory.get(category);
            if (words != null) {
                boolean removed = words.removeIf(w -> w.getWord().equalsIgnoreCase(word));
                if (removed) {
                    if (words.isEmpty()) {
                        wordsByCategory.remove(category);
                    }
                    saveWords();
                    LOGGER.info("Deleted word: " + word + " from category: " + category);
                    return ResponseEntity.ok().build();
                }
            }
            LOGGER.warning("Word not found: " + word + " in category: " + category);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            LOGGER.severe("Error deleting word: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}