# Task Management App

## Short Description
Task Management App is a web-based application that allows users to efficiently manage their daily tasks. With features like adding, updating, deleting, and marking tasks as complete, it helps users stay organized. The app is easy to use and works seamlessly across devices.

## Live Link
Check out the live version of the app here:  
[Task Management App](https://task-managments.web.app)

## Dependencies
This project has the following dependencies:
- **React** - A JavaScript library for building user interfaces.
- **React Router DOM** - For handling routing in the application.
- **Firebase** - For authentication and real-time database storage.
- **Material-UI** - A library of React components for faster and easier UI development.
- **Axios** - For making HTTP requests.

## Installation Steps

Follow these steps to set up the project locally:

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/safin33221/task-management.git

````
cd task-management

``

### 4. Set up Firebase

To use Firebase for authentication and storing task data, follow these steps:

1. Go to [Firebase Console](https://console.firebase.google.com/), and create a new Firebase project.
2. Once the project is created, navigate to the "Authentication" section and enable the **email/password sign-in method**.
3. Go to the "Firestore Database" section and create a Firestore database.
4. Get the Firebase configuration by navigating to your Firebase project settings.
5. Add the Firebase configuration details to your project (either in the `.env` file or directly in a `firebaseConfig.js` file).


npm install
``
npm run dev



