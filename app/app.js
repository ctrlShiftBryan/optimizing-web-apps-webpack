// import "@babel/polyfill"
// import "core-js/es6/promise";
import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

//trigger polyfill example for promise
// Promise.resolve(1);

angular.module("solitaire", ["klondike", "ngDraggable"]);
