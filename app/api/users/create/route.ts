import User from "@/lib/mongoose/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        
        const data = await req.json();

        // Check if there is an exsiting user, if there is then send back the appropiate responses
        const existingUser = await User.findOne({
            $or: [{ username: data.username }, { email: data.email }],
        });

        if (existingUser) {
            let errors = {}

            if (existingUser.username === data.username) {
                errors = {...errors, username: "Username already exists."}
            }
            if (existingUser.email === data.email) {
                errors = {...errors, email: "Email already exists."}
            }

            return NextResponse.json({ errorMessages: errors }, { status: 400 })
        }

        // Create user id, different from firebase auth
        const userid = uuidv4();

        // Create user in database
        const user = new User({userid, ...data});
        await user.save();
    
        return NextResponse.json({ error: "Account created successfully" }, {status: 201})
    } catch (e) {
        return NextResponse.json({ error: "An error occurred trying to create account" }, { status: 500 })
    }
}