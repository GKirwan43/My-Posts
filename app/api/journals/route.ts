import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";
import Journal from "@/lib/mongoose/models/Journal";
import getFirebaseAuth from "@/lib/firebase/admin";
import { getUser } from "@/lib/utils/middleware";

export const GET = async (req: NextRequest) => {
    try {
        await connect();

        const user = await getUser(req);

        const params = req.nextUrl.searchParams;
        const id = params.get("id");
        const uid = params.get("uid")

        let journals = [];
        
        if (id) {
            journals = await Journal.find({
                uid: user.uid,
                id,
            });
        } else if (uid == user.uid) {
            journals = await Journal.find({
                uid
            });
        }

        if (journals.length >= 1) {
            return NextResponse.json(journals);
        } else {
            return new NextResponse("No journals found", {status: 400});
        }
    } catch (e) {
        return new NextResponse("Could not fetch journals", {status: 500});
    }
}