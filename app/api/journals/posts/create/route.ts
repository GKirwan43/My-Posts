import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import Journal from "@/lib/mongoose/models/Journal";
import { generateUniqueShortId } from "@/lib/utils/idUtils";
import JournalPost from "@/lib/mongoose/models/JournalPost";
import { getUser } from "@/lib/utils/middleware";

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        
        let user;
        
        try {
           user = await getUser(req);
        } catch (e: any) {
            return NextResponse.json({ error: e.message }, { status: 401 })
        }

        const uid = user?.uid;
        const data = await req.json()
        const journal = await Journal.findOne({ id: data.journalId })
        
        if (!journal) {
            return NextResponse.json({ error: "Could not find journal." }, { status: 404 })
        }

        if (journal.uid !== uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const postId = generateUniqueShortId()
        const title = data.title
        const postText = data.post
        const newPost = new JournalPost({id: postId, uid, title, post: postText})
        journal.posts.push(postId)

        await newPost.save()
        await journal.save()
    
        return NextResponse.json({ journal }, {status: 201})
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ error: "Internal server error." }, { status: 500 })
    }
}