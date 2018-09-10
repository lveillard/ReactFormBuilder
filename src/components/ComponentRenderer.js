import React, { Component } from "react";
import Printer from "./Printer";
import Uploader from "./Uploader";

import Table from "./Table";
import TableEmpty from "./TableEmpty";

import {
  Columns,
  Column,
  Field,
  Label,
  Control,
  Card,
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
  Help,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardFooter,
  ModalCardBody,
  Delete,
  Content,
  Message,
  MessageHeader,
  MessageBody
} from "bloomer";
import { steps, ops } from "../data";

class ComponentRenderer extends Component {
  prepareMessage(name) {
    const final = name + "\n holi" + "holi2";
    return final;
  }
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
      var name = component.slice(
        nameOrigin + 1,
        type == "S" ? component.lastIndexOf(":") : undefined
      );

      switch (type) {
        case "I":
          var InputType = "none";
          if (mode == "T") {
            InputType = "text";
          }
          if (mode == "N") {
            InputType = "number";
          }

          return (
            <Field>
              <Label>{name}</Label>
              <Control>
                <Input
                  key={name}
                  isColor=""
                  value={this.props.form[code]}
                  type={InputType}
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
          console.log(component);
          return (
            <Title hasTextAlign="centered" isSize={3}>
              {name}
            </Title>
          );
        case "U":
          return <Uploader code={code} />;
        case "D":
          return <TableEmpty titles={["Holi", "hola", "empleados"]} />;
        case "N":
          const contenido = name;
          return (
            <Notification style={{ whiteSpace: "pre-line" }}>
              {contenido}
            </Notification>
          );
        case "M":
          return (
            <div>
              <Columns>
                <Column>
                  <Label> Número de empleados </Label>
                  <Control>
                    {this.props.tablaIniciada ? (
                      <Printer value={this.props.grid.length - 1}>
                        {this.props.grid.length - 1}
                      </Printer>
                    ) : (
                      <Input
                        isColor=""
                        value={this.props.empleados}
                        type="number"
                        min="0"
                        onChange={event =>
                          this.props.updateState(
                            "empleados",
                            event.target.value
                          )
                        }
                      />
                    )}
                  </Control>
                </Column>
                {this.props.empleados ? (
                  <Column hasTextAlign="centered">
                    <Label>Datos de empleados </Label>
                    <Button
                      isColor="info"
                      isSize={3}
                      onClick={() => {
                        if (
                          this.props.empleados - this.props.grid.length + 1 >
                          0
                        ) {
                          this.addEmployee(
                            this.props.empleados - this.props.grid.length + 1
                          );
                        }
                        this.props.updateState("tablaIniciada", true);
                        this.props.updateModal(true);
                      }}
                    >
                      {!this.props.tablaIniciada
                        ? "Crear tabla"
                        : "Editar datos"}
                    </Button>
                  </Column>
                ) : (
                  <Column> {" " + " "} </Column>
                )}
              </Columns>
            </div>
          );

        case "E":
          return <div />;
        case "S":
          var options = component.slice(component.lastIndexOf(":") + 1);
          return (
            <Field>
              <Label>{name}</Label>
              <Control>
                <Select
                  key={code}
                  value={this.props.form[code]}
                  isFullWidth
                  onChange={event =>
                    this.props.updateForm(code, event.target.value)
                  }
                >
                  <option style={{ display: "none" }} />
                  {ops[options].map(x => <option>{x}</option>)}
                </Select>
              </Control>
            </Field>
          );
        default:
          return null;
      }
    }
  }

  render() {
    return <div className="Steps">{this.renderComponent(this.props.temp)}</div>;
  }
}

export default ComponentRenderer;
