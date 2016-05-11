import * as reducers from './reducers';
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import App from './components/App';
import Sidebar from './components/Sidebar';

const store = createStore(combineReducers(reducers));

function run() {
  let state = store.getState();
  ReactDOM.render(<Provider store={store}>
      <App>
        <Sidebar />
      </App>
    </Provider>
   , document.getElementById('root'));

}
run();
store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(Date.now()));
