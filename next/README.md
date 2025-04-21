# Next.js MERN CRUD Application

This is a MERN application refactored with Next.js, implementing basic content management functionality (Create, Read, Update, and Delete).

## Project Structure

```
/next
├── pages/             # Next.js pages and API routes
│   ├── api/           # API routes (backend functionality)
│   │   └── items/     # Item-related APIs
│   ├── _app.js        # Application entry
│   ├── index.js       # Home page (items list)
│   ├── add.js         # Add item page
│   ├── edit/[id].js   # Edit item page
│   └── item/[id].js   # Item details page
├── components/        # React components
│   ├── Header.js      # Page header component
│   └── Layout.js      # Layout component
├── models/            # Data models
│   └── Item.js        # Item model
├── lib/               # Utility functions
│   └── dbConnect.js   # Database connection
├── next.config.js     # Next.js configuration
└── package.json       # Project dependencies
```

## Tech Stack

- **Frontend**: React, Next.js, React Bootstrap
- **Backend**: Next.js API Routes
- **Database**: MongoDB (connected via Mongoose)

## Features

- View all items list
- View single item details
- Add new items
- Edit existing items
- Delete items

## Running the Project

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build production version
npm run build

# Run production version
npm start
```

## Differences from the Original MERN Application

- Unified frontend and backend code using Next.js
- Improved performance and SEO with Next.js server-side rendering
- Replaced standalone Express server with Next.js API Routes
- Maintained the same data models and business logic