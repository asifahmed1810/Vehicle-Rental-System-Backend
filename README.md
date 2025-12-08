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

