import { Button } from "primereact/button";
import { useContext } from "react";
import { Link, useLocation } from "wouter";
import { RootContext } from "../../App";
import { AvatarMisc } from "./avatar-misc";

export const HeaderAdmin = () => {

  const [location, navigate] = useLocation();

  const { currentSession, logoMin : logo } = useContext(RootContext);

  // handlers
  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/auth/admin', { replace : true });
  }

  return (
    <>
      <div className="w-full h-3rem bg-transparent" />
      <header className="bg-white fixed top-0 w-full px-4 h-3rem gap-3 align-items-center justify-content-between header-main">
        <nav className="flex align-items-center gap-4 sm:gap-6">
          <Link href="/admin" className="flex align-items-center justify-content-center">
            {
              logo?.toLowerCase()?.includes('avatar') 
                ? <AvatarMisc specific={logo?.split('_')[1]} bgColor="bg-yellow-400" hoverBgColor="bg-yellow-300" textColor="text-gray-900" />
                : <img src={logo} className="border-circle w-2rem h-2rem" alt="company_logo" />
            }
          </Link>
          <Link href="/admin/schools" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Escuelas
          </Link>
          <Link href="/admin/courses" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Cursos
          </Link>
          <Link href="/admin/colabs" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Colaboradores
          </Link>
          <Link href="/admin/videos" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Videos
          </Link>
          <Link href="/admin/stats" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Estadisticas
          </Link>
          <Link href="/admin/maker" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Creador de diapositivas
          </Link>
        </nav>
        {/* <Link onClick={handleLogout} href="/auth/colab" className="flex gap-2 align-items-center transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
          {currentSession?.name}
          <i className="block pi pi-sign-out text-red-300" />
        </Link> */}
        <Button
          text
          className="py-1 px-2 flex gap-2 align-items-end"
          onClick={handleLogout}
          severity="danger"
        >
          <span className="text-gray-900 font-bold block">{currentSession?.name}</span>
          <i className="pi pi-sign-out text-red-300 block" />
        </Button>
      </header>
      <header className="bg-white fixed top-0 w-full px-4 h-3rem gap-3 align-items-center justify-content-between header-main-mobile">
        <nav className="flex align-items-center gap-4 sm:gap-6">
          <Link href="/admin" className="flex align-items-center justify-content-center">
            {
              logo?.toLowerCase()?.includes('avatar') 
                ? <AvatarMisc specific={logo?.split('_')[1]} bgColor="bg-yellow-400" hoverBgColor="bg-yellow-300" textColor="text-gray-900" />
                : <img src={logo} className="border-circle w-2rem h-2rem" alt="company_logo" />
            }
          </Link>
        </nav>
        
      </header>
    </>
  )
}
