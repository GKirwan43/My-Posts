import { NextRequest } from "next/server";
import getFirebaseAuth from "../firebase/admin";

export const getUser = async (req: NextRequest) => {
    const authHeader = req.headers.get("Authorization");
    const idToken = authHeader?.replace("Bearer ", "");
    
    try {
        return await getFirebaseAuth().verifyIdToken(idToken as string)
    } catch (e) {
        throw new Error("Invalid ID Token.")
    }
}