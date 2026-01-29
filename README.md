# Deployment Guide for Vercel

## Step 1: Push to GitHub

1. Install Git (if not already installed)
2. Go to project root directory
3. Run these commands:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/login-project.git
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"New Project"** → **"Import Git Repository"**
3. Paste your GitHub repo URL → **Import**
4. In **Framework Preset**, select **Other** (since we have multiple folders)
5. Under **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key

6. Click **Deploy**

## Step 3: Update Front-End API URL

After deployment, Vercel will give you a domain like `https://your-project.vercel.app`

Update [front-end/.env](front-end/.env):
```
VITE_API_URL=https://your-project.vercel.app
```

Then push again:
```bash
git add front-end/.env
git commit -m "Update API URL for production"
git push
```

## Notes

- The `vercel.json` routes all `/api/*` requests to your back-end
- Static files go to the front-end
- MongoDB Atlas must allow Vercel IPs in Network Access (0.0.0.0/0 or specific IPs)
