# Task Management App

## Short Description
Task Management App is a web-based application that allows users to efficiently manage their daily tasks. With features like adding, updating, deleting, and marking tasks as complete, it helps users stay organized. The app is easy to use and works seamlessly across devices.

## Live Links
- [Live App](https://task-managments.web.app)
- [Backend API](https://task-management-server-three-flax.vercel.app)

## Dependencies
This project has the following dependencies:
- **React** - A JavaScript library for building user interfaces.
- **React Router DOM** - For handling routing in the application.
- **Firebase** - For authentication and real-time database storage.
- **Material-UI** - A library of React components for faster and easier UI development.
- **Axios** - For making HTTP requests.
- **Express** - A web application framework for Node.js.
- **MongoDB** - A NoSQL database for storing task data.

## Installation Steps

Follow these steps to set up the project locally:

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/safin33221/task-management.git
cd task-management
```

### 2. Install dependencies

Navigate to both the client and server directories and install the dependencies:

```bash
cd Task-Managements-client
npm install

cd ../task-management-server
npm install
```

### 3. Set up Firebase

To use Firebase for authentication and storing task data, follow these steps:

1. Go to [Firebase Console](https://console.firebase.google.com/), and create a new Firebase project.
2. Once the project is created, navigate to the "Authentication" section and enable the **email/password sign-in method**.
3. Go to the "Firestore Database" section and create a Firestore database.
4. Get the Firebase configuration by navigating to your Firebase project settings.
5. Add the Firebase configuration details to your project (either in the `.env` file or directly in a `firebaseConfig.js` file).

### 4. Set up MongoDB

1. Create a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Get the connection string and add it to your `.env` file in the server directory.

### 5. Run the development server

Start the client and server:

```bash
# In the client directory
npm run dev

# In the server directory
npm start
```

## Technologies Used
- **React** - For building the user interface.
- **React Router DOM** - For routing.
- **Firebase** - For authentication and real-time database.
- **Material-UI** - For UI components.
- **Axios** - For HTTP requests.
- **Express** - For the backend server.
- **MongoDB** - For the database.



