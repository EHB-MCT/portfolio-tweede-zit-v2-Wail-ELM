# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Initial setup of project including Docker configuration and basic environment setup.
- CI/CD pipeline using GitHub Actions to automate testing, building, and deployment.
- Basic API endpoints for user, questions, answers, and comments management.
- Unit tests for controllers using Jest.
- Integration tests for API endpoints.
- Database seeding for testing purposes.
- Detailed README, Code of Conduct, and Changelog documentation.

### Changed
- Updated CI/CD pipeline to run tests after building Docker images.
- Improved error handling and validation in controllers.
- Adjusted database seeding strategy to align with integration tests.

### Fixed
- Resolved issues with database connection in the CI environment.
- Fixed failing tests due to incorrect database configuration in test environments.
- Corrected Docker network issues preventing container communication during tests.

## [1.0.0] 
### Added
- First official release of the project.
- Implemented basic CRUD operations for users, questions, answers, and comments.
- Basic authentication and role management.
- Initial Docker setup for development and testing environments.
- Basic CI/CD setup for automated testing and deployment.

## [0.1.0] - 2024-08-10
### Added
- Project initialization with basic Node.js structure.
- Set up environment variables and configuration files.
- Initial API structure with placeholders for routes and controllers.
- Basic Docker setup for PostgreSQL database.
