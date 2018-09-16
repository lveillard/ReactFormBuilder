import React from "react";
import ReactDOM from "react-dom";
import { Message, MessageHeader, MessageBody } from "bloomer";

class MessageWH extends React.Component {
  render() {
    return (
      <div className={"field"}>
        <Message isColor={this.props.componente.color}>
          <MessageHeader>
            <p>{this.props.componente.title}</p>
          </MessageHeader>
          <MessageBody>
            <p>{this.props.componente.name}</p> <br />
            {this.props.componente.mode == "bullets" &&
              this.props.componente.bullets && (
                <ul style={{ listStyleType: "disc" }}>
                  {this.props.componente.bullets.map(x => <li key={x}>{x}</li>)}
                </ul>
              )}
          </MessageBody>
        </Message>
      </div>
    );
  }
}

export default MessageWH;
