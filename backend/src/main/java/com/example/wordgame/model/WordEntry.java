package com.example.wordgame.model;

import java.io.Serializable;

/**
 * Represents a word entry in the word bank.
 */
public class WordEntry implements Serializable {
    private String category;
    private String word;
    private String hint;

    public WordEntry(String category, String word, String hint) {
        this.category = category;
        this.word = word;
        this.hint = hint;
    }

    public String getCategory() {
        return category;
    }

    public String getWord() {
        return word;
    }

    public String getHint() {
        return hint;
    }
}