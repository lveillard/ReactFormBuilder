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
  Select,
  Progress,
  Button,
  Icon,
  Help
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
                  isColor=""
                  key={code}
                  value={this.props.form[code]}
                  type="text"
                  placeholder={code}
                  onChange={event =>
                    this.props.updateForm(code, event.target.value)
                  }
                />
              </Control>
              {false && (
                <Help isColor="success">This username is available</Help>
              )}
            </Field>
          );
        case "T":
          return <Title isSize={3}>{name}</Title>;
        case "S":
          return (
            <Field>
              <Label>Select:</Label>
              <Control>
                <Select
                  key={code}
                  isFullWidth
                  onChange={event =>
                    this.props.updateForm(code, event.target.value)
                  }
                >
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
          <Column isSize={2} />
          <Column>
            <Section style={{ paddingTop: "24px" }}>
              <Columns isMobile>
                <Column>
                  <Progress
                    isColor="warning"
                    isSize="small"
                    value={Object.keys(this.props.form).length}
                    max={100}
                  />
                </Column>
                <Column isSize={3} style={{ padding: "0px 12px 0px 0px" }}>
                  {false ? (
                    <Button isPulled="right" disabled isColor="warning">
                      <Icon className="fa fa-check" />
                      <p>Enviar</p>
                    </Button>
                  ) : (
                    <Button
                      isPulled="right"
                      isColor="warning"
                      onClick={() => alert("done")}
                    >
                      <Icon className="fa fa-check" />
                      <p>Enviar</p>
                    </Button>
                  )}
                </Column>
              </Columns>

              <Tile isAncestor>
                <Tile isVertical isParent>
                  {steps.Steps[this.props.step].content
                    .map(x => x.box)
                    .map(x => this.renderBox(x))}
                </Tile>
              </Tile>
            </Section>
          </Column>
          <Column isSize={2} />
        </Columns>
      </div>
    );
  }
}

export default Steps;
