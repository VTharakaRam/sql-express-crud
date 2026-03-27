# SQL Express CRUD

A simple CRUD application built with Node.js, Express, and MySQL.

## Features
- View all users
- Add new user
- Edit user
- Delete user

## Technologies Used
- Node.js
- Express.js
- MySQL
- EJS (Template Engine)
- Faker.js (for generating fake data)

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/VTharakaRam/sql-express-crud.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
DB_HOST=localhost
DB_USER=root
DB_NAME=delta_app
DB_PASSWORD=your_password
```

### 4. Run the server
```bash
nodemon index.js
```

### 5. Open in browser
```
http://localhost:1010
```

## Database Schema
```sql
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
);
```

## Author
Tharaka Ram
