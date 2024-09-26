import { useContext } from "react";

import { Button } from "primereact/button";
import { Link, useLocation, useParams } from "wouter";

import { RootContext } from "../../App";

export const HeaderLearn = () => {

  const { logoMin : logo } = useContext(RootContext);

  const params = useParams();
  const [location, navigate] = useLocation();

  const dni = params?.dni || localStorage?.getItem('dni');

  // handlers
  const handleLogout = () => {
    navigate('/auth/colab', { replace : true });
  }

  return (
    <>
      <div className="w-full h-3rem bg-transparent" />
      <header className="bg-white fixed top-0 w-full px-4 h-3rem flex align-items-center justify-content-between">
        <nav className="flex align-items-center gap-4 sm:gap-6">
          <Link href={`/learn/${dni}`} className="flex align-items-center justify-content-center">
            {
              logo?.toLowerCase()?.includes('avatar') 
                ? <AvatarMisc specific={logo?.split('_')[1]} bgColor="bg-yellow-400" hoverBgColor="bg-yellow-300" textColor="text-gray-900" />
                : <img src={logo} className="border-circle w-2rem h-2rem" alt="company_logo" />
            }
          </Link>
          <Link 
            href={`/learn/${dni}/schools`} 
            className={(active) => `transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline ${active ? 'underline' : ''} underline-offset-4`}  
          >
            Escuelas
          </Link>
          <Link 
            href={`/learn/${dni}/assigments`} 
            className={(active) => `transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline ${active ? 'underline' : ''} underline-offset-4`}  
          >
            Asignados
          </Link>
          <Link 
            href={`/learn/${dni}/review`} 
            className={(active) => `transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline ${active ? 'underline' : ''} underline-offset-4`}  
          >
            Resumen
          </Link>
        </nav>
        {/* <div className="flex align-items-baseline cursor-pointer gap-2 border-round-xl hover:shadow-2 transition-all transition-duration-200 transition-ease-in px-3 py-2" onClick={(e) => opRef.current?.toggle(e)}>
          <i className="pi pi-user" />
          <span className="select-none font-normal text-gray-600">{dni}</span>
        </div> */}
        <Button
          text
          className="py-1 px-2 flex gap-2 align-items-end"
          onClick={handleLogout}
          severity="danger"
        >
          <span className="text-gray-900 font-bold block">{dni}</span>
          <i className="pi pi-sign-out text-red-300 block" />
        </Button>
      </header>

      {/* <OverlayPanel ref={opRef}>
        <ul className="m-0 p-0">
          {
             userOPOptions.map(op => (
              <LiLink key={op.to} {...op} />
             ))
          }
        </ul>
      </OverlayPanel> */}
    </>
  )
}


const LiLink = ({ label, to }) => (
  <li className="w-full hover:bg-gray-200 transition-duration-200 transition-ease-out transition-all px-4 py-2 border-round-sm">
    <Link href={to} className="w-full" replace>
      {label}
    </Link>
  </li>
)