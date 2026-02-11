"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { BsGithub } from "react-icons/bs"

export const Social = () => {
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
        onClick={()=>{}}
      >
        <FcGoogle/>
      </Button>
      <Button
        size={"lg"}
        className="w-1/2"
        variant={"outline"}
        onClick={()=>{}}
      >
        <BsGithub/>
      </Button>
    </div>
 )
}