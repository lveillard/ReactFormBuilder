import React from "react";
import ReactDOM from "react-dom";

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

class CustomModal extends React.Component {
  render() {
    return (
      <div className={"CustomModal"}>
        <Modal isActive={true}>
          <ModalBackground />
          <ModalCard style={{ width: "94%" }}>
            <ModalCardHeader>
              <ModalCardTitle>{this.props.componente.name}</ModalCardTitle>
              <Delete
                onClick={() =>
                  this.props.updateVarsMap(
                    this.props.componente.code,
                    this.props.varsMap[!this.props.componente.code]
                  )
                }
              />
            </ModalCardHeader>
            <ModalCardBody />
            <ModalCardFooter>
              <Button onClick={() => console.log("guardar")} isColor="info">
                Guardar
              </Button>
            </ModalCardFooter>
          </ModalCard>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
