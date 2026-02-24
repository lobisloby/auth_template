"use client"

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';
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
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === 'OAuthAccountNotLinked' ? 'Email alread in use different provider' : "";

  const displayError = error || urlError;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  })

  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    startTransition(()=>{
      login(values)
      .then((data)=>{
        setError(data?.error);
        // TODO: Add when we add 2FA
        // setSuccess(data.success);
      })
    })
  }
  return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='adam@mail.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='password'
                        placeholder='******'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            {displayError && (
              <div className="flex items-center gap-2 text-red-600 text-sm border shadow-sm bg-red-200 p-2 rounded-md mb-4">
                <XCircle className="w-4 h-4" />
                {displayError}
                </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-600 text-smborder shadow-sm bg-green-200 p-2 rounded-md mb-4">
                <CheckCircle className="w-4 h-4" />
                {success}
                </div>
            )}
            <Button 
            disabled={isPending}
            type='submit'
            className='w-full'
            >
              Login
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
