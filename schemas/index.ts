import * as z from "zod"

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