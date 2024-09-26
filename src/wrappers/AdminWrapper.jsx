import { Toast } from 'primereact/toast'
import { HeaderAdmin } from '../components'
import { AuthMiddleware } from '../middlewares'

export const AdminWrapper = ({ children, toastRef }) => {
  return (
    <AuthMiddleware>
      <HeaderAdmin />
      {children}

      <Toast ref={toastRef} />
    </AuthMiddleware>
  )
}
