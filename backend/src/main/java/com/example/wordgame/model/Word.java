package com.example.wordgame.model;

import java.io.Serializable;

public class Word implements Serializable {
    private static final long serialVersionUID = 1L;
    private String category;
    private String word;
    private String hint;

    public Word() {}
    public Word(String category, String word, String hint) {
        this.category = category;
        this.word = word;
        this.hint = hint;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getWord() { return word; }
    public void setWord(String word) { this.word = word; }
    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }

    @Override
    public String toString() {
        return "Word{category='" + category + "', word='" + word + "', hint='" + hint + "'}";
    }
}