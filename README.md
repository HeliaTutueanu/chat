# Chat Application

## Description
This mobile application is designed for seamless communication on-the-go, built using React Native. Users can engage in conversations, share multimedia content, and exchange locations effortlessly.

## Dependencies 
* **React Native**: A framework for developing mobile applications using JavaScript and React
* **Expo**: A development platform for building React Native applications
* **GiftedChat**: A library that provides an intuitive chat interface for React Native applications
* **Google Firebase**: A cloud-based platform offering various services, including Firestore for real-time database and authentication
* **AsyncStorage**: A local storage system in React Native for caching and persisting data
* **Expo ImagePicker**: An Expo API for accessing the device's image picker to choose images from the gallery
* **Expo MediaLibrary**: An Expo API for accessing and managing media assets on the device
* **Expo Location**: An Expo API for obtaining location information from a device
* **react-native-maps**: React Native Map components for iOS + Android
* **MapView**: A specific component from the react-native-maps library used to display maps in React Native applications

## Features
* Users can enter their name and choose a background color for the chat screen before joining the chat
* Send and receive messages
* Send and receive images (from media library or device's camera)
* Send and receive locations
* Record, send, and receive audio
* Users can view previous messages when offline

## Set up this Application
* Clone this repository
* Navigate to the chat-app folder and run `npm install`
* Set up Firebase for your project:
    - Sign in to Google Firebase
    - Create a project
    - Set up Firestore Database (production mode)
    - Adjust rules from `allow read, write: if false;` to `allow read, write: if true;`
    - Register the app in Project Overview
    - Navigate to the chat-app folder and install Firebase using `npm install firebase`
    - Initialize Firebase by copying and pasting the provided Firebase configuration into the App.js
* Download Android Studio on your computer or use the Expo Go App on your mobile device
* Run `npx expo start`
* Open Android Studio or Expo Go App and select the Chat App

<!-- To re-deploy, run: npx expo start -->