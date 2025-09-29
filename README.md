# Serene-Tech Form Builder

This project is a visually-driven, Jotform-inspired form builder application. It features a stunning "Serene-Tech" dark theme with a frosted-glass aesthetic, allowing users to dynamically create, customize, and publish web forms through a drag-and-drop interface. The entire application is built with Next.js (App Router), TypeScript, and Tailwind CSS, with all state managed by Zustand.

---

## Features

- ✨ **Dynamic Drag & Drop Interface** to add and reorder form fields.
- 🎨 **Real-time Theming Engine** to instantly change form colors and styles.
- 👀 **Live Edit & Preview Modes** to seamlessly switch between building and testing.
- ⚙️ **Interactive Property Inspector** for editing field properties like labels, placeholders, and options.

💾 **Persistent Storage** using the browser's Local Storage to save all created forms and submissions.

🚀 **Public, Shareable Form Pages** that render live forms for end-users.

📊 **Dashboard & Submission Viewer** to manage all created forms and view their results.

## 📱 **Fully Responsive Design** for both the builder and the final forms.

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT), Bcrypt

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag and Drop**: dnd-kit
- **Icons**: Lucide React
- **Deployment**: Vercel (Left)

---

## Core concepts : State Management and Theming

This application is architected around a centralized state management and a dynamic theming system.

### State Management with Zustand

The entire state of the form builder—including the array of fields, the current theme, the selected field ID, and the active mode (edit/preview)—is managed in a single, centralized Zustand store. This provides a single source of truth for the entire application. Components subscribe to this store, and any action (like adding a field or updating a theme color) triggers a state update, which causes the UI to reactively re-render with the new data. This approach keeps the component logic clean and the data flow predictable.

### Dynamic Theming with CSS Variables

The real-time theming engine is powered by CSS variables. The main Canvas component subscribes to the theme object in the Zustand store. On every change, it injects the theme colors into the DOM as CSS variables (e.g., --primary-color). The tailwind.config.ts file is configured to use these variables for its utility classes (e.g., bg-primary maps to background-color: var(--primary-color)). This allows for instant, application-wide theme changes without needing to re-render every single component.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm / yarn
- A PostgreSQL database

```bash
# 1. Clone the repository
git clone [YOUR_REPOSITORY_URL]
cd formbuilder

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The backend server will be running on http://localhost:3000.

---

## Project Structure

```
multi-tenant-saas-notes/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── .env
├── fe/
│   └── notesapp/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── utils/
│       ├── package.json
│       └── .env
└── README.md
```

---
