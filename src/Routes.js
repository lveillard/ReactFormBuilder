import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class Printer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: null,
      empresa: {
        nombre: null,
        centros: { centro1: { name: "null" } }
      }
    };
  }
  render() {
    return (
      <div className={"Routes"}>
        <App />
      </div>
    );
  }
}

export default Printer;
