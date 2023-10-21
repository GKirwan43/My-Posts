import signOutWithFirebaseAuth from "@/lib/firebase/auth/signout"

export default async function signOut() {
    try {
        // Sign out of account with firebase
        await signOutWithFirebaseAuth()

        return
    } catch (e) {
        return { error: e }
    }
}