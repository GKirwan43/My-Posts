import auth from "../config";

export default async function signOut() {
    await auth.signOut();
}