import { db } from "@/lib/db"


export const getPasswordRestTokenByToken = async (token: string)=>{
    try {
        const passwordResetToken = db.passwordResetToken.findUnique({
            where:{token}
        })

        return passwordResetToken;
    } catch  {
        return null
    }
}


export const getPasswordRestTokenByEmail = async (email: string)=>{
    try {
        const passwordResetToken = db.passwordResetToken.findFirst({
            where:{email}
        })

        return passwordResetToken;
    } catch  {
        return null
    }
}