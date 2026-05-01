package com.example.portfolio.service;

import com.example.portfolio.entity.Project;
import com.example.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * Get all projects
     */
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Get project by ID
     */
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    /**
     * Create new project (Admin only)
     */
    public Project createProject(Project project) {
        if (project.getTitle() == null || project.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Project title cannot be empty");
        }
        return projectRepository.save(project);
    }

    /**
     * Update project (Admin only)
     */
    public Project updateProject(Long id, Project projectDetails) {
        Optional<Project> existingProject = projectRepository.findById(id);

        if (existingProject.isPresent()) {
            Project project = existingProject.get();

            if (projectDetails.getTitle() != null) {
                project.setTitle(projectDetails.getTitle());
            }
            if (projectDetails.getDescription() != null) {
                project.setDescription(projectDetails.getDescription());
            }
            if (projectDetails.getGithubLink() != null) {
                project.setGithubLink(projectDetails.getGithubLink());
            }
            if (projectDetails.getLiveLink() != null) {
                project.setLiveLink(projectDetails.getLiveLink());
            }
            if (projectDetails.getTechStack() != null) {
                project.setTechStack(projectDetails.getTechStack());
            }

            return projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("Project not found with ID: " + id);
        }
    }

    /**
     * Delete project (Admin only)
     */
    public void deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Project not found with ID: " + id);
        }
    }
}