import { HeaderLearn } from "../components"
import { AuthMiddleware } from "../middlewares"

export const LearnWrapper = ({ children, px = 4 }) => {
  return (
    <AuthMiddleware>
      <HeaderLearn />
      <div className={`px-${px}`}>
        {children}
      </div>
    </AuthMiddleware>
  )
}
