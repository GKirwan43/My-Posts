import auth from "@/lib/firebase/config"
import { showErrorNotification, showSuccessNotification } from "@/lib/mantine/notifications";
import { modals } from "@mantine/modals";

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


        if (!res.ok) { 
            throw new Error(data.error)
        }

        showSuccessNotification({ message: `Journal "${title}" has been created.` });

        modals.close("create_journal");

        return data
    } catch (e: any) {
        showErrorNotification({ message: e.message });

        return;
    }   
}