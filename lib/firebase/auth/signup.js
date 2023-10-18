import auth from "../config";
import { createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

export default async function signUp(username, email, password) {
    try {
        // Create user id
        const uid = uuidv4()

        // Check if user exists already
        const getResponse = await fetch(`/api/users?username=${username}&email=${email}&uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        // If response not ok, throw error
        if (!getResponse.ok) {
            throw new Error("Could not fetch users.")
        }

        const getData = await getResponse.json()

        // Return errors from database
        if (getData !== null) {
            let errors = {}

            if (getData.uid === uid) {
                throw new Error("Username ID already exists")
            }
            if (getData.username === username) {
                errors = {...errors, username: "Username already exists."}
            }
            if (getData.email === email) {
                errors = {...errors, email: "Email already exists."}
            }

            return { errors, error: null };
        }

        // Create user in database
        const postResponse = await fetch('/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "create",
                username,
                email,
                uid
            })
        })

        if (!postResponse.ok) {
            throw new Error("Could not create account")
        }

        // Create user in firebase auth
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: username});
        } catch (e) {
            await fetch('/api/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "delete",
                    uid
                })
            })
            throw new Error("Could not create account")
        }

        return { errors: null, error: null}
    } catch (e) {
        return { errors: null, error: e }
    }
}