# Backend Development Guide — User Onboarding & Approval Platform

## Overview
This document provides implementation details for the **backend** service of the User Onboarding and Approval Platform.

## Tech Stack
- Node.js + Express
- Sequelize ORM (MSSQL dialect for Azure SQL DB)
- JWT Authentication
- Bcrypt password hashing
- Validation: express-validator
- Queue: Bull (Redis)
- Security: Helmet, CORS, Rate Limiter
- Logging: Morgan

## Features
1. User Registration (status = PENDING)
2. User Login (JWT-based)
3. Admin Login (JWT + RBAC)
4. Admin: View Pending Users
5. Admin: Approve / Reject User
6. User: View Profile + Status
7. Worker Integration for async tasks (approval notifications, audit logs)

## Project Structure
```
backend/
├─ src/
│  ├─ controllers/
│  ├─ services/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  ├─ workers/
│  ├─ utils/
│  ├─ app.js
│  └─ server.js
├─ Dockerfile
├─ package.json
└─ README.md
```
