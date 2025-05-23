package com.example.wordgame.model;

import java.io.Serializable;

public class ScoreEntry implements Serializable {
    private static final long serialVersionUID = 1L;
    private String nickname;
    private int score;

    // Constructors
    public ScoreEntry() {}
    public ScoreEntry(String nickname, int score) {
        this.nickname = nickname;
        this.score = score;
    }

    // Getters and Setters
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    @Override
    public String toString() {
        return "ScoreEntry{nickname='" + nickname + "', score=" + score + "}";
    }
}
// package com.example.wordgame.model;

// import java.io.Serializable;

// /**
//  * Represents a leaderboard score entry.
//  */
// public class ScoreEntry implements Serializable {
//     private String nickname;
//     private int score;

//     public ScoreEntry(String nickname, int score) {
//         this.nickname = nickname;
//         this.score = score;
//     }

//     public String getNickname() {
//         return nickname;
//     }

//     public int getScore() {
//         return score;
//     }
// }