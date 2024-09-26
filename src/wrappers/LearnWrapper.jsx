import { Toast } from "primereact/toast";

import { HeaderLearn } from "../components";
import { AuthMiddleware } from "../middlewares";

export const LearnWrapper = ({ children, px = 4, toastRef }) => {
  return (
    <AuthMiddleware>
      <HeaderLearn />
      <div className={`px-${px}`}>
        {children}
      </div>

      <Toast ref={toastRef} />
    </AuthMiddleware>
  )
}
