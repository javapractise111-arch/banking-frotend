# Banking Frontend

A premium banking frontend project built with React, Vite, Material UI, and secure API integration.

## Features
- Login and registration pages
- Protected routes and token-aware session handling
- Dashboard and account overview
- Transfers, beneficiaries, scheduled payments, notifications
- Responsive luxury banking UI
- Centralized environment-based API configuration

## Local setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` based on `.env.example`:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Build production bundle:
```bash
npm run build
```

## Environment
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Banking Portal
```
