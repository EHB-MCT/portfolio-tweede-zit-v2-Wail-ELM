# Portfolio Tweede Zit V2 - Wail ELM

## Project Description

This project is a portfolio developed as part of the **DEV5** course at Erasmus Hogeschool Brussel (EhB). The portfolio showcases various projects and skills acquired during the course. It includes features such as user management, question and answer posting, and comment additions. The project utilizes Docker for container management and Jest for unit and integration testing.

### Main Folders
- **controllers/**: Contains the business logic for various entities (authentication, users, questions, answers, comments).
- **models/**: Contains Knex.js models to interact with the database.
- **routes/**: Declares the API routes.
- **__test__/**: Contains unit and integration tests organized into two subfolders.
- **migrations/**: Migration files to manage the database structure.
- **seeds/**: Seed files to populate the database with initial data.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Framework for building the RESTful API.
- **Knex.js**: SQL query builder for Node.js.
- **PostgreSQL**: Relational database management system.
- **Docker**: Containerization platform for development and deployment.
- **Jest**: Testing framework for unit and integration tests.
- **Lighthouse CI**: Tool for measuring web application quality (performance, accessibility, SEO).

## Installation

### Prerequisites

Ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-tweede-zit-v2-wail-elm.git
   cd portfolio-tweede-zit-v2-wail-elm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Configure environment variables for development and testing in `.env`.

4. **Start Docker containers**
   ```bash
   docker-compose up -d
   ```

   This will start the PostgreSQL service and your application.

## Usage

### Basic Commands

- **Start the application in development mode:**
  ```bash
  npm run dev
  ```

- **Run database migrations:**
  ```bash
  npx knex migrate:latest
  ```

- **Run seeds:**
  ```bash
  npx knex seed:run
  ```

- **Stop Docker containers:**
  ```bash
  docker-compose down
  ```

## Testing

### Running Unit and Integration Tests

1. **Set up the testing environment:**
   Ensure Docker containers are running with `docker-compose -f docker-compose.test.yml up -d`.

2. **Run tests:**
   ```bash
   npm test
   ```

Tests are organized into two categories:

- **Unit Tests:** Located in `src/__test__/unit/`.
- **Integration Tests:** Located in `src/__test__/integration/`.

Tests use data generated by the seed files to verify that the application functions correctly.

## Deployment

### Deploying with Docker

You can build and run your application in a production environment using Docker. Here's how:

1. **Build the Docker image:**
   ```bash
   docker build -t my-app-image .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -p 3000:3000 my-app-image
   ```

### CI/CD Deployment with GitHub Actions

The CI/CD pipeline is configured to:

1. **Build the Docker image** on every push or pull request to the `main` branch.
2. **Run tests** to ensure everything works as expected.
3. **Push the image** to Docker Hub (if configured).

Ensure that the necessary GitHub secrets are set (`ACCESS_TOKEN_SECRET`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`).

### Example CI/CD Pipeline

```yaml
name: TEST AND BUILD

on:
  push:
    branches: [ main ] 

env: 
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: play-play
  POSTGRES_DB: forum
  
jobs:

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: build docker containers
        run: docker-compose build 

      - name: run docker containers
        run: |
          echo --- Running test cases ---
          docker-compose -f docker-compose.test.yml up --exit-code-from app_test
          echo --- Completed test cases ---
  
  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: build
        run: docker-compose build
      
      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: publish
        run: docker-compose push
```

## References

This project was developed as part of the **DEV5** course at [Erasmus Hogeschool Brussel (EhB)](https://www.erasmushogeschool.be/). Course materials and additional resources can be found on [Canvas](https://canvas.ehb.be/).

### Additional Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Knex.js Documentation](https://knexjs.org/)
- [Docker Documentation](https://docs.docker.com/)
- [Jest Documentation](https://jestjs.io/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [ChatGPT](https://openai.com/chatgpt)

## Contributors

- **Wail ELM** - [GitHub](https://github.com/Wail-ELM)

