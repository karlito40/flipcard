(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';

      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

var _addDeck = function _addDeck(name) {
  return {
    type: 'ADD_DECK',
    data: name
  };
};
var _showAddDeck = function _showAddDeck() {
  return { type: 'SHOW_ADD_DECK' };
};
var _hideAddDeck = function _hideAddDeck() {
  return { type: 'HIDE_ADD_DECK' };
};

var cards = function cards(state, action) {
  switch (action.type) {
    case 'ADD_CARD':
      var newCard = Object.assign({}, action.data, {
        score: 1,
        id: Date.now()
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }
};

var decks = function decks(state, action) {
  switch (action.type) {
    case 'ADD_DECK':
      var newDeck = {
        name: action.data,
        id: Date.now()
      };

      return state.concat([newDeck]);

    default:
      return state || [];
  }
};

var addingDeck = function addingDeck(state, action) {
  switch (action.type) {
    case 'SHOW_ADD_DECK':
      return true;
    case 'HIDE_ADD_DECK':
      return false;
    default:
      return state || false;
  }
};

var store = Redux.createStore(Redux.combineReducers({
  cards: cards,
  decks: decks,
  addingDeck: addingDeck
}));

var App = function App(props) {
  return React.createElement(
    'div',
    { className: 'app' },
    props.children
  );
};

var Sidebar = React.createClass({
  displayName: 'Sidebar',
  componentDidUpdate: function componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  },
  render: function render() {
    var _this = this;

    var props = this.props;

    return React.createElement(
      'div',
      { className: 'sidebar' },
      React.createElement(
        'h2',
        null,
        ' All Decks '
      ),
      React.createElement(
        'button',
        { onClick: function onClick(e) {
            return _this.props.showAddDeck();
          } },
        'New Deck'
      ),
      React.createElement(
        'ul',
        null,
        props.decks.map(function (deck, i) {
          return React.createElement(
            'li',
            { key: i },
            ' ',
            deck.name,
            ' '
          );
        })
      ),
      props.addingDeck && React.createElement('input', { ref: 'add', onKeyPress: this.createDeck })
    );
  },
  createDeck: function createDeck(evt) {
    if (evt.which !== 13) return;
    var name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }
});

function run() {
  var state = store.getState();

  ReactDOM.render(React.createElement(
    App,
    null,
    React.createElement(Sidebar, {
      decks: state.decks,
      addingDeck: state.addingDeck,
      addDeck: function addDeck(name) {
        return store.dispatch(_addDeck(name));
      },
      showAddDeck: function showAddDeck() {
        return store.dispatch(_showAddDeck());
      },
      hideAddDeck: function hideAddDeck() {
        return store.dispatch(_hideAddDeck());
      }
    })
  ), document.getElementById('root'));
}
run();
store.subscribe(run);

window.show = function () {
  return store.dispatch(_showAddDeck());
};
window.hide = function () {
  return store.dispatch(_hideAddDeck());
};
window.add = function () {
  return store.dispatch(_addDeck(Date.now()));
};

},{}]},{},[1]);
