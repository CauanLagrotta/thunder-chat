import { Container, Logo, ContainerLinks, Links } from "./components.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import Axios from "axios";

export function Header() {
  const [auth, setAuth] = useState(false);
  const [staff, setStaff] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/header")
      .then((res) => {
        console.log("Header: ", res.data);

        if (res.data.msg === "Autenticação bem-sucedida") {
          setAuth(true);
          setStaff(res.data.user.staff);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log("Erro ao buscar header:", err));
  }, []);

  const handleLogout = () => {
    Axios.get("http://localhost:5000/auth/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log("Erro ao fazer logout:", err));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Link to="/">
        <Logo src="./images/logo.png" />
      </Link>

      <ContainerLinks>
        <Links to="/">Home</Links>

        {auth && staff === 1 && <Links to="/crud">Crud</Links>}

        {auth ? (
          <Logout onClick={handleLogout} />
        ) : (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </ContainerLinks>
    </Container>
  );
}
