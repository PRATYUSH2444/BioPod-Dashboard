````markdown
# 🌱 BioPod

Smart AI + IoT system for real-time environmental monitoring and analysis.

---

## ⚡ What it does

- **Collects** data from sensors via Arduino  
- **Transmits** data using MQTT  
- **Processes** insights on a Node.js backend  
- **Visualizes** real-time metrics on a React dashboard  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Communication:** MQTT  
- **Hardware:** Arduino  
- **AI:** Custom processing modules  

---

## 📂 Structure

- `arduino/` → IoT firmware  
- `backend/` → APIs, MQTT, AI logic  
- `frontend/` → React dashboard  

---

## ▶️ Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment (backend)

Create `.env` inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
MQTT_BROKER=your_broker
```

---

## 🔥 Key Features

* Real-time data monitoring
* MQTT-based communication
* Modular backend structure
* AI-ready processing layer
* Clean React UI

---

## 👨‍💻 Author

Pratyush Prakash
GitHub: [https://github.com/PRATYUSH2444](https://github.com/PRATYUSH2444)