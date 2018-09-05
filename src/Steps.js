import React, { Component } from "react";
import {
  Columns,
  Column,
  Field,
  Label,
  Control,
  Input,
  Container,
  Section,
  Notification,
  Tile,
  Box,
  Title
} from "bloomer";
import steps from "./data";

class Steps extends Component {
  renderComponent(component) {
    if (typeof component == "object") {
      return "holi";
    }
    if (typeof component == "string") {
      var type = component.charAt(0);
      var mode = component.charAt(1);
      var nameOrigin = component.indexOf(":");
      var codeOrigin = component.indexOf("-");
      var code = component.slice(codeOrigin + 1, nameOrigin);
      var name = component.slice(nameOrigin + 1);

      switch (type) {
        case "I":
          return (
            <Field>
              <Label>{name}</Label>
              <Control>
                <Input
                  value={this.props.form[code]}
                  type="text"
                  placeholder=""
                  onChange={event =>
                    this.props.updateForm(code, event.target.value)
                  }
                />
              </Control>
            </Field>
          );
        case "T":
          return <Title>{name}</Title>;
        default:
          return null;
      }
    }
  }

  renderBox(boxContent) {
    return (
      <Tile
        isChild
        render={props => (
          <Box {...props}>
            {console.log(boxContent)}
            {boxContent.map(
              x =>
                typeof x == "string" ? (
                  this.renderComponent(x)
                ) : (
                  <Columns>
                    {" "}
                    {x.H.map(y => <Column>{this.renderComponent(y)}</Column>)}
                  </Columns>
                )
            )}
          </Box>
        )}
      />
    );
  }

  render() {
    {
      /*const d = Object.entries(steps.Steps).map(x => console.log(x[1]));*/
    }
    const a1 = steps.Steps[this.props.step].content.map(x => x.box);
    console.log(a1);

    return (
      <div className="Steps">
        <Section>
          <Tile isAncestor>
            <Tile isVertical isParent>
              {a1.map(x => this.renderBox(x))}
            </Tile>
          </Tile>
        </Section>
      </div>
    );
  }
}

export default Steps;
