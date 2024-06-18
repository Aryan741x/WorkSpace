# WorkSpace: An Expert Platform for Working

Welcome to WorkSpace, a cutting-edge application that integrates MongoDB and Opal to establish a robust Role-Based Access Control (RBAC) system. WorkSpace is a tool that improves workplace efficiency and security by providing managers, senior managers, and employees with customised permissions and seamless task management features.

## Features

- **Opal Integration**: Utilizes Opal client-server architecture for scalable and efficient management of roles and permissions.
 
- **Open Policy Agent (OPA)**: Facilitates fine-grained access control and policy-based decision-making across the application, ensuring compliance and security.

- **Efficient Login Process**:   WorkSpace utilizes Opal's authentication system to verify user credentials securely. Upon entering their credentials, users are authenticated against predefined policies and permissions stored within Opal. 

- **Role-Based Access Control (RBAC)**: Opal facilitates role management by assigning specific permissions to each user based on their role within the organization. This ensures that users only have access to the functionalities relevant to their responsibilities.

- **User-Friendly Interface**: Simple and intuitive web interface.

## Technology Stack

- **REGO**: For writing and managing policies with Open Policy Agent (OPA).
- **Express.js**: A minimalist Node.js framework for building web applications and APIs.
- **Docker**: For containerizing the application, including Opal client and server.
- **MongoDB**: A NoSQL database for storing user credentials, roles, permissions, and other application data.
- **Next.js**: A React-based framework for building the frontend web application.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization, managing sessions across the application.
- **Git**: For storing policies and interacting with Opal for seamless policy updates and version control.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Docker for creating containers.
- Git to pull the forked repo.

### Setup

1. **Clone the Repository**

```bash
git clone https://github.com/Aryan741x/WorkSpace.git
cd WorkSpace
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup .env**
Go to .env file present inside the source directory
```bash
MONGODB_URI = "Put_Your_MongodbURI_Here"
```

### Running the Application

4. **Run Docker**
```bash
docker-compose up
```
5. **Run Backend Server(port:3001)**
```bash
node server.js
```
6. **Deploy the Project**
```bash
npm run dev
```

## Demo Video

[![Watch the video](https://img.youtube.com/vi/uHIlTTT5g5M/maxresdefault.jpg)](https://www.youtube.com/watch?v=uHIlTTT5g5M)

## Acknowledgments

- Special Thanks to SSOC: Grateful for providing a platform to delve deeper into Opal, an incredible open-source software.
- Gratitude to the Permit.io/Opal developers for resources and support. Thank you also for providing the chance to take part in Quine Quest 13.

---

Feel free to dive into the project, explore the code. Happy coding!
