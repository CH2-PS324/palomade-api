# PALOMADE API
Team CH2-PS324 | Bangkit Capstone Project 2023

```markdown
# Prerequisites
Before running the application, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

# Tech We Use
- Express.js
- MySQL
- Sequelize
- Cloud Run
- SQL Instance
- Google Secret Manager
- Google Cloud Storage
```

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/CH2-PS324/palomade-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd palomade-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## SETTING UP .ENV File

before starting running the application, set env file based on your needs:

```bash
NODE_ENV=

# Database Config
DB_DATABASE= 
DB_HOST= 
DB_USER=
DB_PASSWORD= 

# Server Config
SERVER_ADDRESS=
PORT=
CORS_PORT= 
SECRET_KEY=

# HashIds
HASH_KEY=

# MAIL CONFIG
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

# GMAPS KEY
MAPS_KEY=
```

You Must Create a Database First before going to next step.

## Running the Application

To start the Express.js server and run the database setup:

```bash
# Choose your command : 
npm run start
npm run dev
```

## API Endpoint List

```bash
# Users
[POST] https://palomade-api.example/api/users/register # Register User
[POST] https://palomade-api.example/api/users/login # Login User
[GET] https://palomade-api.example/api/users/ # Get User Detail
[PATCH] https://palomade-api.example/api/users/ # Update User Detail

# Shipping
[POST] https://palomade-api.example/api/shipping/create # Create Shipping (Organization)
[PATCH] https://palomade-api.example/api/shipping/start/:code # Take Shipping Code (Driver)
[POST] https://palomade-api.example/api/shipping/record/:code # Record Driver Checkpoint (Driver)
[POST] https://palomade-api.example/api/shipping/finish/:code # Finish Shipping (Organisasi)
[GET] https://palomade-api.example/api/shipping/record/:code # Get Shipping Details Data (Organisasi/Driver)
[GET] https://palomade-api.example/api/shipping/org/ # Get All Shipping (Organisasi)
[GET] https://palomade-api.example/api/shipping/driver/ # Get All Shipping (Driver)

# Subscription
[POST] https://palomade-api.example/api/reedem-subscription # Reedem Subscription (User)
[GET] https://palomade-api.example/api/check-subscription # Check Subscription (User)

# Config
[GET] https://palomade-api.example/api/config/:config-name # Get Config (User)
```

## API Endpoints

List and describe the available endpoints of your API. Provide details such as the HTTP methods supported, expected parameters, and example responses. Organize this section logically based on the different functionalities your API offers.

### 1. Register User

- **Method:** `POST`
- **Path:** `/api/users/register`
- **Description:** endpoint for register users
- **Important Notes:** role is filled with ['supir','organisasi','user']
- **Request Body:**
  ```json
  {
    "name": "Iqbal Palomade",
    "email": "iqbal@palomade.com",
    "password": "12345678",
    "role": "user"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "User was registered successfully!",
    "data": {
        "name": "Iqbal Palomade",
        "email": "iqbal@palomade.com",
        "password": "12345678",
        "role": "user"
    }
  }
  ```
  
### 2. Login User

- **Method:** `POST`
- **Path:** `/api/users/login`
- **Description:** endpoint for login users
- **Request Body:**
  ```json
  {
    "email": "organisasi@palomade.com",
    "password": "12345678"  
  }
  ```
- **Response Body:**
  ```json
  {
    "id": "9JapwN5yB7qd013y",
    "name": "Organisasi Palomade",
    "role": "organisasi",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAyNjUwOTk4LCJleHAiOjE3MDI3MzczOTh9.pXE-RsOctbzb4Ft0nwlWeJrfdFLaX8ksPcH7COGYIvI",
    "refreshToken": "0b9ee3c4-7146-482f-b907-9e007f1fb445"
  }
  ```

### 3. Get User Detail

- **Method:** `GET`
- **Path:** `/api/users/`
- **Description:** endpoint for login users
- **Authorization:** Bearer token from login
- **Response Body:**
  ```json
  {
    "message": "User was fetched successfully.",
    "data": {
        "id": "DVrNyJMqX720Xaj1",
        "name": "User Palomade",
        "email": "user@palomade.com",
        "password": "$2a$08$QWvd2rQ6AAVpBuxMSDDwpO6Yi6YRURpvJMBzknLmvplW3xTpUY4Oy",
        "role": "user"
    }
  }
  ```

### 4. Update User

- **Method:** `PATCH`
- **Path:** `/api/users/`
- **Authorization:** Bearer token from login
- **Request Body:**
  ```json
  {
    "name": "User Palomade Bagus"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "User was updated successfully.",
    "data": {
        "name": "Use Parlomade Bagus"
    }
  }
  ```
