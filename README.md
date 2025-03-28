# 🧪 Bane's Lab – Portfolio Website

> **Live Site**: [https://banes-lab.com](https://banes-lab.com)  
> A modular, image-driven portfolio showcasing full-stack development, graphic design, and system integration skills.

---

## 🎯 Project Purpose

This website is built as a **live, interactive portfolio** to demonstrate:

- ⚙️ Real-world frontend/backend development
- 🖼️ Custom-designed UI/UX and graphics
- 🤖 Discord bot and server integrations
- 📊 Secure real-time analytics + SEO monitoring
- 💡 Scalable architecture and code quality

---

## 🧠 Technologies Used

| Category        | Stack                                        |
| --------------- | -------------------------------------------- |
| **Frontend**    | React, React Router, Vite                    |
| **Styling**     | Tailwind CSS, Custom CSS, Markdown CSS       |
| **Markdown**    | React Markdown + GitHub GFM                  |
| **Backend**     | SQLite3 via Discord bot (secured)            |
| **Integration** | GitHub API, Wise Old Man API, Discord.js     |
| **Hosting**     | [One.com](https://www.one.com/) (manual FTP) |

---

## 🧱 Project Structure

```
/src
  ├── components/         # Reusable UI and layout elements
  ├── pages/              # Routed views: Home, About, Contact, etc.
  ├── data/               # Image metadata for galleries
  ├── hooks/              # Custom React hooks (e.g. useScrollDirection)
  ├── utils/              # Fetchers, helpers, and API logic
  └── styles/             # Tailwind config + markdown themes
```

---

## 🌐 Key Features

### 🖼️ Dynamic Graphics Page

- Categorized galleries with modal previews
- Lazy-loaded images with preloading
- Tags, descriptions, and UI/UX assets

### 📚 Development Projects Page

- Pulls selected GitHub repos (public/private)
- Clickable cards open live-rendered README.md
- Combines frontend + backend display logic

### 👤 About Me & Home

- Professional journey, philosophy, and skills
- Modular CTA sections and responsive layout
- Auto-centered global background layer

### 🧠 Bot-Driven Infrastructure _(In Progress)_

- Contact page tied to Discord server presence
- Real-time analytics processed via custom bot
- SQL-based data layer (write-restricted, read-only site access)

---

## 🔐 Security & Architecture

- All write operations are handled **server-side** through a **Discord bot** that sanitizes and validates input.
- The bot serves as a **data gateway**, keeping your site secure against injection and spoofing.
- Client-side only reads from **pre-authorized tables** (e.g. SEO stats, image cache, page visits).
- The Discord server doubles as a **live showcase + admin panel**.

---

## ⚠️ Known Limitations

- Manual FTP deployment to [One.com](https://www.one.com/)
- No CI/CD currently (local build + manual push)
- Dynamic contact logic is under construction

---

## 🧪 Roadmap

- ✅ Modular page routing + dynamic galleries
- ✅ Public + private GitHub repo reader
- 🔄 Markdown-based resume and job letters
- 🔄 Bot-based admin control panel via Discord
- 🔄 Dynamic charting & visitor tracking
- 🔄 OAuth login (Discord, LinkedIn, Google)

---

## 🧑‍💻 Author

**Bane** (aka Varietyz)

- Self-taught developer, designer & system builder
- Founder of **JayBane Computers**
- Passionate about solving problems, optimizing systems, and blending tech with creativity

Connect with me on [LinkedIn](https://www.linkedin.com/in/jay-baleine/)  
_(Contact integration in progress on site)_

---

## 📄 License

MIT © JayBane  
All images and visual designs are original works and may not be reused without permission.
