import { useRef } from "react";

import { Link, useParams } from "wouter";
import { OverlayPanel } from 'primereact/overlaypanel';

const userOPOptions = [
  {
    label : 'Salir',
    to : '/',
  }
]

export const HeaderLearn = () => {

  // refs
  const opRef = useRef(null);

  const { dni } = useParams();

  return (
    <>
      <div className="w-full h-3rem bg-transparent" />
      <header className="bg-white fixed top-0 w-full px-4 h-3rem flex align-items-center justify-content-between">
        <nav className="flex gap-4 sm:gap-6">
          <Link href={`/learn/${dni}`} className="flex align-items-center justify-content-center">
            <i className="pi pi-book text-xl" />
          </Link>
          <Link href={`/learn/${dni}/schools`} className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Escuelas
          </Link>
          <Link href={`/learn/${dni}/assigments`} className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Asignados
          </Link>
          <Link href={`/learn/${dni}/review`} className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Resumen
          </Link>
        </nav>
        <div className="flex align-items-baseline cursor-pointer gap-2 border-round-xl hover:shadow-2 transition-all transition-duration-200 transition-ease-in px-3 py-2" onClick={(e) => opRef.current?.toggle(e)}>
          <i className="pi pi-user" />
          <span className="select-none font-normal text-gray-600">{dni}</span>
        </div>
      </header>

      <OverlayPanel ref={opRef}>
        <ul className="m-0 p-0">
          {
             userOPOptions.map(op => (
              <LiLink key={op.to} {...op} />
             ))
          }
        </ul>
      </OverlayPanel>
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