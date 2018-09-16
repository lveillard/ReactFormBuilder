import React, { Component } from "react";
import Printer from "./Printer";
import DynLine from "./DynLine";

import { Tile, Box, Title, Section } from "bloomer";

class DynComp extends React.Component {
  render() {
    {
      var boxTitle = this.props.boxContent.titledBox
        ? this.props.boxContent.titledBox[0]
        : "";

      var boxContent =
        this.props.boxContent.box ||
        this.props.boxContent.noBox ||
        this.props.boxContent.titledBox.slice(1);
    }

    return (
      <div className={"field"}>
        <React.Fragment key={boxContent.id}>
          {/*box No Box*/}

          {this.props.boxContent.noBox ? (
            <Section style={{ padding: "0rem 1.5rem 1.5rem 1.5rem" }}>
              {boxContent.map(x => (
                <React.Fragment key={x.id}>
                  <DynLine
                    line={x}
                    varsMap={this.props.varsMap}
                    updateVarsMap={this.props.updateVarsMap}
                  />
                </React.Fragment>
              ))}
            </Section>
          ) : (
            <Box style={{ padding: "0px" }}>
              <Printer
                key={JSON.stringify(boxContent)}
                bold
                title
                componente={{}}
                centered
                background="#ffdd57"
                color="#856514"
              >
                {boxTitle}
              </Printer>
              <Tile
                key={JSON.stringify(boxContent)}
                isChild
                render={props => (
                  <Box {...props}>
                    {boxContent.map(x => (
                      <React.Fragment key={x.id}>
                        <DynLine
                          line={x}
                          varsMap={this.props.varsMap}
                          updateVarsMap={this.props.updateVarsMap}
                        />
                      </React.Fragment>
                    ))}
                  </Box>
                )}
              />
            </Box>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default DynComp;
