# Payroll Management System

A robust payroll management system built with Spring Boot and React, using CQRS pattern and OAuth authentication through Google, containerized with Docker.

## 🌟 Features

- Employee management with detailed information tracking
- Comprehensive payroll calculation including:
  - Overtime pay
  - Health insurance
  - Pension contributions
  - Tax deductions
  - Transport and food allowances
- Google OAuth2 authentication
- CQRS pattern implementation for better separation of concerns
- Advanced payroll querying capabilities
- Automatic calculations based on employee contract type
- Modern React frontend with Vite
- Containerized application with Docker

## 🏗️ Technical Architecture

### Database Structure

The system uses two main entities:

#### Employee Entity
- Basic information (ID, first name, last name, identification)
- Employment details (base salary, contract type, hire date)
- Activity status
- One-to-many relationship with payrolls

#### Payroll Entity
- Detailed payment information
- Overtime calculations
- Various allowances and deductions
- Comprehensive salary breakdowns
- Many-to-one relationship with employees

### Design Patterns

- **CQRS (Command Query Responsibility Segregation)**: Separates read and write operations for better scalability and maintenance
- **DTO Pattern**: Uses MapStruct for efficient object mapping
- **Repository Pattern**: For data access abstraction

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm (for frontend development)
- Google OAuth2 credentials

### Environment Configuration

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Create a `.env` file in the root directory with the following variables:
```env
DB_URL=jdbc:postgresql://db:5432/management_db
DB_USERNAME=postgres
DB_PASSWORD=1234
HIBERNATE_DDL_AUTO=update
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_SCOPES=your_scopes
```

### Running with Docker Compose

1. Start the entire application stack:
```bash
docker compose up
```

2. To start only the database:
```bash
docker compose up db
```

The application will be available at:
- Backend: http://localhost:8080
- Frontend: http://localhost:5173 (when running in development mode)

### Running Frontend in Development Mode

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📦 Docker Configuration

### Docker Compose Structure
```yaml
version: '3.9'

services:
  app:
    build: .
    container_name: management-app
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/management_db
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=1234
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    container_name: db
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=1234
      - POSTGRES_DB=management_db
    ports:
      - "5432:5432"
```

## 💻 Technical Stack

### Backend
- Spring Boot
- PostgreSQL
- OAuth2 with Google
- JPA/Hibernate
- MapStruct
- Docker

### Frontend
- React
- Vite
- Node.js
- npm

## 🔒 Security

The application uses Google OAuth2 for authentication with the following configuration in `application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
spring.security.oauth2.client.registration.google.scope=${GOOGLE_SCOPES}
spring.security.oauth2.client.registration.google.redirect-uri=http://localhost:8080/login/oauth2/code/google
```

## 🔍 API Endpoints

[Previous API endpoints section remains the same]

## 📊 Payroll Calculation Features

[Previous calculation features section remains the same]

## 🤝 Contributing

[Previous contributing section remains the same]

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details
