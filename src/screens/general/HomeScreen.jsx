import { useContext } from 'react';

import { Link } from 'wouter';

import { RootContext } from '../../App';
import { RootWrapper } from '../../wrappers';

export const HomeScreen = () => {
  
  const { currentCompany } = useContext(RootContext) ?? {};
  const { company, name : companyName, color : companyColor } = currentCompany ?? {};

  return (
    <RootWrapper>
      <main className={`flex-1 ${company?.toUpperCase()}-BG-IMAGE`}>
        <section className="w-full flex h-screen">
          {
            company == 'PE' && (
              <div className='w-6'>
                <img className='w-full' style={{ maxHeight : 'calc(100vh - 6rem)', objectFit : 'contain' }} src="/Capacitaciones-APP/PE-BG.png" alt="logo_PE" />
              </div>
            )
          }
          <div className={`${company == 'PE' ? 'w-6' : 'w-full'} ${company == 'CAP' ? 'px-7' : 'px-2'} flex align-items-start justify-content-center gap-5 flex-column`}>
            <div className="m-0">
              <h1 className="text-8xl text-gray-800 my-0 tracking-tighter">
                Bienvenido a <span className={companyColor}>Academia {companyName}</span>
              </h1>
              <p className="my-0 text-2xl text-gray-400">
                Descubre un mundo de conocimientos y oportunidades en nuestro centro de inducción y capacitación.
              </p>
            </div>
            <Link
              href={`/${company}/auth/colab`}
              className="bg-gray-800 hover:bg-gray-700 text-xl text-white font-bold px-4 py-3 border-round-sm block m-0 transition-all transition-duration-200 transition-ease-out"
            >
              Ingresar
            </Link>
          </div>
        </section>
        <section className="w-full flex align-items-center py-3rem bg-gray-200 bg-aldor-watermark py-7">
          <div className='w-8'>
            <div className='p-4'>
              <span className="font-medium font-italic">Características claves</span>
              <h2 className="my-0 text-3xl font-bold tracking-tighter text-6xl">
                Descubre como en <span className={companyColor}>{companyName}</span> te capacitas desde el primer día
              </h2>
              <p className="font-normal mb-0">
                Cursos técnicos y de habilidades blandas, áreas representadas por escuelas, exámenes, ranking y certificaciones.
              </p>
            </div>
            <div className="px-4">
              <div className="my-4">
                <h3 className="my-0 text-xl font-bold">Agrega recorrido a tu CV</h3>
                <p className="font-normal my-0">Los certificados pueden adjuntarse como adicionales a la experiencia {companyName}.</p>
              </div>
              <div className="my-4">
                <h3 className="my-0 text-xl font-bold">Experiencia heredada</h3>
                <p className="font-normal my-0">Aprende desde los colaboradores expertos de cada área {companyName}.</p>
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
                href={`/${company}/auth/colab`}
                className="bg-white hover:bg-gray-100 transition-all transition-duration-200 transition-ease-out text-xl text-gray-900 font-bold px-4 py-3 border-round-sm mt-3"
              >
                Empezar
              </Link>
            </div>
          </div>
        </section>
      </main>
    </RootWrapper>
  )
}