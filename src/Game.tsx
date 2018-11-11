// React and ReactDOM have no default export so need to manually select * and name as React
import * as React from "react";

import Board from './Board';

import './index.css';

export interface IGameState {
  history: [{
    squares: string[]
  }],
  stepNumber: number,
  xIsNext: boolean
}

export default class Game extends React.Component<{}, IGameState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      // prefill history with the starting state and initial turn.
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
    // bind parent state to "this" in click handler
    // this.handleClick.bind(this);
  }

  public render() {
    const history = this.state.history;
    // current is equal to the latest value in history as determined by "stepNumber" (powers jumpTo logic)
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // Create the list move list elements to insert into game log
    // TODO - what is move and step???
    // "map" is sent currValue and currIndex as params
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move : // value to show for move 1 and up
        'Go to game state'; // value to show for 0th move
      return (
        <li key={move}>
          {/*<button onClick={() => this.jumpTo(move)}>{desc}</button>*/}
          <button onClick={this.jumpTo}>{desc}</button>
        </li>
      );
    })

    // Calculate text to insert in game status block
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // The game defines the squares state logic and passes down the state and handleClick funciton as props to board
    return (
      <div className="game">
        <div className="game-board">
          <Board  
            squares={current.squares}
            // TODO - how to prevent lamba here? This was a problem in Board as well.
            // TODO - the right thing to do is to pass the function and then call the functions based on the properties.
            // onClick={(i) => this.handleClick(i)}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  private handleClick (i: number) {
  // private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(this.props);
    console.log(this.state);
    console.log(i);

    // this.setState({});
    
    // TODO - what is this in this context?
    /*
    // If prevState is used to inform next state then must send setState a function with appropriate logic.
    this.setState((prevState, props) => {
      // Create copy of the squares state, set selected value to X, then override state
      // "immutable" data allows for easier react update detection and enables state history tracking
      // This creates a "pure component" which make it easier for "shouldComponentUpdate" to detect changes and re-render components
      // TODO - explain how history works here.
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      // Take no action if a winner has been declared or if square already filled.
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      
      return {
        history: history.concat([{
          squares
        }]),
        stepNumber: history.length,
        xIsNext: !prevState.xIsNext
      }
    });
    */
  }

  // Allow user to go back in time to previous game state.
  // Changing stepNumber in state causes a re-render which will then change the "current" state.
  // Dependant variables also updated (xIsNext)
  /*
  private jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  */
  private jumpTo(e: React.MouseEvent<HTMLElement>) {
    // console.log(e);
    /* TODO
    this.setState({
      stepNumber: this.props.step,
      xIsNext: (this.props.step % 2) === 0
    });
    */
  }
}

function calculateWinner(squares: string[]) {
  // Hard coded list of winning line combinations as defined by our squares array
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // for (let i=0; i<lines.length; i++) {
  for (const line of lines) {
    // Set a, b and c with respect to index 0, 1, 2
    // a/b/c in this case will be equal to 'X', 'O' or null.
    // initial check added at front so that 3 nulls do not trigger a win
    const [a, b, c] = line;
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}