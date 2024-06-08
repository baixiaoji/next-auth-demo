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
                    console.log(credentials)
                    return null
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