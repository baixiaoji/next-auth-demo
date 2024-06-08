import prisma from "@/helper";
import { NextResponse  } from "next/server";
import * as bcrypt from "bcrypt";


export async function POST(req) {
    try {
      const { email, password } = await req.json();

      if (!email || !password) {
        return NextResponse.json(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
        },
      });

      const {password: hashPassword, ...result } = user

      return NextResponse.json(JSON.stringify({ user: result }), { status: 201 });

    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "sth wrong with register" }), { status: 400 });
    }
}