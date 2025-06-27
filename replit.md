# Replit.md - Nurse Life Bundle Landing Page

## Overview

This is a high-converting, soulful landing page website for a digital product called "Nurse Life Bundle" - designed for nurses who feel burnt out, overwhelmed, or are prepping for the NCLEX. The site follows Alex Hormozi's core marketing principles with a nurturing, calm aesthetic using soft blues, lavender, and pastel accents.

## System Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite for build tooling
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Cloud Database**: Neon Database (@neondatabase/serverless)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Replit autoscale deployment

### Architecture Pattern
- **Full-stack monorepo**: Client and server code in same repository
- **Shared schema**: Common types and validation schemas in `/shared` directory
- **Development**: Vite dev server with Express API proxy
- **Production**: Static build served by Express with API routes

## Key Components

### Frontend Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── email-popup.tsx # Email capture popup
│   ├── pages/
│   │   ├── landing.tsx   # Main landing page
│   │   └── not-found.tsx # 404 page
│   ├── lib/
│   │   ├── queryClient.ts # API client and React Query setup
│   │   └── utils.ts      # Utility functions
│   └── hooks/           # Custom React hooks
```

### Backend Structure
```
server/
├── index.ts     # Express server setup
├── routes.ts    # API route handlers
├── storage.ts   # Data storage interface and implementations
└── vite.ts      # Vite development server integration
```

### Database Schema
- **users**: Basic user authentication (id, username, password)
- **emailSubscribers**: Email capture for lead generation (id, email, subscribedAt, source)

## Data Flow

### Email Subscription Flow
1. User triggers email popup (10 seconds or 50% scroll)
2. Form submission validates email with Zod schema
3. API call to `/api/subscribe` endpoint
4. Data stored in PostgreSQL via Drizzle ORM
5. Analytics event tracked for conversion measurement

### Analytics Flow
1. User interactions tracked via `/api/analytics` endpoint
2. Events logged for CTA clicks, email signups, page engagement
3. Data can be extended to integrate with external analytics services

## External Dependencies

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Backend Dependencies
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **Express**: Web server framework

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Fast development and build tooling
- **ESBuild**: Production bundling

## Deployment Strategy

### Development
- Run `npm run dev` to start both Vite dev server and Express API
- Hot reload enabled for both frontend and backend changes
- Database migrations handled via `npm run db:push`

### Production
- Build process: `npm run build`
  1. Vite builds frontend to `dist/public`
  2. ESBuild bundles server code to `dist/index.js`
- Start production: `npm run start`
- Deployment target: Replit autoscale with PostgreSQL module

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment indicator (development/production)

## Changelog

Changelog:
- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.