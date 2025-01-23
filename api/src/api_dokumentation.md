# API Documentation

## Table of Contents
- [Bikes](#bikes)
  - [Get all bikes](#get-all-bikes)
  - [Get bike by ID](#get-bike-by-id)
  - [Add a new bike](#add-a-new-bike)
  - [Update a bike](#update-a-bike)
  - [Delete a bike](#delete-a-bike)
  - [Error and Response Codes](#error-and-response-codes)
- [Cities](#cities)
  - [Get all cities](#get-all-cities)
  - [Get city by ID or name](#get-city-by-id-or-name)
  - [Get bikes in a city](#get-bikes-in-a-city)
  - [Error and Response Codes](#error-and-response-codes)
- [Invoices](#invoices)
  - [Get all invoices](#get-all-invoices)
  - [Get invoice by ID](#get-invoice-by-id)
  - [Get all invoices for a user](#get-all-invoices-for-a-user)
  - [Create a new invoice](#create-a-new-invoice)
  - [Mark an invoice as paid](#mark-an-invoice-as-paid)
  - [Error and Response Codes](#error-and-response-codes)
- [Settings](#settings)
  - [Get settings](#get-settings)
  - [Update settings](#update-settings)
  - [Reset settings to defaults](#reset-settings-to-defaults)
  - [Error and Response Codes](#error-and-response-codes)
- [Stations](#stations)
  - [Get all charging stations](#get-all-charging-stations)
  - [Get charging station by ID](#get-charging-station-by-id)
  - [Delete a charging station](#delete-a-charging-station)
  - [Get bikes at a charging station](#get-bikes-at-a-charging-station)
  - [Error and Response Codes](#error-and-response-codes)
- [Trips](#trips)
  - [Get all trips](#get-all-trips)
  - [Get trip by ID](#get-trip-by-id)
  - [Get trips by user ID](#get-trips-by-user-id)
  - [Get trips by bike ID](#get-trips-by-bike-id)
  - [Start a new trip](#start-a-new-trip)
  - [End a trip](#end-a-trip)
  - [Error and Response Codes](#error-and-response-codes)

---

## Bike Endpoints

### Overview
The API handles bike-related operations, including creating, updating, retrieving, and deleting bikes.

- **Default values**:
  - **`battery_level`**: Default is `100` (fully charged battery).
  - **`status`**: Default is `"available"`, meaning the bike is ready for use.
  - **`location.coordinates`**: Default is `[0, 0]`, indicating an unknown location.

---

### Get all bikes
**Endpoint**: `GET /api/bike`  
Fetches all bikes in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/bike`  
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
**Endpoint**: `GET /api/bike/:id`  
Fetches a specific bike by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/bike/:id`  
- **Path Parameter**: `id` (The ID of the bike)  

---

### Add a new bike
**Endpoint**: `POST /api/bike`  
Adds a new bike. If no `location` is provided, defaults to `[0, 0]`.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5001/api/bike`  
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
**Endpoint**: `PUT /api/bike/:id`  
Updates a specific bike by its ID.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5001/api/bike/:id`  
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
**Endpoint**: `DELETE /api/bike/:id`  
Deletes a specific bike by its ID.

#### Testing with Postman
- **Method**: DELETE  
- **URL**: `http://localhost:5001/api/bike/:id`  
- **Path Parameter**: `id` (The ID of the bike)  

---

### Error and Response Codes

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
**Endpoint**: `GET /api/city`  
Fetches all cities in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/city`  
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
**Endpoint**: `GET /api/city/:query`  
Fetches a specific city by its ID or name.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/city/:query`  
- **Path Parameter**: `query` (City ID as a number or city name as a string)  

---

### Get bikes in a city
**Endpoint**: `GET /api/city/:id/bikes`  
Fetches all bikes within a specific city's boundaries.

#### Dependencies
This endpoint leverages the `geoService` and `geoData` modules to handle geographical operations. These modules provide the following functionalities:
- **Validation**: Ensures the city ID is valid using `geoService.validateId`.
- **Data Retrieval**: Fetches bikes within the specified city boundary using `geoData.getBikesInCity` and `geoData.getBikesWithinArea`.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/city/:id/bikes`  
- **Path Parameter**: `id` (The ID of the city)  

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

**Error**
```json
{
    "error": "City with ID 1 not found."
}
```

---

### Error and Response Codes

| HTTP Status | Layer        | Message/Description                                         | Notes                                                  |
|-------------|--------------|------------------------------------------------------------|--------------------------------------------------------|
| 200         | HTTP         | `Success`                                                 | Returned when a GET request succeeds.                 |
| 400         | Service      | `Validation error: City boundary is not defined`          | Triggered when a city lacks a defined boundary.        |
| 404         | HTTP         | `City with ID {id} not found.`                             | Triggered when a city with the specified ID does not exist. |
| 404         | HTTP         | `City not found.`                                          | Triggered when no city matches the given query.        |
| 404         | HTTP         | `No bikes found in city with ID {id}`                     | Triggered when no bikes are located within the city boundary. |
| 500         | Data         | `Error fetching cities: {error}`                          | Generic server error for fetching data.                |
| 500         | Data         | `Error fetching bikes within area: {error}`               | Generic server error for geographical data fetching.   |

#### Notes

- The **`geoService.isPointWithinGeometry`** method is used internally by `geoData` to check if a bike's location falls within the specified city's boundary.
- The **`geoService.validateId`** method ensures that the provided city ID is not empty, malformed, or invalid.

## Invoice Endpoints

### Overview
The API manages invoice-related operations, including creating, updating, retrieving invoices, and marking them as paid.

- **Default values**:
  - **`billing_date`**: Automatically set to the current date at the time of invoice creation.
  - **`status`**: Defaults to `"unpaid"`, indicating that the invoice has not been settled.
  - **`payment_method`**: Defaults to `null`, updated when the invoice is marked as paid.

---

### Get all invoices
**Endpoint**: `GET /api/invoice`  
Fetches all invoices in the system.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/invoice`  
- **Body**: None  

---

### Get invoice by ID
**Endpoint**: `GET /api/invoice/:invoiceId`  
Fetches a specific invoice by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5001/api/invoice/:invoiceId`  
- **Path Parameter**: `invoiceId` (The ID of the invoice)  

---

### Get all invoices for a user
**Endpoint**: `GET /api/invoice/user/:userId`  
Fetches all invoices associated with a specific user.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/invoice/user/:userId`  
- **Path Parameter**: `userId` (The ID of the user)  

---

### Create a new invoice
**Endpoint**: `POST /api/invoice/create`  
Creates a new invoice for a completed trip.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5000/api/invoice/create`  
- **Body (JSON)**:
```json
{
    "tripId": 123,
    "userId": 456
}
```

---

### Mark an invoice as paid
**Endpoint**: `PUT /api/invoice/pay/:invoiceId`  
Marks a specific invoice as paid and updates the payment method.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5000/api/invoice/pay/:invoiceId`  
- **Path Parameter**: `invoiceId` (The ID of the invoice)  
- **Body (JSON)**:
```json
{
    "paymentMethod": "prepaid"
}
```

---

### Error and Response Codes

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
**Endpoint**: `GET /api/setting`  
Fetches the current application settings.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/setting`  
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
- **URL**: `http://localhost:5000/api/setting`  
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
**Endpoint**: `PUT /api/setting/reset`  
Resets the application settings to default values.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5000/api/setting/reset`  
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

### Error and Response Codes

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
- **URL**: `http://localhost:5000/api/station`  
- **Body**: None  

---

### Get charging station by ID
**Endpoint**: `GET /api/station/:id`  
Fetches a specific charging station by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/station/:id`  
- **Path Parameter**: `id` (The ID of the charging station)  

---

### Delete a charging station
**Endpoint**: `DELETE /api/station/:id`  
Deletes a specific charging station by its ID.

#### Testing with Postman
- **Method**: DELETE  
- **URL**: `http://localhost:5000/api/station/:id`  
- **Path Parameter**: `id` (The ID of the charging station)  

---

### Get bikes at a charging station
**Endpoint**: `GET /api/station/:id/bikes`  
Fetches all bikes located at a specific charging station.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/station/:id/bikes`  
- **Path Parameter**: `id` (The ID of the charging station)  

#### Dependencies
This endpoint uses the **`geoService`** module for geographical operations:
- **Validation**: Ensures the `charging_station_id` is valid.
- **Data Retrieval**: Fetches bikes located at the specified charging station using `geoService.getBikesInChargingStation`.

---

### Error and Response Codes

| HTTP Status | Layer        | Message/Description                                      | Notes                                                   |
|-------------|--------------|---------------------------------------------------------|---------------------------------------------------------|
| 200         | HTTP         | `Success`                                               | Returned when a GET or DELETE request succeeds.         |
| 400         | Service      | `Validation error: Invalid charging station ID`         | Triggered when the `charging_station_id` is invalid.    |
| 404         | HTTP         | `Charging station with ID {id} not found.`              | Triggered when no station matches the given ID.         |
| 404         | HTTP         | `No bikes found at charging station with ID {id}.`     | Triggered when no bikes are located at the station.     |
| 500         | Data         | `Error fetching charging stations: {error}`            | Generic server error for charging station data.         |
| 500         | Data         | `Error fetching bikes at charging station: {error}`    | Generic server error for retrieving bikes at a station. |

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
- **URL**: `http://localhost:5000/api/trip`  
- **Body**: None  

---

### Get trip by ID
**Endpoint**: `GET /api/trip/:tripId`  
Fetches a specific trip by its ID.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/trip/:tripId`  
- **Path Parameter**: `tripId` (The ID of the trip)  

---

### Get trips by user ID
**Endpoint**: `GET /api/trip/user/:userId`  
Fetches all trips associated with a specific user.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/trip/user/:userId`  
- **Path Parameter**: `userId` (The ID of the user)  

---

### Get trips by bike ID
**Endpoint**: `GET /api/trip/bike/:bikeId`  
Fetches all trips associated with a specific bike.

#### Testing with Postman
- **Method**: GET  
- **URL**: `http://localhost:5000/api/trip/bike/:bikeId`  
- **Path Parameter**: `bikeId` (The ID of the bike)  

---

### Start a new trip
**Endpoint**: `POST /api/trip/start`  
Starts a new trip for a specific user and bike.

#### Testing with Postman
- **Method**: POST  
- **URL**: `http://localhost:5000/api/trip/start`  
- **Body (JSON)**:
```json
{
    "user_id": 1,
    "bike_id": 1
}
```

---

### End a trip
**Endpoint**: `PUT /api/trip/end/:tripId`  
Ends a trip and calculates its duration and cost.

#### Testing with Postman
- **Method**: PUT  
- **URL**: `http://localhost:5000/api/trip/end/:tripId`  
- **Path Parameter**: `tripId` (The ID of the trip)  

---

### Error and Response Codes

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

