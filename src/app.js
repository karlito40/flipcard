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


const cards = (state, action) =>{
  switch(action.type) {
    case 'ADD_CARD':
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: Date.now()
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }

}

const store = Redux.createStore(Redux.combineReducers({
  cards
}));

const App = (props) => {
  return (
    <div className='app'>
      {props.children}
    </div>
  )
}

const Sidebar = React.createClass({
  render() {
    let props = this.props;

    return (
      <div className="sidebar">
        <h2> All Decks </h2>
        <ul>
          {props.decks.map((deck, i) =>
            <li key={i}> {deck.name} </li>
          )}
        </ul>
        {props.addingDeck && <input ref='add' />}
      </div>
    )
  }
})

ReactDOM.render(<App>
  <Sidebar decks={[ {name: 'Deck 1'} ]} addingDeck={false} />
 </App>, document.getElementById('root'));

// store.subscribe(() => {
//   console.log(store.getState());
// });
// console.log('store', store)
// store.dispatch({
//   type: 'ADD_CARD',
//   data: {
//     front: 'front',
//     back: 'back'
//   }
// })
