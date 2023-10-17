import auth from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default async function signUp(username, email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {displayName: username});
    } catch (e) {
        error = e;
    }

    return { result, error };
}