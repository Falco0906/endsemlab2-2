import { useState, useContext, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-[#9CAF88]' : 'bg-danger'
  const textColor = type === 'success' ? 'text-bg' : 'text-white'

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${bgColor} ${textColor} px-6 py-3 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-slide-in flex items-center gap-3`}>
      <span className="text-xs font-black uppercase tracking-widest leading-none">{message}</span>
      <button onClick={onClose} className="hover:opacity-60 transition-opacity">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

const AdminPanel = () => {
  const { user, logout, getAuthHeader, isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubLink: '', liveLink: '',
  })
  const [portfolioData, setPortfolioData] = useState({
    name: '', codechefUrl: '', linkedinUrl: '', githubUrl: '',
  })
  const [toast, setToast] = useState(null)

  // Gated access in component as well
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/')
    }
  }, [isAdmin, loading, navigate])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  useEffect(() => {
    if (isAdmin) fetchData()
  }, [isAdmin])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [projectsData, portfolio] = await Promise.all([
        api.getProjects(),
        api.getPortfolio()
      ])
      setProjects(projectsData)
      setPortfolioData(portfolio)
    } catch (error) {
      console.error('Error fetching admin data:', error)
      showToast('Failed to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePortfolioChange = (e) => {
    const { name, value } = e.target
    setPortfolioData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProject = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      return showToast('Title and Description are required', 'error')
    }
    try {
      console.log('Sending POST request to /projects with data:', formData)
      const newProject = await api.createProject(formData, getAuthHeader())
      console.log('Project created successfully:', newProject)
      setProjects([newProject, ...projects])
      setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' })
      showToast('Project Added Successfully')
    } catch (error) {
      console.error('Error creating project:', error)
      showToast('Failed to create project', 'error')
    }
  }

  const handleUpdateProject = async (id) => {
    if (!formData.title.trim() || !formData.description.trim()) {
      return showToast('Title and Description are required', 'error')
    }
    try {
      console.log(`Sending PUT request to /projects/${id} with data:`, formData)
      const updated = await api.updateProject(id, formData, getAuthHeader())
      console.log('Project updated successfully:', updated)
      setProjects(projects.map((p) => (p.id === id ? updated : p)))
      setEditingId(null)
      setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' })
      showToast('Project Updated Successfully')
    } catch (error) {
      console.error('Error updating project:', error)
      showToast('Failed to update project', 'error')
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      console.log(`Sending DELETE request to /projects/${id}`)
      await api.deleteProject(id, getAuthHeader())
      console.log('Project deleted successfully, ID:', id)
      setProjects(projects.filter((p) => p.id !== id))
      showToast('Project Deleted Successfully')
    } catch (error) {
      console.error('Error deleting project:', error)
      showToast('Failed to delete project', 'error')
    }
  }

  const handleEditClick = (project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
    })
    // Scroll to form
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const handleUpdatePortfolio = async () => {
    try {
      await api.updatePortfolio(portfolioData, getAuthHeader())
      showToast('Portfolio Data Updated')
    } catch (error) {
      console.error('Error updating portfolio:', error)
      showToast('Failed to update portfolio', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-wider text-text-muted">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text selection-bg">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <header className="border-b-2 border-border px-6 py-4 sticky top-0 bg-bg/80 backdrop-blur-md z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-bold text-lg uppercase tracking-tight hover:opacity-70">
              FAISAL KHAN PATHAN
            </a>
            <span className="text-text-muted">|</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#9CAF88]">DASHBOARD</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-text-muted">{user?.email}</span>
            <button onClick={() => navigate('/')}
              className="text-xs font-bold uppercase tracking-wider border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all cursor-pointer">
              VIEW SITE
            </button>
            <button onClick={logout}
              className="text-xs font-bold uppercase tracking-wider border-2 border-border px-3 py-1.5 hover:bg-danger hover:text-white hover:border-danger transition-all cursor-pointer">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
        {/* Portfolio Settings */}
        <section className="mb-12">
          <h2 className="text-xl font-black uppercase tracking-tight text-text mb-2">PORTFOLIO SETTINGS</h2>
          <div className="w-full h-[2px] bg-border mb-6" />
          <div className="border-2 border-border p-6 space-y-4">
            {[
              { label: 'NAME', name: 'name', value: portfolioData.name },
              { label: 'CODECHEF URL', name: 'codechefUrl', value: portfolioData.codechefUrl },
              { label: 'LINKEDIN URL', name: 'linkedinUrl', value: portfolioData.linkedinUrl },
              { label: 'GITHUB URL', name: 'githubUrl', value: portfolioData.githubUrl },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold uppercase tracking-wider text-text mb-1">{field.label}</label>
                <input type="text" name={field.name} value={field.value || ''} onChange={handlePortfolioChange}
                  className="w-full bg-transparent border-2 border-border text-text text-sm px-3 py-2 focus:outline-none focus:border-text-secondary" />
              </div>
            ))}
            <button onClick={handleUpdatePortfolio}
              className="text-xs font-bold uppercase tracking-wider border-2 border-border px-5 py-2 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
              SAVE PORTFOLIO
            </button>
          </div>
        </section>

        {/* Project Form */}
        <section className="mb-12">
          <h2 className="text-xl font-black uppercase tracking-tight text-text mb-2">
            {editingId ? 'EDIT PROJECT' : 'ADD PROJECT'}
          </h2>
          <div className="w-full h-[2px] bg-border mb-6" />
          <div className="border-2 border-border p-6 space-y-4">
            {[
              { label: 'TITLE', name: 'title', value: formData.title },
              { label: 'TECH STACK (COMMA SEPARATED)', name: 'techStack', value: formData.techStack },
              { label: 'GITHUB LINK', name: 'githubLink', value: formData.githubLink },
              { label: 'LIVE LINK', name: 'liveLink', value: formData.liveLink },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold uppercase tracking-wider text-text mb-1">{field.label}</label>
                <input type="text" name={field.name} value={field.value} onChange={handleInputChange}
                  className="w-full bg-transparent border-2 border-border text-text text-sm px-3 py-2 focus:outline-none focus:border-text-secondary" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text mb-1">DESCRIPTION</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}
                className="w-full bg-transparent border-2 border-border text-text text-sm px-3 py-2 focus:outline-none focus:border-text-secondary resize-none" />
            </div>
            <div className="flex gap-3">
              {editingId ? (
                <>
                  <button onClick={() => handleUpdateProject(editingId)}
                    className="text-xs font-bold uppercase tracking-wider border-2 border-border px-5 py-2 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                    UPDATE
                  </button>
                  <button onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' }) }}
                    className="text-xs font-bold uppercase tracking-wider border-2 border-border px-5 py-2 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                    CANCEL
                  </button>
                </>
              ) : (
                <button onClick={handleAddProject}
                  className="text-xs font-bold uppercase tracking-wider border-2 border-border px-5 py-2 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                  ADD PROJECT
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-tight text-text mb-2">
            PROJECTS ({projects.length})
          </h2>
          <div className="w-full h-[2px] bg-border mb-6" />

          {projects.length === 0 ? (
            <div className="border-2 border-border p-6 text-center">
              <p className="text-text-muted text-sm">No projects yet. Create your first one above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-border p-5 hover:bg-text/5 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold uppercase text-text">{project.title}</h3>
                      <p className="text-text-secondary text-sm mt-1">{project.description}</p>
                      <div className="flex gap-3 mt-2">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-bold uppercase text-text underline">GitHub →</a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-bold uppercase text-text underline">Live →</a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4 shrink-0">
                      <button onClick={() => handleEditClick(project)}
                        className="text-[10px] font-bold uppercase tracking-wider border-2 border-border px-3 py-1 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                        EDIT
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)}
                        className="text-[10px] font-bold uppercase tracking-wider border-2 border-danger text-danger px-3 py-1 hover:bg-danger hover:text-white transition-all duration-200 cursor-pointer">
                        DELETE
                      </button>
                    </div>
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

export default AdminPanel
