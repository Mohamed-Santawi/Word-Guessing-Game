package com.example.wordgame.controller;

import com.example.wordgame.model.Word;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/api/words")
public class WordController {
    @Value("${file.storage.path:}")
    private String fileStoragePath;
    private static final String WORDS_FILE = "words.ser";
    private Map<String, List<Word>> wordsByCategory = new HashMap<>();

    public WordController() {
        loadWords();
    }

    @SuppressWarnings("unchecked")
    private void loadWords() {
        if (fileStoragePath == null) {
            System.out.println("Error: fileStoragePath is null, using default path: " + WORDS_FILE);
            fileStoragePath = "";
        }
        String filePath = fileStoragePath.isEmpty() ? WORDS_FILE : fileStoragePath + File.separator + WORDS_FILE;
        System.out.println("Loading words from: " + filePath);
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath))) {
            wordsByCategory = (Map<String, List<Word>>) ois.readObject();
            System.out.println("Loaded " + wordsByCategory.values().stream().mapToInt(List::size).sum() + " words from " + filePath);
        } catch (FileNotFoundException e) {
            System.out.println("Words file not found at: " + filePath + ", initializing with default words");
            wordsByCategory = new HashMap<>();
            // Initialize with some default words
            List<Word> animals = new ArrayList<>();
            animals.add(new Word("Animals", "cat", "A small domesticated carnivorous mammal"));
            animals.add(new Word("Animals", "dog", "Man's best friend"));
            animals.add(new Word("Animals", "elephant", "The largest land animal"));
            wordsByCategory.put("Animals", animals);

            List<Word> fruits = new ArrayList<>();
            fruits.add(new Word("Fruits", "apple", "Keeps the doctor away"));
            fruits.add(new Word("Fruits", "banana", "A yellow curved fruit"));
            fruits.add(new Word("Fruits", "orange", "A citrus fruit"));
            wordsByCategory.put("Fruits", fruits);

            // Save the default words
            saveWords();
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException("Error reading words file at " + filePath, e);
        }
    }

    private void saveWords() {
        String filePath = fileStoragePath.isEmpty() ? WORDS_FILE : fileStoragePath + File.separator + WORDS_FILE;
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(wordsByCategory);
        } catch (IOException e) {
            throw new RuntimeException("Error writing words file at " + filePath, e);
        }
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return new ArrayList<>(wordsByCategory.keySet());
    }

    @GetMapping("/random")
    public ResponseEntity<Word> getRandomWord(@RequestParam String category) {
        List<Word> words = wordsByCategory.getOrDefault(category, new ArrayList<>());
        if (words.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Random rand = new Random();
        Word word = words.get(rand.nextInt(words.size()));
        return ResponseEntity.ok(word);
    }

    @GetMapping
    public List<Word> getAllWords() {
        List<Word> allWords = new ArrayList<>();
        wordsByCategory.values().forEach(allWords::addAll);
        return allWords;
    }

    @PostMapping
    public ResponseEntity<Word> addWord(@RequestBody Word word) {
        if (!word.getCategory().matches("^[a-zA-Z]+$") || !word.getWord().matches("^[a-zA-Z]+$")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        wordsByCategory.computeIfAbsent(word.getCategory(), k -> new ArrayList<>()).add(word);
        saveWords();
        return ResponseEntity.ok(word);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWord(@RequestParam String category, @RequestParam String word) {
        List<Word> words = wordsByCategory.get(category);
        if (words != null) {
            boolean removed = words.removeIf(w -> w.getWord().equalsIgnoreCase(word));
            if (removed) {
                if (words.isEmpty()) {
                    wordsByCategory.remove(category);
                }
                saveWords();
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}