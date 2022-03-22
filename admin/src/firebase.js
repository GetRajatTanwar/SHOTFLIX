import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDHzKo9TsY-AxB5U8PtNKcCtI4SKBvp0hI",
    authDomain: "shortflix-80fe9.firebaseapp.com",
    projectId: "shortflix-80fe9",
    storageBucket: "shortflix-80fe9.appspot.com",
    messagingSenderId: "479052728679",
    appId: "1:479052728679:web:aee1a982d48e3cb48407c2",
    measurementId: "G-6J3RGNNMV7"
  };

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export default storage