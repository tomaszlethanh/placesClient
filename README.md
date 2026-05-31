# Places+ Client

A cross-platform mobile application for discovering and reviewing food places, built with React Native and Expo. Developed as part of a university dissertation.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend API](#backend-api)
- [Project Structure](#project-structure)

---

## Overview

Places+ is a mobile app that lets users discover restaurants and other food spots, leave reviews, and search for places nearby. It communicates with the [Places Backend](https://github.com/tomaszlethanh/placesBackend) REST API and uses Firebase for authentication. Maps are powered by Google Maps on both iOS and Android.

## Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript |
| Framework | React Native 0.72 + Expo 49 |
| Navigation | React Navigation v6 (Stack + Bottom Tabs) |
| Data Fetching | TanStack React Query v4 + Axios |
| Forms | React Hook Form + Zod |
| UI Library | React Native Paper v5 |
| Maps | React Native Maps + Google Places Autocomplete |
| Authentication | Firebase 10 |
| Storage | AsyncStorage |
| Performance | Shopify FlashList |
| Linting / Formatting | ESLint (universe config) + Prettier |
| API Types | openapi-typescript (generated from backend OpenAPI spec) |

## Prerequisites

- Node.js 18+
- Yarn
- Expo CLI (`npm install -g expo`)
- A Firebase project
- A Google Maps API key (with Maps SDK for Android and iOS enabled)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/tomaszlethanh/placesClient.git
   cd placesClient
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root with your keys. See [Environment Variables](#environment-variables) for the full list.

4. **Configure Firebase**

   Update `firebase-config.ts` with your Firebase project credentials (API key, auth domain, project ID, etc.), available from the Firebase Console under **Project Settings → General**.

5. **Start the development server**

   ```bash
   yarn start
   ```

   Then press `i` to open in an iOS simulator, `a` for an Android emulator, or scan the QR code with the Expo Go app.

6. **Run on a specific platform**

   ```bash
   yarn ios      # iOS simulator
   yarn android  # Android emulator
   yarn web      # Web browser
   ```

## Environment Variables

The app reads the following environment variables at build time via Expo's `EXPO_PUBLIC_` prefix convention:

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_MAPS_KEY` | Google Maps API key (used for both iOS and Android map config in `app.config.ts`) |

Create a `.env` file at the project root:

```env
EXPO_PUBLIC_MAPS_KEY=your_google_maps_api_key
```

> The Google Maps API key must have the **Maps SDK for Android**, **Maps SDK for iOS**, and **Places API** enabled in the Google Cloud Console.

## Backend API

This app connects to the [Places Backend](https://github.com/tomaszlethanh/placesBackend) REST API. Make sure the backend is running and accessible before starting the app.

TypeScript types for the API are generated from the backend's OpenAPI spec using `openapi-typescript`. To regenerate them after backend changes:

```bash
yarn generate-types
```

This runs `scripts/generate-types.sh` and updates `schema.d.ts` at the project root.

## Project Structure

```
placesClient/
├── assets/                  # App icons, splash screen, images
├── scripts/                 # Shell scripts (e.g. generate-types.sh)
├── src/                     # Application source code
├── App.tsx                  # App entry point, navigation setup
├── app.config.ts            # Expo app configuration (name, plugins, keys)
├── firebase-config.ts       # Firebase initialisation
├── eas.json                 # EAS Build profiles
├── schema.d.ts              # Auto-generated API types from OpenAPI spec
├── babel.config.js          # Babel config
├── metro.config.js          # Metro bundler config
├── tsconfig.json            # TypeScript config
├── .eslintrc.js             # ESLint config
├── .prettierrc              # Prettier config
└── package.json
```
