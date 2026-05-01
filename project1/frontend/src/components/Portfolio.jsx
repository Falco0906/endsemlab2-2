import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/Portfolio.css'

export const Portfolio = () => {
  const { user, logout } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="portfolio">Loading...</div>
  }

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>My Portfolio</h1>
        <div className="header-info">
          <span>{user?.email}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="portfolio-main">
        <div className="portfolio-intro">
          <h2>Featured Projects</h2>
          <p>A collection of my best work</p>
        </div>

        {projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects available yet.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
                <div className="project-links">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}