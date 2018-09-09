import React, { Component } from "react";
import Steps from "./Steps";
import { Container, Box, Tabs, Tab, TabList, TabLink, Icon } from "bloomer";

import { steps } from "./data";

import { db, auth, storage } from "./firebase";

//import Steps, { Step } from "rc-steps";
const cabecera = [
  [
    { value: "Nombre*", readOnly: true },
    { value: "Apellidos*", readOnly: true },
    { value: "Teléfono", readOnly: true },
    { value: "Email personal*", readOnly: true },
    { value: "Cuenta bancaria*", readOnly: true },
    { value: "Saldo de vacaciones*", readOnly: true },
    { value: "Fin de contrato temporal", readOnly: true },
    { value: "¿No residente?", readOnly: true },
    { value: "Fecha de nacimiento", readOnly: true }
  ]
];

const vacias = Array(1).fill([
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

var tabla = cabecera.concat(vacias);

const a = Object.entries(steps.Steps).map(x => <li>{x[1].name}</li>);

class App extends Component {
  constructor(props) {
    super(props);

    this.updateForm = this.updateForm.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.updateState = this.updateState.bind(this);
    this.send = this.send.bind(this);

    this.state = {
      step: 0,
      progress: 0,
      modal: 0,
      empleados: null,
      tablaIniciada: false,
      grid: tabla,
      user: null,
      authed: false,

      form: {
        test: "54"
      }
    };
  }
  componentDidMount() {
    auth
      .signInAnonymously()
      .then(user => {
        this.setState({ authed: true, user: user.user.uid });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }
  componentWillUnmount() {}
  updateProgress(total) {
    this.setState({ progress: total });
  }

  updateModal(boolean) {
    this.setState({ modal: boolean });
  }

  updateState(field, value) {
    this.setState({ [field]: value });
  }

  updateForm(field, value) {
    let jasper = Object.assign({}, this.state.form); //creating copy of object
    jasper[field] = value; //updating value
    this.setState({ form: jasper });
  }

  send() {
    db.collection("test")
      .add({
        info: this.state.form
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const b = Object.entries(steps.Steps).map(x => (
      <Tab
        key={x[1].ID}
        isActive={this.state.step == x[1].ID}
        onClick={() => this.setState({ step: x[1].ID })}
      >
        <TabLink>
          <Icon isSize="small">
            <span className={x[1].icon} aria-hidden="true" />
          </Icon>
          <span>{x[1].name}</span>
        </TabLink>
      </Tab>
    ));

    const tabs = (
      <Tabs isAlign="centered">
        <TabList> {b} </TabList>{" "}
      </Tabs>
    );

    return (
      <div className="App">
        {/* <Steps current={this.state.step}>
          <Steps.Step title="first" />
          <Steps.Step title="second" />
          <Steps.Step title="third" />
          <Steps.Step title="4" />
        </Steps>{" "}*/}
        <div>
          <div>{tabs}</div>

          <Steps
            step={this.state.step}
            form={this.state.form}
            updateForm={this.updateForm}
            updateProgress={this.updateProgress}
            updateState={this.updateState}
            progress={this.state.progress}
            modal={this.state.modal}
            updateModal={this.updateModal}
            send={this.send}
            empleados={this.state.empleados}
            tablaIniciada={this.state.tablaIniciada}
            grid={this.state.grid}
          />
        </div>
      </div>
    );
  }
}

export default App;
