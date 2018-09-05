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
    var type = component.charAt(0);
    var mode = component.charAt(1);
    var nameOrigin = component.indexOf(":");
    var code = component.slice(0, nameOrigin);
    var name = component.slice(nameOrigin + 1);

    console.log(code);
    switch (type) {
      case "I":
        return (
          <Field>
            <Label>{name}</Label>
            <Control>
              <Input
                value={this.props.form[code]}
                type="text"
                placeholder="Text Input"
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

  renderStep() {}

  renderBox(boxContent) {
    return (
      <Tile
        isChild
        render={props => (
          <Box {...props}>
            {console.log(boxContent)}
            {boxContent.map(x => this.renderComponent(x))}
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
    console.log(a1[0][0].charAt(0));

    const contenido = steps.Steps[this.props.step].content.map(x => (
      <Tile isAncestor>{x}</Tile>
    ));

    return (
      <div className="Steps">
        {/*Step 1*/}
        {this.props.step == 0 ? (
          <Section>
            <Tile isAncestor>
              <Tile isVertical isParent>
                {this.renderBox(a1[0])}
                <Tile
                  isChild
                  render={props => (
                    <Box {...props}>
                      <Title>Identificación de la empresa</Title>
                    </Box>
                  )}
                />
                <Tile
                  isChild
                  render={props => (
                    <Box {...props}>
                      <Title>Identificación de la empresa</Title>
                      <Field>
                        <Label>NIF (CIF)</Label>
                        <Control>
                          <Input
                            value={this.props.form["NIF"]}
                            type="text"
                            placeholder="Text Input"
                            onChange={event =>
                              this.props.updateForm("NIF", event.target.value)
                            }
                          />
                        </Control>
                      </Field>
                      <Field>
                        <Label>Nombre fiscal</Label>
                        <Control>
                          <Input
                            value={this.props.form["Fiscal"]}
                            type="text"
                            placeholder="Text Input"
                            onChange={event =>
                              this.props.updateForm(
                                "Fiscal",
                                event.target.value
                              )
                            }
                          />
                        </Control>
                      </Field>
                    </Box>
                  )}
                />
                <Tile
                  isChild
                  render={props => (
                    <Box {...props}>
                      <Title>Representante Legal</Title>
                      <Columns isMobile>
                        <Column>
                          <Field>
                            <Label>Nombre</Label>
                            <Control>
                              <Input
                                value={this.props.form["Fiscal"]}
                                type="text"
                                placeholder="Text Input"
                                onChange={event =>
                                  this.props.updateForm(
                                    "Fiscal",
                                    event.target.value
                                  )
                                }
                              />
                            </Control>
                          </Field>
                        </Column>
                        <Column>
                          <Field>
                            <Label>Apellidos</Label>
                            <Control>
                              <Input
                                value={this.props.form["Fiscal"]}
                                type="text"
                                placeholder="Text Input"
                                onChange={event =>
                                  this.props.updateForm(
                                    "Fiscal",
                                    event.target.value
                                  )
                                }
                              />
                            </Control>
                          </Field>
                        </Column>
                      </Columns>
                    </Box>
                  )}
                />
              </Tile>
            </Tile>
          </Section>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Steps;
