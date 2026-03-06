"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { BsGithub } from "react-icons/bs"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export const Social = () => {
  const searchPrams = useSearchParams();
  const callbackUrl = searchPrams.get("callbackUrl")
  const onClick = (provider:'github'|'google')=>{
    signIn(provider, 
      {redirectTo:callbackUrl ||DEFAULT_LOGIN_REDIRECT})
  }
  
 return (
    <div
      className="
        flex 
        items-center
        w-full
        gap-x-2
      "
    >
      <Button
        size={"lg"}
        className="w-1/2"
        variant={"outline"}
        onClick={()=> onClick("google")}
      >
        <FcGoogle/>
      </Button>
      <Button
        size={"lg"}
        className="w-1/2"
        variant={"outline"}
        onClick={()=> onClick('github')}
      >
        <BsGithub/>
      </Button>
    </div>
 )
}