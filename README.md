
# 🎙️ Ques.ai — Your Ultimate Podcast Management Companion

Take control of your podcast workflow with **Ques.ai**, a powerful tool that simplifies transcription, editing, and content organization — all in one place.

---

## ✨ Features

- 🎧 **Automatic Transcription**  
  Instantly convert your podcast audio into accurate, readable transcripts using AI.

- ✍️ **Intuitive Transcript Editor**  
  Edit and fine-tune transcripts with a clean, easy-to-use editor interface.

- 📁 **Multi-Podcast Project Management**  
  Organize all your podcast episodes and projects in one dashboard.

- 🧩 **Embeddable Widgets**  
  Generate customizable widgets to embed podcast players on your website.

- 📊 **User Dashboard & Analytics**  
  Monitor content, manage uploads, and keep track of your podcast performance.

---

## 🛠️ Tech Stack

### 🔹 Frontend

- React 18  
- Redux Toolkit + RTK Query  
- Tailwind CSS  
- React Router DOM  

### 🔹 Backend

- Node.js + Express  
- MongoDB (Mongoose)  
- JWT Authentication  
- Cloudinary for Media Management  

---

## 🚀 Quick Start Guide

### 1️⃣ Clone & Install

```bash
git clone https://github.com/dibyaranajnsahoo1/ques.ai.git
cd Ques.ai


# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

2. **Environment Setup**
```bash
# In /server directory
cp .env.example .env
```

Add your environment variables:
```env
PORT = 4000
SECRET_KEY = your_secret_key
CLIENT_URL = http://localhost:5173
MONGO_URI = your_mongodb_uri
CLOUD_NAME = your_cloud_name
API_KEY = your_api_key
API_SECRET = your_api_secret
```

3. **Run the App**
```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Visit `http://localhost:5173` in your browser 🎉

## API Routes 🛣️

- **Auth**
  - POST `/api/user/signup`
  - POST `/api/user/login`
  - POST `/api/user/logout`

- **Projects**
  - GET `/api/project`
  - POST `/api/project/create`
  - GET `/api/project/:id`

- **Transcripts**
  - POST `/api/project/transcript/:projectId`
  - GET `/api/project/transcripts/:projectId`
  - PUT `/api/project/:projectId/transcript/:transcriptId/update`

Made with ❤️ by Dibya
