import React from "react";
import ReactDOM from "react-dom";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

//for some reason, if i don't import one icon like this, all the icons dissapear :S
import faTimes from "@fortawesome/fontawesome-free-solid";

import "bulma/css/bulma.css";
import "bulma-steps";

import Routes from "./Routes";
import { Container, Section } from "bloomer";
import "./style.css";

import { BrowserRouter } from "react-router-dom";
document.body.style.backgroundColor = "#f6f7f9";
document.body.style.height = "100vh";

ReactDOM.render(
  <Section className="main">
    <Container>
      <Routes />
    </Container>
  </Section>,
  document.getElementById("root")
);
