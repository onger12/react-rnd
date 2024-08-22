import { HeaderLearn } from "../components"
import { AuthMiddleware } from "../middlewares"

export const LearnWrapper = ({ children }) => {
  return (
    <AuthMiddleware>
      <HeaderLearn />
      <div className="px-4">
        {children}
      </div>
    </AuthMiddleware>
  )
}
