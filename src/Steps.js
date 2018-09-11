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
import holi, { steps, ops } from "./data/data";
import { dict } from "./dictionary/dict";
import { isOneOf } from "./aux/functions";
import Table from "./components/Table";
import TableEmpty from "./components/TableEmpty";

class Steps extends Component {
  checkCondition(line) {
    if (line["condition"] != undefined) {
      //console.log(componente["condition"]);
      var conditionReady = line["condition"].replace(
        /(\@)(\w*)/g,
        "this.props.varsMap.$2"
      );
      var conditionResult = eval(conditionReady);
      //console.log(conditionResult + " que viene de " + conditionReady);
      return conditionalResult;
    }
  }
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
  renderComponent(componente) {
    // If is simple
    if (typeof componente == "string") {
      var componentString = componente;
      var componente = { type: null };
      componente["type"] = dict[componentString.charAt(0)].type;
      //console.log(dict[componentString.charAt(0)]);
      componente["origin"] = "string";

      try {
        if (!componentString.charAt(1).isOneOf(["-", ":", "X"])) {
          componente["mode"] =
            dict[componentString.charAt(0)].mode[componentString.charAt(1)];
        }
      } catch (error) {
        alert(
          "Error: " + error + " en componente " + JSON.stringify(componente)
        );
      }
      //3rd char not includes - neither :
      if (!["-", ":"].includes(componentString.charAt(2))) {
        componente["color"] =
          dict[componentString.charAt(0)].color[componentString.charAt(2)];
      }
      let tempSliced = componentString.slice(0, componentString.indexOf(":"));
      componente["code"] = tempSliced.slice(tempSliced.indexOf("-") + 1);

      componente["name"] = componentString.slice(
        componentString.indexOf(":") + 1,
        componentString.type === "S"
          ? componentString.lastIndexOf(":")
          : undefined
      );
      componente["options"] = componentString.slice(
        componentString.lastIndexOf(":") + 1
      );
    }
    switch (componente.type) {
      case "Input":
        return (
          <Field>
            <Label>{componente.name}</Label>
            <Control>
              <Input
                key={componente.name}
                isColor=""
                value={this.props.varsMap[componente.code]}
                type={componente.mode}
                placeholder={componente.code}
                onChange={event =>
                  this.props.updateVarsMap(componente.code, event.target.value)
                }
              />
            </Control>
          </Field>
        );
      case "Title":
        return (
          <Title hasTextAlign="centered" isSize={3}>
            {componente.name}
          </Title>
        );
      case "Uploader":
        return (
          <Uploader
            code={componente.code}
            mode={componente.mode}
            color={componente.color}
          />
        );
      case "Button":
        return (
          <Field>
            <div style={{ textAlign: componente.mode == "Label" && "center" }}>
              {componente.mode == "Label" && <Label>Datos de empleados </Label>}

              <Button isColor="info" isSize={3}>
                {componente.name}
              </Button>
            </div>
          </Field>
        );
      case "Datasheet":
        if (componente.mode == "edit") {
          return <TableEmpty titles={["Holi", "hola", "empleados"]} rows={5} />;
        }
        if ((componente.mode = "view")) {
          return (
            <TableEmpty
              titles={["Holi", "hola", "empleados"]}
              grid={this.props.varsMap[componente.code]}
            />
          );
        }

      case "Notification":
        const contenido = componente.name;
        return (
          <Notification
            isColor={componente.color}
            style={{ whiteSpace: "pre-line" }}
          >
            {contenido}
          </Notification>
        );
      case "Especial":
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
                        this.props.updateState("empleados", event.target.value)
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
                    {!this.props.tablaIniciada ? "Crear tabla" : "Editar datos"}
                  </Button>
                </Column>
              ) : (
                <Column> {" " + " "} </Column>
              )}
            </Columns>
          </div>
        );
      case "Select":
        return (
          <Field>
            <Label>{componente.name}</Label>
            <Control>
              <Select
                isColor={componente.color}
                key={componente.code}
                value={this.props.varsMap[componente.code]}
                isFullWidth
                onChange={event =>
                  this.props.updateVarsMap(componente.code, event.target.value)
                }
              >
                <option style={{ display: "none" }} />
                {ops[componente.options].map(x => <option>{x}</option>)}
              </Select>
            </Control>
          </Field>
        );
      default:
        return null;
    }
  }

  renderLine(line) {
    if (typeof line == "string") {
      var componente = line;
      return this.renderComponent(componente);
    } else {
      switch (Object.keys(line)[0]) {
        case "H":
          return (
            <Columns>
              {line.H.map(
                y =>
                  typeof y == "string" ? (
                    <Column key={y}> {this.renderComponent(y)} </Column>
                  ) : (
                    //recursive till ending component nesting
                    this.renderLine(y)
                  )
              )}
            </Columns>
          );
        case "C":
          console.log(JSON.stringify(line.C));
          return <div key={line.C}> {this.renderComponent(line.C)} </div>;
        default:
          return null;
      }
    }
  }

  renderBox(boxContent, boxTitle = "") {
    return (
      <Box style={{ padding: "0px" }}>
        <Printer bold title centered background="#0864cf" color="white">
          {boxTitle}{" "}
        </Printer>
        <Tile
          key={JSON.stringify(boxContent)}
          isChild
          render={props => (
            <Box {...props}>{boxContent.map(x => this.renderLine(x))}</Box>
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
