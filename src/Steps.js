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
  Title,
  Select
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
      var code = component.slice(0, nameOrigin);
      var name = component.slice(nameOrigin + 1);
      console.log("code: " + code);

      switch (type) {
        case "I":
          return (
            <Field>
              <Label>{name}</Label>
              <Control>
                <Input
                  key={code}
                  value={this.props.form[code]}
                  type="text"
                  placeholder={code}
                  onChange={event =>
                    this.props.updateForm(code, event.target.value)
                  }
                />
              </Control>
            </Field>
          );
        case "T":
          return <Title isSize={3}>{name}</Title>;
        case "S":
          return (
            <Field>
              <Label>Select:</Label>
              <Control>
                <Select isFullWidth>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </Select>
              </Control>
            </Field>
          );
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

    return (
      <div className="Steps">
        <Columns isCentered>
          <Column isSize={8}>
            <Section>
              <Tile isAncestor>
                <Tile isVertical isParent>
                  {steps.Steps[this.props.step].content
                    .map(x => x.box)
                    .map(x => this.renderBox(x))}
                </Tile>
              </Tile>
            </Section>
          </Column>
        </Columns>
      </div>
    );
  }
}

export default Steps;
