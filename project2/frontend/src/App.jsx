import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8081/employees'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', department: '', designation: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const resp = await axios.get(API_URL)
      setEmployees(resp.data)
    } catch (err) {
      console.error('Error fetching employees:', err)
      alert('Failed to connect to backend on port 8081')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        const resp = await axios.put(`${API_URL}/${editingId}`, formData)
        setEmployees(employees.map(emp => emp.id === editingId ? resp.data : emp))
        setEditingId(null)
      } else {
        const resp = await axios.post(API_URL, formData)
        setEmployees([...employees, resp.data])
      }
      setFormData({ name: '', email: '', department: '', designation: '' })
    } catch (err) {
      console.error('Error saving employee:', err)
    }
  }

  const handleEdit = (emp) => {
    setEditingId(emp.id)
    setFormData({ name: emp.name, email: emp.email, department: emp.department, designation: emp.designation })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return
    try {
      await axios.delete(`${API_URL}/${id}`)
      setEmployees(employees.filter(emp => emp.id !== id))
    } catch (err) {
      console.error('Error deleting employee:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 pb-2">Employee Management System</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleInputChange} required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', department: '', designation: '' }) }}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Employees List ({employees.length})</h2>
            {loading ? (
              <p className="text-center text-gray-500 py-4">Loading employees...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Name</th>
                      <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Dept</th>
                      <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Designation</th>
                      <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">
                          <div className="font-medium text-gray-800">{emp.name}</div>
                          <div className="text-xs text-gray-500">{emp.email}</div>
                        </td>
                        <td className="p-3 text-gray-700 text-sm">{emp.department}</td>
                        <td className="p-3 text-gray-700 text-sm font-medium">{emp.designation}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
                            <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {employees.length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-400 italic font-light">No employees found. Add one on the left.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
