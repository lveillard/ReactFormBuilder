import React, { Component } from "react";
import Steps from "./Steps";
import { Container, Box, Tabs, Tab, TabList, TabLink, Icon } from "bloomer";

import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import steps from "./data";
//import Steps, { Step } from "rc-steps";

const a = Object.entries(steps.Steps).map(x => <li>{x[1].name}</li>);

class App extends Component {
  constructor(props) {
    super(props);

    this.updateForm = this.updateForm.bind(this);

    this.state = {
      step: 0,
      form: {
        test: "54"
      }
    };
  }

  updateForm(field, value) {
    let jasper = Object.assign({}, this.state.form); //creating copy of object
    jasper[field] = value; //updating value
    this.setState({ form: jasper });
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
          />
        </div>
      </div>
    );
  }
}

export default App;
