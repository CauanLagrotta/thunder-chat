import { Container, Logo, Links } from "./components.jsx";

export function Header(){
    return(
        <Container>
            <Logo src="./images/logo.png"/>

            <Links to="/">Home</Links>
        </Container>
    )
}