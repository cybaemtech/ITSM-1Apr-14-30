# Cybaem ITSM — Mobile App (Expo WebView)

Wraps **https://itsm.cybaemtech.app** in a native Android + iOS shell.

---

## One-time Setup (do this first)

### 1. Install Node.js and Expo CLI

```bash
npm install -g eas-cli
```

### 2. Create a free Expo account

Go to https://expo.dev → Sign Up (free)

### 3. Log in from your terminal

```bash
eas login
```

### 4. Install project dependencies

```bash
cd mobile-app
npm install
```

### 5. Link the project to your Expo account

```bash
eas init
```
This auto-fills `projectId` and `owner` in `app.json`. Accept all defaults.

---

## Test on Your Phone (no build needed)

```bash
npx expo start
```
Scan the QR code with the **Expo Go** app (free on Play Store / App Store).

---

## Build for Android (Google Play Store)

Produces an `.aab` file for Play Store upload:

```bash
eas build --platform android --profile production
```

- No Android Studio needed — built in Expo's cloud
- Download the `.aab` from expo.dev when done
- Upload to [Google Play Console](https://play.google.com/console) → Internal Testing → Production

---

## Build for iOS (Apple App Store)

Produces an `.ipa` file for App Store upload:

```bash
eas build --platform ios --profile production
```

**Requirements:**
- Apple Developer account ($99/year) at https://developer.apple.com
- EAS will guide you through certificates and provisioning profiles automatically

---

## Build Both at Once

```bash
eas build --platform all --profile production
```

---

## Submit Directly to Stores

After a successful production build:

```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

---

## App Configuration

| Field | Value |
|---|---|
| App Name | ITSM Portal |
| Android Package | com.cybaemtech.itsm |
| iOS Bundle ID | com.cybaemtech.itsm |
| Target URL | https://itsm.cybaemtech.app |
| Theme Color | #1e40af |

---

## Features Built In

- Loads your deployed web app in a full-screen native WebView
- Android back-button support (navigates back in web history, exit prompt)
- Offline detection with friendly error screen
- Pull-to-refresh
- Splash screen with brand blue background
- Camera and file access permissions
