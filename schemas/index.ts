import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN,UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
})
    .refine((data)=>{
        if(data.password && !data.newPassword){
            return false;
        }

        return true;
    },{
        message: "New Passwrod is required!",
        path:["newPassword"]
    })
    .refine((data)=>{
        if(!data.password && data.newPassword){
            return false;
        }



        return true;
    },{
        message: "Current Passwrod is required!",
        path:["password"]
    })
    

export const LoginSchema = z.object({
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(1,{
        message:'Password is required',
    }),
    code: z.optional(z.string())

})


export const RegisterSchema = z.object({
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(6,{
        message:'Minimum Password length is required to be 6 characters long' ,
    }),
    name: z.string().min(1,{
        message:"Name must not be empty" ,  
    })
})


export const ResetSchema = z.object({
    email: z.string().email({message:"Invalid Email Address"}),
})


export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message:'Minimum Password length is required to be 6 characters long' ,
    }),
})