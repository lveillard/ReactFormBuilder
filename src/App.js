import React, { Component } from "react";
import Steps from "./Steps";
import { Container, Box, Tabs, Tab, TabList, TabLink, Icon } from "bloomer";

import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import { steps } from "./data";

import { db, auth } from "./firebase";
//import Steps, { Step } from "rc-steps";

const a = Object.entries(steps.Steps).map(x => <li>{x[1].name}</li>);

class App extends Component {
  constructor(props) {
    super(props);

    this.updateForm = this.updateForm.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.send = this.send.bind(this);

    this.state = {
      step: 0,
      progress: 0,
      form: {
        test: "54"
      }
    };
  }
  updateProgress(total) {
    this.setState({ progress: total });
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
            progress={this.state.progress}
            send={this.send}
          />
        </div>
      </div>
    );
  }
}

export default App;
