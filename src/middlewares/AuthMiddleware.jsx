import { Redirect } from "wouter";
import { useSession } from "../hooks"

export const AuthMiddleware = ({ children }) => {

  const { handleGetSession } = useSession();

  if(!handleGetSession()) {
    console.log('first')
    return <Redirect to="/" replace />
  }

  return (
    <>{children}</>
  )
}
