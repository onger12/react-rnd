import { HeaderAdmin } from '../components'
import { AuthMiddleware } from '../middlewares'

export const AdminWrapper = ({ children }) => {
  return (
    <AuthMiddleware>
      <HeaderAdmin />
      {children}
    </AuthMiddleware>
  )
}
