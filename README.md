<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core?style=flat-square" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core?style=flat-square" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common?style=flat-square" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master?style=flat-square" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://img.shields.io/coveralls/github/nestjs/nest/master?style=flat-square" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/discord/308323056592486420?label=discord&logo=discord&style=flat-square" alt="Discord"/></a>
  <a href="https://opencollective.com/nest" target="_blank"><img src="https://img.shields.io/opencollective/all/nest?style=flat-square" alt="Open Collective backers and sponsors" /></a>
</p>

## Description

A RESTful API for a blog application built with NestJS. The API allows for managing blog posts, comments, and users.

## Features

- CRUD operations for managing blog posts
- CRUD operations for managing comments on blog posts
- Authentication and authorization using JWT tokens
- User management including registration, login, and password reset
- Role-based access control for different types of users

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rozi5500/Blog-API.git
```

2. Install the dependencies:

```bash
cd blog-api
npm install
```

3. Set up the database connection in the `src/database/db-config.ts` file.

4. Run the database migrations:

```bash
npm run migration:run
```

5. Start the development server:

```bash
npm run start:dev
```


## API Endpoints

The following endpoints are available in the API:

### Authentication

- `POST /auth/login`: Log in an existing user and get an access token
- `POST /auth/forgot-password`: Send an email to reset the user's password
- `POST /auth/reset-password`: Reset the user's password using a reset token

### Users

- `GET /users`: Get a list of all users (admin only)
- `GET /users/:id`: Get a single user by ID (admin only)
- `PATCH /users/:id`
