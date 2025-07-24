# 🌐 IRISH — A React + Firebase Blog Platform

![screenshot](./src/assets/Image/scrnShot.png) 

**IRISH** is a clean, modern blogging platform built using **React** and **Firebase Realtime Database**, where users can share blogs about **tech**, **personal life**, and **programming humor**. Users can interact with content, explore others’ profiles, report inappropriate posts, and follow fellow writers.

## ✨ Features

### 🧑‍💻 For Users:
- ✅ **Authentication** with Firebase
- 📝 **Write Blogs** in categories like `Tech`, `Joke`, and `Personal`
- 📷 **Attach Images** to blogs
- 👍 **Like & Interact** with other blogs
- 🧾 **Save** blogs to your collection
- 🧑‍🤝‍🧑 **Explore** other users' profiles and follow them
- 🚩 **Report** blogs for plagiarism or hate content

### 🛡️ For Admins:
- 🕵️ **Review reports** from users
- ⛔ **Suspend** or **ban** users (temporary or permanent)

---

## 🔧 Tech Stack

| Technology | Description                     |
|------------|---------------------------------|
| React      | Frontend framework              |
| Firebase   | Realtime DB + Auth              |
| Netlify    | Hosting (Live Deployment)       |
| CSS        | Custom styling for UI/UX        |

---

## 📂 Project Structure
Irish
├── public/                  # Static public files (e.g. favicon, index.html)
├── src/                     # Main application source code
│   ├── assets/              # Images, icons, logos
│   ├── Component/           # Reusable React components
│   ├── lib/                 # Firebase config and utility libraries
│   ├── Page/                # Route-level pages (Home, Explore, Profile, etc.)
│   └── Root.jsx             # App entry point with routing/layout
├── .gitignore               # Git ignored files and folders
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Auto-generated lock file
├── vite.config.js           # Vite configuration
└── README.md               

## 📄 License

This project is open source for personal and non-commercial use.  
Commercial use requires permission.  
Please read the [LICENSE](./LICENSE) file for full terms.
