import auth from "@/lib/firebase/config"

export const createJournal = async (title: string, description: string) => {
    try {
        const idToken = await auth.currentUser?.getIdToken(true);

        const res = await fetch("/api/journals/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            },
            body: JSON.stringify({
                title,
                description
            })
        })

        const data = await res.json()
    } catch (e) {
        console.log(e);
    }   
}