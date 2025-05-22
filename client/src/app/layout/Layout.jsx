import React from "react";
import NavBar from "../../widgets/NavBar/NavBar";
import { Outlet } from "react-router";
import Container from "react-bootstrap/esm/Container";
import Loader from "../../shared/hocs/Loader";
import Footer from "./Footer";

export default function Layout({ logoutHandler, user }) {
  user = {
    status: "logged",
    data: {
      name: "Реструктуризация",
    },
  };
  return (
    <>
      <Loader isLoading={user.status === "logging"}>
        <NavBar logoutHandler={logoutHandler} user={user} />
        <Container fluid>
          <Outlet />
        </Container>
        <Footer/>
      </Loader>
    </>
  );
}
