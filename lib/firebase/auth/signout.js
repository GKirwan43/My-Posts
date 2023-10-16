import auth from "../config";

export default async function signOut() {
    auth.signOut().then(() => {
        return;
    }).catch((error) => {
        console.log(error);
    })
}