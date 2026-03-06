import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}


const ProtectedLayout = (
    {children}: ProtectedLayoutProps
)=>{
    return (
        <div
          className="
            bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,#1e3a8a_100%)] h-full w-full flex flex-col gap-y-2 items-center justify-center
          "
        >
          <Navbar/>
          {children}
        </div>
    )
}

export default ProtectedLayout;