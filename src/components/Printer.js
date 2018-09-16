import React from "react";
import ReactDOM from "react-dom";
import { Button } from "bloomer";

class Printer extends React.Component {
  preparePrinter(props) {
    var result = "";
    if (props.componente.expression) {
      let hola = props.componente.expression.replace(
        /(\@)(\w*)/g,
        "this.props.varsMap.$2"
      );
      console.warn(hola);

      result = eval(hola);
    } else {
      result = props.componente.name || props.child;
    }

    return result;
  }

  render() {
    const styles = {
      paddingBottom:
        this.props.componente.mode != "button" && "calc(0.375em - 1px)",
      paddingLeft: this.props.componente.mode != "button" && "0.75em",
      paddingRight: this.props.componente.mode != "button" && "0.75em",
      paddingTop:
        this.props.componente.mode != "button" && "calc(0.375em - 1px)",
      background: this.props.background,
      fontWeight: this.props.bold ? "bold" : null,
      color: this.props.componente.color,
      textAlign: this.props.centered ? "center" : null,
      textTransform: this.props.uppercase ? "uppercase" : null,
      fontSize: this.props.title ? "14px" : null
    };

    return (
      <div className={"printer"} style={styles}>
        {this.props.componente.expression && console.warn(this.props)}
        {this.props.componente.mode === "button" ? (
          <Button isStatic>{this.preparePrinter(this.props)}</Button>
        ) : (
          this.preparePrinter(this.props)
        )}
      </div>
    );
  }
}

export default Printer;
