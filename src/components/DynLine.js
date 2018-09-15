import React from "react";
import ReactDOM from "react-dom";
import { Columns, Column } from "bloomer";
import DynComp from "./DynComp";

class DynLine extends React.Component {
  checkCondition(condition) {
    if (condition != undefined) {
      //console.log(componente["condition"]);
      console.warn(condition);
      var conditionReady = condition.replace(
        /(\@)(\w*)/g,
        "this.props.varsMap.$2"
      );
      console.warn("conditionReady " + conditionReady);

      var conditionResult = eval(conditionReady);
      //console.log(conditionResult + " que viene de " + conditionReady);
      return conditionResult;
    } else {
      return "holi";
    }
  }

  render() {
    var line = this.props.line;
    return (
      <React.Fragment>
        {typeof line == "string" ? (
          <DynComp
            line={line}
            varsMap={this.props.varsMap}
            updateVarsMap={this.props.updateVarsMap}
          />
        ) : Object.keys(line)[0] == "C" &&
        this.checkCondition(line.C.condition) ? (
          <DynComp
            line={line.C}
            varsMap={this.props.varsMap}
            updateVarsMap={this.props.updateVarsMap}
          />
        ) : Object.keys(line)[0] == "H" ? (
          <Columns>
            {line.H.map(
              y =>
                typeof y == "string" ? (
                  <Column key={JSON.stringify(y)}>
                    {" "}
                    <DynComp
                      key={JSON.stringify(y)}
                      line={y}
                      varsMap={this.props.varsMap}
                      updateVarsMap={this.props.updateVarsMap}
                    />{" "}
                  </Column>
                ) : (
                  //recursive till ending component nesting
                  this.checkCondition(y.C.condition) && (
                    <Column key={JSON.stringify(y)}>
                      <DynLine
                        line={y}
                        varsMap={this.props.varsMap}
                        updateVarsMap={this.props.updateVarsMap}
                      />
                    </Column>
                  )
                )
            )}
          </Columns>
        ) : null}
      </React.Fragment>
    );
  }
}

export default DynLine;
