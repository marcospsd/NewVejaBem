import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/login";
import FeedPage from "./pages/index/index";
import ProfilePage from "./pages/pofile/profile";
import Administracao from "./pages/administracao/administracao"
import { AuthProvicer, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import ProfileUser from "./pages/profileuser/profileuser";
import LoadingPage from "./components/Loading/loading";
import AlterarSenha from "./pages/alterarsenha/alterarsenha"



const AppRoutes = () => {
    
    const Private = ({children}) =>{
        const {authenticated, loading} = useContext(AuthContext)
        if (loading) {
            return <LoadingPage/>
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
                    <Route exact path="/user/:id" element={<Private><ProfileUser /></Private>} />
                    <Route exact path="/administracao" element={<Private><Administracao/></Private>} />
                    <Route exact path="/alterarsenha" element={<Private><AlterarSenha/></Private>} />
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;