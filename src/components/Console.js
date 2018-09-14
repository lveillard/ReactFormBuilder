import React from "react";
import ReactDOM from "react-dom";
import { Input, Notification, Section, Control, Icon } from "bloomer";

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: " ",
      eval: ""
    };
  }
  evaluated() {
    try {
      let evaluado = JSON.stringify(eval(this.state.content));

      return evaluado;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
  }
  render() {
    return (
      <div className={"Console"}>
        {this.props.active ? (
          <div style={{}}>
            <Notification
              style={{ padding: "0px" }}
              isColor="dark"
              color="white"
            >
              <Section style={{ padding: "1rem" }}>
                {this.props.evaluate(this.state.content)}
              </Section>
              <Control hasIcons="left">
                <Input
                  style={{
                    backgroundColor: "rgb(34, 34, 34)",
                    color: "rgb(180, 154, 69)",
                    height: "30px"
                  }}
                  //autoFocus
                  value={this.state.content}
                  className="consola"
                  type="text"
                  name="consola"
                  id="consola"
                  placeholder="Prueba un comando"
                  onKeyPress={this.handleKeyPress}
                  onChange={event =>
                    this.setState({ content: event.target.value })
                  }
                />
                <Icon isSize="large" isAlign="left">
                  <span className="fas fa-terminal" aria-hidden="true" />
                </Icon>
              </Control>
            </Notification>{" "}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Console;
