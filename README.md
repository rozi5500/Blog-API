<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="350" alt="Not found" /></a>
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

- `POST /auth/login`: Log in an existing user and get an access and refresh tokens
- `GET /auth/profile`: Get the user's profile (requires JWT authentication)
- `POST /auth/password/forgot`: Send an email to reset the user's password
- `POST /auth/password/restore`: Reset the user's password using a reset token
- `POST /auth/refresh`: Refresh the access token using the refresh token

### Users

- `GET /users`: Get a list of all users
- `GET /users/:id`: Get a single user by ID
- `POST /users`: Create a new user
- `PATCH /users/:id`: Update a user by ID (authenticated)
- `DELETE /users/:id`: Delete a user by ID (admin only)
- `PATCH /users/update/role`: Change a user's role (admin only)
- `POST /users/change/password/:id`: Change a user's password

### Posts

- `GET /posts`: Get a list of all posts
- `POST /posts/create`: Create a new post (authenticated)
- `PATCH /posts/:id`: Update a post by ID (authenticated)
- `DELETE /posts/:id`: Delete a post by ID (authenticated)