# Service Request Management Backend

This is the backend for the Service Request Management application. It's a Node.js and Express application that provides a REST API to manage service requests. It uses MongoDB as its database to persist data.

## Features

- Create, read, update, and delete service requests.
- Get all service requests.
- Update the status of a service request (`pending`, `viewed`, `processed`).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.x or later recommended)
- npm or yarn
- A running MongoDB instance (local or cloud-hosted like MongoDB Atlas).

## Installation

1.  Navigate to the `Backend` directory from the project root:
    ```bash
    cd Backend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the `Backend` directory and add the following variables. A `.env.example` file can be used as a reference.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

-   `PORT`: The port on which the server will run. It defaults to 4000 if not specified.
-   `MONGO_URI`: Your MongoDB connection string. For a local instance, this might look like `mongodb://localhost:27017/service-requests-db`.

## Running the Application

To start the development server, run the following command from the `Backend` directory:

```bash
npm start
```

This will start the server, and it will typically run on `http://localhost:4000`. The server also supports hot-reloading with `nodemon` if you have it installed.

## API Endpoints

All endpoints are prefixed with `/api/request`.

| Method   | Endpoint          | Description                                  |
| :------- | :---------------- | :------------------------------------------- |
| `POST`   | `/send-request`   | Creates a new service request.               |
| `GET`    | `/`               | Retrieves all service requests.              |
| `GET`    | `/:id`            | Retrieves a single service request by its MongoDB `_id`. |
| `PUT`    | `/:ids`           | Updates the status of a service request by its custom `ids` field. |
| `DELETE` | `/:id`            | Deletes a service request by its MongoDB `_id`. |

---

### `POST /send-request`

Creates a new service request.

**Request Body:**
```json
{
  "ids": "string",
  "user_name": "string",
  "email": "string",
  "services": "Array<Object>",
  "total": "number",
  "currency": "string"
}
```

### `PUT /:ids`

Updates the status of a service request using its unique custom `ids` field.

**Request Body:**
```json
{
  "status": "viewed" | "processed"
}
```