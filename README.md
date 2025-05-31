# Vacation Property Booking System 🏡

A full-stack web application that enables users to book vacation properties and hosts to manage their listings. Built using **React**, **Node.js**, **Express**, and **MySQL**, the platform supports secure user authentication, role-based access, and seamless property booking and review features.

---

## 🔧 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT-based login/register
- **API Communication**: RESTful APIs
- **Dev Tools**: Postman, VS Code, Git

---

## ✨ Features

### 👥 Role-Based Dashboards
- **Guests** can register, browse properties, make bookings, and leave reviews.
- **Hosts** can add, edit, delete, and view their own properties.

### 📋 Booking & Reviews
- Users can book properties by date and location.
- Guests can submit ratings and comments post-booking.
- Properties show average ratings and user reviews.

### 🔐 Authentication
- JWT-secured authentication system.
- Separate dashboards for Guests and Hosts after login.

---

## 🔄 API Endpoints (Sample)

- `POST /auth/register` — User/host registration
- `POST /auth/login` — JWT login
- `GET /properties` — View all listings
- `POST /properties` — Host adds a property
- `POST /bookings` — User books a property
- `POST /reviews` — Submit a review

> Detailed collection provided in Postman format.

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anish17Bhat/DBMS_mini.git
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database**
   - Import `schema.sql` to MySQL.
   - Update DB credentials in the backend config.

---

## 📌 Sample Credentials

- Guest: `guest@example.com / password123`
- Host: `host@example.com / password123`

---

## 🤝 Contributors

- [Your Name](https://github.com/Anish17Bhat)
- Cherish
---

## 📄 License

MIT License

---

## 📬 Feedback

Found an issue? Feel free to raise an [issue](https://github.com/yourusername/vacation-property-booking/issues) or reach out at [anishbhat06@gmail.com](mailto:anishbhat06@gmail.com)
