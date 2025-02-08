import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
    userId: string;
    role: string;
  }

export async function GET(req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value;

        if(!token) {
            return NextResponse.json({error: "Token not found"},{status: 401});
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            if (typeof payload === "string" || !("userId" in payload)) {
                throw new Error("Invalid token structure");
            }

            const { userId } = payload as unknown as DecodedToken;

            return NextResponse.json({userId},{status: 200});

        } catch (error) {
            return NextResponse.json({message: (error as Error).message},{status: 401})
        }

    } catch (error) {
        return NextResponse.json({message: (error as Error).message},{status: 400})
    }
}