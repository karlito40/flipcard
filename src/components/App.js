import React from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import {connect} from 'react-redux';

const mapStateToProps = (props, {params: {deckId}}) => ({
  deckId
});

const App = ({children, deckId}) => {
  return (
    <div className='app'>
      <h1>{deckId}</h1>
      <Toolbar deckId={deckId}/>
      <Sidebar/>
      {children}
    </div>
  )
}

export default connect(mapStateToProps)(App);
// export default App;
