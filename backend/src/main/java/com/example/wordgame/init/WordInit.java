package com.example.wordgame.init;

import com.example.wordgame.model.WordEntry;
import java.io.*;
import java.util.*;

/**
 * Initializes the word bank with a default set of words.
 */
public class WordInit {
    public static void main(String[] args) {
        String fileStoragePath = System.getProperty("user.dir") + File.separator + ".." + File.separator + "data";
        String filePath = fileStoragePath + File.separator + "words.ser";
        File directory = new File(fileStoragePath);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (!created) {
                System.err.println("Failed to create directory: " + fileStoragePath);
                return;
            }
        }

        List<WordEntry> initialWords = Arrays.asList(
            new WordEntry("animals", "tiger", "A large feline predator"),
            new WordEntry("animals", "elephant", "Has a long trunk"),
            new WordEntry("animals", "giraffe", "Tallest land animal"),
            new WordEntry("fruits", "apple", "Red or green fruit"),
            new WordEntry("fruits", "banana", "Long yellow fruit"),
            new WordEntry("fruits", "orange", "Citrus fruit"),
            new WordEntry("cities", "paris", "Capital of France"),
            new WordEntry("cities", "tokyo", "Capital of Japan"),
            new WordEntry("cities", "london", "Capital of the UK"),
            new WordEntry("sports", "soccer", "Played with a round ball")
        );

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(initialWords);
            System.out.println("Word bank initialized successfully with 10 words at " + filePath);
        } catch (IOException e) {
            System.err.println("Error initializing word bank: " + e.getMessage());
        }
    }
}