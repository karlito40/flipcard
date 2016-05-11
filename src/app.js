import * as reducers from './reducers';
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';


reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
  let state = store.getState();
  ReactDOM.render(<Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <Route path='/deck/:deckId' component={VisibleCards} />
        </Route>
      </Router>
    </Provider>
   , document.getElementById('root'));

}
run();
store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(Date.now()));
