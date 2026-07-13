# 🚀 CRM Management System

A full-stack Customer Relationship Management (CRM) application built using **Spring Boot**, **React**, and **PostgreSQL**. The application helps organizations manage customers, employees, leads, and tasks through a secure JWT-based authentication system and an interactive dashboard.

---

## 📌 Features

### 🔐 Authentication
- JWT Authentication
- User Registration & Login
- Protected Routes
- Password Encryption using BCrypt
- Spring Security

### 👥 Customer Management
- Add Customer
- Update Customer
- Delete Customer
- Search Customers
- Pagination & Sorting

### 👨‍💼 Employee Management
- Add Employee
- Update Employee
- Delete Employee
- Search Employees
- Pagination & Sorting

### 📞 Lead Management
- Add Lead
- Update Lead
- Delete Lead
- Search Leads
- Convert Lead to Customer

### ✅ Task Management
- Create Task
- Update Task
- Delete Task
- Search Tasks
- Task Priority & Status Management

### 📊 Dashboard
- Total Customers
- Active Customers
- Total Employees
- Total Leads
- Converted Leads
- Total Tasks
- Completed Tasks
- Pending Tasks
- Dashboard Analytics & Charts

---

# 🛠 Tech Stack

## Backend
- Java 21
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Swagger (OpenAPI)
- Maven

## Frontend
- React (Vite)
- React Router
- Axios
- Bootstrap 5
- React Icons
- Chart.js
- React Toastify

## Database
- PostgreSQL

---

# 📂 Project Structure

```
crm-management-system/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/crm-management-system.git
```

```
cd crm-management-system
```

---

# Backend Setup

```
cd backend
```

### Configure Database

Create PostgreSQL database:

```
crmdb
```

Update your environment variables or `application.properties`.

### Run Backend

```
./mvnw spring-boot:run
```

or

```
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

Swagger

```
http://localhost:8080/swagger-ui/index.html
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies

```
npm install
```

Create

```
.env
```

Add

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Run frontend

```
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---


# Future Enhancements

- Role Based Access Control (Admin/User)
- Email Notifications
- File Uploads
- Customer Notes
- Activity Logs
- Reports Export (PDF/Excel)
- Dark Mode
- Docker Deployment
- CI/CD Pipeline

---

# Author

**Divansh Arora**

LinkedIn:
(https://www.linkedin.com/in/divansh-aroraa/)

GitHub:
https://github.com/Divansh-Arora

Email:
divansharora52@gmail.com

---

# License

This project is licensed under the MIT License.
