import { Navigate } from 'react-router-dom'
import useUserStore from "../store/useUserStore.js";
import { toast } from 'sonner';


const ProtectedRoute = ({ children }) => {
    const user = useUserStore((state) => state.user)
    if (!user) {
        toast.warning("Please Login")
        return <Navigate to={'/login'} />
    }
    return children
}

export default ProtectedRoute;