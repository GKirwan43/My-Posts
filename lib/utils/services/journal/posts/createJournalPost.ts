import auth from "@/lib/firebase/config"
import { showErrorNotification, showSuccessNotification } from "@/lib/mantine/notifications";

export const createJournalPost = async (journalId: string, title: string, post: string) => {
    try {
        const idToken = await auth.currentUser?.getIdToken(true);

        const res = await fetch("/api/journals/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            },
            body: JSON.stringify({
                journalId,
                title,
                post,
            })
        })

        const data = await res.json()


        if (!res.ok) { 
            throw new Error(data.error)
        }

        showSuccessNotification({ message: `Journal post "${title}" has been created.` });

        return data
    } catch (e: any) {
        showErrorNotification({ message: e.message });
        
        return { error: e.message };
    }   
}