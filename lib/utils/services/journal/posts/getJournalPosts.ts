import auth from "@/lib/firebase/config";

export const getJournalPosts = async (journalId: string) => {
  try {
    const user = await auth.currentUser;
    const idToken = await user?.getIdToken(true);

    const res = await fetch(`/api/journals/posts?journalId=${journalId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data;
  } catch (e: any) {
    return [];
  }
};
