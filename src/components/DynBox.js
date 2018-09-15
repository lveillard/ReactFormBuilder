import React, { Component } from "react";
import Printer from "./Printer";
import Uploader from "./Uploader";
import DynLine from "./DynLine";

import Table from "./Table";
import TableEmpty from "./TableEmpty";

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
            <Section>
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
              <Printer bold title centered background="#ffdd57" color="#856514">
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
