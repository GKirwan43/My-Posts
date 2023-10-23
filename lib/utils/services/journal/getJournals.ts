import auth from "@/lib/firebase/config";

export const getJournals = async (id?: string) => {
  try {
    const user = await auth.currentUser;
    const idToken = user?.getIdToken(true);
    const uid = user?.uid;

    let url;

    if (id) {
      url = `/api/journals?id=${id}`;
    } else {
      url = `/api/journals?uid=${uid}`;
    }

    const res = await fetch(url, {
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
