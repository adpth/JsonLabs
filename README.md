# JSONLabs — Interactive JSON Learning Platform

JSONLabs is a browser-native, frontend-only educational platform designed to teach JSON (JavaScript Object Notation) from first principles through a structured combination of guided lessons, interactive coding challenges, and a freeform practice playground. 

It targets early-career developers who need a hands-on environment to build confidence with JSON syntax, data structures, and practical usage patterns, as well as non-developers in technical-adjacent roles (product managers, QA analysts, technical writers) who regularly encounter JSON in their daily workflows.

---

## 🚀 Key Features

*   **12 Guided Interactive Lessons**: Fully rewritten and categorized from *Beginner* to *Advanced*, covering JSON syntax rules, core data types, nesting, structural differences from JS objects, serialization (`JSON.parse`/`JSON.stringify`), validation concepts (JSON Schema), REST/GraphQL API payloads, and compression/performance optimizations.
*   **Practice Playground & Challenges**: Coding challenges focusing on fixing syntax errors, writing valid JSON schemas, and identifying structural anomalies with instant verification, custom logic validation, and progressive hints.
*   **Interactive Playground**: A freeform sandbox editor equipped with:
    *   CodeMirror-based editor.
    *   Real-time JSON syntax validation.
    *   One-click prettify and auto-formatting.
    *   Interactive raw and JSON Tree View nodes.
    *   Data size and token calculator.
*   **Progress Dashboard**: Overview of current course and challenge progression, complete with progress reset controls.
*   **Forced Dark Theme**: Clean high-contrast dark aesthetic tailored specifically for programmers, leveraging custom-designed color tokens for keywords, strings, values, and arrays.
*   **Custom Favicon Logo**: Integrated a clean, custom-designed SVG favicon (`{J}` branding logo) dynamically linked in the HTML document header.
*   **Custom Accessible Confirmation Dialogs**: A modern, promise-based confirm dialog system built with Framer Motion, featuring glassmorphism backdrops, escape-key dismissals, click-outside-to-cancel handlers, and context variants (danger vs primary).

---

## 🛠️ Technology Stack

*   **Core Framework**: [React.js](https://react.dev/) + [Vite.js](https://vite.dev/) (Vite v6)
*   **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Editor Integration**: [@uiw/react-codemirror](https://uiwjs.github.io/react-codemirror/) (with CodeMirror 6 JSON extension)
*   **State Management & Utilities**: Native React Context API:
    *   `ProgressContext` (Completed lessons & challenge persistence)
    *   `ConfirmContext` (Reusable custom async modal handler)
    *   `ToastContext` (Custom system status alerts)
    *   `ThemeContext` (Forced system dark theme)

---

## 📂 Project Architecture

```bash
src/
├── components/          # Reusable UI Components
│   ├── CodeEditor.jsx   # Codemirror wrapper for JSON editing
│   ├── JSONEditor.jsx   # Main editor widget wrapper
│   ├── JsonTreeViewer.jsx # Interactive tree display for validated JSON
│   ├── Layout.jsx       # Global application layout (navigation sidebar)
│   ├── LessonCard.jsx   # Cards rendered on Dashboard
│   ├── LessonLayout.jsx # Layout template for lessons
│   └── Navbar.jsx       # Header navigation bar
├── contexts/            # Context Providers (State Management)
│   ├── ConfirmContext.jsx # Reusable custom confirmation modal context
│   ├── ProgressContext.jsx # Completed lessons & challenge state
│   ├── ThemeContext.jsx # Theme context (forced dark theme)
│   └── ToastContext.jsx # Custom system alerts & toasts
├── data/                # Hardcoded course data and challenges
│   ├── challenges.js    # Coding challenges data & validation logic
│   ├── lesson.js        # Legacy lesson file
│   ├── lessons.js       # Curated 12 lessons (JSON Basics → Advanced)
│   └── playgroundSamples.js # Initial starter codes for Playground
├── pages/               # Routed views
│   ├── Dashboard.jsx    # User dashboard
│   ├── LessonPage.jsx   # Active lesson workspace view
│   ├── PlaygroundPage.jsx # JSON Playground with tree parser
│   └── PracticePage.jsx # Code challenges and quiz cards
├── App.jsx              # Application router definition
└── index.css            # Custom CSS themes & CSS custom properties
```

---

## ⚙️ Setup and Installation

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/adpth/jsonlabs.git
cd jsonlabs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```
The optimized bundle will be built in the `dist/` directory, ready to be served statically.

### 5. Deployment to GitHub Pages
This project includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically builds and deploys the application when updates are pushed to the `main` or `master` branches.

To activate deployment:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, change the selection from "Deploy from a branch" to **GitHub Actions**.
3. Push your code to the `main` or `master` branch, and GitHub will automatically deploy your application.
