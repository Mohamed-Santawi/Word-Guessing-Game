package com.example.wordgame.model;

import java.io.Serializable;
import java.util.Date;

public class Score implements Serializable {
    private static final long serialVersionUID = 1L;
    private String playerName;
    private int score;
    private Date timestamp;

    public Score() {
    }

    public Score(String playerName, int score) {
        this.playerName = playerName;
        this.score = score;
        this.timestamp = new Date();
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}