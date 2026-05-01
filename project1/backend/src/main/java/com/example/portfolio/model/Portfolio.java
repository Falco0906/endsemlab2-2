package com.example.portfolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Portfolio {

    @Id
    private Long id = 1L;

    private String name;
    private String codechefUrl;
    private String linkedinUrl;
    private String githubUrl;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCodechefUrl() {
        return codechefUrl;
    }

    public void setCodechefUrl(String codechefUrl) {
        this.codechefUrl = codechefUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
}