import auth from "@/lib/firebase/config";

export const getUserData = async () => {
  try {
    const user = await auth.currentUser;
    const idToken = await user?.getIdToken(true);
    
    const res = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (e: any) {
    return { error: e.message };
  }
};
