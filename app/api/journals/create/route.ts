import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import getFirebaseAuth from "@/lib/firebase/admin"
import Journal from "@/lib/mongoose/models/Journal";
import { generateUniqueNumericId } from "@/lib/utils/idUtils"
import { getUser } from "@/lib/utils/middleware";

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        
        const user = await getUser(req);

        const uid = user.uid;
        const postid = generateUniqueNumericId();
        const data = await req.json()
        const newJournal = new Journal({id: postid, uid, ...data})

        await newJournal.save()
    
        return NextResponse.json({ postid }, {status: 201})
    } catch (e: any) {
        return NextResponse.json({ error: "Could not create journal in database." }, { status: 500 })
    }
}