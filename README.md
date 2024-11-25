PeerLearning Project
Description
The PeerLearning project is an application designed for peer learning and networking. It allows users to join various study groups, access courses, interact with mentors, and participate in discussions. The project is built using React Native and Firebase for real-time data syncing.

Features
User Authentication: Users can log in and manage their profiles.
Group Chat: Users can join different groups and participate in group chats.
Mentor Interaction: Users can access course information and connect with mentors.
Real-time Messaging: Messages are updated in real-time using Firebase Firestore.
Table of Contents
Installation
Usage
Technologies
Firebase Setup
File Structure
Contact
Installation
Prerequisites
Before you begin, make sure you have the following software installed on your computer:

Node.js (preferably the latest stable version)
Yarn (if you don't have Yarn, you can install it from here)
React Native CLI: Install React Native globally with:
bash
Copy code
npm install -g react-native-cli
Firebase Account: Set up a Firebase project and get your configuration details.
Step-by-Step Setup
Clone the Repository:

Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/peerlearning.git
cd peerlearning
Install Dependencies:

After cloning the project, install the required dependencies:

bash
Copy code
yarn install
Firebase Configuration:

Create a Firebase project (if you don’t have one) and copy the Firebase configuration details.

Then, replace the Firebase config values in the firebase.js file with your own credentials:

js
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
Run the Project:

For iOS:

bash
Copy code
npx react-native run-ios
For Android:

bash
Copy code
npx react-native run-android
This should start the app on your emulator or physical device.

Usage
Sign Up / Log In:

Users can register by providing their credentials and logging into the application.
Explore Groups and Courses:

After logging in, users can browse and join different study groups.
Users can access course overviews, messages, and interact with mentors.
Real-Time Messaging:

All messages are sent in real-time and are stored in Firebase Firestore.
Technologies
React Native: Framework for building native apps using React.
Firebase: Backend platform for authentication, real-time database, and hosting.
Firestore: NoSQL database used for real-time data sync in the app.
React Navigation: For handling app navigation.
React Hook Form: To manage form data efficiently.
Firebase Setup
To set up Firebase for your project:

Go to the Firebase Console.
Create a new Firebase project.
Enable Firebase Authentication and Firestore.
Get your Firebase project's credentials and replace them in the firebase.js configuration file as mentioned in the "Firebase Configuration" section above.
File Structure
Here is a brief overview of the main files and directories in the project:

App.js: The main entry point for the application.
firebase.js: Contains Firebase configuration and initialization.
src/: The source folder where most of the app’s logic and UI components reside.
components/: Reusable UI components.
contexts/: Contains context providers (e.g., for authentication).
screens/: The screens that are shown in the app.
styles/: Styling files for the app.
