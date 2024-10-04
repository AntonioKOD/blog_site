# Blog Site

A simple blog site that allows users to create, view, edit, and delete blog posts. This application follows the MVC paradigm and is built using Node.js, Express.js, Handlebars.js, and PostgreSQL with Sequelize ORM. The app is deployed on Render.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [License](#license)

## Features

- Users can create an account and log in.
- Users can view all blog posts.
- Authenticated users can create, update, and delete their own blog posts.
- User authentication is handled via sessions using `express-session` and cookies.
- Responsive and polished UI using Handlebars.js for templating.
- Follows MVC (Model-View-Controller) design pattern.
- API routes for creating, reading, updating, and deleting posts.

## Technologies

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL (Sequelize ORM)
- **Frontend:**
  - Handlebars.js (Templating engine)
  - HTML5, TailwindCss, JavaScript
- **Authentication:**
  - `express-session` for session management
- **Deployment:**
  - Render (for hosting)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AntonioKOD/blog_site.git
   cd blog-site

2. **Install dependencies:**
    ```bash
    npm install

3. **Create a .env file:**
    Create a .env file in the root directory of the project and include necessary environment variables.

4. **Setup the database:**
    Create a PostgreSQL database and update your .env file with the database URL.

5. **Run the application:**
    npm start

    The app will be running on http://localhost:3001/.


## Database Setup

To setup the database, follow these steps:

1. Install PostgreSQL, on your local machine.
2. Create a new database for the application.
3. Update the .env file with your database credentials.


## Environment Variables

You need to configure the following environment variables in a .env file in the root of your project: 

    ```bash
    PORT = 3001;
    DB_URL= postgresurl
    SECRET_KEY = your session secret


- **PORT**: The port where the app will run
- **DB_URL**: The URL to your PostgreSQL database.
- **SECRET_KEY**: A secret key for session management.

## Routes

### User Routes

- **GET** `/login`
  - Renders the user login page.
  
- **POST** `/login`
  - Authenticates the user and logs them in.
  
- **GET** `/signup`
  - Renders the user signup page.
  
- **POST** `/signup`
  - Creates a new user account.
  
- **POST** `/logout`
  - Logs out the current user.

### Blog Post Routes

- **GET** `/`
  - Renders the home page, displaying all blog posts.
  
- **GET** `/post/:id`
  - Renders a single blog post based on the post ID.
  
- **POST** `/post`
  - Creates a new blog post (authenticated users only).
  
- **PUT** `/post/:id`
  - Updates an existing blog post (authenticated users only).
  
- **DELETE** `/post/:id`
  - Deletes an existing blog post (authenticated users only).


