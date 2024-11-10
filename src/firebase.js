import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "add_your_credentilas",
  authDomain: "Add_your_credentials",
  projectId: "Add_your_credentials1",
  storageBucket: "Add_your_credentials",
  messagingSenderId: "Add_your_credentials",
  appId: "add_your_credetnials",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      createdAt: new Date(),
    });
    toast.success("Account created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error(error.message);
  }
};

const logout = () => {
  signOut(auth);
  toast.info("Logged out successfully!");
};

export { auth, db, login, signup, logout };
