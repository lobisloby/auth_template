import NextAuth,{DefaultSession} from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"


declare module "next-auth" {
  interface Session {
    user: {
        role: UserRole
        isTwoFactorEnabled: boolean
        isOAuth: boolean
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole
    isTwoFactorEnabled?: boolean
    isOAuth: boolean
  }
}
 
export const { 
     handlers:  {POST,GET},
     auth,
     signIn,
     signOut
} = NextAuth({
    pages:{
        signIn: "/auth/login",
        error: "/auth/login",
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where:{id: user.id},
                data:{emailVerified: new Date()}
            })
        }
    },
    callbacks:{
        async signIn({user,account}){
            //Allow OAuth without email verification
            if(account?.provider !== "credentials") return true;
            if(!user.id) return false;

            const existingUser = await getUserById(user.id);

            if(!existingUser?.emailVerified) return false;

            //TODO: Add 2FA checked
            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if(!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                })
            }

            return true;
        },
        async session({token,session}){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            if(session.user){
                session.user.isTwoFactorEnabled= token.isTwoFactorEnabled as boolean;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email= token.email ?? "";
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session
        },
        async jwt({token}){
            console.log("I'M BING CALLED AGAIN")
            if(!token.sub) return token;
            
            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id)
            
            token.isOAuth = !!existingAccount;
            token.email = existingUser.email;
            token.name= existingUser.name;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy:'jwt'},
    ...authConfig,
})