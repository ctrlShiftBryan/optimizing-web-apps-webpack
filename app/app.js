// import "@babel/polyfill"
// import "core-js/es6/promise";

// optional way to use a loader on a single module
// import "tee-loader!./klondike/scoring.js";

// only run this loader
// import "!!tee-loader!./klondike/scoring.js";
import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

//trigger polyfill example for promise
// Promise.resolve(1);

angular.module("solitaire", ["klondike", "ngDraggable"]);
