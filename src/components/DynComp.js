import React, { Component } from "react";
import Printer from "./Printer";
import Uploader from "./Uploader";

import Table from "./Table";
import TableEmpty from "./TableEmpty";
import CustomModal from "./CustomModal";
import { dict } from "../dictionary/dict";

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
  prepare(line) {
    if (typeof line == "string") {
      var componente = {};
      let splitted = line.split("··");
      let generator = splitted[0].split("@")[0];
      try {
        componente.type = dict[generator.charAt(0)].type;
      } catch (error) {
        console.error("Data.js bad format, line: " + line);
      }
      try {
        componente.mode = dict[generator.charAt(0)].mode[generator.charAt(1)];
      } catch (error) {
        componente.mode = "X";
      }
      try {
        componente.color = dict[generator.charAt(0)].color[generator.charAt(2)];
      } catch (error) {
        componente.color = "X";
      }
      componente.code = splitted[0].split("@")[1];
      componente.name = splitted[1];
      componente.extras = splitted[2];
      componente.origin = "string";
    }
    // Preparing complex componente
    else {
      var componente = line;
      var ObjProps = componente.props;
    }
    return componente;
  }
  render() {
    var componente = this.prepare(this.props.line);

    return (
      <div key={componente.id} className={"field"}>
        {/*CONSOLE*/}

        {componente.type && console.log(componente)}

        {/*PRINTER*/}

        {componente.type == "Printer" && <Printer> {componente.name} </Printer>}

        {/*TITLE*/}

        {componente.type == "Title" && <Title> {componente.name} </Title>}

        {/*DATASHEET*/}

        {componente.type == "Datasheet" && (
          <TableEmpty titles={["holi", "hola"]}> holi </TableEmpty>
        )}

        {/*MODAL*/}
        {componente.type == "Modal" && (
          <CustomModal
            updateVarsMap={this.props.updateVarsMap}
            varsMap={this.props.varsMap}
            componente={componente}
          />
        )}

        {/*INPUT*/}

        {componente.type == "Input" && (
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
        )}

        {/*SELECT*/}

        {componente.type == "Select" && (
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
                {componente.extras &&
                  ops[componente.extras].map(x => <option>{x}</option>)}
              </Select>
            </Control>
          </Field>
        )}

        {/*BUTTON*/}

        {componente.type == "Button" && (
          <Field>
            <div
              style={{
                textAlign: componente.mode == "Label" && "center"
              }}
            >
              {componente.mode == "Label" && (
                <Label>
                  {//if is type label but no content, then <br/>
                  componente.label || componente.extras || <br />}
                </Label>
              )}

              <Button
                isColor={componente.color || "info"}
                isSize={3}
                onClick={() => {
                  //if it has a function we run it
                  componente.function
                    ? funcs[componente.function](this.props)
                    : this.props.updateVarsMap(
                        componente.code,
                        !this.props.varsMap[componente.code]
                      );
                }}
              >
                {componente.name}
              </Button>
            </div>
          </Field>
        )}

        {/*UPLOADER*/}

        {componente.type == "Uploader" && (
          <Uploader
            code={componente.code}
            mode={componente.mode}
            color={componente.color}
          />
        )}

        {/*NOTIFICATION*/}

        {componente.type == "Notification" && (
          <Notification
            isColor={componente.color}
            style={{ whiteSpace: "pre-line" }}
          >
            {componente.name}
          </Notification>
        )}

        {/*EMPTY*/}

        {componente.type == "Empty" && (
          <Column>
            <br />
          </Column>
        )}
      </div>
    );
  }
}

export default DynComp;
