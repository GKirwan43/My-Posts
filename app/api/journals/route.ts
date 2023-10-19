// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/lib/mongoose/db";

// export const GET = async (request: NextRequest) => {
//     try {
//         await connect();

//         const params = request.nextUrl.searchParams;

//         const res = await User.findOne({
//             $or: [
//               { username: params.get("username") },
//               { email: params.get("email") },
//               { uid: params.get("uid") }
//             ]
//           });

//         return NextResponse.json(res);
//     } catch (e) {
//         return NextResponse.json(e, {status: 500});
//     }
// }