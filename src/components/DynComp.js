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

import { ops } from "../data/data";

class DynComp extends React.Component {
  render() {
    return (
      <div className={"field"}>
        {
          {
            Console: console.log(this.props.componente),
            Printer: <Printer> holi </Printer>,
            Title: <Title> hola </Title>,
            Button: (
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

                  <Button isColor="info" isSize={3}>
                    {this.props.componente.name}
                  </Button>
                </div>
              </Field>
            ),
            Empty: (
              <Column>
                <br />
              </Column>
            ),
            Notification: (
              <Notification
                isColor={this.props.componente.color}
                style={{ whiteSpace: "pre-line" }}
              >
                {this.props.componente.name}
              </Notification>
            ),
            Uploader: (
              <Uploader
                code={this.props.componente.code}
                mode={this.props.componente.mode}
                color={this.props.componente.color}
              />
            ),
            Input: (
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
            )
          }[this.props.componente.type]
        }
      </div>
    );
  }
}

export default DynComp;
