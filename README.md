# Job Application Backend

## Overview

This project is a backend for managing job listings and applications, built with Next.js and integrated with Grafana for monitoring application data. It supports two types of users: admins and general users. Admins can create, update, edit the status of job listings, and view the list of applications. Users can apply for jobs and view job listings.

## Features

- _Admin Functions:_

  - Create job listings
  - Update job listings
  - Edit the status of job listings
  - View a list of all job listings
  - View applications for a specific job

- _User Functions:_

  - View job listings
  - Apply for a job

- _Grafana Integration:_
  - Monitoring and visualization of data regarding each job application.

## Technologies Used

- _Next.js:_ Framework for building server-side rendered React applications.
- _NestJS:_ Framework for building scalable server-side applications.
- _Prisma:_ Database toolkit and ORM.
- _Grafana:_ Open-source platform for monitoring and observability.
- _Validation and Security:_
  - Class Validator
  - Class Transformer
- _Authentication:_
  - Passport
  - JWT

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker (for Grafana)

### Installation

1. Clone the repository:
   bash
   git clone <repository-url>
   cd job-application-backend

2. Install dependencies:
   bash
   npm install

   # or

   yarn install

3. Set up the database:
   bash
   npx prisma migrate dev

4. Start the application:
   bash
   npm run start:dev

   # or

   yarn start:dev

5. Start Grafana:
   bash
   docker-compose up -d

## API Endpoints

### User Endpoints

- _Get all jobs_
  http
  GET /jobs
- _Get a job by ID_
  http
  GET /jobs/:id
- _Submit a job application_
  http
  POST /jobs/:id/submit

  Body:
  json
  {
  "name": "John Doe",
  "email": "john@example.com",
  "resume": "link-to-resume"
  }

### Admin Endpoints

- _Create a job_
  http
  POST /admin/jobs

  Body:
  json
  {
  "title": "Software Engineer",
  "description": "Job description here",
  "requirements": "Job requirements here"
  }

- _Get all jobs_
  http
  GET /admin/jobs
- _Get a job by ID_
  http
  GET /admin/jobs/:id
- _Update a job_
  http
  PATCH /admin/jobs/:id

  Body:
  json
  {
  "title": "Updated title",
  "description": "Updated description",
  "requirements": "Updated requirements"
  }

- _Delete a job_
  http
  DELETE /admin/jobs/:id

### Application Endpoints

- _Create an application_
  http
  POST /applications

  Body:
  json
  {
  "jobId": 1,
  "applicantName": "John Doe",
  "applicantEmail": "john@example.com",
  "resume": "link-to-resume"
  }

- _Get all applications_
  http
  GET /applications
- _Get an application by ID_
  http
  GET /applications/:id
- _Update an application_
  http
  PATCH /applications/:id

  Body:
  json
  {
  "status": "Reviewed"
  }

- _Delete an application_
  http
  DELETE /applications/:id

## Running Tests

- _Run unit tests_
  bash
  npm run test

  # or

  yarn test

- _Run end-to-end tests_
  bash
  npm run test:e2e

  # or

  yarn test:e2e

- _Run tests in watch mode_
  bash
  npm run test:watch
  # or
  yarn test:watch

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
