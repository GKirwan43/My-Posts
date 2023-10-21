import User from "@/lib/mongoose/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongoose/db";
import getFirebaseAuth from "@/lib/firebase/admin"

export const POST = async (req: NextRequest) => {
    try {
        const auth = getFirebaseAuth();
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

        const firebaseUser = await auth.createUser({
            email: data.email,
            emailVerified: false,
            displayName: data.username,
        })
        const token = await auth.createCustomToken(firebaseUser.uid);
        const uid = firebaseUser.uid;

        // Create user in database
        const user = new User({uid, ...data});
        await user.save();
    
        return NextResponse.json({ token }, {status: 201})
    } catch (e) {
        return NextResponse.json({ error: "An error occurred trying to create account" }, { status: 500 })
    }
}