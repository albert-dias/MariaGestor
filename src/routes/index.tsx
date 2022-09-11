import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../hook/auth";
import Cardapio from '../pages/Cardapio';
import Pedidos from '../pages/Pedidos';
import SignIn from '../pages/SignIn';

const Routers: React.FC = () => {
  let {user} = useAuth();

  function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();

    if (!user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  }

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/pedidos" element={<RequireAuth><Pedidos /></RequireAuth>} />
        <Route path="/cardapio" element={<RequireAuth><Cardapio /></RequireAuth>} />
      </Routes>
      
    </BrowserRouter>
  )
};



export default Routers;