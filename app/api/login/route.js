import prisma from "@/helper";
import { NextResponse  } from "next/server";
import * as bcrypt from "bcrypt";

import { generateJwt } from "@/helper/jwt";




export async function POST(req) {
    try {
      const { email, password } = await req.json();

      if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
      }

      const user = await prisma.user.findFirst({
        where: {
            email: email.toLowerCase(),
        }
      })
      // 找用户有没有
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }

      // 看密码对不对
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }
      // 生成 JWT
      const { password: hashPassword, ...result } = user

      const token = generateJwt({ ...result })

      return NextResponse.json({ user: {
        ...result, accessToken: token
      } }, { status: 201 });
    } catch (e) {
        console.log(e);
        return new Response({ error: "sth wrong with login" }, { status: 400 });
    }
}