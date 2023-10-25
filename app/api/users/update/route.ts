import User from "@/lib/mongoose/models/User";
import { getUser } from "@/lib/utils/middleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let user;

    try {
        user = await getUser(req)
    } catch (e) {
        return NextResponse.json({ error: "Invalid ID Token"}, { status: 400 })
    }

    try {
        const data = await req.json();
        const settings = data.settings;

        await User.findOneAndUpdate(
            { uid: user.uid },
            { $set: { "settings.darkMode": settings.darkMode } }
        );

        return NextResponse.json({ message: "User updated" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "Could not update user."}, { status: 500 })
    }
}