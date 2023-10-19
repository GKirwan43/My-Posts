import auth from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default async function signUpWithFirebaseAuth(username, email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: username })
}