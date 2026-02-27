"use client"

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetSchema } from '@/schemas';
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
import { reset } from '@/actions/reset';

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues:{
      email:"",
    }
  })

  const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
        setError("")
        setSuccess("")

    startTransition(()=>{
      reset(values)
      .then((data)=>{
        setError(data?.error);
        // TODO: Add when we add 2FA
        setSuccess(data?.success);
      })
    })
  }
  return (
    <CardWrapper
        headerLabel="Forgot your password?"
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
                name='email'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='example@ayoub.com'
                        type='email'
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
              Send reset email
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
