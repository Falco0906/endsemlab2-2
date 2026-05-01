import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/AdminDashboard.css'

export const AdminDashboard = () => {
  const { user, token, logout, getAuthHeader } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    liveLink: ''
  })

  // Fetch projects
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddProject = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a project title')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const newProject = await response.json()
        setProjects([newProject, ...projects])
        setFormData({
          title: '',
          description: '',
          githubLink: '',
          liveLink: ''
        })
        alert('Project created successfully!')
      } else {
        alert('Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Error creating project')
    }
  }

  const handleUpdateProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedProject = await response.json()
        setProjects(projects.map(p => p.id === id ? updatedProject : p))
        setEditingId(null)
        setFormData({
          title: '',
          description: '',
          githubLink: '',
          liveLink: ''
        })
        alert('Project updated successfully!')
      } else {
        alert('Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Error updating project')
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      })

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id))
        alert('Project deleted successfully!')
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    }
  }

  const handleEditClick = (project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      liveLink: project.liveLink
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      githubLink: '',
      liveLink: ''
    })
  }

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="header-info">
          <span>Welcome, {user?.email}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="admin-main">
        {/* Add/Edit Project Form */}
        <section className="project-form-section">
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <div className="project-form">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="url"
              name="githubLink"
              placeholder="GitHub Link"
              value={formData.githubLink}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="liveLink"
              placeholder="Live Demo Link"
              value={formData.liveLink}
              onChange={handleInputChange}
            />
            <div className="form-actions">
              {editingId ? (
                <>
                  <button className="save-btn" onClick={() => handleUpdateProject(editingId)}>
                    Update Project
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="add-btn" onClick={handleAddProject}>
                  Add Project
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="projects-list-section">
          <h2>Projects ({projects.length})</h2>
          {projects.length === 0 ? (
            <p className="no-projects">No projects yet. Create your first project!</p>
          ) : (
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                  <div className="project-actions">
                    <button className="edit-btn" onClick={() => handleEditClick(project)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}