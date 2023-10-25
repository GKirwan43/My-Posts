import auth from "@/lib/firebase/config";
import { showErrorNotification, showSuccessNotification } from "@/lib/mantine/notifications";

export const updateUser = async (updatedUser: Object) => {
  try {
    const user = await auth.currentUser;
    const idToken = await user?.getIdToken(true);
    
    const res = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(updatedUser)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    showSuccessNotification({ message: `Settings have been updated.` });

    return data;
  } catch (e: any) {
    showErrorNotification({ message: "Settings could not be updated." });

    return { error: e.message };
  }
};
