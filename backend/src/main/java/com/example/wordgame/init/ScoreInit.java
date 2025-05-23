package com.example.wordgame.init;

import com.example.wordgame.model.ScoreEntry;
import java.io.*;
import java.util.*;

public class ScoreInit {
    public static void main(String[] args) {
        String fileStoragePath = System.getProperty("user.dir") + File.separator + ".." + File.separator + "data";
        String filePath = fileStoragePath + File.separator + "scores.ser";
        File directory = new File(fileStoragePath);

        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (!created) {
                System.err.println("Failed to create directory: " + fileStoragePath);
                return;
            }
        }

        List<ScoreEntry> scores = new ArrayList<>();
        // Optional: Add sample scores
        // scores.add(new ScoreEntry("player1", 100));
        // scores.add(new ScoreEntry("player2", 200));

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(scores);
            System.out.println("Scores initialized at: " + filePath);
        } catch (IOException e) {
            System.err.println("Error writing scores file: " + e.getMessage());
            e.printStackTrace();
        }
    }
}