import signUpWithFirebaseAuth from "@/lib/firebase/auth/signup"

export default async function signUp(username: string, email: string, password: string) {
    try {
        // Call API endpoint to create user on database
        const res = await fetch('/api/users/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
            })
        })

        // Read data from response
        const data = await res.json()

        // If response is not ok or response status is not 400, throw error
        if (!res.ok && res.status !== 400) {
            throw new Error("Could not create account.")
        }
        
        // If response status is 400, then return error messages
        if (res.status === 400) {
            return { errorMessages: data.errorMessages }
        }

        // Create account with firebase
        await signUpWithFirebaseAuth(data.token, password)

        return
    } catch (e: any) {
        return { error: e.message }
    }
}