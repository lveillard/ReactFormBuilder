import React from "react";
import ReactDOM from "react-dom";

class Printer extends React.Component {
  render() {
    const styles = {
      paddingBottom: "calc(0.375em - 1px)",
      paddingLeft: "0.75em",
      paddingRight: "0.75em",
      paddingTop: "calc(0.375em - 1px)",
      background: this.props.background,
      fontWeight: this.props.bold ? "bold" : null,
      color: this.props.color,
      textAlign: this.props.centered ? "center" : null,
      textTransform: this.props.uppercase ? "uppercase" : null,
      fontSize: this.props.title ? "14px" : null
    };
    return (
      <div className={"printer"} style={styles}>
        {this.props.children}
      </div>
    );
  }
}

export default Printer;
