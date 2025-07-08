# 🎨 Real-Time Collaborative Whiteboard

A real-time collaborative whiteboard application using the **MERN stack** and **Socket.io**. Users can join a room with a simple code and draw together on a shared canvas — no sign-up required.

---

## 🚀 Features

### 🏠 Room Management
- Join/Create a whiteboard using a unique 6–8 character alphanumeric code.
- No login or authentication required.
- Rooms are created dynamically on first join.

### ✍️ Drawing
- Pencil tool with:
  - Adjustable stroke width via slider.
  - Color options: black, red, blue, green.
  - Clear canvas button.
- Smooth drawing with HTML5 `<canvas>`.

### 🔁 Real-Time Collaboration
- Real-time drawing sync for all users in a room.
- Live cursor tracking (with different colors per user).
- Show total active users in a room.
- Connection status indicator.

---

## 🧑‍💻 Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Frontend      | React.js          |
| Backend       | Node.js + Express |
| Database      | MongoDB           |
| Real-time     | Socket.io         |
| Drawing Tool  | HTML5 Canvas      |
| Styling       | CSS / Styled Components |

---
🧱 Architecture Overview
Frontend: React handles routing, drawing logic, UI, and socket events.

Backend: Express serves REST API and integrates Socket.io server.

MongoDB: Stores rooms and persisted drawing data (optional feature).

Socket.io: Real-time drawing & cursor sync.

🚀 Deployment Guide
You can deploy the app using:

Frontend: Vercel / Netlify / Static Hosting (build client/)

Backend: Render / Railway / VPS with Node.js

MongoDB: MongoDB Atlas (cloud)

Optional Docker setup can be added for full containerized deployment.
🙌 Contribution
Feel free to fork and contribute:

Add undo/redo

Add shape tools

Add persistent whiteboard snapshots

