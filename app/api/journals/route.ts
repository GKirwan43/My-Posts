import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";
import Journal from "@/lib/mongoose/models/Journal";
import getFirebaseAuth from "@/lib/firebase/admin";
import { getUser } from "@/lib/utils/middleware";

export const GET = async (req: NextRequest) => {
    try {
        await connect();

        let user;

        try {
            user = await getUser(req);
        } catch (e) {
            return NextResponse.json({ error: e }, { status: 401 });
        }

        const uid = user.uid;

        const params = req.nextUrl.searchParams;
        const id = params.get("id");

        let journals = [];
        
        if (id) {
            journals = await Journal.find({
                uid,
                id,
            });
        } else {
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