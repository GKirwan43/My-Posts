// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/lib/mongoose/db";
// import Journal from "@/lib/mongoose/models/Journal";
// const { v4: uuidv4 } = require('uuid');

// export const POST = async (request: NextRequest) => {
//     try {
//         await connect();
        
//         const data = await request.json();
//         const id = uuidv4()
//         const newJournal = new Journal({id, ...data});

//         await newJournal.save();
    
//         return NextResponse.json({ id }, {status: 201})
//     } catch (e) {
//         return NextResponse.json(e, {status: 500})
//     }
// }