# Portfolio OAuth Project

This project demonstrates OAuth authentication with different privileges for users and administrators in a React + Spring Boot web application.

## Features

- OAuth 2.0 authentication using Google
- Role-based access control (USER and ADMIN)
- Portfolio website with hyperlinks to CodeChef, LinkedIn, and GitHub
- Admin can edit portfolio content
- Users can view the portfolio

## Setup

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```
   cd project1/backend
   ```

2. Configure Google OAuth:
   - Go to Google Cloud Console
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Set authorized redirect URIs to `http://localhost:8080/login/oauth2/code/google`
   - Update `application.properties` with your client ID and secret

3. Run the backend:
   ```
   mvn spring-boot:run
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```
   cd project1/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Deployment on Render

### Backend Deployment

1. Build the JAR:
   ```
   cd project1/backend
   mvn clean package
   ```

2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `mvn clean package -DskipTests`
5. Set start command: `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
6. Add environment variables for OAuth client ID and secret

### Frontend Deployment

1. Build the production version:
   ```
   cd project1/frontend
   npm run build
   ```

2. Create a new Static Site on Render
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Update the backend CORS origins with the deployed frontend URL

## Usage

- Visit the frontend URL
- Click login to authenticate with Google
- If admin email is configured, you can edit the portfolio
- Otherwise, view the portfolio with links