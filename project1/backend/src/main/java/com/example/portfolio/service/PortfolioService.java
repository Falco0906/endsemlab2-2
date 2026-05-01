package com.example.portfolio.service;

import com.example.portfolio.model.Portfolio;
import com.example.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio getPortfolio() {
        return portfolioRepository.findById(1L).orElse(createDefaultPortfolio());
    }

    public Portfolio updatePortfolio(Portfolio portfolio) {
        portfolio.setId(1L);
        return portfolioRepository.save(portfolio);
    }

    private Portfolio createDefaultPortfolio() {
        Portfolio portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setName("Your Name");
        portfolio.setCodechefUrl("https://www.codechef.com/users/yourusername");
        portfolio.setLinkedinUrl("https://www.linkedin.com/in/yourprofile");
        portfolio.setGithubUrl("https://github.com/yourusername");
        return portfolioRepository.save(portfolio);
    }
}