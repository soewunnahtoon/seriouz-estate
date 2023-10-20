import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "seriouz-estate.firebaseapp.com",
  projectId: "seriouz-estate",
  storageBucket: "seriouz-estate.appspot.com",
  messagingSenderId: "884222470014",
  appId: "1:884222470014:web:d48eacf357de7ad1deb52f",
};

const app = initializeApp(firebaseConfig);

export { app };
