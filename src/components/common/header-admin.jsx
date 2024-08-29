import { Link } from "wouter";

export const HeaderAdmin = () => {

  return (
    <>
      <div className="w-full h-3rem bg-transparent" />
      <header className="bg-white fixed top-0 w-full px-4 h-3rem flex align-items-center">
        <Link href="/admin" className="flex align-items-center justify-content-center">
          <i className="pi pi-book text-xl" />
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
      </header>
    </>
  )
}
