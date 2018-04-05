/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__klondike_scoring_js__ = __webpack_require__("./app/klondike/scoring.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__klondike_scoring_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__klondike_scoring_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__klondike_klondike_js__ = __webpack_require__("./app/klondike/klondike.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__klondike_klondike_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__klondike_klondike_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__klondike_board_js__ = __webpack_require__("./app/klondike/board.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__klondike_board_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__klondike_board_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__klondike_game_js__ = __webpack_require__("./app/klondike/game.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__klondike_game_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__klondike_game_js__);




angular.module("solitaire", ["klondike", "ngDraggable"]);

/***/ }),

/***/ "./app/klondike/board.js":
/***/ (function(module, exports) {

(function () {
  "use strict";

  angular.module("klondike.board", ["ngRoute", "klondike.game"]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/board", {
      templateUrl: "klondike/board.html",
      controller: "KlondikeController"
    }).otherwise({
      redirectTo: "/board"
    });
  }]).controller("KlondikeController", ["$scope", "klondikeGame", "scoring", function KlondikeController($scope, klondikeGame, scoring) {
    klondikeGame.newGame();
    $scope.game = klondikeGame;
    $scope.scoring = scoring;
  }]).directive("sNoPile", function () {
    return {
      restrict: "E",
      template: "<div class=\"no-pile\"></div>"
    };
  }).directive("sTableau", function () {
    return {
      restrict: "E",
      templateUrl: "klondike/piles/tableau.html"
    };
  }).directive("sFoundation", function () {
    return {
      restrict: "E",
      templateUrl: "klondike/piles/foundation.html"
    };
  }).directive("sCard", function () {
    return {
      restrict: "A",
      templateUrl: "cards/card.html",
      scope: {
        card: "="
      }
    };
  }).directive("sRemainder", function () {
    return {
      restrict: "E",
      templateUrl: "klondike/piles/remainder.html"
    };
  }).directive("sWaste", function () {
    return {
      restrict: "E",
      templateUrl: "klondike/piles/waste.html"
    };
  });
})();

/***/ }),

/***/ "./app/klondike/game.js":
/***/ (function(module, exports) {

(function () {
  "use strict";

  angular.module("klondike.game", []).service("klondikeGame", ["scoring", KlondikeGame]);

  function KlondikeGame(scoring) {
    this.newGame = function newGame() {
      var cards = new Deck().shuffled();
      this.newGameFromDeck(cards);
    };

    this.newGameFromDeck = function (cards) {
      scoring.newGame();
      turnAllCardsDown(cards);
      this.tableaus = dealTableaus(cards);
      this.foundations = buildFoundations();
      this.remainder = dealRemainder(cards);
    };

    function turnAllCardsDown(cards) {
      cards.forEach(function (card) {
        card.turnDown();
      });
    }

    function dealTableaus(cards) {
      var tableaus = [new TableauPile(cards.slice(0, 1), scoring), new TableauPile(cards.slice(1, 3), scoring), new TableauPile(cards.slice(3, 6), scoring), new TableauPile(cards.slice(6, 10), scoring), new TableauPile(cards.slice(10, 15), scoring), new TableauPile(cards.slice(15, 21), scoring), new TableauPile(cards.slice(21, 28), scoring)];
      tableaus.forEach(function (tableau) {
        tableau.turnTopCardUp();
      });
      return tableaus;
    }

    function buildFoundations() {
      return _.range(1, 5).map(function () {
        return new FoundationPile([], scoring);
      });
    }

    function dealRemainder(cards) {
      return new RemainderPile(cards.slice(28), scoring);
    }
  }

  KlondikeGame.prototype.tryMoveTopCardToAnyFoundation = function (sourcePile) {
    if (sourcePile.isEmpty()) {
      return;
    }

    var foundationThatWillAccept = _.find(this.foundations, function (foundation) {
      return foundation.willAcceptCard(sourcePile.topCard());
    });

    if (foundationThatWillAccept) {
      foundationThatWillAccept.moveCardsFrom(sourcePile);
    }
  };
})();

/***/ }),

/***/ "./app/klondike/klondike.js":
/***/ (function(module, exports) {

angular.module("klondike", ["klondike.game", "klondike.board", "klondike.scoring"]);

/***/ }),

/***/ "./app/klondike/scoring.js":
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scoring =
/*#__PURE__*/
function () {
  function Scoring() {
    _classCallCheck(this, Scoring);

    this.score = 0;
  }

  _createClass(Scoring, [{
    key: "newGame",
    value: function newGame() {
      setTimeout(function () {
        throw "Oh really you did what...";
      }, 100);
      this.score = 0;
    }
  }, {
    key: "tableauCardTurnedUp",
    value: function tableauCardTurnedUp() {
      this.score += 5;
    }
  }, {
    key: "dropped",
    value: function dropped(source, destination) {
      this.score += scoreForMoving(source, destination) || 0;
    }
  }, {
    key: "wasteRecycled",
    value: function wasteRecycled() {
      this.score = Math.max(this.score - 100, 0);
    }
  }]);

  return Scoring;
}();

function scoreForMoving(source, destination) {
  if (destination.name === "TableauPile") {
    if (source.name === "FoundationPile") {
      return -15;
    }

    return 5;
  }

  if (destination.name === "FoundationPile") {
    if (source.name === "TableauPile" || source.name === "WastePile") {
      return 10;
    }
  }
}

console.log(ENV_IS);

if (ENV_IS_DEVELOPMENT) {
  console.log('[scoring] evaluating');
}

if (false) {
  module.hot.accept(console.log.bind(console));
  var doc = angular.element(document);
  var injector = doc.injector();

  if (injector) {
    var actualService = Object.getPrototypeOf(injector.get("scoring"));
    var newScoringService = Object.getPrototypeOf(new Scoring()); // note: just replaces functions

    Object.getOwnPropertyNames(actualService).filter(function (key) {
      return typeof actualService[key] === "function";
    }).forEach(function (key) {
      return actualService[key] = newScoringService[key];
    });
    doc.find('html').scope().$apply();
    console.info('[scoring] Hot Swapped!!');
  }
}

angular.module("klondike.scoring", []).factory("scoring", function () {
  return new Scoring();
});

/***/ })

/******/ });