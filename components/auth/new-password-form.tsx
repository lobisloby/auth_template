"use client"

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewPasswordSchema } from '@/schemas';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
 } from '../ui/form';

import { CardWrapper } from "./card-wrapper"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues:{
      password:"",
    }
  })

  const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
        setError("")
        setSuccess("")

    startTransition(()=>{
      newPassword(values,token)
      .then((data)=>{
        setError(data?.error);
        // TODO: Add when we add 2FA
        setSuccess(data?.success);
      })
    })
  }
  return (
    <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='******'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm border shadow-sm bg-red-200 p-2 rounded-md mb-4">
                <XCircle className="w-4 h-4" />
                {error}
                </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-600 text-sm border shadow-sm bg-green-200 p-2 rounded-md mb-4">
                <CheckCircle className="w-4 h-4" />
                {success}
                </div>
            )}
            <Button 
            disabled={isPending}
            type='submit'
            className='w-full'
            >
              Reset password
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
