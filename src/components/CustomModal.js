import React from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
import TableEmpty from "./TableEmpty";
import DynBox from "./DynBox";

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
  constructor(props) {
    super(props);
    this.props.updateModalsMap(this.props.modalContent.code);
  }

  render() {
    var content = this.props.modalContent;
    var map = this.props.modalsMap;
    var thisOne = this.props.modalsMap[content.code];
    var button = content.button;

    return (
      <div className={"CustomModal"}>
        <Modal isActive={this.props.varsMap[button]}>
          <ModalBackground />
          <ModalCard style={{ width: this.props.modalContent.width }}>
            <ModalCardHeader>
              {console.log(this.props)}
              <ModalCardTitle>{this.props.modalContent.title}</ModalCardTitle>
              <Delete
                onClick={() =>
                  this.props.updateVarsMap(button, !this.props.varsMap[button])
                }
              />
            </ModalCardHeader>
            <ModalCardBody>
              {" "}
              {this.props.modalContent.content.map(x => (
                <React.Fragment key={JSON.stringify(x)}>
                  <DynBox
                    boxContent={x}
                    varsMap={this.props.varsMap}
                    updateVarsMap={this.props.updateVarsMap}
                  />{" "}
                </React.Fragment>
              ))}
            </ModalCardBody>

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
