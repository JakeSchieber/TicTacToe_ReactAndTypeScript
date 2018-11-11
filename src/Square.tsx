import * as React from 'react';

import './index.css';

export interface ISquareProps {
  id: number,
  value: string, 
  onClick: (id: number) => void // (e: React.MouseEvent<HTMLElement>) => void // 
  // onClick: (e: React.MouseEvent<HTMLElement>) => void
}

// Square here is a "controlled component" which means that it does not track state and that it is purely controlled by the properties sent down to it from the parent.
export default class Square extends React.Component <ISquareProps> {
  public render() {
    return (
      <button
        className="square"
        onClick={this.handleClick}
        // onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
  // Bind "this" with "public class fields syntax".  Drop click and make call to onClick with id.
  public handleClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.onClick(this.props.id);
  }
}