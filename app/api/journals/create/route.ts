import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import getFirebaseAuth from "@/lib/firebase/admin"
import Journal from "@/lib/mongoose/models/Journal";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        
        const authHeader = req.headers.get("Authorization");
        const idToken = authHeader?.replace("Bearer ", "");
        const decodedToken = await getFirebaseAuth().verifyIdToken(idToken)
        const uid = decodedToken.uid;
        const id = uuidv4();

        const data = await req.json()

        const newJournal = new Journal({id, uid, ...data})
        await newJournal.save()
    
        return NextResponse.json({ id }, {status: 201})
    } catch (e) {
        return NextResponse.json({ error: "An error occurred trying to create account" }, { status: 500 })
    }
}