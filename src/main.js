import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPAS_v8b0DJ6EhQMIBPW4Njvfn32EeE5U",
  authDomain: "prestamoespacios.firebaseapp.com",
  projectId: "prestamoespacios",
  storageBucket: "prestamoespacios.appspot.com",
  messagingSenderId: "615895275319",
  appId: "1:615895275319:web:553574e2c7a1110a76acb2",
  measurementId: "G-N9GYFXELK6"
};

// Initialize Firebase
//project-615895275319
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {size: 'small', zIndex: 3000} )

app.mount('#app')
