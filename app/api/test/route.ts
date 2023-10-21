import User from "@/lib/mongoose/models/User";
import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";
import getFirebaseAuth from "@/lib/firebase/admin"

export const GET = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get("Authorization");
        const idToken = authHeader?.replace("Bearer ", "");
        const decodedToken = await getFirebaseAuth().verifyIdToken(idToken)

        return NextResponse.json({ username: decodedToken.name });
    } catch (e) {
        return NextResponse.json(e, {status: 500});
    }
}