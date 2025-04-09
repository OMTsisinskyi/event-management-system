# Event Management System - Frontend

The frontend application of the Event Management System built with Next.js, TypeScript, and modern web technologies.

## Tech Stack

- Next.js 15
- TypeScript
- MUI
- ESLint
- Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-api-key>
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── hooks/            # Custom React hooks
├── services          # Utility functions
├── types/            # TypeScript type definitions
└── utils             # Global styles
```

