import auth from "@/lib/firebase/config"

export const getJournals = async (id?: string) => {
    try {
        const user = await auth.currentUser;
        const idToken = user?.getIdToken(true);
        const uid = user?.uid;

        const res = await fetch(`/api/journals?id=${id}&uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            }
        })

        if (!res.ok) { 
            throw new Error(res.statusText)
        }

        const data = await res.json()

        return data
    } catch (e: any) {
        return [];
    }   
}