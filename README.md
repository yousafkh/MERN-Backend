
## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd MERN-Backend/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/14) file in the [backend](http://_vscodecontentref_/15) directory with the following content:
    ```env
    MONGO_URI=<mongo-url>/<db_name>
    PORT=<port>
    JWT_SECRET=<jwt_secret>
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Roles

- `POST /api/roles` - Create a new role (Admin only)
- `POST /api/roles/assign` - Assign a role to a user (Admin only)

### Users

- `POST /api/users` - Create a new user with specific roles (Admin only)
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get a user by ID (Admin only)
- `PUT /api/users/update-roles` - Update a user's roles (Admin only)

## License

This project is licensed under the MIT License. See the [LICENSE](http://_vscodecontentref_/16) file for details.
