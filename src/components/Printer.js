import React from "react";
import ReactDOM from "react-dom";

class Printer extends React.Component {
  render() {
    return (
      <div
        className={"printer"}
        style={{
          paddingBottom: "calc(0.375em - 1px)",
          paddingLeft: "0.75em",
          paddingRight: "0.75em",
          paddingTop: "calc(0.375em - 1px)"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Printer;
