import { Link } from "wouter"

export const FooterMain = ({ companyName }) => {

  return (
    <footer className="h-3rem flex w-full shrink-0 align-items-center px-2 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; 2024 {companyName} Academy. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Términos del servicio
        </Link>
        <Link href="/policy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Políticas de privacidad
        </Link>
      </nav>
    </footer>
  )
}