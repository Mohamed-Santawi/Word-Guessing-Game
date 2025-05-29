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
            // Animals category
            new WordEntry("Animals", "tiger", "A large feline predator"),
            new WordEntry("Animals", "elephant", "Has a long trunk"),
            new WordEntry("Animals", "giraffe", "Tallest land animal"),
            new WordEntry("Animals", "penguin", "Flightless bird that lives in cold regions"),
            new WordEntry("Animals", "dolphin", "Intelligent marine mammal"),
            new WordEntry("Animals", "koala", "Australian marsupial that eats eucalyptus"),
            new WordEntry("Animals", "panda", "Black and white bear from China"),
            new WordEntry("Animals", "zebra", "African horse with black and white stripes"),
            new WordEntry("Animals", "kangaroo", "Australian marsupial that hops"),
            new WordEntry("Animals", "rhinoceros", "Large herbivore with horns"),

            // Fruits category
            new WordEntry("Fruits", "apple", "Red or green fruit"),
            new WordEntry("Fruits", "banana", "Long yellow fruit"),
            new WordEntry("Fruits", "orange", "Citrus fruit"),
            new WordEntry("Fruits", "mango", "Tropical fruit with a large seed"),
            new WordEntry("Fruits", "strawberry", "Red fruit with seeds on the outside"),
            new WordEntry("Fruits", "pineapple", "Tropical fruit with spiky skin"),
            new WordEntry("Fruits", "watermelon", "Large green fruit with red flesh"),
            new WordEntry("Fruits", "grape", "Small round fruit that grows in clusters"),
            new WordEntry("Fruits", "kiwi", "Brown fuzzy fruit with green flesh"),
            new WordEntry("Fruits", "peach", "Fuzzy fruit with a large pit"),

            // Football Players category
            new WordEntry("Football Players", "messi", "Argentine forward who won the World Cup in 2022"),
            new WordEntry("Football Players", "ronaldo", "Portuguese forward known as CR7"),
            new WordEntry("Football Players", "mbappe", "French forward who won the World Cup in 2018"),
            new WordEntry("Football Players", "neymar", "Brazilian forward known for his skills"),
            new WordEntry("Football Players", "salah", "Egyptian forward who plays for Liverpool"),
            new WordEntry("Football Players", "benzema", "French striker who won the Ballon d'Or"),
            new WordEntry("Football Players", "lewandowski", "Polish striker who played for Bayern Munich"),
            new WordEntry("Football Players", "haaland", "Norwegian striker who plays for Manchester City"),
            new WordEntry("Football Players", "modric", "Croatian midfielder who won the Ballon d'Or"),
            new WordEntry("Football Players", "debruyne", "Belgian midfielder who plays for Manchester City")
        );

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(initialWords);
            System.out.println("Word bank initialized successfully with 10 words at " + filePath);
        } catch (IOException e) {
            System.err.println("Error initializing word bank: " + e.getMessage());
        }
    }
}