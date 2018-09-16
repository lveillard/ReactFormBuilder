import React from "react";
import ReactDOM from "react-dom";

import ReactDataSheet from "react-datasheet";
// Be sure to include styles at some point, probably during your bootstrapping
import "react-datasheet/lib/react-datasheet.css";

import "./table.css";

class Datasheet extends React.Component {
  getDefault(rows) {
    const rowsNumber = parseInt(rows);
    const titles = this.props.titles.map(x => ({ value: x, readOnly: true }));
    const emptyRow = this.props.titles.map(x => ({ value: null }));
    const defaultGrid = Array(rowsNumber || 2).fill(emptyRow);
    defaultGrid.unshift(titles);
    return defaultGrid;
  }
  componentWillMount() {
    this.props.updateVarsMap(
      this.props.componente.code,
      this.getDefault(this.props.rows)
    );
  }

  render() {
    return (
      <div className={"sheet-container"}>
        <ReactDataSheet
          className="custom-sheet"
          data={
            this.props.varsMap[this.props.componente.code] ||
            this.getDefault(this.props.rows)
          }
          valueRenderer={cell => cell.value}
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          onCellsChanged={changes => {
            const grid = this.props.varsMap[this.props.componente.code].map(
              row => [...row]
            );
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.props.updateVarsMap(this.props.componente.code, grid);
          }}
        />
      </div>
    );
  }
}

export default Datasheet;
