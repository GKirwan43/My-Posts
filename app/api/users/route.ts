import User from "@/lib/mongoose/models/User";
import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        await connect();

        const params = request.nextUrl.searchParams;

        const res = await User.findOne({
            $or: [
              { username: params.get("username") },
              { email: params.get("email") },
            ]
        });

        if (res) {
            return NextResponse.json({ username: res.username, email: res.email });
        } else {
            return NextResponse.json({ error: "No account found" }, {status: 400});
        }
    } catch (e) {
        return NextResponse.json(e, {status: 500});
    }
}