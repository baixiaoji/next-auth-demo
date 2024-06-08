import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const authHandlers = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })
                    const json = await response.json()

                    if (response.status === 201) {
                        return {
                            ...json.user,
                            token: json.token
                        }
                    } else  {
                        throw JSON.stringify(json)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        register: "/register"
    }
})

export { authHandlers as GET, authHandlers as POST}