import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";
import Journal from "@/lib/mongoose/models/Journal";
import { getUser } from "@/lib/utils/middleware";
import JournalPost from "@/lib/mongoose/models/JournalPost";

interface JournalPost {
    postId: string;
}

export const GET = async (req: NextRequest) => {
    try {
        await connect();

        // Get user
        let user;
        
        try {
           user = await getUser(req);
        } catch (e: any) {
            return NextResponse.json({ error: e.message }, { status: 401 })
        }

        const uid = user?.uid;

        // Get params
        const params = req.nextUrl.searchParams;
        const journalId = params.get("journalId");

        const journal = await Journal.findOne({
            id: journalId 
        });

        // Check if journal exists
        if (!journal) {
            return NextResponse.json({ error: "Could not find journal" }, {status: 404});
        }

        // Check if user is journal creater
        if (journal.uid !== uid) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401});
        }

        const postIds = journal.posts;

        const posts = await JournalPost.find(
            { id: { $in: postIds } }
        ).sort({ createdAt: -1 })

        return NextResponse.json(posts, {status: 200});
    } catch (e) {
        return NextResponse.json({ error: "Could not fetch journal posts" }, {status: 500});
    }
}