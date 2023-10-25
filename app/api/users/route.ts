import User from "@/lib/mongoose/models/User";
import connect from "@/lib/mongoose/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/utils/middleware";

export const GET = async (req: NextRequest) => {
    try {
        await connect();

        const params = req.nextUrl.searchParams;
        const username = params.get("username");
        const email = params.get("email");
        const paramsEmpty = !username && !email;

        if (paramsEmpty) {
            try {
                const user = await getUser(req);
                const res = await User.findOne({uid: user.uid});

                return NextResponse.json(res, {status: 200});
            } catch (e: any) {
                return NextResponse.json({ error: "Invalid ID Token." }, {status: 400});
            }
        } else {
            const res = await User.findOne({
                $or: [
                { username: params.get("username") },
                { email: params.get("email") },
                ]
            });

            if (res) {
                return NextResponse.json({ username: res.username, email: res.email });
            } else {
                return NextResponse.json({ error: "No account found." }, {status: 400});
            }
        }

        //return NextResponse.json({ message: "Could get user." }, {status: 500});
    } catch (e) {
        return NextResponse.json({ message: "Could not get user." }, {status: 500});
    }
}