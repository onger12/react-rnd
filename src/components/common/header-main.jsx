import { useContext } from "react";

import { Link } from "wouter";
import { Dropdown } from 'primereact/dropdown';

import { RootContext } from "../../App";
import { AvatarMisc } from "./avatar-misc";
import { companyOptions } from "../../helpers";

export const HeaderMain = () => {

  const { currentCompany, logoFull : logo, handleChangeCompany } = useContext(RootContext);

  return (
    <>
      <div className="w-full h-3rem bg-transparent" />
      <header className="bg-white fixed top-0 w-full px-4 h-3rem flex align-items-center gap-5">
        <Link href="/" className="flex align-items-center justify-content-center">
          {
            logo?.toLowerCase()?.includes('avatar') 
              ? <AvatarMisc specific={logo?.split('_')[1]} bgColor="bg-yellow-400" hoverBgColor="bg-yellow-300" textColor="text-gray-900" />
              : <img src={logo} className="h-2rem" alt="company_logo" />
          }
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/auth/admin" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Administrativo
          </Link>
          <Link href="/auth/colab" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Colaboradores
          </Link>
          <Link href="/about" className="transition-all transition-duration-200 transition-ease-in text-sm font-medium hover:underline underline-offset-4">
            Acerca de
          </Link>
        </nav>
        {/* <Dropdown 
          optionLabel="name"
          value={currentCompany}
          options={companyOptions}
          onChange={e => handleChangeCompany(e.value)}
          className="w-9rem h-2rem flex align-items-center"
          pt={{ 
            input : { style : { fontSize : 14, fontWeight : 'bold' } },
            panel : { style : { padding : 0 } },
            item : { style : { padding : '4px 8px' } },
            list : { style : { padding : 0 } },
          }}
        /> */}
      </header>
    </>
  )
}
