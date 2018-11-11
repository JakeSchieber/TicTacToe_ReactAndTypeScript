import * as React from "react";

import Square from './Square';

import './index.css';

export interface IBoardProps {
  squares: string[],
  onClick: (id: number) => void 
  // onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default class Board extends React.Component <IBoardProps> {
  public render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  private renderSquare(i: number) {
    // onClick drops the mouse event but binds to the "i" from render square parameters
    return (
      <Square
        id={i}
        value={this.props.squares[i]}
        // passes "onClick" from parent
        onClick={this.props.onClick}
      />
    )
  }
}