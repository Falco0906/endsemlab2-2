import axios from 'axios'

// Prefer Render backend URL if provided in environment, otherwise fall back to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Centralized Project API service
export const getProjects = async () => {
  const response = await apiClient.get('/projects')
  return response.data
}

export const createProject = async (projectData, headers) => {
  const response = await apiClient.post('/projects', projectData, { headers })
  return response.data
}

export const updateProject = async (id, projectData, headers) => {
  const response = await apiClient.put(`/projects/${id}`, projectData, { headers })
  return response.data
}

export const deleteProject = async (id, headers) => {
  const response = await apiClient.delete(`/projects/${id}`, { headers })
  return response.data
}

// Portfolio API service
export const getPortfolio = async () => {
  const response = await apiClient.get('/portfolio')
  return response.data
}

export const updatePortfolio = async (portfolioData, headers) => {
  const response = await apiClient.put('/portfolio', portfolioData, { headers })
  return response.data
}

const api = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getPortfolio,
  updatePortfolio
}

export default api
