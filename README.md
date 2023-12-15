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
- Nodemailer
- Google Maps Distance Matrix API
- Cloud Run
- SQL Instance
- Cloud Build
- Google Secret Manager
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
  
### 5. Create Shipping

- **Method:** `POST`
- **Path:** `/api/shipping/create`
- **Authorization:** Bearer token from login with user role **organisasi**
- **Request Body:**
  ```json
   {
       "bobot": "1 ton",
       "from": "Kebun Sawit Bapaku",
       "to": "Pabrik Kelapa Sawit Adolina",
       "coordinate_from": "3.8093827163957354, 98.5721755784307",
       "coordinate_to": "3.5680875514446213, 98.947977304159"
   }
  ```
- **Response Body:**
  ```json
   {
       "message": "Shipping was added successfully!",
       "code": "DA049DC0",
       "data": {
           "bobot": "1 ton",
           "from": "Kebun Sawit Bapaku",
           "to": "Pabrik Kelapa Sawit Adolina",
           "coordinate_from": "3.8093827163957354, 98.5721755784307",
           "coordinate_to": "3.5680875514446213, 98.947977304159"
       }
   }
  ```

### 6. Reedem Shipping Code

- **Method:** `PATCH`
- **Path:** `/api/shipping/record/:code`
- **Authorization:** Bearer token from login with user role **supir**
- **Parameters:**
  - `code`: Shipping Code.
- **Request Body:**
  ```json
   {
       "status": "Diproses",
       "plat": "AG 1 A",
       "bobot": "2 ton"
   }
  ```
- **Response Body:**
  ```json
   {
       "message": "Code successfully redeemed.",
       "data": {
           "status": "Diproses",
           "plat": "AG 1 A",
           "bobot": "2 ton"
       }
   }
  ```

### 7. Add Shipping Checkpoint

- **Method:** `POST`
- **Path:** `/api/shipping/start/:code`
- **Authorization:** Bearer token from login with user role **supir**
- **Parameters:**
  - `code`: Shipping Code.
- **Request Body:**
  ```json
   {
       "place_name": "Rumah Makan Bebas",
       "coordinate": "3.8093827163957354, 98.5721755784307",
       "detail": "Mangan"
   }
  ```
- **Response Body:**
  ```json
   {
       "message": "Tracking has been successfully recorded."
   }
  ```

### 8. Finish Shipping

- **Method:** `PATCH`
- **Path:** `/api/shipping/finish/:code`
- **Authorization:** Bearer token from login with user role **organisasi**
- **Parameters:**
  - `code`: Shipping Code.
- **Response Body:**
  ```json
   {
       "message": "Delivery completed, items received."
   }
  ```

### 9. Get All Shipping (Org)

- **Method:** `GET`
- **Path:** `/api/shipping/org/`
- **Authorization:** Bearer token from login with user role **organisasi**
- **Response Body:**
  ```json
   {
       "message": "Shipping was fetched succesfully",
       "data": {
           "nama": "Organisasi Palomade",
           "shipping": [
               {
                   "id": 1,
                   "code": "A22ABF96",
                   "started_date": "2023-12-15T12:36:50.000Z",
                   "finish_date": null,
                   "status": null,
                   "driver_id": null,
                   "organisasi_id": 3,
                   "plat": null,
                   "bobot": "2 ton",
                   "from": "Kebun Sawit Bapakmu",
                   "to": "Pabrik Kelapa Sawit Adolina",
                   "coordinate_from": "3.8093827163957354, 98.5721755784307",
                   "coordinate_to": "3.5680875514446213, 98.947977304159",
                   "estimated_arrive": "2023-12-16T04:21:50.000Z",
                   "createdAt": "2023-12-15T12:36:50.000Z"
               },
               {
                   "id": 2,
                   "code": "85FA3EFB",
                   "started_date": "2023-12-15T12:38:12.000Z",
                   "finish_date": "2023-12-15T16:08:08.000Z",
                   "status": "terkirim",
                   "driver_id": 7,
                   "organisasi_id": 3,
                   "plat": "AG 1 A",
                   "bobot": "2 ton",
                   "from": "Kebun Sawit Bapaku",
                   "to": "Pabrik Kelapa Sawit Adolina",
                   "coordinate_from": "3.8093827163957354, 98.5721755784307",
                   "coordinate_to": "3.5680875514446213, 98.947977304159",
                   "estimated_arrive": "2023-12-16T04:23:12.000Z",
                   "createdAt": "2023-12-15T12:38:12.000Z"
               },
               {
                   "id": 3,
                   "code": "DA049DC0",
                   "started_date": "2023-12-15T15:20:54.000Z",
                   "finish_date": null,
                   "status": null,
                   "driver_id": null,
                   "organisasi_id": 3,
                   "plat": null,
                   "bobot": "1 ton",
                   "from": "Kebun Sawit Bapaku",
                   "to": "Pabrik Kelapa Sawit Adolina",
                   "coordinate_from": "3.8093827163957354, 98.5721755784307",
                   "coordinate_to": "3.5680875514446213, 98.947977304159",
                   "estimated_arrive": "2023-12-16T07:05:54.000Z",
                   "createdAt": "2023-12-15T15:20:54.000Z"
               }
           ]
       }
   }
  ```

### 10. Get All Shipping (Supir)

- **Method:** `GET`
- **Path:** `/api/shipping/driver/`
- **Authorization:** Bearer token from login with user role **supir**
- **Response Body:**
  ```json
   {
       "message": "Shipping was fetched succesfully",
       "data": {
           "nama": "Supir Palomade",
           "shippings": [
               {
                   "shipping_id": 2,
                   "code": "85FA3EFB",
                   "started_date": "2023-12-15T12:38:12.000Z",
                   "finish_date": "2023-12-15T16:08:08.000Z",
                   "status": "terkirim",
                   "plat": "AG 1 A",
                   "bobot": "2 ton",
                   "from": "Kebun Sawit Bapaku",
                   "to": "Pabrik Kelapa Sawit Adolina",
                   "coordinate_from": "3.8093827163957354, 98.5721755784307",
                   "coordinate_to": "3.5680875514446213, 98.947977304159",
                   "estimated_arrive": "2023-12-16T04:23:12.000Z",
                   "createdAt": "2023-12-15T12:38:12.000Z"
               }
           ]
       }
   }
  ```
  
### 11. Get Shipping Details

- **Method:** `GET`
- **Path:** `/api/shipping/start/:code`
- **Authorization:** Bearer token from login with user role **organisasi** or **supir**
- **Parameters:**
  - `code`: Shipping Code.
- **Response Body:**
  ```json
   {
       "message": "Shipping was fetched succesfully",
       "data": {
           "code": "85FA3EFB",
           "berat": "2 ton",
           "plat": "AG 1 A",
           "detail": [
               {
                   "id": 1,
                   "shipping_id": 2,
                   "place_name": "Pom Bensin Lagi",
                   "coordinate": "3.8093827163957354, 98.5721755784307",
                   "detail": "Isi Bensin Dulus",
                   "createdAt": "2023-12-15T12:39:25.000Z"
               },
               {
                   "id": 2,
                   "shipping_id": 2,
                   "place_name": "Rumah Makan Bebas",
                   "coordinate": "3.8093827163957354, 98.5721755784307",
                   "detail": "Mangan",
                   "createdAt": "2023-12-15T12:39:49.000Z"
               },
               {
                   "id": 3,
                   "shipping_id": 2,
                   "place_name": "Rumah Makan Bebas",
                   "coordinate": "3.8093827163957354, 98.5721755784307",
                   "detail": "Mangan",
                   "createdAt": "2023-12-15T16:05:20.000Z"
               }
           ]
       }
   }
  ```

### 12. Reedem Subscription Code

- **Method:** `POST`
- **Path:** `/api/reedem-subscription`
- **Authorization:** Bearer token from login with user role **user**
- **Request Body:**
  ```json
   {
       "code": "SUBS100"
   }
  ```
- **Response Body:**
  ```json
   {
       "message": "Code successfully redeemed.",
       "data": {
           "code": "SUBS100"
       }
   }
  ```

### 13. Check Subscription

- **Method:** `GET`
- **Path:** `/api/check-subscription`
- **Authorization:** Bearer token from login with user role **user**
- **Response Body:**
  ```json
   {
       "status": true,
       "message": "you have active subscription at this time!"
   }
  ```

### 14. Get Config

- **Method:** `GET`
- **Path:** `/api/config/:config-name` # example : max-scan
- **Authorization:** Bearer token from login with user role **user**
- **Response Body:**
  ```json
   {
       "message": "config has been successfully retrieved",
       "data": {
           "name": "max-scan",
           "value": "30"
       }
   }
  ```
  
