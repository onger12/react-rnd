import { Link } from 'wouter';
import { RootWrapper } from '../wrappers';

export const HomeScreen = () => {

  return (
    <RootWrapper>
      <main className="flex-1">
        <section className="w-full flex align-items-center justify-content-center py-4 main-section-calc-height">
          <div className="w-full px-2">
            <div className="flex flex-column align-items-center mt-1 text-center">
              <div className="mt-2">
                <h1 className="text-8xl my-0 tracking-tighter">
                  Bienvenido a <span className="text-red-500">Academia Aldor</span>
                </h1>
                <p className="mx-auto my-0 text-2xl text-gray-400">
                  Descubre un mundo de conocimientos y oportunidades en nuestro centro de capacitación.
                </p>
              </div>
              <Link
                href="/auth/colab"
                className="bg-gray-800 hover:bg-gray-700 text-xl text-white font-bold px-4 py-3 border-round-sm mt-5 transition-all transition-duration-200 transition-ease-out"
              >
                Ingresar
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-column justify-content-center py-3rem bg-gray-200 bg-aldor-watermark py-7">
          <div>
            <div className='p-4'>
              <span className="font-medium">Características claves</span>
              <h2 className="my-0 text-3xl font-bold tracking-tighter text-6xl">
                Descubre como en <span className='text-red-500'>aldor</span> te capacitas desde el primer día
              </h2>
              <p className="font-normal mb-0">
                Cursos técnicos y de habilidades blandas, áreas representadas por escuelas, exámenes, ranking y certificaciones.
              </p>
            </div>
            <div className="px-4">
              <div className="my-4">
                <h3 className="my-0 text-xl font-bold">Agrega recorrido a tu CV</h3>
                <p className="font-normal my-0">Los certificados pueden adjuntarse como adicionales a la experiencia aldor.</p>
              </div>
              <div className="my-4">
                <h3 className="my-0 text-xl font-bold">Experiencia heredada</h3>
                <p className="font-normal my-0">Aprende desde los colaboradores expertos de cada área aldor.</p>
              </div>
              <div className="my-4 mb-0">
                <h3 className="my-0 text-xl font-bold">Recuerda siempre que necesites</h3>
                <p className="font-normal my-0">La plataforma siempre está activa y con tu usario siempre podrás ingresar.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-7">
          <div className="container px-2 md:px-6">
            <div className="flex flex-column align-items-center mt-1 text-center">
              <div className="mt-2">
                <h2 className="text-3xl font-bold text-5xl tracking-tighter my-2">
                  ¿Lista para empezar tu jornada académica?
                </h2>
                <p className="mx-auto font-normal">
                  Da el primer paso o continúa aprendiendo con nosotros.
                </p>
              </div>
              <Link
                href="/auth/colab"
                className="bg-white hover:bg-gray-100 transition-all transition-duration-200 transition-ease-out text-xl text-gray-900 font-bold px-4 py-3 border-round-sm mt-3"
              >
                Empezar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 align-items-center px-2 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Aldor Academy. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Términos del servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Políticas de privacidad
          </Link>
        </nav>
      </footer>
    </RootWrapper>
  )
}
