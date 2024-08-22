import { RootWrapper } from "../wrappers"

export const NotFoundScreen = () => {
  return (
    <RootWrapper>
      <section className="main-section-calc-height flex justify-content-center align-items-center">
        <div className="">
          <span className="select-none block my-0 text-center text-8xl text-red-400">404</span>
          <span className="select-none text-2xl text-center">No se encontró la página que buscabas.</span>
        </div>
      </section>
    </RootWrapper>
  )
}
