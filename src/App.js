import React, { Component } from "react";
import Steps from "./Steps";
import CustomModal from "./components/CustomModal";

import {
  Container,
  Box,
  Tabs,
  Tab,
  TabList,
  TabLink,
  Icon,
  Button
} from "bloomer";

import { steps, modals } from "./data/data";

import { db, auth, storage } from "./firebase";
import Console from "./components/Console";
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

// this lets the console read the object "data"s
var tabla = cabecera.concat(vacias);

class App extends Component {
  constructor(props) {
    super(props);

    this.updateVarsMap = this.updateVarsMap.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateModalsMap = this.updateModalsMap.bind(this);
    this.updateState = this.updateState.bind(this);
    this.send = this.send.bind(this);
    this.evaluate = this.evaluate.bind(this);

    this.state = {
      step: 0,
      progress: 0,
      modal: 0,
      empleados: null,
      tablaIniciada: false,
      grid: tabla,
      user: null,
      authed: false,

      varsMap: {
        test: "54"
      },
      modalsMap: {
        modalTest: false
      }
    };
  }

  evaluate(content) {
    try {
      let evaluado = JSON.stringify(eval(content));

      return evaluado;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
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

  updateModalsMap(field, value = !this.state.modal) {
    let loli = Object.assign({}, this.state.modalsMap); //creating copy of object
    loli[field] = value; //updating value
    this.setState({ modal: loli });
  }

  updateState(field, value) {
    this.setState({ [field]: value });
  }

  updateVarsMap(field, value) {
    let jasper = Object.assign({}, this.state.varsMap); //creating copy of object
    jasper[field] = value; //updating value
    this.setState({ varsMap: jasper });
  }

  send() {
    db.collection("test")
      .add({
        info: this.state.varsMap
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    // modales
    const m = Object.entries(modals.Modals).map(x => (
      //this.checkCondition(x[1].condition) &&
      <CustomModal
        key={JSON.stringify(x)}
        modalContent={x[1]}
        modalsMap={this.state.modalsMap}
        updateModalsMap={this.updateModalsMap}
        varsMap={this.state.varsMap}
        updateVarsMap={this.updateVarsMap}
      />
    ));

    //app normal
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
        <React.Fragment>{m}</React.Fragment>

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
            varsMap={this.state.varsMap}
            updateVarsMap={this.updateVarsMap}
            updateProgress={this.updateProgress}
            updateState={this.updateState}
            progress={this.state.progress}
            send={this.send}
            empleados={this.state.empleados}
            tablaIniciada={this.state.tablaIniciada}
            grid={this.state.grid}
          />
          <Console evaluate={this.evaluate} active={true} />
        </div>
      </div>
    );
  }
}

export default App;
