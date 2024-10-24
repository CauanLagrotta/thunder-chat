import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

const Container = styled.div({
    width: "100vw",
    height: "100vh",
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
})

const LeftSide = styled.div({
    width: "50%",
    height: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    '@media screen and (max-width: 820px)':  {
        display: "none",

    },

})

const RightSide = styled.div({
    width: "50%",
    height: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    '@media screen and (max-width: 820px)':  {
        width: "100%",
    },
})

const ContainerInputs = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
})

const InputGroup = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
})

const PasswordLabelContainer = styled.div({
    width: "100%",
    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    
})

const Label = styled.label({
    alignSelf: "flex-start",
    color: "#004aad",
    fontSize: "16px",
    fontFamily: "Arial, Helvetica, sans-serif",
    marginBottom: "10px",
})

const Inputs = styled(Field)({
    width: "300px",
    height: "40px",
    borderRadius: "5px",
    marginBottom: "10px",
    padding: "10px",
})

const Error = styled(ErrorMessage)({
    color: "red",
    fontSize: "12px",
})

export { Container, LeftSide, RightSide, ContainerInputs, InputGroup, PasswordLabelContainer, Label, Inputs, Error }