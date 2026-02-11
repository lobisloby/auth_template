const AuthLayout = (
    {children}:{
    children:React.ReactNode}
) => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,#1e3a8a_100%)]">
        {children}
    </div>
  )
}
export default AuthLayout 