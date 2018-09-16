import React, { Component } from "react";
import Printer from "./components/Printer";
import Uploader from "./components/Uploader";
import DynComp from "./components/DynComp";
import DynLine from "./components/DynLine";
import DynBox from "./components/DynBox";

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
import Table from "./components/Table";

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

  renderComponent(componente) {
    // get props for complex
    // If is simple
    switch (componente.type) {
      case "Especial":
        const propsObj = { min: "2" };
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
                      {...propsObj}
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
                      this.props.updateModal();
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
      default:
        return null;
    }
  }

  render() {
    {
      /*const d = Object.entries(steps.Steps).map(x => console.log(x[1]));*/
    }

    return (
      <div className="Steps">
        <Modal isActive={0}>
          <ModalBackground />
          <ModalCard style={{ width: "94%" }}>
            <ModalCardHeader>
              <ModalCardTitle>Datos empleados</ModalCardTitle>
              <Delete onClick={() => this.props.updateModal()} />
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
                  {steps.Steps[this.props.step].content.map(x => (
                    <React.Fragment key={JSON.stringify(x)}>
                      <DynBox
                        boxContent={x}
                        varsMap={this.props.varsMap}
                        updateVarsMap={this.props.updateVarsMap}
                      />{" "}
                    </React.Fragment>
                  ))}
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
