import { Resend } from "resend"
import { email } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
)=>{
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token} </p>`
    })
}


export const sendPasswordResetEmail = async (
    email: string,
    token: string
)=>{
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        `
    })
}



export const sendVerificationEmail = async (
    email: string,
    token: string
)=>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirmation your email",
        html:`
            <p>Thank you! Your request has been successfully received.</p>
            <p>Please confirm your action by clicking <a href="${confirmLink}">here</a>.</p>
        `
    })
}