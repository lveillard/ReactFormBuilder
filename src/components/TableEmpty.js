import React from "react";
import ReactDOM from "react-dom";

import ReactDataSheet from "react-datasheet";
// Be sure to include styles at some point, probably during your bootstrapping
import "react-datasheet/lib/react-datasheet.css";

import "./table.css";

class TableEmpty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        [
          { value: "tete", readOnly: true },
          { value: "Apellido", readOnly: true },
          { value: "C", readOnly: true },
          { value: "D", readOnly: true }
        ],
        [
          { value: "Manolo" },
          { value: "García" },
          { value: null },
          { value: null }
        ],
        [{ value: null }, { value: null }, { value: null }, { value: null }],
        [{ value: 1 }, { value: null }, { value: null }, { value: null }],
        [{ value: 2 }, { value: null }, { value: null }, { value: null }]
      ]
    };
  }

  componentWillMount() {
    const rowsNumber = this.props.rows;
    const titles = this.props.titles.map(x => ({ value: x, readOnly: true }));
    const row = this.props.titles.map(x => ({ value: null }));
    const temp = Array(rowsNumber).fill(row);
    temp.unshift(titles);
    this.setState({ grid: temp });
  }

  render() {
    return (
      <div className={"sheet-container"}>
        <ReactDataSheet
          className="custom-sheet"
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          onCellsChanged={changes => {
            const grid = this.props.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.props.updateState("grid", grid);
          }}
        />
      </div>
    );
  }
}

export default TableEmpty;
