import React from "react";
import ReactDOM from "react-dom";

import GameContainer from "./js/components/container/GameContainer";

const wrapper = document.getElementById("game-area");
wrapper ? ReactDOM.render(<GameContainer />, wrapper) : false;
