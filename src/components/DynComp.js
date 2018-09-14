import React, { Component } from "react";
import Printer from "./Printer";
import Uploader from "./Uploader";

import Table from "./Table";
import TableEmpty from "./TableEmpty";
import CustomModal from "./CustomModal";
("");

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

import { ops, funcs } from "../data/data";

class DynComp extends React.Component {
  render() {
    return (
      <div key={this.props.componente.id} className={"field"}>
        {/*CONSOLE*/}

        {this.props.componente.type && console.log(this.props.componente)}

        {/*PRINTER*/}

        {this.props.componente.type == "Printer" && (
          <Printer> {this.props.componente.name} </Printer>
        )}

        {/*TITLE*/}

        {this.props.componente.type == "Title" && (
          <Title> {this.props.componente.name} </Title>
        )}

        {/*DATASHEET*/}

        {this.props.componente.type == "Datasheet" && (
          <TableEmpty titles={["holi", "hola"]}> holi </TableEmpty>
        )}

        {/*MODAL*/}
        {this.props.componente.type == "Modal" && (
          <CustomModal
            updateVarsMap={this.props.updateVarsMap}
            varsMap={this.props.varsMap}
            componente={this.props.componente}
          />
        )}

        {/*INPUT*/}

        {this.props.componente.type == "Input" && (
          <Field>
            <Label>{this.props.componente.name}</Label>
            <Control>
              <Input
                key={this.props.componente.name}
                isColor=""
                value={this.props.varsMap[this.props.componente.code]}
                type={this.props.componente.mode}
                placeholder={this.props.componente.code}
                onChange={event =>
                  this.props.updateVarsMap(
                    this.props.componente.code,
                    event.target.value
                  )
                }
              />
            </Control>
          </Field>
        )}

        {/*SELECT*/}

        {this.props.componente.type == "Select" && (
          <Field>
            <Label>{this.props.componente.name}</Label>
            <Control>
              <Select
                isColor={this.props.componente.color}
                key={this.props.componente.code}
                value={this.props.varsMap[this.props.componente.code]}
                isFullWidth
                onChange={event =>
                  this.props.updateVarsMap(
                    this.props.componente.code,
                    event.target.value
                  )
                }
              >
                <option style={{ display: "none" }} />
                {this.props.componente.extras &&
                  ops[this.props.componente.extras].map(x => (
                    <option>{x}</option>
                  ))}
              </Select>
            </Control>
          </Field>
        )}

        {/*BUTTON*/}

        {this.props.componente.type == "Button" && (
          <Field>
            <div
              style={{
                textAlign: this.props.componente.mode == "Label" && "center"
              }}
            >
              {this.props.componente.mode == "Label" && (
                <Label>
                  {//if is type label but no content, then <br/>
                  this.props.componente.label ||
                    this.props.componente.extras || <br />}
                </Label>
              )}

              <Button
                isColor="info"
                isSize={3}
                onClick={() => {
                  //if it has a function we run it
                  this.props.componente.function
                    ? funcs[this.props.componente.function](this.props)
                    : this.props.updateVarsMap(
                        this.props.componente.code,
                        !this.props.varsMap[this.props.componente.code]
                      );
                }}
              >
                {this.props.componente.name}
              </Button>
            </div>
          </Field>
        )}

        {/*UPLOADER*/}

        {this.props.componente.type == "Uploader" && (
          <Uploader
            code={this.props.componente.code}
            mode={this.props.componente.mode}
            color={this.props.componente.color}
          />
        )}

        {/*NOTIFICATION*/}

        {this.props.componente.type == "Notification" && (
          <Notification
            isColor={this.props.componente.color}
            style={{ whiteSpace: "pre-line" }}
          >
            {this.props.componente.name}
          </Notification>
        )}

        {/*EMPTY*/}

        {this.props.componente.type == "Empty" && (
          <Column>
            <br />
          </Column>
        )}
      </div>
    );
  }
}

export default DynComp;
