# Edificio Management API

A comprehensive solution for managing apartment buildings.

## Introduction

The **Edificio Management API** provides a robust set of tools for tenants and administrators to efficiently manage apartment buildings. With features tailored to streamline common administrative and tenant-related tasks, this API simplifies managing expenses, booking shared facilities, and organizing building operations.

---


## Features

### Tenant Functionality
- **Reserve Common Spaces**: Book shared facilities within the building.
- **View Expenses**: Access and review individual expenses.

### Administrator Functionality
- **Create New Departments**: Establish new departments for onboarding tenants.
- **Manage Building Expenses**: Oversee and manage overall building expenses.
- **View Reserved Common Spaces**: Monitor the booking status of common spaces.

---

## Endpoints

### Department Controller
- **`POST /departments`**: Create a new department.
- **`GET /departments`**: List all departments.
- **`GET /departments/{id}`**: Retrieve a specific department.
- **`PUT /departments/{id}`**: Update a department.
- **`DELETE /departments/{id}`**: Delete a department.

### Expense Controller
- **`POST /expenses`**: Create a new expense.
- **`GET /expenses`**: List all expenses.
- **`GET /expenses/{id}`**: Retrieve a specific expense.
- **`PUT /expenses/{id}`**: Update an expense.
- **`DELETE /expenses/{id}`**: Delete an expense.

### Space Controller
- **`POST /spaces/reserve`**: Reserve a common space.
- **`GET /spaces/reserved`**: View all reserved spaces.
- **`GET /spaces/available`**: List available common spaces.

### Tenant Controller
- **`GET /tenants`**: List all tenants.
- **`GET /tenants/{id}`**: Retrieve a specific tenant.
- **`PUT /tenants/{id}`**: Update a tenant's information.

### Administrator Controller
- **`POST /administrators`**: Create a new administrator.
- **`GET /administrators`**: List all administrators.
- **`GET /administrators/{id}`**: Retrieve a specific administrator.
- **`PUT /administrators/{id}`**: Update an administrator's information.

---

## Authentication and Authorization

This API employs **JWT-based authentication** to ensure secure access:
- **Tenants**: Limited access to their own data and functionality related to their roles.
- **Administrators**: Full access to manage all building operations and data.

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/GadStam/MiEdficio_Backend.git

    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the required environment variables:
      ```env
      DATABASE_URL=your_database_url
      JWT_SECRET=your_jwt_secret
      PORT=your_port_number
      ```

4. Start the server:
    ```bash
    npm start
    ```



## Configuration

Key configuration options include:
- Database connection settings
- JWT secret key for token generation.
- Port for server deployment.

Modify these in the `.env` file or as environment variables during runtime.

---

## Dependencies

- **Node.js** (>= 14.x)
- **Express.js**: Web framework for Node.js.
- **jsonwebtoken**: For authentication using JWT.
- **Database ORM** (e.g., Sequelize or Mongoose, depending on your setup).

---


    "space_id": 123,
    "date": "2024-12-01"
}
