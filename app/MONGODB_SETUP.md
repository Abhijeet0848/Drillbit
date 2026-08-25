# MongoDB Connection Setup Guide

## Local MongoDB Setup

This application is configured to use a local MongoDB database by default.

## Prerequisites

1. **Install MongoDB Community Edition** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Follow the installation wizard with default settings

2. **Create Data Directory**:
   ```powershell
   # Create the default MongoDB data directory
   mkdir C:\data\db
   ```

## Starting MongoDB

### Option 1: Start as a Service (Recommended)

If MongoDB was installed as a Windows service:

```powershell
net start MongoDB
```

### Option 2: Start Manually

If MongoDB is not running as a service:

```powershell
# Navigate to MongoDB installation directory (e.g., C:\Program Files\MongoDB\Server\7.0\bin)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB with the data directory
mongod --dbpath="C:\data\db"
```

## Configuration

The application is already configured to connect to local MongoDB in the `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/drillbit
NODE_ENV=development
```

- **Database Name**: `drillbit` (will be created automatically on first use)
- **Port**: `27017` (default MongoDB port)
- **Host**: `localhost`

## Verify Connection

To test if MongoDB is running and the connection works:

```bash
# Test MongoDB connection
node -e "require('dotenv').config(); require('./lib/mongodb').default().then(() => console.log('Connected to MongoDB!')).catch(e => console.error('Error:', e.message))"
```

## Restart Your Application

After ensuring MongoDB is running, restart your development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Common Issues

### Issue: "MongoDB service not found"
- **Solution**: Install MongoDB or start it manually using `mongod --dbpath="C:\data\db"`

### Issue: "Port 27017 already in use"
- **Solution**: Another instance of MongoDB is already running. Stop it or use a different port.

### Issue: "ECONNREFUSED ::1:27017"
- **Solution**: MongoDB is not running. Start MongoDB using one of the methods above.

### Issue: "Database not found"
- **Solution**: The database `drillbit` will be created automatically when you first save data.

## Security Notes

- **Never commit the `.env` file** to version control
- The `.env.example` file is safe to commit (it contains no real credentials)
- For production, consider enabling MongoDB authentication and restricting network access