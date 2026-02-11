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
  FormMessage
 } from '../ui/form';

import { CardWrapper } from "./card-wrapper"
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      passowrd:"",
    }
  })

  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    console.log(values)
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
                name='passowrd'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='******'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <Button 
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
