# Admin Panel - Front-End Developer Assignment

## Overview

This project is a fully responsive Admin Panel that implements basic CRUD functionalities and data visualization. The application includes user authentication, management, search functionality, pagination, theme switching, language translation, and a clean UI built with React, TypeScript, Tailwind CSS, and Shadcn UI. 😊

- Note: Since the API used in this project is public and doesn't update dynamically, the visual list of users won't reflect changes after adding, updating, or deleting a user. However, all CRUD operations are simulated using React Query and React Mutation, handling requests.🚀

## Technologies Used

- **React** (with TypeScript)
- **Vite** (for faster build times)
- **Tailwind CSS** (for styling)
- **Shadcn UI** (for UI components)
- **HTTP Client**: Axios
- **React Query & Mutation** (for data fetching and handling CRUD operations)
- **Zod** (for form validation)
- **React Router Dom** (for routing)
- **Husky**
- **JWT Authentication** (for login and user authorization)
- **React Context API**

## Features

### User Authentication:

- Login page with username and password authentication.
- Access and refresh token management.

### User Management (CRUD functionality):

- List users with details (name, email, age, and status).
- Add, edit, and delete users using separate form page.

### Additional Features:

- Search functionality for users.
- Pagination for the user list.
- Theme change functionality (light and dark modes).
- Language translation between English and Georgian for static data.

## Project Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn

# Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/admin-panel-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd admin-panel-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

# Usage

1. Open the Application
   Launch the application in your browser. The default URL is: http://localhost:5173.

2. Log In
   Log in to access full functionality. You can use dummy credentials from this dataset: https://dummyjson.com/users.

3. Explore Features

   - View, add, update, and delete user data.
   - Switch between English and Georgian languages as needed.
   - Toggle dark mode for a comfortable user experience.
   - Search and navigate through pages using pagination.

# Live Site

Access the live application at [Admin-Panel](https://admin-panel-site-7.netlify.app/en/login).

# Author

Hi, my name is Teo and I am a front-end-developer.
