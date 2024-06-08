import prisma from "@/helper";
import { NextResponse  } from "next/server";
import * as bcrypt from "bcrypt";

import { generateJwt } from "@/helper/jwt";




export async function POST(req) {
    try {
      const { email, password } = await req.json();

      if (!email || !password) {
        return NextResponse.json(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
      }

      const user = await prisma.user.findFirst({
        where: {
            email: email.toLowerCase(),
        }
      })
      // 找用户有没有
      if (!user) {
        return NextResponse.json(JSON.stringify({ error: "User not found" }), { status: 400 });
      }

      console.log(user, password)
      // 看密码对不对
      const isValid = await bcrypt.compare(password, user.password);
      console.log(isValid)
      if (!isValid) {
        return NextResponse.json(JSON.stringify({ error: "Invalid password" }), { status: 400 });
      }
      // 生成 JWT
      const { password: hashPassword, ...result } = user

      const token = generateJwt({ ...result })

      return NextResponse.json(JSON.stringify({ user: result, token }), { status: 201 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "sth wrong with login" }), { status: 400 });
    }
}