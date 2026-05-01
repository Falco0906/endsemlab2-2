import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'
import portfolioData from '../data/portfolioData'

const ProjectsSection = () => {
  const { isAdmin, getAuthHeader } = useContext(AuthContext)
  const [staticProjects] = useState(portfolioData.projects)
  const [apiProjects, setApiProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await api.getProjects()
        setApiProjects(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load additional projects.')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await api.deleteProject(id, getAuthHeader())
      setApiProjects(apiProjects.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('Failed to delete project.')
    }
  }

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          PROJECTS
        </h2>
        <p className="text-sm text-text-secondary mb-2">
          A selection of projects spanning AI, automation, and full-stack development.
        </p>
        <div className="w-full h-[2px] bg-border mb-8" />

        <div className="space-y-4">
          {staticProjects.map((project, idx) => (
            <div key={idx} className="border-2 border-border p-5 md:p-6 hover:bg-text/5 transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold uppercase text-text">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium tracking-wider text-text-muted uppercase">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                      GITHUB
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                      LIVE
                    </a>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-border my-3" />

              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, techIdx) => (
                  <span key={techIdx}
                    className="text-[10px] font-bold uppercase tracking-wider text-text border-2 border-border px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loading and Error states for API projects */}
        {loading && (
          <p className="text-xs font-bold uppercase text-text-muted mt-8 animate-pulse">
            LOADING ADDITIONAL PROJECTS...
          </p>
        )}

        {error && (
          <p className="text-xs font-bold uppercase text-danger mt-8">
            {error}
          </p>
        )}

        {/* Dynamic API projects */}
        {!loading && apiProjects.length > 0 && (
          <>
            <div className="h-[2px] bg-border my-8" />
            <p className="text-xs font-bold tracking-wider uppercase text-text-muted mb-4">
              ADDITIONAL PROJECTS
            </p>
            <div className="space-y-4">
              {apiProjects.map((project) => (
                <div key={project.id} className="border-2 border-border p-5 hover:bg-text/5 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold uppercase text-text">{project.title}</h3>
                      <p className="text-text-secondary text-sm mt-1">{project.description}</p>
                      
                      {project.techStack && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.techStack.split(',').map((tech, techIdx) => (
                            <span key={techIdx}
                              className="text-[9px] font-bold uppercase tracking-wider text-text border border-border px-1.5 py-0.5">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-4">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                            GITHUB →
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                            LIVE →
                          </a>
                        )}
                      </div>
                    </div>
                    {isAdmin && (
                      <button onClick={() => handleDelete(project.id)}
                        className="text-[10px] font-bold uppercase border-2 border-border text-danger px-2 py-1 hover:bg-danger hover:text-white transition-all duration-200 cursor-pointer h-fit ml-4">
                        DELETE
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
