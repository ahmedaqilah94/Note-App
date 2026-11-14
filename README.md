# Almdrasa Notes 📝

A simple, clean, and responsive notes application built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Live Demo

[View Live Demo](https://ahmedaqilah94.github.io/Note-App/)

## 📸 About The Project

Almdrasa Notes is a notes management application that allows users to create, organize, search, pin, and delete their personal notes.

The application features a clean and minimal user interface inspired by the provided Figma design, with responsive layouts for desktop, tablet, and mobile devices.

## ✨ Features

- **Add Notes:** Create new notes with a title, author, and content.
- **Delete Notes:** Easily remove unwanted notes.
- **Pin Notes:** Pin important notes to keep them in a separate section.
- **Unpin Notes:** Move pinned notes back to the regular notes section.
- **Search Notes:** Search through notes by title, content, or author.
- **Local Storage:** Automatically save notes and their pinned status in the browser.
- **Persistent Data:** Notes remain available after refreshing the page.
- **Responsive Design:** Optimized for desktop, tablet, and mobile screens.
- **Mobile Navigation:** Mobile-friendly sidebar and search interface.

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Local Storage API
- Google Fonts:
  - Inter
  - Aclonica

## 🎨 Design & Colors

The application follows the original Figma design.

| Color        | Hex Code  | Usage                  |
| ------------ | --------- | ---------------------- |
| Primary      | `#EC7160` | Buttons and highlights |
| Gray 02      | `#898989` | Secondary text         |
| Gray 04      | `#F6F6F6` | Backgrounds            |
| Primary Text | `#303030` | Main text              |
| Error        | `#D82700` | Delete actions         |

## 📱 Responsive Design

The application supports different screen sizes:

- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## 📂 Project Structure

```text
Almdrasa-Notes/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd Almdrasa-Notes
```

### 3. Run the application

Open `index.html` in your browser or use the Live Server extension in Visual Studio Code.

## 💾 Data Storage

The application uses the browser's `localStorage` to store notes.

Each note contains:

- ID
- Title
- Content
- Author
- Creation date
- Pinned status

All notes are stored under the following local storage key:

```javascript
almdrasa - notes;
```

## 👨‍💻 Author

**Ahmed Aqilah**

- GitHub: [@ahmedaqilah94](https://github.com/ahmedaqilah94)

---

Made with ❤️ as part of the Almdrasa JavaScript Diploma Project.
