# Lendsqr Test Admin Dashboard

A modern admin dashboard built with **React 18** and **TypeScript**, featuring user authentication, detailed user management, and a fully responsive UI.

---
 🚀 Tech Stack

* **React 18 + TypeScript** – Scalable, type-safe frontend.
* **Vite** – Fast builds and modern development experience.
* **SCSS** – Organized styling using variables, mixins, and modular structure.
* **React Router v6** – Efficient nested routing and protected routes.

---

## 🧱 Architecture Highlights

* **Components** – Modular UI elements including `Header`, `Sidebar`, `Layout`, `Loading`, and `StatsBar`.
* **Main Pages** –

  * `Auth`
  * `Dashboard/Layout`
  * `Users`
  * `User Details`
* **Styling** – Each component/page has its own SCSS file; global styles ensure consistency.
* **Context API** – Used for authentication and toast state without Redux.
* **Service Layer**:

  * `api.ts`: Handles mock API HTTP requests.
  * `auth.ts`: Manages login/logout and session.
  * `users.ts`: Fetches and caches user data.
* **Type Safety** – TypeScript interfaces for accurate data modeling and better DX.

---

## 🔑 Core Features

* **Mock Authentication** – Simulated login/logout with persistent session storage.
* **User Table** – Paginated, filterable user list from mock API.
* **Responsive Design** – SCSS strategies ensure layout adapts to all screen sizes.
* **User Details** – Shows full user profile by ID.
* **Toast Alerts** – Notifications for auth actions using `react-hot-toast`.

---

## 🛡 Performance & Security

* **Lazy Loading** – Simulates async user data loading.
* **Caching** – Uses `localStorage` to cache user data.
* **Authentication Simulation** – Route protection and input validation included.

---

## 🌐 Application Routes

| Path         | Description                |
| ------------ | -------------------------- |
| `/`          | Auth/Login Page            |
| `/dashboard` | Admin Dashboard Overview   |
| `/users`     | List of all users          |
| `/users/:id` | Detailed user profile view |



---

## 🛠️ Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/lendsqr-admin-dashboard.git
cd lendsqr-admin-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. Visit [http://localhost:5173](http://localhost:5173) to view the app locally.



Feel free to contribute or fork this for your own admin dashboard projects!
