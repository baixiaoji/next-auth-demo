import prisma from "@/helper";
import { NextResponse  } from "next/server";
import { verifyJwt } from "@/helper/jwt";

export async function GET(req) {
    try {
        const token = req.headers.get("Authorization")

        const user = verifyJwt(token)

        if (!token || !user) {
            return NextResponse.json({ error: "Not Authorization" }, { status: 401 });
        }
        const response = await prisma.post.findMany({
            where: {
                userId: user.id
            }
        })
        return NextResponse.json({ posts: response }, { status: 201 });
    } catch(e) {
        console.log(e);
        return NextResponse.json({ error: "sth wrong with get posting" }, { status: 400 });
    }
}