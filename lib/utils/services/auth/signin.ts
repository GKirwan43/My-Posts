import signInWithFirebaseAuth from "@/lib/firebase/auth/signin"

export default async function signIn(usernameOrEmail: string, password: string) {
    try {
        let email = usernameOrEmail

        // Call API endpoint to get email from username
        const res = await fetch(`/api/users?username=${usernameOrEmail}&email=${usernameOrEmail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        // If response is not ok, throw error
        if (!res.ok && res.status !== 400) {
            throw new Error("Could not log in")
        }

        if (res.status === 400) {
            return { errorMessages: { password: "Username or password incorrect"} }
        }

        // Read data from response
        const data = await res.json()

        // If user exists, set email to email in database
        if (data) {
            email = data.email
        }

        // Log in to account with firebase
        try {
            await signInWithFirebaseAuth(email, password)
        } catch (e: any) {
            if (e.code === "auth/invalid-login-credentials") {
                return { errorMessages: { password: "Username or password incorrect"} }
            } else if (e.code === "auth/too-many-requests") {
                return { errorMessages: { password: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."} }
            }
        }

        return
    } catch (e) {
        return { error: e }
    }
}