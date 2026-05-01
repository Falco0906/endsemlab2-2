# OAuth 2.0 & JWT Security Configuration - Implementation Guide

## Overview

This document provides a comprehensive guide to the OAuth 2.0 with JWT authentication implementation for the Portfolio application.

## Technology Stack

- **Spring Boot 3.2**: Web framework
- **Spring Security 6**: Security framework
- **Spring Data JPA**: Data access
- **JJWT 0.12.3**: JWT token creation and validation
- **H2 Database**: Embedded database for development
- **Google OAuth 2.0**: Social login provider

## Architecture

### Authentication Flow

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │ 1. Login Request
         ▼
┌──────────────────────────────┐
│   Spring Boot Backend         │
│  /oauth2/authorization/google │
└────────┬─────────────────────┘
         │ 2. Redirect to Google
         ▼
┌──────────────────────────────┐
│   Google OAuth Server        │
│  (accounts.google.com)       │
└────────┬─────────────────────┘
         │ 3. User Authorizes
         ▼
┌──────────────────────────────┐
│   Spring Boot Backend         │
│  /login/oauth2/code/google    │ (Callback)
└────────┬─────────────────────┘
         │ 4. Save User to DB
         │ 5. Generate JWT
         ▼
┌──────────────────────────────┐
│   OAuth2SuccessHandler        │
│   Redirect to Frontend        │
│   with JWT Token             │
└────────┬─────────────────────┘
         │ 6. Token & User Data
         ▼
┌──────────────────────────────┐
│   Frontend (React)            │
│   Store token in localStorage │
└──────────────────────────────┘
```

### Request/Response with JWT

```
Frontend Request:
GET /api/portfolio
Authorization: Bearer <JWT_TOKEN>

Backend Process:
1. JwtAuthenticationFilter extracts token
2. JwtTokenProvider validates token
3. Extract email and role from token
4. Create JwtAuthenticationToken
5. Set in SecurityContext
6. Process request with user context

Backend Response:
{
  "id": 1,
  "name": "User Name",
  "codechefUrl": "...",
  "linkedinUrl": "...",
  "githubUrl": "..."
}
```

## Component Details

### 1. Role Enum (`entity/Role.java`)

```java
public enum Role {
    ROLE_USER,      // Regular authenticated user
    ROLE_ADMIN      // Administrator with elevated privileges
}
```

**Purpose**: Define available user roles in the system.

### 2. User Entity (`entity/User.java`)

**Key Fields**:
- `id`: Primary key
- `email`: Unique email address
- `name`: User's display name
- `role`: Assigned role (USER or ADMIN)
- `oauthId`: Google OAuth ID
- `oauthProvider`: OAuth provider (google, github, etc.)
- `createdAt`: Timestamp of user creation
- `updatedAt`: Timestamp of last update

**Database Table**:
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    oauth_id VARCHAR(255) UNIQUE,
    oauth_provider VARCHAR(50),
    created_at BIGINT,
    updated_at BIGINT
);
```

### 3. UserRepository (`repository/UserRepository.java`)

**Custom Queries**:
```java
findByEmail(String email)                    // Get user by email
findByOauthId(String oauthId)               // Get user by OAuth ID
findByEmailAndOauthProvider(email, provider) // Get user by email + provider
```

### 4. JwtTokenProvider (`util/JwtTokenProvider.java`)

**Key Methods**:

```java
generateToken(String email, String role)    // Create new JWT token
getEmailFromToken(String token)             // Extract email from token
getRoleFromToken(String token)              // Extract role from token
validateToken(String token)                 // Check if token is valid
isTokenExpired(String token)                // Check expiration
```

**JWT Structure**:
```
Header: {"alg": "HS512", "typ": "JWT"}
Payload: {
  "sub": "user@email.com",
  "role": "ROLE_USER",
  "iat": 1234567890,
  "exp": 1234654290
}
Signature: HMACSHA512(header.payload, secret)
```

**Configuration** (`application.properties`):
```properties
jwt.secret=my-super-secret-key-for-jwt-do-not-use-in-production
jwt.expiration=86400000  # 24 hours in milliseconds
```

### 5. OAuth2SuccessHandler (`security/OAuth2SuccessHandler.java`)

**Workflow**:
1. Google OAuth redirects to `/login/oauth2/code/google?code=XXXX`
2. Spring Security exchanges code for user info
3. `onAuthenticationSuccess()` is called with user data
4. Check if user exists in database
5. If not, create new user with role assignment
6. Generate JWT token
7. Redirect to frontend with token

**Role Assignment Logic**:
```java
if ("admin@gmail.com".equals(email)) {
    role = Role.ROLE_ADMIN;  // Admin access
} else {
    role = Role.ROLE_USER;   // Regular user access
}
```

**Redirect URL**:
```
http://localhost:5173/oauth/callback?token=JWT_TOKEN&user=email&role=ROLE_USER
```

### 6. JwtAuthenticationToken (`security/JwtAuthenticationToken.java`)

Implements Spring Security's `Authentication` interface.

**Purpose**: Represents authenticated user in security context after JWT validation.

**Key Methods**:
- `getAuthorities()`: Returns user's roles as GrantedAuthority
- `getPrincipal()`: Returns user's email
- `isAuthenticated()`: Returns true for validated tokens

### 7. JwtAuthenticationFilter (`security/JwtAuthenticationFilter.java`)

**Workflow**:
1. Extract JWT from Authorization header: `Bearer TOKEN`
2. Validate token using JwtTokenProvider
3. Extract email and role from token
4. Create JwtAuthenticationToken
5. Add to SecurityContext for request processing

**Filter Chain Position**: Added before `UsernamePasswordAuthenticationFilter`

### 8. SecurityConfig (`config/SecurityConfig.java`)

**Configuration Components**:

```java
sessionManagement()           // STATELESS - no session created
authorizeHttpRequests()       // Configure endpoint permissions
oauth2Login()                 // Enable OAuth2 login flow
logout()                      // Configure logout endpoint
csrf().disable()              // Disable CSRF for REST API
addFilterBefore()             // Add JWT filter
```

**Endpoint Authorization**:
```
PUBLIC:
  /
  /login
  /login/**
  /oauth2/**
  /api/portfolio

ADMIN ONLY:
  /admin/**

USER + ADMIN:
  /user/**

AUTHENTICATED:
  All other endpoints
```

### 9. AdminController (`controller/AdminController.java`)

**Protected Endpoints** (ADMIN only):

```
GET /admin/users              # List all users
GET /admin/users/{email}      # Get user by email
DELETE /admin/users/{id}      # Delete user
GET /admin/dashboard          # Admin dashboard info
```

### 10. UserController (`controller/UserController.java`)

**Protected Endpoints** (USER + ADMIN):

```
GET /user/profile             # Get current user profile
PUT /user/profile             # Update current user profile
GET /user/info                # Get current user info
```

## Configuration Files

### application.properties

```properties
# OAuth2 Configuration
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET

# JWT Configuration
jwt.secret=your-secret-key-min-32-characters
jwt.expiration=86400000

# Database Configuration (H2)
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop

# Server Configuration
server.port=8080
```

### pom.xml

**JWT Dependencies**:
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

## Google OAuth 2.0 Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API

### Step 2: Create OAuth Credentials

1. Go to Credentials
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: Web application
4. Authorized redirect URIs:
   - `http://localhost:8080/login/oauth2/code/google` (development)
   - `https://your-backend-url.com/login/oauth2/code/google` (production)

### Step 3: Configure Backend

Update `application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
```

## Security Best Practices

### 1. JWT Secret Management

**Development**:
```properties
jwt.secret=local-dev-secret-key
```

**Production**: Use environment variables
```bash
export JWT_SECRET="your-production-secret-key-with-at-least-32-characters"
```

### 2. HTTPS in Production

All OAuth2 redirects must use HTTPS in production.

### 3. Token Expiration

```properties
jwt.expiration=86400000  # 24 hours (in milliseconds)
```

For longer sessions, increase expiration. For better security, decrease it.

### 4. Admin Email Configuration

Update admin emails in `OAuth2SuccessHandler`:
```java
Set<String> adminEmails = Set.of(
    "your-email@gmail.com",
    "another-admin@gmail.com"
);
```

### 5. Database Security

For production, use PostgreSQL or MySQL with credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=db_user
spring.datasource.password=strong_password
spring.jpa.hibernate.ddl-auto=validate
```

## API Usage Examples

### 1. Login via OAuth

```bash
# User clicks login link pointing to:
GET http://localhost:8080/oauth2/authorization/google

# After authentication, redirected to:
GET http://localhost:5173/oauth/callback?token=JWT_TOKEN&user=user@email.com&role=ROLE_USER

# Frontend stores token in localStorage
localStorage.setItem('jwtToken', JWT_TOKEN);
```

### 2. Call Protected Endpoint

```bash
# With JWT token in header
curl -H "Authorization: Bearer JWT_TOKEN" \
     http://localhost:8080/api/portfolio

# Or using fetch in JavaScript
fetch('http://localhost:8080/api/portfolio', {
    headers: {
        'Authorization': `Bearer ${jwtToken}`
    }
})
```

### 3. Admin Endpoint

```bash
# Admin user can call:
curl -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
     http://localhost:8080/admin/users

# Regular user gets 403 Forbidden error
```

## Error Handling

### JWT Validation Errors

```
401 Unauthorized
- Token expired
- Token invalid
- Token malformed

403 Forbidden
- User lacks required role
```

### OAuth Errors

```
400 Bad Request
- Invalid client ID
- Invalid redirect URI

401 Unauthorized
- Invalid authorization code
- User denied access
```

## Testing

### Unit Test Example

```java
@Test
public void testGenerateAndValidateToken() {
    String token = jwtTokenProvider.generateToken("test@example.com", "ROLE_USER");
    
    assertTrue(jwtTokenProvider.validateToken(token));
    assertEquals("test@example.com", jwtTokenProvider.getEmailFromToken(token));
    assertEquals("ROLE_USER", jwtTokenProvider.getRoleFromToken(token));
}
```

### Integration Test Example

```java
@SpringBootTest
public class SecurityIntegrationTest {
    
    @Test
    public void testAdminEndpointRequiresAdminRole() throws Exception {
        mockMvc.perform(get("/admin/users"))
               .andExpect(status().isUnauthorized());
    }
}
```

## Troubleshooting

### Issue: "Invalid JWT token" Error

**Cause**: Token expired or secret key changed
**Solution**: Generate new token and update secret key in properties

### Issue: OAuth redirect not working

**Cause**: Redirect URI not registered in Google Console
**Solution**: Add all valid redirect URIs to Google OAuth credentials

### Issue: User created but without role

**Cause**: Email not matching admin email configuration
**Solution**: Update admin emails in OAuth2SuccessHandler

## Production Deployment

### Render Deployment

1. Set environment variables:
```bash
JWT_SECRET=production-secret-key
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_ID=prod_client_id
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_SECRET=prod_secret
```

2. Use PostgreSQL:
```properties
spring.datasource.url=jdbc:postgresql://host:5432/portfolio
spring.datasource.username=username
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

3. Enable HTTPS redirection:
```bash
application.properties add:
server.ssl.enabled=true
```

## Summary

✅ OAuth 2.0 authentication with Google
✅ JWT token generation and validation
✅ Role-based access control (USER/ADMIN)
✅ Database user storage and management
✅ Protected endpoints with authorization
✅ Stateless session management
✅ Production-ready security configuration