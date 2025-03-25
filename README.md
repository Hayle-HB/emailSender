# Team Dashboard Project Structure

## Overview

A modern team dashboard application for managing team communications and data. Built with React, TailwindCSS, and TypeScript for optimal performance and maintainability.

## Features

- 📧 Automated email sending system
- 💬 Telegram integration
- 📋 Team member email management
- 🔍 Email subscription management
- 🎨 Modern UI with TailwindCSS
- 📱 Responsive design

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- Node.js/Express (Backend)
- MongoDB (Database)
- Email Service (SendGrid/Nodemailer)
- Telegram Bot API

## Project Structure

```
front/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Modal/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   └── features/
│   │       ├── EmailSender/
│   │       ├── TelegramBot/
│   │       ├── TeamList/
│   │       └── SubscriptionManager/
│   ├── hooks/
│   │   ├── useEmail.ts
│   │   ├── useTelegram.ts
│   │   └── useTeam.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── emailService.ts
│   │   └── telegramService.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── teamSlice.ts
│   │   │   └── emailSlice.ts
│   │   └── store.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── styles/
│   │   └── globals.css
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── EmailManagement.tsx
│   │   ├── TelegramBot.tsx
│   │   └── TeamManagement.tsx
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

## Color Scheme

```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;

/* Secondary Colors */
--secondary-50: #f8fafc;
--secondary-100: #f1f5f9;
--secondary-200: #e2e8f0;
--secondary-300: #cbd5e1;
--secondary-400: #94a3b8;
--secondary-500: #64748b;
--secondary-600: #475569;
--secondary-700: #334155;
--secondary-800: #1e293b;
--secondary-900: #0f172a;

/* Accent Colors */
--accent-success: #22c55e;
--accent-warning: #f59e0b;
--accent-error: #ef4444;
```

## Component Structure Guidelines

### Common Components

- Located in `components/common/`
- Highly reusable UI components
- Follow atomic design principles
- Include proper TypeScript types
- Include unit tests

### Feature Components

- Located in `components/features/`
- Business logic specific components
- Combine multiple common components
- Handle data fetching and state management
- Include integration tests

### Layout Components

- Located in `components/layout/`
- Structure the application layout
- Handle responsive design
- Manage navigation and routing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License
