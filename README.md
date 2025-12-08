#  Vehicle Rental System – Backend API

### 🔗 **Live API URL:**  
 **https://vehicle-rental-system-backend-snowy.vercel.app/**

A complete backend system for managing vehicle rentals, featuring authentication, role-based access control, booking management, and automated tasks.  
Built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.

---

##  Features

###  **Authentication & Authorization**
- JWT-based secure authentication  
- Role-based access (**Admin**, **Customer**)  
- Protected API routes  

###  **Vehicle Management**
- Admin can add, edit, and manage vehicles  
- Vehicles track availability  
- Updated automatically after booking or return  

###  **Booking Management**
- Customers can book vehicles  
- Customers can cancel bookings (before start date)  
- Admin can return vehicles  
- Customers see only their own bookings  
- Admin sees all bookings  

###  **Automated Tasks**
- Auto-mark bookings as “returned” when end date passes  
- Auto-update vehicle availability  

###  **REST API**
- Clean and structured routes  
- Consistent error handling  
- Organized JSON responses  

---

##  Technology Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js, TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt |
| Deployment | Vercel |
| Utility Packages | dotenv, cors, pg |

---





###  API Endpoints Overview

---

##  Authentication

| Method | Endpoint              | Access | Description |
|--------|------------------------|--------|-------------|
| POST   | /api/v1/auth/signup    | Public | Register new user account |
| POST   | /api/v1/auth/signin    | Public | Login and receive JWT token |

---

##  Vehicles

| Method | Endpoint                        | Access      | Description |
|--------|----------------------------------|-------------|-------------|
| POST   | /api/v1/vehicles                 | Admin only  | Add new vehicle with name, type, registration, daily rent price and availability status |
| GET    | /api/v1/vehicles                 | Public      | View all vehicles in the system |
| GET    | /api/v1/vehicles/:vehicleId      | Public      | View specific vehicle details |
| PUT    | /api/v1/vehicles/:vehicleId      | Admin only  | Update vehicle details, daily rent price or availability status |
| DELETE | /api/v1/vehicles/:vehicleId      | Admin only  | Delete vehicle (only if no active bookings exist) |

---

##  Users

| Method | Endpoint                    | Access        | Description |
|--------|------------------------------|---------------|-------------|
| GET    | /api/v1/users                | Admin only    | View all users in the system |
| PUT    | /api/v1/users/:userId        | Admin or Own  | Admin: Update any user's role or details<br>Customer: Update own profile only |
| DELETE | /api/v1/users/:userId        | Admin only    | Delete user (only if no active bookings exist) |

---

##  Bookings

| Method | Endpoint                          | Access      | Description |
|--------|------------------------------------|-------------|-------------|
| POST   | /api/v1/bookings                   | Customer or Admin | Create booking with start/end dates<br>• Validates vehicle availability<br>• Calculates total price (daily rate × duration)<br>• Updates vehicle status to "booked" |
| GET    | /api/v1/bookings                   | Role-based  | Admin: View all bookings<br>Customer: View own bookings only |
| PUT    | /api/v1/bookings/:bookingId        | Role-based  | Customer: Cancel booking (before start date only)<br>Admin: Mark as "returned" (updates vehicle to "available")<br>System: Auto-mark as "returned" when period ends |

---
