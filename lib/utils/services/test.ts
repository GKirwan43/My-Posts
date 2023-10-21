import auth from "@/lib/firebase/config"

export const test = async () => {
    try {
        const idToken = await auth.currentUser?.getIdToken(true);

        const res = await fetch("/api/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            },
        })

        const data = await res.json()

        console.log(data.username)
    } catch (e) {
        console.log(e);
    }   
}