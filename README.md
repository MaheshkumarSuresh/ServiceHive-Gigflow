# GigFlow -- Mini Freelance Marketplace Platform

GigFlow is a full-stack mini freelance marketplace platform built as
part of the **ServiceHive -- Full Stack Development Internship
Assignment**.\
It demonstrates end-to-end marketplace functionality including
authentication, gig posting, bidding, and hiring workflows.

------------------------------------------------------------------------

## Live Demo

-   **Frontend:** https://your-frontend-link.vercel.app
-   **Backend API:** https://your-backend-link.onrender.com

> (Replace the above links with your deployed URLs)

------------------------------------------------------------------------

## Demo Video

A 2-minute Loom video demonstrating the complete hiring workflow is
included in the submission.

------------------------------------------------------------------------

## Features

### Authentication

-   User Registration & Login (JWT based)
-   Protected routes
-   Role-based access (Client / Freelancer)

### Gig Management (Client)

-   Post a gig with title, description, and budget
-   View own posted gigs
-   View all proposals received
-   Hire a freelancer (atomic operation)

### Gig Browsing (Freelancer)

-   Browse all open gigs
-   Search gigs
-   View gig details

### Bidding & Hiring

-   Submit proposals with message and bid amount
-   Prevent bidding on own gig
-   Prevent duplicate bids
-   View proposal status (Pending / Hired / Rejected)
-   Hired freelancer gets clear notification
-   Gig owner can view bidder name & email

### UX Enhancements

-   Toast notifications for all major actions
-   Clean, responsive UI using Tailwind CSS

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React (Vite)
-   Redux Toolkit
-   Tailwind CSS
-   Axios
-   React Hot Toast

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT Authentication

------------------------------------------------------------------------

## Project Structure

### Backend

    backend/
     ├── controllers/
     ├── models/
     ├── routes/
     ├── middleware/
     ├── config/
     └── server.js

### Frontend

    frontend/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   ├── redux/
     │   ├── services/
     │   └── App.jsx

------------------------------------------------------------------------

## Environment Variables

Create a `.env` file in both frontend and backend using the example
below.

### Backend (`.env`)

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

### Frontend (`.env`)

    VITE_API_URL=http://localhost:5000/api

------------------------------------------------------------------------

## Running the Project Locally

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## Security & Best Practices

-   Password hashing
-   JWT-based authentication
-   Role-based authorization
-   MongoDB transactions for hiring workflow
-   Clean code separation (MVC pattern)

------------------------------------------------------------------------

## Assignment Scope

All **mandatory requirements** mentioned in the ServiceHive assignment
PDF have been fully implemented.\
Bonus features were optional and intentionally skipped.

------------------------------------------------------------------------
