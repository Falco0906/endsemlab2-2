# REST APIs & React Authentication Implementation Guide

## Overview

This document provides a comprehensive guide to the Portfolio REST API system and React authentication flow implementation.

---

## Part 1: Spring Boot REST APIs

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│              HTTP REST API Layer                         │
│  (ProjectController - Port 8080)                        │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Service Layer                              │
│  (ProjectService - Business Logic)                      │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Repository Layer                           │
│  (ProjectRepository - Data Access)                      │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Database                                    │
│  (H2 Dev / MySQL Prod)                                  │
└──────────────────────────────────────────────────────────┘
```

### Project Entity

```java
@Entity
@Table(name = "projects")
public class Project {
    @Id @GeneratedValue
    Long id;
    
    @Column(nullable = false)
    String title;
    
    @Column(columnDefinition = "TEXT")
    String description;
    
    String githubLink;
    String liveLink;
    Long createdAt;
    Long updatedAt;
}
```

**Database Table Structure**:
```sql
CREATE TABLE projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_link VARCHAR(500),
    live_link VARCHAR(500),
    created_at BIGINT,
    updated_at BIGINT
);
```

---

## API Endpoints

### 1. Get All Projects (PUBLIC)

**Endpoint**: `GET /api/projects`

**Authentication**: Not required

**Response**: Array of projects

```bash
curl -X GET http://localhost:8080/api/projects
```

**Response Example**:
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "Full-stack React & Spring Boot e-commerce application",
    "githubLink": "https://github.com/user/ecommerce",
    "liveLink": "https://ecommerce-demo.com",
    "createdAt": 1714982400000,
    "updatedAt": 1714982400000
  }
]
```

---

### 2. Get Single Project (PUBLIC)

**Endpoint**: `GET /api/projects/{id}`

**Authentication**: Not required

**Parameters**:
- `id` (path) - Project ID

```bash
curl -X GET http://localhost:8080/api/projects/1
```

**Response**:
```json
{
  "id": 1,
  "title": "E-Commerce Platform",
  "description": "Full-stack React & Spring Boot e-commerce application",
  "githubLink": "https://github.com/user/ecommerce",
  "liveLink": "https://ecommerce-demo.com",
  "createdAt": 1714982400000,
  "updatedAt": 1714982400000
}
```

---

### 3. Create Project (ADMIN ONLY)

**Endpoint**: `POST /api/projects`

**Authentication**: Required (JWT with ROLE_ADMIN)

**Headers**:
```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Project Title",
  "description": "Project description",
  "githubLink": "https://github.com/user/project",
  "liveLink": "https://project-demo.com"
}
```

**Example**:
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "A great project",
    "githubLink": "https://github.com/user/new",
    "liveLink": "https://new.com"
  }'
```

**Response** (201 Created):
```json
{
  "id": 2,
  "title": "New Project",
  "description": "A great project",
  "githubLink": "https://github.com/user/new",
  "liveLink": "https://new.com",
  "createdAt": 1714987200000,
  "updatedAt": 1714987200000
}
```

**Error Response** (403 Forbidden - Not Admin):
```json
{
  "timestamp": "2026-05-01T12:00:00Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied"
}
```

---

### 4. Update Project (ADMIN ONLY)

**Endpoint**: `PUT /api/projects/{id}`

**Authentication**: Required (JWT with ROLE_ADMIN)

**Headers**:
```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Parameters**:
- `id` (path) - Project ID to update

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "githubLink": "https://github.com/user/updated",
  "liveLink": "https://updated.com"
}
```

**Example**:
```bash
curl -X PUT http://localhost:8080/api/projects/1 \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project",
    "description": "Updated description"
  }'
```

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Updated Project",
  "description": "Updated description",
  "githubLink": "https://github.com/user/project",
  "liveLink": "https://project-demo.com",
  "createdAt": 1714982400000,
  "updatedAt": 1714987500000
}
```

**Error Response** (404 Not Found):
```json
{
  "message": "Project not found with ID: 999"
}
```

---

### 5. Delete Project (ADMIN ONLY)

**Endpoint**: `DELETE /api/projects/{id}`

**Authentication**: Required (JWT with ROLE_ADMIN)

**Headers**:
```
Authorization: Bearer JWT_TOKEN
```

**Parameters**:
- `id` (path) - Project ID to delete

**Example**:
```bash
curl -X DELETE http://localhost:8080/api/projects/1 \
  -H "Authorization: Bearer JWT_TOKEN"
```

**Response** (204 No Content):
```
(empty body)
```

**Error Response** (404 Not Found):
```json
{
  "message": "Project not found with ID: 999"
}
```

---

## Security & Authorization

### Role-Based Access Control

```
┌─────────────────────────────────────────────────┐
│           Endpoint Security Matrix              │
├─────────────────────────────────────────────────┤
│ GET /api/projects              │ PUBLIC        │
│ GET /api/projects/{id}         │ PUBLIC        │
│ POST /api/projects             │ ADMIN ONLY    │
│ PUT /api/projects/{id}         │ ADMIN ONLY    │
│ DELETE /api/projects/{id}      │ ADMIN ONLY    │
└─────────────────────────────────────────────────┘
```

### Authentication Flow

1. User logs in with Google OAuth
2. Backend generates JWT token
3. Frontend stores JWT in localStorage
4. Every API request includes JWT in Authorization header
5. Backend validates JWT and checks user role
6. Request processed based on authorization

---

## Part 2: React Authentication Flow

### Component Architecture

```
┌──────────────────────────────────────────┐
│         App.jsx (Router Setup)           │
└────────────────┬─────────────────────────┘
                 │
    ┌────────────┴──────────────┐
    │                           │
┌───▼──────────┐          ┌─────▼──────────┐
│ AuthProvider │          │  Routes        │
│ (Context)    │          │  (Navigation)  │
└───┬──────────┘          └─────┬──────────┘
    │                           │
    │      ┌────────────────────┼────────────────┐
    │      │                    │                │
┌───▼──────▼────┐        ┌──────▼────┐     ┌────▼──────┐
│ PrivateRoute  │        │   Login   │     │ OAuthCallback
│ (Protected)   │        │          │     │ (Handler)
└───┬───────────┘        └───────────┘     └────┬──────┘
    │                                            │
    │    ┌────────────────────────────┬─────────┘
    │    │                            │
┌───▼───▼──┐                  ┌──────▼────┐
│ Portfolio │                 │  AdminDash│
│ (User)    │                 │ (Admin)   │
└───────────┘                 └───────────┘
```

### AuthContext - Global State Management

**Location**: `src/context/AuthContext.jsx`

**Provides**:
- `user` - Current user object { email, role }
- `token` - JWT token string
- `isAuthenticated` - Boolean auth status
- `isAdmin` - Boolean admin status
- `loading` - Loading state
- `login()` - Initiate OAuth login
- `logout()` - Clear auth and redirect
- `handleOAuthCallback()` - Process OAuth response
- `getAuthHeader()` - Get Authorization header for API calls

**Example Usage**:
```jsx
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function MyComponent() {
  const { user, token, isAdmin, login, logout } = useContext(AuthContext)
  
  return (
    <div>
      {user && <p>Welcome, {user.email}</p>}
      {isAdmin && <admin-controls />}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

### Authentication Flow Diagram

```
1. User Action
   └─► Click "Sign in with Google"
       ↓
2. Frontend Action
   └─► Redirect to /oauth2/authorization/google
       ↓
3. Google OAuth
   └─► User authenticates with Google
       └─► Google redirects to backend
           ↓
4. Backend Action
   └─► OAuth2SuccessHandler processes callback
       ├─ Extract user info from Google
       ├─ Create/Update user in database
       ├─ Assign role (ADMIN/USER)
       ├─ Generate JWT token
       └─ Redirect to frontend with token
           ↓
5. Frontend Action
   └─► OAuthCallback component
       ├─ Extract token from URL
       ├─ Store in localStorage
       ├─ Update AuthContext
       └─ Redirect based on role
           ├─ ROLE_ADMIN → /admin-dashboard
           └─ ROLE_USER → /portfolio
           ↓
6. Protected Route
   └─► PrivateRoute component
       ├─ Check authentication
       ├─ Verify role if required
       └─ Render component or redirect
```

---

### Components

#### Login Component

**Location**: `src/components/Login.jsx`

**Features**:
- Google OAuth sign-in button
- Feature description
- Responsive design
- Redirect if already authenticated

```jsx
export const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext)
  
  if (isAuthenticated) navigate('/portfolio')
  
  return (
    <button onClick={login}>
      Sign in with Google
    </button>
  )
}
```

#### OAuth Callback Component

**Location**: `src/components/OAuthCallback.jsx`

**Purpose**: 
- Handles OAuth redirect from backend
- Extracts token from URL parameters
- Stores token in localStorage
- Updates AuthContext
- Redirects to appropriate dashboard

```jsx
export const OAuthCallback = () => {
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useContext(AuthContext)
  
  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')
    const role = searchParams.get('role')
    
    handleOAuthCallback(token, user, role)
    // Redirect based on role
  }, [searchParams])
}
```

#### PrivateRoute Component

**Location**: `src/components/PrivateRoute.jsx`

**Purpose**: 
- Protect routes from unauthorized access
- Check authentication status
- Verify role requirements
- Redirect to login if unauthorized

```jsx
export const PrivateRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  
  if (!isAuthenticated) return <Navigate to="/login" />
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />
  
  return children
}
```

**Usage**:
```jsx
<Route
  path="/admin-dashboard"
  element={
    <PrivateRoute requiredRole="ROLE_ADMIN">
      <AdminDashboard />
    </PrivateRoute>
  }
/>
```

#### Portfolio Component (User)

**Location**: `src/components/Portfolio.jsx`

**Features**:
- Display all projects
- View project details
- External links to GitHub and Live Demo
- User-friendly interface
- Fetch from public API

#### Admin Dashboard Component

**Location**: `src/components/AdminDashboard.jsx`

**Features**:
- View all projects
- Create new projects
- Edit existing projects
- Delete projects
- Form validation
- Success/error messages
- Responsive grid layout

**Admin Operations**:
```jsx
// Create project
POST /api/projects
Headers: Authorization: Bearer TOKEN

// Update project
PUT /api/projects/{id}
Headers: Authorization: Bearer TOKEN

// Delete project
DELETE /api/projects/{id}
Headers: Authorization: Bearer TOKEN
```

---

## Token Storage & API Calls

### LocalStorage

```javascript
// Store after OAuth
localStorage.setItem('jwtToken', token)
localStorage.setItem('user', JSON.stringify({ email, role }))

// Retrieve for API calls
const token = localStorage.getItem('jwtToken')
const user = JSON.parse(localStorage.getItem('user'))

// Clear on logout
localStorage.removeItem('jwtToken')
localStorage.removeItem('user')
```

### API Calls with JWT

**Without Context**:
```javascript
const token = localStorage.getItem('jwtToken')
fetch('/api/projects', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**With Context Helper**:
```javascript
const { getAuthHeader } = useContext(AuthContext)

fetch('/api/projects', {
  headers: getAuthHeader()
})
```

---

## Routing Structure

```
/
├── /login                    → Public (Login page)
├── /oauth/callback          → Public (OAuth handler)
├── /portfolio               → Protected (User view)
└── /admin-dashboard         → Protected+Admin (Admin view)

Redirects:
- Root (/) → /login
- Unknown routes → /login
- /portfolio if not logged in → /login
- /admin-dashboard if USER → /portfolio
```

---

## Setup & Configuration

### Backend Setup

1. **Add MySQL Connection** (Optional):
```properties
# In application.properties uncomment MySQL config
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=password
```

2. **Run Backend**:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

1. **Install Dependencies**:
```bash
cd frontend
npm install
npm install react-router-dom
```

2. **Run Frontend**:
```bash
npm run dev
```

---

## Error Handling

### Backend Errors

| Error | Status | Cause |
|-------|--------|-------|
| Invalid JWT | 401 | Expired or invalid token |
| Access Denied | 403 | User lacks required role |
| Not Found | 404 | Resource doesn't exist |
| Bad Request | 400 | Invalid input |

### Frontend Errors

- Network error → Show retry option
- 401 Unauthorized → Auto-redirect to login
- 403 Forbidden → Show access denied message
- Loading states → Show spinner

---

## Testing

### API Testing with cURL

```bash
# Get all projects
curl -X GET http://localhost:8080/api/projects

# Get token from login flow, then:
TOKEN="your_jwt_token"

# Create project
curl -X POST http://localhost:8080/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test project"}'

# Update project
curl -X PUT http://localhost:8080/api/projects/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete project
curl -X DELETE http://localhost:8080/api/projects/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Frontend Testing

1. Login with Google account
2. Navigate to portfolio
3. (If admin) Navigate to admin dashboard
4. Create/edit/delete projects
5. Verify changes persist
6. Test logout functionality

---

## Production Deployment

### Backend (Render)

1. Build JAR:
```bash
mvn clean package -DskipTests
```

2. Deploy with:
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
   - Environment Variables: JWT_SECRET, DATABASE_URL, OAUTH_CLIENT_ID, etc.

### Frontend (Render)

1. Build:
```bash
npm run build
```

2. Deploy with:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Database

- Switch from H2 to MySQL/PostgreSQL
- Update connection strings
- Run migration scripts
- Set appropriate DDL strategy: `validate` or `update`

---

## Summary

✅ **REST APIs**
- Fully functional CRUD operations
- Role-based access control
- Proper HTTP methods and status codes
- Layered architecture (Controller → Service → Repository)

✅ **React Authentication**
- OAuth 2.0 with Google integration
- JWT token management
- AuthContext for global state
- Protected routes with role checking
- Responsive UI components

✅ **Security**
- Admin-only endpoints protected
- User roles enforced
- Token validation on backend
- Secure storage in localStorage

---

**Implementation Date**: May 1, 2026
**Status**: ✅ Complete and Ready for Testing