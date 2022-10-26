import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCNMLzz75yQeN9ZGdBF0UtCOtQ8BhGhTj4",
	authDomain: "churchill-field-booker.firebaseapp.com",
	projectId: "churchill-field-booker",
	storageBucket: "churchill-field-booker.appspot.com",
	messagingSenderId: "757407358341",
	appId: "1:757407358341:web:5e44a898ce11e4481938ec",
	measurementId: "G-Z0HWMX3D0V",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp 