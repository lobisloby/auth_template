import { Button } from "@/components/ui/button";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main
        className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,#1e3a8a_100%)]"
    >
        <div
          className="
            space-y-6 text-center
          "
        >
          <h1 className={
            cn("text-6xl font-semibold text-white drop-shadow-md",
              font.className
            )
          }>
              Auth
          </h1>
          <p className="text-white text-lg ">
            A simple authentication page. Please log in to continue
          </p>
          <div>
            <LoginButton >
              <Button variant={"secondary"} size={"lg"}>
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
    </main>
  );
}
