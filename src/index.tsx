// React and ReactDOM have no default export so need to manually select * and name as React
import * as React from "react";
import * as ReactDOM from "react-dom";

import Game from './Game';

import './index.css';

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
