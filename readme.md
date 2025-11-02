# 📰 MERN Blog AI

A modern, full-stack **AI-powered Blogging Platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  

This app features a powerful **admin-managed blogging system** where only the **admin can create, update, publish/unpublish, or delete blog posts**.  
Users can **browse and read published blogs** and **add comments** to any post.  
All comments are **moderated by the admin**, who can **approve or delete** them before they appear publicly.  
Additionally, the app includes an integrated **AI feature that auto-generates blog descriptions** based on the title and subtitle, making content creation faster and smarter.


## 🎥 Project Demo

[![Demo](https://img.icons8.com/clouds/100/000000/video-playlist.png)](https://res.cloudinary.com/drm14e8mg/video/upload/MERN_Blog_AI_rpesvr.mp4)


---

## 🚀 Features

- 🧠 **AI Description Generator** — Automatically creates meaningful blog descriptions from titles and subtitles.
- 📝 **Create, Edit & Delete Blogs** — Full CRUD functionality with seamless UI.
- 🧍‍♂️ **User Authentication** — Secure user login and registration.
- 🖼️ **Optimized Images** — Integrated **ImageKit** for fast, high-quality image loading.
- ⚡ **Responsive UI** — Built with **React + Tailwind CSS** for a sleek and modern look.
- 🌐 **RESTful API** — Node.js and Express backend with MongoDB for persistent data storage.
- 🧩 **Context API** — Smooth state management across components.

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🧠 Context API for State Management
- 🌐 Axios for API Calls

### **Backend**

- 🟢 Node.js
- ⚙️ Express.js
- 🍃 MongoDB with Mongoose
- 🔐 JWT for Authentication
- 🖼️ ImageKit for Media Management

---

## 📁 Folder Structure

### **Client**

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/         # All React Components
|   |   └── admin/          # All React Components for Admin
│   ├── context/
│   ├── pages/              # All Pages
|   |   └── admin/          # All Pages for Admin
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── readme.md
├── package-lock.json
├── package.json
└── vite.config.js
```

### **Server**

```
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── constant.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/dhruv-kapadia03/mernblog-ai.git
cd mernblog-ai
```

### **2️⃣ Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend:

```bash
npm start
```

### **3️⃣ Setup Frontend**

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_SERVER_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

---

## 🌈 Environment Variables

| Variable                | Description                       | Location    |
| ----------------------- | --------------------------------- | ----------- |
| `MONGODB_URI`           | MongoDB connection string         | server/.env |
| `JWT_SECRET`            | Secret key for JWT authentication | server/.env |
| `IMAGEKIT_PUBLIC_KEY`   | ImageKit public key               | server/.env |
| `IMAGEKIT_PRIVATE_KEY`  | ImageKit private key              | server/.env |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit endpoint URL             | server/.env |
| `VITE_SERVER_URL`       | Backend API base URL              | client/.env |

---

## 🧩 API Endpoints

| Method   | Endpoint             | Description       |
| -------- | -------------------- | ----------------- |
| `POST`   | `/api/auth/register` | Register the user |
| `POST`   | `/api/auth/login`    | User login        |
| `GET`    | `/api/blogs`         | Fetch all blogs   |
| `POST`   | `/api/blogs`         | Create a new blog |
| `PUT`    | `/api/blogs/:id`     | Update a blog     |
| `DELETE` | `/api/blogs/:id`     | Delete a blog     |

---

## ⭐ Support

If you like this project, don’t forget to **⭐ star** the repository and share it with others!