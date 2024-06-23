import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/authSlice";

function RequireAuth() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;