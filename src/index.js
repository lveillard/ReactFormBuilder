import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import "bulma-steps";

import App from "./App";
import { Container, Section } from "bloomer";
import "./style.css";

import { BrowserRouter } from "react-router-dom";
document.body.style.backgroundColor = "#f6f7f9";
document.body.style.height = "100vh";

ReactDOM.render(
  <Section className="main">
    <Container>
      <App />
    </Container>
  </Section>,
  document.getElementById("root")
);
