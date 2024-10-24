import {
  Container,
  LeftSide,
  RightSide,
  ContainerInputs,
  InputGroup,
  PasswordLabelContainer,
  Label,
  Inputs,
  Error,
} from "./components";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Axios from "axios";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);

    if (showPassword) {
      document.getElementById("password").setAttribute("type", "password");
    } else {
      document.getElementById("password").setAttribute("type", "text");
    }
  };

  const validationLogin = yup.object().shape({
    useremail: yup
      .string()
      .email("endereço de email inválido")
      .required("Este campo é obrigatório"),

    userpassword: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 digitos")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = (values, { resetForm }) => {
    Axios.post("http://localhost:5000/auth/", {
      useremail: values.useremail,
      userpassword: values.userpassword,
    })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === "Login efetuado com sucesso") {
          navigate("/");
          resetForm();
        }
      })
      .catch((err) => {
        toast.error("Senha inválida", {
          icon: false,
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <Container>
      <LeftSide>
        <img src="./images/login.svg" width={"80%"} height={"80%"} alt="" />
      </LeftSide>

      <RightSide>
        <Formik
          initialValues={{ useremail: "", userpassword: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form>
            <ContainerInputs>
              <InputGroup>
                <Label>Email:</Label>
                <Inputs name="useremail" placeholder="useremail@example.com" />
                <Error name="useremail" component="span" />
              </InputGroup>

              <InputGroup>
                <PasswordLabelContainer>
                  <Label>Senha:</Label>
                  {showPassword ? (
                    <Visibility onClick={handleClickShowPassword} />
                  ) : (
                    <VisibilityOff onClick={handleClickShowPassword} />
                  )}
                </PasswordLabelContainer>

                <Inputs
                  id="password"
                  type="password"
                  name="userpassword"
                  placeholder="senha de no minimo 8 digitos"
                />
                <Error name="userpassword" component="span" />
              </InputGroup>
            </ContainerInputs>

            <Link to="/register"> Cadastre-se </Link>
            <Link> Esqueceu sua senha? </Link>

            <button type="submit">Entrar</button>
          </Form>
        </Formik>
      </RightSide>

      <ToastContainer/>
    </Container>
  );
}
