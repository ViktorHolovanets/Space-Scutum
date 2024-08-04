
```markdown
# Project Setup and Deployment Guide

## Overview
This project is a web application that uses Laravel for the backend and Vue.js for the frontend, running within Docker containers.

## Prerequisites
- Docker
- Docker Compose
- Node.js (optional, for manual frontend setup)

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ViktorHolovanets/Space-Scutum.git
   cd Space-Scutum
   ```

2. **Configure Environment**

   Copy the example environment files:

   ```sh
   cp api-project/.env.example api-project/.env
   cp front-project/.env.example front-project/.env
   ```

   Update `.env` files as needed for your configuration.

3. **Start Docker Containers**

   Navigate to the root directory of the project and run:

   ```sh
   docker-compose up --build
   ```

   This command will build and start all the necessary containers including:
   - Laravel application (backend)
   - Vue.js application (frontend)
   - Nginx as a reverse proxy
   - MySQL database


        **MANUAL SETUP**
4. **Run Migrations and Seeders**

   After the containers are up and running, open a terminal and execute:

   ```sh
   docker-compose exec app sh -c 'php artisan migrate --seed'
   ```

5. **Publish JWT Auth Configuration**

   After cloning the project, you need to publish the JWT Auth configuration:

   ```sh
   docker-compose exec app sh -c 'php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"'
   ```

## Accessing the Application

- **Frontend**: Open [http://localhost](http://localhost) in your browser.
- **Backend (API)**: The backend API is accessible at [http://localhost/api](http://localhost/api).

## Development

### Frontend

Navigate to the `front-project` directory.

Start the development server:

```sh
npm run dev
```

### Backend

Navigate to the `api-project` directory.

You can run Laravel Artisan commands, for example:

```sh
docker-compose exec app sh -c 'php artisan migrate'
```

## Stopping the Application

To stop the running containers, use:

```sh
docker-compose down
```

## Troubleshooting

- **502 Bad Gateway**: Ensure that all services are up and running, and check that your Nginx configuration is correct.
- **Frontend Issues**: Verify that Vite is serving the application correctly and that the correct ports are exposed.
- **Backend Issues**: Check Laravel logs and Docker container logs for any errors.
