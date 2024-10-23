import { Redirect } from "wouter";

export const AuthMiddleware = ({ children }) => {

  if(!localStorage.getItem('session')) {
    return <Redirect to="/" replace />
  }

  return (
    <>{children}</>
  )
}
