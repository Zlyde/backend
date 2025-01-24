# API Documentation


## Api overview

| URI (endpoints)          | GET                                                   | POST                      | PUT                 | DELETE                   |
|--------------------------|------------------------------------------------------|---------------------------|---------------------|--------------------------|
| `/`                      | [API Overview](#api-overview)                          |                           |                     |                          |
| `/auth`                  | [Authentication Overview](#authentication-overview)            |                           |                     |                          |
| `/auth/register`         |                            | Register new user         |                     |                          |
| `/auth/login`            |                            | Login with email and password |                |                          |
| `/auth/github`           |                            | [GitHub Login](#github-login)      |                     |                          |
| `/bike`                  | [Get all bikes](#get-all-bikes)    | [Add a new bike](#add-a-new-bike)    |                     |                          |
| `/bike/:id`              | [Get bike by ID](#get-bike-by-id)     |                           | [Update a bike](#update-a-bike)       | [Delete a bike](#delete-a-bike)    |
| `/city`                  | [Get all cities](#get-all-cities)     |                           |                     |                          |
| `/city/:query`           | [Get city by ID or name](#get-city-by-id-or-name)  |                           |                     |                          |
| `/city/:id/bikes`        | [Get bikes in a city](#get-bikes-in-a-city)     |                           |                     |                          |
| `/city/:id`              |                            |                           | [Update a city](#update-a-city)    | [Delete a bike](#delete-a-bike)   |
| `/invoice`               | [Get all invoices](#get-all-invoices)    |                           |                     |                          |
| `/invoice/:invoiceId`    | [Get invoice by ID](#get-invoice-by-id)    |                           |                     |                          |
| `/invoice/user/:userId`  | [Get invoices by user ID](#get-invoices-by-user-id)    |                           |                     |                          |
| `/invoice/create`        |                            | [Create a new invoice](#create-a-new-invoice)  |                     |                          |
| `/invoice/pay/:invoiceId`|                          |                           | [Mark an invoice as paid](#mark-an-invoice-as-paid) |                          |
| `/setting`               | [Get settings](#get-settings)      |                           | [Update settings](#update-settings)   |                          |
| `/setting/reset`         |                            |                           | [Reset settings to defaults](#reset-settings-to-defaults) |                      |
| `/station`               | [Get all charging stations](#get-all-charging-stations) | [Add a new charging station](#add-a-new-charging-station) |                     |                          |
| `/station/:id`         | [Get charging station by ID](#get-charging-station-by-id) |                          | [Update a charging station](#update-a-charging-station)| [Delete a charging station](#delete-a-charging-station)|
| `/station/:id/bikes`   | [Get bikes at a charging station](#get-bikes-at-a-charging-station) |                      |                     |                          |
| `/trip`                | [Get all trips](#get-all-trips)      |                           |                     |                          |
| `/trip/:tripId`        | [Get trip by ID](#get-trip-by-id)         |         |            |              |
| `/trip/user/:userId`   | [Get trips by user ID](#get-trips-by-user-id)  |                           |                     |                          |
| `/trip/bike/:bikeId`   | [Get trips by bike ID](#get-trips-by-bike-id)    |                           |                     |                          |
| `/trip/start`          |    | [Start a new trip](#start-a-new-trip)   |         |           |
| `/trip/end/:tripId`    |             |        | [End a trip](#end-a-trip)    |           |
| `/user`                | [Get all users](#get-all-users) |    |      |    |
| `/user/{user_id}`      | [Get user by ID](#get-user-by-id) |     | [Update a user](#updatea-a-user) | [Delete a user](#delete-a-user)  |
| `/zone`                | [Get all parking zones](#get-all-parking-zones)  | [Add a new parking zone](#add-a-new-parking-zone) |    |            |
| `/zone/{zone_id}`      | [Get parking zone by ID](#get-parking-zone-by-id) |  | [Update a parking zone](#update-a-parking-zone) | [Delete a parking zone](#delete-a-parking-zone) |
| `/zone/{zone_id}/bikes`| [Get bikes in a parking zone](#get-bikes-in-a-parking-zone)  |             |          |            |


## Table of Contents
- [Auth](#auth)
  - [Authentication Overview](#authentication-overview)
  - [Get API Instructions](#get-api-instructions)
  - [Register a new user](#register-a-new-user)
  - [Login with email and password ](#login-with-email-and-password)
  - [GitHub Login](#github-login)
  - [Auth Error and Response Codes](#auth-error-and-response-codes)
- [Bikes](#bikes)
  - [Get all bikes](#get-all-bikes)
  - [Get bike by ID](#get-bike-by-id)
  - [Add a new bike](#add-a-new-bike)
  - [Update a bike](#update-a-bike)
  - [Delete a bike](#delete-a-bike)
  - [Bike Error and Response Codes](#bike-error-and-response-codes)
- [Cities](#cities)
  - [Get all cities](#get-all-cities)
  - [Get city by ID or name](#get-city-by-id-or-name)
  - [Update a city](#update-a-city)
  - [Get bikes in a city](#get-bikes-in-a-city)
  - [City Error and Response Codes](#city-error-and-response-codes)
- [Invoices](#invoices)
  - [Get all invoices](#get-all-invoices)
  - [Get invoice by ID](#get-invoice-by-id)
  - [Get invoices by user ID](#get-invoices-by-user-id)
  - [Create a new invoice](#create-a-new-invoice)
  - [Mark an invoice as paid](#mark-an-invoice-as-paid)
  - [Invoice Error and Response Codes](#invoice-error-and-response-codes)
- [Settings](#settings)
  - [Get settings](#get-settings)
  - [Update settings](#update-settings)
  - [Reset settings to defaults](#reset-settings-to-defaults)
  - [Setting-Error and Response Codes](#setting-error-and-response-codes)
- [Charging Stations](#charging-stations)
  - [Get all charging stations](#get-all-charging-stations)
  - [Get charging station by ID](#get-charging-station-by-id)
  - [Add a new charging station](#add-a-new-charging-station)
  - [Update a charging station](#update-a-charging-station)
  - [Delete a charging station](#delete-a-charging-station)
  - [Get bikes at a charging station](#get-bikes-at-a-charging-station)
  - [Station Error and Response Codes](#station-error-and-response-codes)
- [Trips](#trips)
  - [Get all trips](#get-all-trips)
  - [Get trip by ID](#get-trip-by-id)
  - [Get trips by user ID](#get-trips-by-user-id)
  - [Get trips by bike ID](#get-trips-by-bike-id)
  - [Start a new trip](#start-a-new-trip)
  - [End a trip](#end-a-trip)
  - [Trip Error and Response Codes](#trip-error-and-response-codes)
- [Users](#trips)
  - [Get all users](#get-all-users)
  - [Get user by ID](#get-user-by-id)
  - [Update a user](#updatea-a-user)
  - [Delete a user](#delete-a-user)
  - [User Error and Response Codes](#user-error-and-response-codes)
- [Parking Zones](#parking-zones)
  - [Get all parking zones](#get-all-parking-zones)
  - [Get parking zone by ID](#get-parking-zone-by-id)
  - [Add a new parking zone](#add-a-new-parking-zone)
  - [Update a parking zone](#update-a-parking-zone)
  - [Delete a parking zone](#delete-a-parking-zone)
  - [Get bikes in a parking zone](#get-bikes-in-a-parking-zone)
  - [Zone Error and Response Codes](#zone-error-and-response-codes)
---

## Auth Endpoints

### Authentication Overview

The API includes endpoints for user authentication, including registration, login, and GitHub OAuth login. Tokens are returned upon successful login and are required for accessing protected resources.

- **Default values**:
  - **JWT Token Expiry**: 24 hours.
  - **GitHub OAuth**: Configured for callback and token-based authentication.

---

### Get API Instructions

**Endpoint**: `GET /api/{version}/auth`  
Provides a message with instructions for using the `/register` and `/login` endpoints.

#### Testing with Postman

- **Method**: `GET`  
- **URL**: `http://localhost:5001/api/{version}/auth`  
- **Body**: None  

#### Response Example

```json
{
  "message": "POST /register or /login"
}
```

---

### Register a new user

**Endpoint**: `POST /api/{version}/auth/register`  
Registers a new user in the system.

#### Testing with Postman

- **Method**: `POST`  
- **URL**: `http://localhost:5001/api/{version}/auth/register`  
- **Body (JSON)**:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Response Example

```json
{
  "message": "User registered",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-01-24T12:00:00.000Z"
  }
}
```

---

### Login a user

**Endpoint**: `POST /api/{version}/auth/login`  
Logs in a user and provides a JWT token for authentication.

#### Testing with Postman

- **Method**: `POST`  
- **URL**: `http://localhost:5001/api/{version}/auth/login`  
- **Body (JSON)**:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Response Example

```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "user_id": "123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "account_balance": 0,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-24T12:00:00.000Z"
  }
}
```

---

### GitHub Login

**Endpoint**: `GET /api/{version}/auth/github`  
Redirects the user to GitHub for OAuth login.

**Callback Endpoint**: `GET /api/{version}/auth/github/callback`  
Handles the callback from GitHub and provides a token and user details.

#### Testing the Flow

1. **Initiate GitHub Login**:
   - **Method**: `GET`  
   - **URL**: `http://localhost:5001/api/{version}/auth/github`  

2. **Callback URL**:
   - **URL**: Redirects to `http://localhost:5173/oauth/callback?token={token}&user={user}`  

#### Response Example

On successful callback:

```json
{
  "message": "GitHub login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "name": "john.doe",
    "email": "john.doe@github.com",
    "githubId": "github123"
  }
}
```

---

### Auth Error and Response Codes

| HTTP Status | Layer   | Message/Description                           | Notes                                                       |
|-------------|---------|-----------------------------------------------|-------------------------------------------------------------|
| 200         | HTTP    | `Success`                                    | Returned when a request completes successfully.             |
| 201         | HTTP    | `Created`                                    | Returned when a new user is registered.                     |
| 400         | Service | `Missing Field`                              | Triggered when required fields are missing.                 |
| 400         | HTTP    | `Invalid token`                              | Triggered when a provided token is invalid or expired.      |
| 401         | HTTP    | `User not found`                             | Triggered when no user matches the provided credentials.    |
| 401         | HTTP    | `Wrong password`                             | Triggered when the password is incorrect.                   |
| 403         | Service | `No token provided`                          | Triggered when no token is sent in the request headers.     |
| 500         | Data    | `Internal server error`                      | Generic server error during registration or login.          |
| 500         | Data    | `Error logging in`                           | Generic server error for login failures.                    |

## Bike Endpoints

### Overview
The API handles bike-related operations, including creating, updating, retrieving, and deleting bikes.

- **Default values**:
  - **`battery_level`**: Default is `100` (fully charged battery).
  - **`status`**: Default is `"available"`, meaning the bike is ready for use.
  - **`location.coordinates`**: Default is `[0, 0]`, indicating an unknown location.

---

### Get all bikes
**Endpoint**: `GET /api/{version}/bike`  
Fetches all bikes in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/bike`  
- **Body**: None  

#### Response Example
```json
[
    {
        "bike_id": 1,
        "status": "available",
        "location": {
            "type": "Point",
            "coordinates": [12.565, 55.675]
        },
        "battery_level": 100,
        "last_service_date": "2024-12-20T12:34:56Z"
    }
]
```

---

### Get bike by ID
**Endpoint**: `GET /api/{version}/bike/:id`  
Fetches a specific bike by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/bike/:id`  
- **Path Parameter**: `id` (The ID of the bike)  

---

### Add a new bike
**Endpoint**: `POST /api/{version}/bike`  
Adds a new bike. If no `location` is provided, defaults to `[0, 0]`.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5001/api/{version}/bike`  
- **Body (JSON)**:
```json
{
    "location": {
        "coordinates": [12.566, 55.676]
    }
}
```

---

### Update a bike
**Endpoint**: `PUT /api/{version}/bike/:id`  
Updates a specific bike by its ID.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5001/api/{version}/bike/:id`  
- **Path Parameter**: `id` (The ID of the bike)  
- **Body (JSON)**:
```json
{
    "status": "maintenance",
    "battery_level": 50
}
```

---

### Delete a bike
**Endpoint**: `DELETE /api/{version}/bike/:id`  
Deletes a specific bike by its ID.

#### Testing with Postman
- **Method**: DELETE  
- **URL**: `http://localhost:5001/api/{version}/bike/:id`  
- **Path Parameter**: `id` (The ID of the bike)  

---

### Bike Error and Response Codes

| HTTP Status | Layer        | Message/Description                                                       | Notes                                                 |
|-------------|--------------|---------------------------------------------------------------------------|-------------------------------------------------------|
| 200         | HTTP         | `Success`                                                                 | Returned when a GET, PUT, or DELETE request succeeds. |
| 201         | HTTP         | `Created`                                                                 | Returned when a new bike is successfully added.       |
| 400         | Service      | `Validation error: battery_level must be between 0-100`                   | Triggered when `battery_level` exceeds limits.        |
| 400         | Service      | `Validation error: location.coordinates must be an array with two numbers`| Triggered if `location` is invalid.                   |
| 404         | HTTP         | `Bike with ID {id} not found.`                                            | Triggered when bike is not found.                     |
| 500         | Data         | `Error fetching bikes: {error}`                                           | Generic server error for fetching data.               |

---

## City Endpoints

### Overview
The API handles city-related operations, including creating, updating, retrieving, and deleting cities, as well as retrieving bikes within city boundaries.

- **Default values**:
  - **`position.type`**: Default is `"Point"`, used for city center coordinates.
  - **`boundary.type`**: Expected types are `"Polygon"` or `"MultiPolygon"` for defining city boundaries.

---

### Get all cities
**Endpoint**: `GET /api/{version}/city`  
Fetches all cities in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/city`  
- **Body**: None  

#### Response Example
```json
[
    {
        "city_id": 1,
        "name": "Gothenburg",
        "position": {
            "type": "Point",
            "coordinates": [11.97456, 57.70887]
        },
        "boundary": {
            "type": "Polygon",
            "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
        },
        "color": "#ff6600"
    }
]
```

---

### Get city by ID or name
**Endpoint**: `GET /api/{version}/city/:query`  
Fetches a specific city by its ID or name.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/city/:query`  
- **Path Parameter**: `query` (City ID as a number or city name as a string)  

---

### Update a city
**Endpoint**: `PUT /api/{version}/city/:id`  
Updates the details of a specific city using its ID.

#### **Dependencies**
This endpoint depends on the following layers:
- **Route Layer**: Accepts HTTP requests and forwards them to the `cityService`.
- **Service Layer**: `cityService.updateCity` handles business logic, validates data, and interacts with the data layer.
- **Data Layer**: Uses `City.findOneAndUpdate` to update the city's data in the MongoDB database.


#### **Request Details**
**Method**: PUT  
**URL**: `http://localhost:5001/api/{version}/city/:id`  
**Path Parameter**:  
- `id` (string): The unique ID of the city to be updated.  

**Request Body**:  
Provide a JSON object with the updated fields for the city.  
For example:
```json
{
    "name": "New City Name",
    "population": 120000,
    "coordinates": {
        "type": "Polygon",
        "coordinates": [[[12.0, 55.0], [12.1, 55.1], [12.2, 55.2], [12.0, 55.0]]]
    },
    "region": "New Region"
}
```

#### Response Example
**Success**
```json
{
    "city_id": 1,
    "name": "New City Name",
    "population": 120000,
    "coordinates": {
        "type": "Polygon",
        "coordinates": [[[12.0, 55.0], [12.1, 55.1], [12.2, 55.2], [12.0, 55.0]]]
    },
    "region": "New Region",
    "last_updated": "2025-01-24T12:00:00.000Z"
}
```

---

### Get bikes in a city
**Endpoint**: `GET /api/{version}/city/:id/bikes`  
Fetches all bikes within a specific city's boundaries.

#### Dependencies
This endpoint leverages the `geoService` module, which internally uses the `geoData` module for geographical operations. The following functionalities are used:

- **Validation**: Ensures the city ID is valid and exists using the `geoService.validateId` method and MongoDB queries.
- **Data Retrieval**: Fetches bikes within the specified city’s boundary using `geoService.getBikesInCity`, which calls `geoData.getBikesInDefinedArea`.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/city/:id/bikes`  
- **Path Parameter**: `id` (The ID of the city). Must be a valid numeric or string ID.

#### Response Example
**Success**
```json
{
    "bikes": [
        {
            "bike_id": 1,
            "status": "available",
            "location": {
                "type": "Point",
                "coordinates": [12.565, 55.675]
            },
            "battery_level": 100
        },
        {
            "bike_id": 2,
            "status": "available",
            "location": {
                "type": "Point",
                "coordinates": [12.566, 55.676]
            },
            "battery_level": 95
        }
    ]
}
```
#### Notes

- The `geoService.getBikesInCity` method validates the city ID, retrieves the city boundary or location, and then fetches bikes using `geoData.getBikesInDefinedArea`.
- Error messages such as `City with ID {id} not found` or `City does not have a defined boundary or location` are handled and returned based on the error type.
- The `geoData.getBikesWithinArea` method is responsible for querying MongoDB for bikes within the defined GeoJSON boundary.

---

### City Error and Response Codes

| HTTP Status | Layer        | Message/Description                                         | Notes                                                  |
|-------------|--------------|------------------------------------------------------------|--------------------------------------------------------|
| 200         | HTTP         | `Success`                                                 | Returned when a GET request succeeds.                 |
| 400         | Service      | `Validation error: City boundary is not defined`          | Triggered when a city lacks a defined boundary.        |
| 400         | HTTP         | `Invalid city ID`                                         | Triggered when the provided city ID is missing or invalid. |
| 404         | HTTP         | `City with ID {id} not found.`                             | Triggered when a city with the specified ID does not exist. |
| 404         | HTTP         | `City not found.`                                          | Triggered when no city matches the given query.        |
| 404         | HTTP         | `No bikes found in city with ID {id}`                     | Triggered when no bikes are located within the city boundary. |
| 404         | Service      | `{type} with ID {id} not found`                           | Triggered when a specified type (City, Charging Station, Parking Zone) does not exist. |
| 500         | Data         | `Error fetching bikes in {type.toLowerCase()} with ID {id}: {error}` | Generic error when fetching bikes for a specific type fails. |
| 500         | Data         | `Error fetching cities: {error}`                          | Generic server error for fetching data.                |
| 500         | Data         | `Error fetching bikes within area: {error}`               | Generic server error for geographical data fetching.   |
| 500         | HTTP         | `Internal server error`                                   | Generic error when an unexpected issue occurs.         |
| 500         | HTTP         | `"Error updating city: {error}"`                          | Generic server error for issues during the update process. |

## Invoice Endpoints

### Overview
The API manages invoice-related operations, including creating, updating, retrieving invoices, and marking them as paid.

- **Default values**:
  - **`billing_date`**: Automatically set to the current date at the time of invoice creation.
  - **`status`**: Defaults to `"unpaid"`, indicating that the invoice has not been settled.
  - **`payment_method`**: Defaults to `null`, updated when the invoice is marked as paid.

---

### Get all invoices
**Endpoint**: `GET /api/{version}/invoice`  
Fetches all invoices in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/invoice`  
- **Body**: None  

---

### Get invoice by ID
**Endpoint**: `GET /api/{version}/invoice/:invoiceId`  
Fetches a specific invoice by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/invoice/:invoiceId`  
- **Path Parameter**: `invoiceId` (The ID of the invoice)  

---

### Get invoices by user ID
**Endpoint**: `GET /api/{version}/invoice/user/:userId`  
Fetches all invoices associated with a specific user.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/{version}/invoice/user/:userId`  
- **Path Parameter**: `userId` (The ID of the user)  

---

### Create a new invoice
**Endpoint**: `POST /api/{version}/invoice/create`  
Creates a new invoice for a completed trip.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5000/api/{version}/invoice/create`  
- **Body (JSON)**:
```json
{
    "tripId": 123,
    "userId": 456
}
```

---

### Mark an invoice as paid
**Endpoint**: `PUT /api/{version}/invoice/pay/:invoiceId`  
Marks a specific invoice as paid and updates the payment method.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5000/api/{version}/invoice/pay/:invoiceId`  
- **Path Parameter**: `invoiceId` (The ID of the invoice)  
- **Body (JSON)**:
```json
{
    "paymentMethod": "prepaid"
}
```

---

### Invoice Error and Response Codes

| HTTP Status | Layer        | Message/Description                                         | Notes                                                  |
|-------------|--------------|------------------------------------------------------------|--------------------------------------------------------|
| 200         | HTTP         | `Success`                                                 | Returned when a GET, PUT request succeeds.             |
| 201         | HTTP         | `Created`                                                 | Returned when a new invoice is successfully created.   |
| 400         | Service      | `Validation error: Missing required fields`               | Triggered when `tripId` or `userId` is missing.        |
| 400         | Service      | `Validation error: Invalid payment method`                | Triggered when an unsupported payment method is provided. |
| 400         | Service      | `Validation error: Insufficient funds`                    | Triggered when the user does not have enough balance for a `prepaid` payment. |
| 404         | HTTP         | `Invoice with ID {id} not found.`                         | Triggered when the specified invoice ID does not exist. |
| 404         | HTTP         | `No invoices found for user with ID {id}`                 | Triggered when no invoices are associated with the given user. |
| 404         | HTTP         | `User with ID {userId} not found.`                        | Triggered when the user associated with the invoice does not exist. |
| 500         | Data         | `Error fetching invoices: {error}`                        | Generic server error for fetching invoices.            |
| 500         | Data         | `Error creating invoice: {error}`                         | Generic server error for creating an invoice.          |
| 500         | Data         | `Error updating invoice: {error}`                         | Generic server error for updating an invoice.          |

#### Notes
- The `invoiceService` validates and calculates pricing based on trip details and system settings.
- Dependencies like `geoService` and `settingService` are used to calculate discounts and fees dynamically during invoice creation.
- The dependency `userService` is used to apply the preferred payment method. For prepaid payments, it verifies the user’s account balance to ensure sufficient funds. If funds are sufficient, the balance is deducted; otherwise, an error is returned.

## Settings Endpoints

### Overview
The API manages application settings, including retrieval, updates, and resetting to default values.

- **Key properties**:
  - **`base_price`**: The base price for all trips.
  - **`price_per_minute`**: The cost per minute of a trip.
  - **`start_discount`**: Discount applied under specific conditions.
  - **`fee_amount`**: Additional fees for trips outside designated zones.
  - **Rules**:
    - **`free_parking_duration`**: Time in minutes for free parking.
    - **`fine_for_wrong_parking`**: Fine amount for incorrect parking.
    - **`cancellation_policy`**: Defines the cancellation conditions.

---

### Get settings
**Endpoint**: `GET /api/{version}/setting`  
Fetches the current application settings.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/setting`  
- **Body**: None  

#### Response Example
```json
{
    "base_price": 10,
    "price_per_minute": 2.5,
    "start_discount": 5,
    "fee_amount": 15,
    "rules": {
        "free_parking_duration": 15,
        "fine_for_wrong_parking": 50,
        "cancellation_policy": "No charge if canceled within 5 minutes"
    }
}
```

---

### Update settings
**Endpoint**: `PUT /api/setting`  
Updates the application settings.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5001/api/{version}/setting`  
- **Body (JSON)**:
```json
{
    "base_price": 12,
    "rules": {
        "free_parking_duration": 20
    }
}
```

#### Response Example
```json
{
    "base_price": 12,
    "price_per_minute": 2.5,
    "start_discount": 5,
    "fee_amount": 15,
    "rules": {
        "free_parking_duration": 20,
        "fine_for_wrong_parking": 50,
        "cancellation_policy": "No charge if canceled within 5 minutes"
    }
}
```

---

### Reset settings
**Endpoint**: `PUT /api/{version}/setting/reset`  
Resets the application settings to default values.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5001/api/{version}/setting/reset`  
- **Body**: None  

#### Response Example
```json
{
    "base_price": 10,
    "price_per_minute": 2.5,
    "start_discount": 5,
    "fee_amount": 15,
    "rules": {
        "free_parking_duration": 15,
        "fine_for_wrong_parking": 50,
        "cancellation_policy": "No charge if canceled within 5 minutes"
    }
}
```

---

### Setting Error and Response Codes

| HTTP Status | Layer        | Message/Description                           | Notes                                                  |
|-------------|--------------|-----------------------------------------------|--------------------------------------------------------|
| 200         | HTTP         | `Success`                                    | Returned when a GET or PUT request succeeds.           |
| 400         | Service      | `Validation error: Base price cannot be negative` | Triggered when the `base_price` is invalid.            |
| 400         | Service      | `Validation error: Fee amount must be between 0 and 100` | Triggered when `fee_amount` exceeds limits.            |
| 500         | Data         | `Error fetching settings: {error}`            | Generic server error for fetching settings.            |
| 500         | Data         | `Error updating settings: {error}`            | Generic server error for updating settings.            |
| 500         | Data         | `Error resetting settings: {error}`           | Generic server error for resetting settings.           |

## Station Endpoints

### Overview
The API handles charging station-related operations, including creating, updating, retrieving, and deleting charging stations, as well as retrieving bikes at specific charging stations.

- **Default values**:
  - **`location.type`**: Must be `"Polygon"` or `"MultiPolygon"`, indicating the station's geographical boundaries.
  - **`coordinates`**: Required array defining the station's geoJSON geometry.

---

### Get all charging stations
**Endpoint**: `GET /api/station`  
Fetches all charging stations in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/station`  
- **Body**: None  

---

### Get charging station by ID
**Endpoint**: `GET /api/{version}/station/:id`  
Fetches a specific charging station by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/station/:id`  
- **Path Parameter**: `id` (The ID of the charging station)  

---
### Add a New Charging Station
**Endpoint**: `POST /api/{version}/station`  
Adds a new charging station to the system.


#### Testing with Postman**Method**: POST  
**URL**: `http://localhost:5001/api/{version}/station`  
**Request Body**:  
Provide a JSON object with the charging station details. Required fields include the station's name, location, and other relevant metadata.

Example:
```json
{
    "name": "Central Station",
    "location": {
        "type": "Point",
        "coordinates": [12.565, 55.675]
    },
    "capacity": 50,
    "status": "active"
}
```

---

#### **Response Example**
**Success**:
```json
{
    "id": "12345",
    "name": "Central Station",
    "location": {
        "type": "Point",
        "coordinates": [12.565, 55.675]
    },
    "capacity": 50,
    "status": "active",
    "created_at": "2025-01-24T14:30:00.000Z"
}
```

---

### Update a Charging Station
**Endpoint**: `PUT /api/{version}/station/:id`  
Updates the details of an existing charging station using its ID.

#### **Testing with Postman**
**Method**: PUT  
**URL**: `http://localhost:5001/api/{version}/station/:id`  
**Path Parameter**:  
- `id` (string): The unique ID of the charging station to update.

**Request Body**:  
Provide a JSON object with the fields to update. Only the provided fields will be modified.

Example:
```json
{
    "name": "Updated Station Name",
    "capacity": 60,
    "status": "maintenance"
}
```

#### **Response Example**
**Success**:
```json
{
    "id": "12345",
    "name": "Updated Station Name",
    "location": {
        "type": "Point",
        "coordinates": [12.565, 55.675]
    },
    "capacity": 60,
    "status": "maintenance",
    "last_updated": "2025-01-24T15:00:00.000Z"
}
```

---

#### **Testing with Postman**
1. **Set Request**:
   - **Method**: `PUT`
   - **URL**: `http://localhost:5001/api/{version}/station/:id`
2. **Headers**:
   - `Content-Type: application/json`
3. **Path Parameter**:
   - Replace `:id` with the charging station's unique ID.
4. **Body**:
   - Provide a valid JSON object with the updated fields.

---

### Delete a charging station
**Endpoint**: `DELETE /api/{version}/station/:id`  
Deletes a specific charging station by its ID.

#### Testing with Postman
- **Method**: DELETE  
- **URL**: `http://localhost:5001/api/{version}/station/:id`  
- **Path Parameter**: `id` (The ID of the charging station)  

---

### Get Bikes at a Charging Station
**Endpoint**: `GET /api/{version}/station/:id/bikes`  
Fetches all bikes located at a specific charging station.

#### Dependencies
This endpoint uses the **`geoService`** module, which relies on the **`geoData`** module for geographical operations. The following functionalities are used:

- **Validation**: Ensures the `charging_station_id` is valid and exists using `geoService.validateId`.
- **Data Retrieval**: Fetches bikes located within the specified charging station's area using `geoService.getBikesInChargingStation`, which internally calls `geoData.getBikesInDefinedArea`.


#### Testing with Postman
**Method**: GET  
**URL**: `http://localhost:5001/api/{version}/station/:id/bikes`  
**Path Parameter**:  
- `id` (string): The unique ID of the charging station. 

#### **Response Example**
**Success**:
```json
{
    "bikes": [
        {
            "bike_id": 1,
            "status": "available",
            "location": {
                "type": "Point",
                "coordinates": [12.565, 55.675]
            },
            "battery_level": 100
        },
        {
            "bike_id": 2,
            "status": "available",
            "location": {
                "type": "Point",
                "coordinates": [12.566, 55.676]
            },
            "battery_level": 95
        }
    ]
}
```

#### **Notes**
- The `geoService.getBikesInChargingStation` method validates the station ID, retrieves the charging station's location or boundary, and fetches bikes using `geoData.getBikesInDefinedArea`.
- Error handling includes checks for invalid IDs, missing charging stations, or stations without bikes.
- The `geoData.getBikesWithinArea` method performs MongoDB queries to fetch bikes within the defined GeoJSON geometry.

---

### Station Error and Response Codes

| HTTP Status | Layer        | Message/Description                                      | Notes                                                   |
|-------------|--------------|---------------------------------------------------------|---------------------------------------------------------|
| 200         | HTTP         | `Success`                                               | Returned when a GET or DELETE request succeeds.         |
| 400         | Service      | `Validation error: Invalid charging station ID`         | Triggered when the `charging_station_id` is invalid.    |
| 404         | HTTP         | `Charging station with ID {id} not found.`              | Triggered when no station matches the given ID.         |
| 404         | HTTP         | `No bikes found at charging station with ID {id}.`     | Triggered when no bikes are located at the station.     |
| 500         | Data         | `Error fetching charging stations: {error}`            | Generic server error for charging station data.         |
| 500         | Data         | `Error fetching bikes at charging station: {error}`    | Generic server error for retrieving bikes at a station. |
| 400         | Service      | `Validation error: Invalid capacity value.`       | Triggered when a field contains invalid data.          |
| 404         | HTTP         | `Charging station with ID {id} not found.`        | Triggered when no charging station matches the given ID. |
| 500         | Data         | `Error updating charging station: {error}`        | Generic server error for updating a station.           |


## Trip Endpoints

### Overview
The API handles trip-related operations, including starting and ending trips, retrieving trip details, and fetching trips by user or bike ID.

- **Default values**:
  - **`start_time`**: Automatically set to the current date and time when the trip begins.
  - **`end_time`**: Defaults to `null` until the trip is ended.
  - **`total_cost`**: Calculated during or after the trip, based on various factors such as parking fees and discounts.

---

### Get all trips
**Endpoint**: `GET /api/trip`  
Fetches all trips in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/trip`  
- **Body**: None  

---

### Get trip by ID
**Endpoint**: `GET /api/{version}/trip/:tripId`  
Fetches a specific trip by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/trip/:tripId`  
- **Path Parameter**: `tripId` (The ID of the trip)  

---

### Get trips by user ID
**Endpoint**: `GET /api/{version}/trip/user/:userId`  
Fetches all trips associated with a specific user.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/trip/user/:userId`  
- **Path Parameter**: `userId` (The ID of the user)  

---

### Get trips by bike ID
**Endpoint**: `GET /api/{version}/trip/bike/:bikeId`  
Fetches all trips associated with a specific bike.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/trip/bike/:bikeId`  
- **Path Parameter**: `bikeId` (The ID of the bike)  

---

### Start a new trip
**Endpoint**: `POST /api/{version}/trip/start`  
Starts a new trip for a specific user and bike.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5001/api/{version}/trip/start`  
- **Body (JSON)**:
```json
{
    "user_id": 1,
    "bike_id": 1
}
```

---

### End a trip
**Endpoint**: `PUT /api/{version}/trip/end/:tripId`  
Ends a trip and calculates its duration and cost.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5001/api/{version}/trip/end/:tripId`  
- **Path Parameter**: `tripId` (The ID of the trip)  

---

### Trip Error and Response Codes

| HTTP Status | Layer        | Message/Description                                         | Notes                                                   |
|-------------|--------------|------------------------------------------------------------|---------------------------------------------------------|
| 200         | HTTP         | `Success`                                                 | Returned when a GET, PUT, or DELETE request succeeds.   |
| 201         | HTTP         | `Created`                                                 | Returned when a new trip is successfully started.       |
| 400         | Service      | `Bike is not available for rental`                        | Triggered if the bike is already in use or unavailable. |
| 400         | Service      | `Bike battery level must be at least 50%`                | Triggered if the bike's battery level is insufficient.  |
| 404         | HTTP         | `Trip with ID {tripId} not found.`                        | Triggered when no trip matches the given ID.            |
| 404         | HTTP         | `No trips found for user with ID {userId}`               | Triggered when no trips are associated with the user.   |
| 404         | HTTP         | `No trips found for bike with ID {bikeId}`               | Triggered when no trips are associated with the bike.   |
| 500         | Data         | `Error fetching trips: {error}`                          | Generic server error for fetching trip data.            |
| 500         | Data         | `Error updating trip with ID {tripId}: {error}`          | Generic server error for updating trip data.            |


## User Endpoints

### Overview
The API manages user-related operations, including creating, retrieving, updating, and deleting users.

- **Default values**:
  - **`role`**: Defaults to `"customer"` if not specified.
  - **`account_balance`**: Defaults to `0` if not provided.

---

### Get all users
**Endpoint**: `GET /api/{version}/user`  
Fetches all users in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/user`  
- **Body**: None  

#### Response Example
**Success**
```json
[
    {
        "user_id": "123",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "customer",
        "account_balance": 50,
        "preferred_payment_method": "prepaid"
    },
    {
        "user_id": "124",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "role": "admin",
        "account_balance": 0,
        "preferred_payment_method": "autogiro",
        "autogiro_details": "1234567890"
    }
]
```

---

### Get user by ID
**Endpoint**: `GET /api/{version}/user/:id`  
Fetches a specific user by their ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/{version}/user/:id`  
- **Path Parameter**: `id` (The ID of the user)  

#### Response Example
**Success**
```json
{
    "user_id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "account_balance": 50,
    "preferred_payment_method": "prepaid"
}
```

---

### Update a user
**Endpoint**: `PUT /api/{version}/user/:id`  
Updates the details of a specific user using their ID.

#### Testing with Postman
**Method**: PUT  
**URL**: `http://localhost:5001/api/{version}/user/:id`  
**Path Parameter**:  
- `id` (string): The unique ID of the user to update.

**Request Body**:  
Provide a JSON object with the updated fields for the user.

Example:
```json
{
    "name": "John Updated",
    "role": "admin",
    "account_balance": 100
}
```

#### Response Example
**Success**
```json
{
    "user_id": "123",
    "name": "John Updated",
    "email": "john@example.com",
    "role": "admin",
    "account_balance": 100,
    "preferred_payment_method": "prepaid"
}
```

---

### Delete a user
**Endpoint**: `DELETE /api/{version}/user/:id`  
Deletes a specific user by their ID.

#### Testing with Postman
- **Method**: DELETE  
- **URL**: `http://localhost:5001/api/{version}/user/:id`  
- **Path Parameter**: `id` (The ID of the user)  

#### Response Example
**Success**
```json
{
    "user_id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "account_balance": 50,
    "preferred_payment_method": "prepaid"
}
```

---

### User Error and Response Codes

| HTTP Status | Layer        | Message/Description                                         | Notes                                                  |
|-------------|--------------|------------------------------------------------------------|--------------------------------------------------------|
| 200         | HTTP         | `Success`                                                 | Returned when a GET, PUT, or DELETE request succeeds.   |
| 400         | Service      | `Validation error: Invalid role`                          | Triggered when an invalid `role` value is provided.     |
| 400         | Service      | `Validation error: Account balance cannot be negative`    | Triggered when `account_balance` is less than `0`.      |
| 404         | HTTP         | `User with ID {id} not found.`                            | Triggered when no user matches the given ID.            |
| 404         | HTTP         | `No users found in the database.`                         | Triggered when there are no users in the database.      |
| 500         | Data         | `Error fetching users: {error}`                           | Generic server error for fetching user data.            |
| 500         | Data         | `Error updating user: {error}`                            | Generic server error for updating user data.            |
| 500         | Data         | `Error deleting user: {error}`                            | Generic server error for deleting user data.            |

---

## Zone Endpoints

### Overview

The API handles parking zone-related operations, including creating, updating, retrieving, and deleting parking zones, as well as retrieving bikes in specific zones.

- **Default values**:
  - **`boundary.type`**: Expected types are `"Polygon"` or `"MultiPolygon"` for defining parking zone boundaries.
  - **`status`**: Defaults to `"active"` if not specified.

---

### Get all parking zones

**Endpoint**: `GET /api/{version}/zone`  
Fetches all parking zones in the system.

#### Testing with Postman

- **Method**: `GET`  
- **URL**: `http://localhost:5001/api/{version}/zone`  
- **Body**: None  

#### Response Example

```json
[
  {
    "parking_zone_id": "1",
    "name": "Downtown Zone",
    "boundary": {
      "type": "Polygon",
      "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
    },
    "status": "active",
    "capacity": 50
  },
  {
    "parking_zone_id": "2",
    "name": "Westside Zone",
    "boundary": {
      "type": "Polygon",
      "coordinates": [[[11.9601, 57.7032], [11.9621, 57.7053], [11.9653, 57.7038], [11.9601, 57.7032]]]
    },
    "status": "inactive",
    "capacity": 30
  }
]
```

---

### Get parking zone by ID

**Endpoint**: `GET /api/{version}/zone/:id`  
Fetches a specific parking zone by its ID.

#### Testing with Postman

- **Method**: `GET`  
- **URL**: `http://localhost:5001/api/{version}/zone/:id`  
- **Path Parameter**: `id` (The ID of the parking zone) 

#### Response Example

```json
{
  "parking_zone_id": "1",
  "name": "Downtown Zone",
  "boundary": {
    "type": "Polygon",
    "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
  },
  "status": "active",
  "capacity": 50
}
```

---


### Add a new parking zone

**Endpoint**: `POST /api/{version}/zone`  
Adds a new parking zone to the system.

#### Testing with Postman

- **Method**: `POST`  
- **URL**: `http://localhost:5001/api/{version}/zone`  
- **Body (JSON)**:

```json
{
  "name": "New Zone",
  "boundary": {
    "type": "Polygon",
    "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
  },
  "capacity": 40,
  "status": "active"
}
```

#### Response Example

```json
{
  "parking_zone_id": "3",
  "name": "New Zone",
  "boundary": {
    "type": "Polygon",
    "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
  },
  "status": "active",
  "capacity": 40
}
```

---

### Update a parking zone

**Endpoint**: `PUT /api/{version}/zone/:id`  
Updates the details of an existing parking zone using its ID.

#### Testing with Postman

- **Method**: `PUT`  
- **URL**: `http://localhost:5001/api/{version}/zone/:id`  
- **Path Parameter**: `id` (The ID of the parking zone)  
- **Body (JSON)**:

```json
{
  "name": "Updated Zone Name",
  "status": "inactive",
  "capacity": 60
}
```

#### Response Example

```json
{
  "parking_zone_id": "1",
  "name": "Updated Zone Name",
  "boundary": {
    "type": "Polygon",
    "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
  },
  "status": "inactive",
  "capacity": 60
}
```

---

### Delete a parking zone

**Endpoint**: `DELETE /api/{version}/zone/:id`  
Deletes a specific parking zone by its ID.

#### Testing with Postman

- **Method**: `DELETE`  
- **URL**: `http://localhost:5001/api/{version}/zone/:id`  
- **Path Parameter**: `id` (The ID of the parking zone)  

#### Response Example

```json
{
  "parking_zone_id": "1",
  "name": "Downtown Zone",
  "boundary": {
    "type": "Polygon",
    "coordinates": [[[11.9701, 57.7072], [11.9721, 57.7103], [11.9753, 57.7078], [11.9701, 57.7072]]]
  },
  "status": "active",
  "capacity": 50
}
```

---

### Get bikes in a parking zone

**Endpoint**: `GET /api/{version}/zone/:id/bikes`  
Fetches all bikes located in a specific parking zone.

#### Testing with Postman

- **Method**: `GET`  
- **URL**: `http://localhost:5001/api/{version}/zone/:id/bikes`  
- **Path Parameter**: `id` (The ID of the parking zone)  

#### Response Example

```json
{
  "bikes": [
    {
      "bike_id": "1",
      "status": "available",
      "location": {
        "type": "Point",
        "coordinates": [11.9711, 57.7083]
      },
      "battery_level": 90
    },
    {
      "bike_id": "2",
      "status": "available",
      "location": {
        "type": "Point",
        "coordinates": [11.9732, 57.7091]
      },
      "battery_level": 80
    }
  ]
}
```

---

### Zone Error and Response Codes

| HTTP Status | Layer   | Message/Description                                  | Notes                                                |
|-------------|---------|-----------------------------------------------------|------------------------------------------------------|
| 200         | HTTP    | `Success`                                           | Returned when a GET, POST, PUT, or DELETE succeeds.  |
| 201         | HTTP    | `Created`                                           | Returned when a new parking zone is successfully created. |
| 400         | Service | `Validation error: Invalid boundary format`         | Triggered when the provided boundary is not valid.   |
| 404         | HTTP    | `Parking zone with ID {id} not found.`              | Triggered when no zone matches the given ID.         |
| 404         | HTTP    | `No bikes found in parking zone with ID {id}.`      | Triggered when no bikes are located in the zone.     |
| 500         | Data    | `Error fetching parking zones: {error}`             | Generic server error for fetching parking zones.     |
| 500         | Data    | `Error updating parking zone: {error}`              | Generic server error for updating a parking zone.    |
| 500         | Data    | `Error deleting parking zone: {error}`              | Generic server error for deleting a parking zone.    |