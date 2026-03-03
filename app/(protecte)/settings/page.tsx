"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut} from "next-auth/react"

const SettingsPage =() => {
  const user = useCurrentUser()

  const onClick = ()=>{
    signOut();
  }
  
  return (
    <div>
        <button onClick={onClick} type="submit" className="cursor-pointer bg-white p-10 rounded-xl">
            Sign out
        </button>
    </div>
  )
}
export default SettingsPage