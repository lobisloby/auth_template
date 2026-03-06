"use client"

import { logout } from "@/actions/logout";
import { usePathname } from "next/navigation";


interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton=({
    children
}:LogoutButtonProps)=>{
    const pathname = usePathname()

    const onClick = () => {
        logout(pathname)
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}