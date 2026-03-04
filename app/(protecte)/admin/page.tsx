"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const AdminPage = () => {
    const onServorActionClick = ()=>{
      admin()
        .then((data)=>{
          if (data.success) {
            toast.success(data.success)
          }
          if (data.error) {
            toast.error(data.error)
          }
        })
    }

    const onApiRouterClick =()=>{
      fetch("/api/admin")
        .then((response)=>{
          if(response.ok){
            toast.success("Allowed APi Route!")
          }else{
            toast.error("FORBIDDEN API Route!")
          }
        })
    }
  return (
    <Card className="w-150 shadow-md mt-0">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center ">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <div className="flex items-center gap-2 text-green-600 text-sm border shadow-sm bg-green-200 p-2 rounded-md mb-4">
            <CheckCircle className="w-4 h-4" />
            You are allowed to see this content!
          </div>
        </RoleGate>
        <div
          className="
            flex flex-row items-center justify-between rounded-lg border p-3 shadow-md
          "
        >
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouterClick}>
            Click to test
          </Button>
        </div>
        <div
          className="
            flex flex-row items-center justify-between rounded-lg border p-3 shadow-md
          "
        >
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={onServorActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
