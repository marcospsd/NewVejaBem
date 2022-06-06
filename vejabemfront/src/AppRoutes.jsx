import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/login";
import FeedPage from "./pages/index/index";
import ProfilePage from "./pages/pofile/profile";
import { AuthProvicer, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import ProfileUser from "./pages/profileuser/profileuser";




const AppRoutes = () => {
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }


        if(!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }
    return (
        <BrowserRouter>
            <AuthProvicer>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/" element={<Private><FeedPage/></Private>} />
                    <Route exact path="/profile" element={<Private><ProfilePage/></Private>} />
                    <Route path="/user/:id" element={<Private><ProfileUser /></Private>} />
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;