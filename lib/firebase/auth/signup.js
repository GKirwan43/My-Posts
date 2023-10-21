import auth from "../config";
import { signInWithCustomToken, updatePassword } from "firebase/auth";

export default async function signUpWithFirebaseAuth(token, password) {
    await signInWithCustomToken(auth, token);
    await updatePassword(auth.currentUser, password);
}