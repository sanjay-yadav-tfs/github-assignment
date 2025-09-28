# Frontend Development Guide — User Onboarding & Approval Platform

## Overview
This document provides implementation details for the **frontend** (React) of the User Onboarding and Approval Platform.

## Tech Stack
- ReactJS (Vite or CRA)
- React Router
- Axios (API requests)
- JWT handling (localStorage/sessionStorage)
- TailwindCSS or Material UI (UI styling)

## Features
### User
- Registration form
- Login form
- Profile page (show status: PENDING / APPROVED / REJECTED)

### Admin
- Admin login page
- Admin dashboard
- Pending users table
- Approve / Reject actions

## Project Structure
```
frontend/
├─ src/
│  ├─ pages/
│  │  ├─ AdminLogin.jsx
│  │  ├─ AdminDashboard.jsx
│  │  ├─ UserLogin.jsx
│  │  ├─ UserRegister.jsx
│  │  └─ UserProfile.jsx
│  ├─ components/
│  │  ├─ PendingUsersTable.jsx
│  │  ├─ ApproveRejectButtons.jsx
│  ├─ api/
│  │  ├─ auth.js
│  │  ├─ users.js
│  ├─ App.jsx
│  └─ main.jsx
├─ Dockerfile
├─ package.json
└─ README.md
```
