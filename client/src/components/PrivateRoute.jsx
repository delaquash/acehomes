import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { currentUser } = useSelector((state)=> state.user)
  return currentUser ? <Outlet /> : <Navigate  to="/Sign-in" />
}

export default PrivateRoute