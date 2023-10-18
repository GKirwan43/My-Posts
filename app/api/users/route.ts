import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import User from "@/lib/mongoose/models/User";

export const GET = async (request: NextRequest) => {
    try {
        await connect();

        const params = request.nextUrl.searchParams;

        const res = await User.findOne({
            $or: [
              { username: params.get("username") },
              { email: params.get("email") },
              { uid: params.get("uid") }
            ]
          });

        return NextResponse.json(res);
    } catch (e) {
        return NextResponse.json(e, {status: 500});
    }
}

export const POST = async (request: NextRequest) => {
    try {
        await connect();
        
        const data = await request.json();

        if (data.action == "create") {
            const user = new User(data);

            await user.save();
    
            return new NextResponse("Account created successfully", {status: 201})
        } else if (data.action == "delete") {
            User.deleteOne({ uid: data.uid })
        }
    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}