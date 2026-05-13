# Philately India - Frontend

Digital Philately Platform for India - A comprehensive MERN stack application for stamp collectors.

## 🚀 Tech Stack

- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## 📦 Installation
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Digital Philately Platform
```

## 📁 Project Structure
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── auth/
│   │   └── admin/
│   ├── pages/
│   │   ├── admin/
│   │   └── ...
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Features

- **User Features:**
  - Browse stamp catalog with filters
  - Add stamps to cart
  - NPDA wallet for payments
  - Order tracking
  - Profile management

- **Admin Features:**
  - Dashboard with statistics
  - Manage stamps (CRUD)
  - Manage orders
  - Manage users
  - Settings panel

## 🛠️ Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 Notes

- This is a college project demonstrating full-stack development
- NPDA wallet is a dummy implementation (no real payment gateway)
- All stamps and data are for educational purposes

## 👥 Project By

College Project - Digital Philately Platform

## 📄 License

Educational Project - All Rights Reserved