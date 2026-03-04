"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { XCircle } from "lucide-react";


interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({
    children,
    allowedRole
}:RoleGateProps)=>{
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <div className="flex items-center gap-2 text-red-600 text-sm border shadow-sm bg-red-200 p-2 rounded-md mb-4">
              <XCircle className="w-4 h-4" />
              You do not have permission to view this content!
            </div>
        )
    }
    return (
        <>
            {children}
        </>
        
    )
}