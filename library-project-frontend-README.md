# Library Project Frontend Documentation

## Overview

This project is the frontend of a library management system, built using **React Native** and **Expo** with **TypeScript**. It utilizes **Tailwind CSS** (via NativeWind) for styling and **React Navigation** for screen navigation. The project is integrated with a backend API to manage resources like books, authors, and genres.

---

## Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js** (v20+)
- **NPM** (Node Package Manager)
- **Expo CLI** (for running the React Native app)

---

## Project Structure

- **Root Files**:

  - **`app.json`**: Contains configuration for the Expo project (app name, version, etc.).
  - **`package.json`**: Defines the project dependencies and scripts.
  - **`.env`**: Contains environment variables (e.g., API base URLs).
  - **`tsconfig.json`**: Configures TypeScript options.
  - **`tailwind.config.js`**: Tailwind CSS configuration for customizing the design system.
  - **`babel.config.js`**: Babel configuration for transpiling ES6+ code.
  - **`metro.config.js`**: Metro bundler configuration for React Native.

- **Key Directories**:
  - **`app/`**: Contains the main application screens (e.g., `AddBookScreen`, `HomeScreen`).
  - **`components/`**: Houses reusable UI components (atoms, molecules, etc.).
  - **`context/`**: Implements global state management using React's Context API.
  - **`navigation/`**: Defines the navigation structure, integrating React Navigation for handling screens and stack navigators.
  - **`api/`**: Contains API service functions to interact with the backend.
  - **`assets/`**: Stores images, fonts, and other static assets.
  - **`types/`**: TypeScript definitions for props, navigation types, etc.
  - **`helpers/`**: Utility/helper functions that can be reused across the project.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/library-project-frontend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Copy the `.env.example` file to `.env` and update the values as necessary.

   ```bash
   cp .env.example .env
   ```

4. Make sure you have Expo CLI installed globally:
   ```bash
   npm install -g expo-cli
   ```

---

## Running the Application

1. To start the development server:

   ```bash
   npm run start
   ```

2. Scan the QR code using the Expo Go app on your mobile device to run the app. Alternatively, you can use an Android/iOS emulator.

---

## Navigation

The project uses **React Navigation** to manage app navigation. All screen navigators are set up in the `navigation/` directory. For dynamic and type-safe navigation, TypeScript is integrated to handle navigation types, ensuring proper typing for route params.

---

## Styling

This project uses **Tailwind CSS** for styling, integrated via NativeWind. The configuration file `tailwind.config.js` allows you to extend the default Tailwind styles with custom colors, fonts, and design tokens as needed.

---

## API Integration

The frontend communicates with the backend API using functions defined in the `api/` directory. These functions handle all API requests (e.g., fetching books, authors, and genres). API base URLs and other environment-specific configurations are stored in the `.env` file.

---

## Global State

Global state management is handled using React's **Context API**. The `context/` directory contains the context providers and hooks for managing authentication and other global data across the application.

---

## Scripts

- **`npm run start`**: Starts the Expo development server.
- **`npm run android`**: Runs the app on an Android emulator/device.
- **`npm run ios`**: Runs the app on an iOS emulator/device (MacOS only).

---
