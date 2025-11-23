# Advertisement Management System

This project implements a moderation system for advertisements, consisting of a React frontend and an Express backend.

## 🐳 Running with Docker

The easiest way to run the application is using Docker Compose.

### Prerequisites
- Docker
- Docker Compose

### Steps
1. Open a terminal in the project root.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
   > **Note**: Since the source code is copied into the images during build (and not mounted as volumes), you **must** use the `--build` flag to see any code changes you make. Running just `docker-compose up` will use the previously built images.

3. Access the application:
   - **Frontend**: [http://localhost:5174](http://localhost:5174)
   - **Backend API**: [http://localhost:3002](http://localhost:3002)

## 🛠 Manual Setup

If you prefer to run the services locally without Docker:

### Backend
1. Navigate to `tech-int3-server`.
2. Run `npm install`.
3. Run `npm start`.
4. Server runs on port 3002.

### Frontend
1. Navigate to `client`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Client runs on port 5174.

## 🧪 Testing

To view the Playwright test report (after running tests):
- **Test Report**: [http://localhost:9323](http://localhost:9323)
