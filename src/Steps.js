import React, { Component } from "react";
import Printer from "./components/Printer";
import Uploader from "./components/Uploader";
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
import { steps, ops } from "./data";

import Table from "./components/Table";
import TableEmpty from "./components/TableEmpty";

class Steps extends Component {
  removeEmployee(numero = 1) {
    if (this.props.grid.length > numero) {
      let temp = this.props.grid;
      temp.splice(-1, 1);
      this.props.updateState("grid", temp);
    }
  }
  addEmployee(numero = 1) {
    console.log(this.props.grid);
    let temp = this.props.grid;
    const vacias = Array(numero).fill([
      { value: null },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
      { value: null }
    ]);
    var final = temp.concat(vacias);
    console.log(final);
    this.props.updateState("grid", final);
  }
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
                  value={this.props.varsMap[code]}
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
          return <TableEmpty titles={["Holi", "hola", "empleados"]} rows={5} />;
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
                  value={this.props.varsMap[code]}
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

  renderBox(boxContent, boxTitle = "") {
    return (
      <Box style={{ padding: "0px" }}>
        <Printer bold title centered background="#ffdd57" color="#847425">
          {boxTitle}{" "}
        </Printer>
        <Tile
          key={JSON.stringify(boxContent)}
          isChild
          render={props => (
            <Box {...props}>
              {boxContent.map(
                x =>
                  typeof x == "string"
                    ? this.renderComponent(x)
                    : x.H && (
                        <Columns>
                          {x.H.map(y => (
                            <Column key={y}>{this.renderComponent(y)}</Column>
                          ))}
                        </Columns>
                      )
              )}
            </Box>
          )}
        />
      </Box>
    );
  }

  render() {
    {
      /*const d = Object.entries(steps.Steps).map(x => console.log(x[1]));*/
    }

    return (
      <div className="Steps">
        <Modal isActive={this.props.modal}>
          <ModalBackground />
          <ModalCard style={{ width: "94%" }}>
            <ModalCardHeader>
              <ModalCardTitle>Datos empleados</ModalCardTitle>
              <Delete onClick={() => this.props.updateModal(false)} />
            </ModalCardHeader>
            <ModalCardBody>
              <Button
                onClick={() => this.removeEmployee()}
                isColor="danger"
                isPulled="right"
                style={{ margin: "10px" }}
              >
                {" "}
                <Icon className="fas fa-user-minus" />{" "}
                <p>Eliminar último empleado</p>
              </Button>
              <Button
                onClick={() => this.addEmployee()}
                isColor="warning"
                isPulled="left"
                style={{ margin: "10px" }}
              >
                <Icon className="fas fa-user-plus" />
                <p>Añadir empleado</p>
              </Button>
              <Button
                isStatic
                style={{ margin: "10px", cursor: "auto" }}
                isColor="info"
                isPulled="left"
              >
                {this.props.grid.length - 1 + " empleados"}
              </Button>

              <Table
                updateState={this.props.updateState}
                iniciada={this.props.tablaIniciada}
                grid={this.props.grid}
              />
              <Columns>
                <Column>
                  <Message>
                    <MessageHeader>
                      <p>Email personal</p>
                    </MessageHeader>
                    <MessageBody>
                      <ul style={{ listStyleType: "disc" }}>
                        <li>El empleado recibirá las nóminas en este email</li>{" "}
                        <li>
                          En caso de activación del espacio empleado, este será
                          el email con el que el empleado pueda acceder
                        </li>{" "}
                        <li>
                          {" "}
                          De utilizar el email profesional, el empleado perdera
                          el acceso a sus nóminas si finaliza la relación
                          laboral
                        </li>
                      </ul>
                    </MessageBody>
                  </Message>
                </Column>
                <Column>
                  <Message>
                    <MessageHeader>
                      <p>Saldo de vacaciones</p>
                    </MessageHeader>
                    <MessageBody>
                      <ul style={{ listStyleType: "disc" }}>
                        <li>
                          PayFIt calculará automaticamente las vacaciones
                          disponibles, pero es necesario que conozcamos el
                          estado actual
                        </li>{" "}
                        <li>
                          El saldo que necesitamos es con fecha de final del mes
                          anterior a la entrada en PayFit
                        </li>{" "}
                        <li>
                          {" "}
                          Este dato es muy importante y tiene impacto no sólo en
                          el seguimiento de las vacaciones pero también en el
                          cálculo de finiquitos
                        </li>
                      </ul>
                    </MessageBody>
                  </Message>
                </Column>
                <Column>
                  <Message>
                    <MessageHeader>
                      <p>Fecha de fin de contrato temporal</p>
                    </MessageHeader>
                    <MessageBody>
                      <ul style={{ listStyleType: "disc" }}>
                        <li>
                          Si el contrato de este empleado es temporal,
                          necesitamos saber la fecha de finalización del mismo
                        </li>{" "}
                        <li>
                          PayFit te mantendrá informado sobre los contratos que
                          esten cerca de llegar a su fin.
                        </li>{" "}
                      </ul>
                    </MessageBody>
                  </Message>
                </Column>
              </Columns>
            </ModalCardBody>
            <ModalCardFooter>
              <Button
                onClick={() => this.props.updateModal(false)}
                isColor="info"
              >
                Guardar
              </Button>
            </ModalCardFooter>
          </ModalCard>
        </Modal>

        <Columns isCentered>
          <Column isSize={2} />
          <Column>
            <Section style={{ paddingTop: "24px" }}>
              <Columns isMobile>
                <Column>
                  <Progress
                    isColor="warning"
                    isSize="small"
                    value={Object.keys(this.props.varsMap).length}
                    max={100}
                  />
                </Column>
                <Column isSize={3} style={{ padding: "0px 12px 0px 0px" }}>
                  {false ? (
                    <Button isPulled="right" disabled isColor="warning" onClick>
                      <Icon className="fa fa-check" />
                      <p>Enviar</p>
                    </Button>
                  ) : (
                    <Button
                      isPulled="right"
                      isColor="warning"
                      onClick={() => this.props.send()}
                    >
                      <Icon className="fa fa-check" />
                      <p>Enviar</p>
                    </Button>
                  )}
                </Column>
              </Columns>

              <Tile isAncestor>
                <Tile isVertical isParent>
                  {steps.Steps[this.props.step].content.map(
                    x =>
                      x.box
                        ? this.renderBox(x.box)
                        : this.renderBox(x.titledBox.slice(1), x.titledBox[0])
                  )}
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
