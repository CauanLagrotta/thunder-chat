import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    position: "fixed",
    zIndex: "100",
    width: "100%",
    height: "100px",
    backgroundColor: "#004aad",
})

const Logo = styled.img({
    width: "100px",
    height: "100px",
    cursor: "pointer",
    marginLeft: "20px",
})

const ContainerLinks = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
})

const Links = styled(Link)({
    color: "white",
    fontSize: "24px",
    textDecoration: "none",
    marginRight: "20px",
})



export { Container, Logo, ContainerLinks, Links }