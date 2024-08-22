import { HeaderMain } from '../components'

export const RootWrapper = ({ children }) => {
  return (
    <>
      <HeaderMain />
      {children}
    </>
  )
}
