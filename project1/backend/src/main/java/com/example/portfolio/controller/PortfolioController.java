package com.example.portfolio.controller;

import com.example.portfolio.model.Portfolio;
import com.example.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/portfolio")
    public Portfolio getPortfolio() {
        return portfolioService.getPortfolio();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/portfolio")
    public Portfolio updatePortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.updatePortfolio(portfolio);
    }
}