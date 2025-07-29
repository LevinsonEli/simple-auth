# Simple Auth App (TiDB + Node.js + Kafka + CDC)

A full-stack application with:

- Authentication (username, email, password, token)
- TiDB database
- Vanilla JS + HTML frontend
- Dockerized microservices
- CDC (Change Data Capture) with Kafka
- Kafka + Zookeeper for messaging
- Logging with log4js

---

## Prerequisites

Make sure you have the following installed:

- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

---

## Project Structure

.
├── src/ # Node.js app with auth logic and logging
├── public/ # Frontend (Vanilla JS + HTML/CSS)
├── cdc-consumer/ # Kafka CDC log consumer
├── .env.example # Example environment variables
├── docker-compose.yml # Multi-container setup
├── Dockerfile
└── README.md



---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourname/simple-auth-app.git
cd simple-auth-app
```

### 2. Create environment variables
Copy the example .env file and configure your settings:
```bash
cp .env.example .env
```
Edit values as needed for your local setup (e.g., DB credentials, JWT secret, etc.).

### 3. Build and run the application
```bash
docker compose up --build
```

This will:

* Build frontend and backend services
* Start TiDB, TiKV, PD
* Launch Kafka and Zookeeper
* Initialize CDC
* Launch the application locally

### 4. Access the app
* Frontend: http://localhost:8080
* Backend API: http://localhost:3000
* Kafka consumer logs: shown in cdc-consumer container logs
* Auth logs: visible in backend container logs (via log4js)