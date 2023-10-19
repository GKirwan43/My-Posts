import auth from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signInWithFirebaseAuth(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}