import React from 'react';
import Sidebar from './Sidebar';


const App = ({children, deckId}) => {
  return (
    <div className='app'>
      <h1>{deckId}</h1>
      <Sidebar/>
      {children}
    </div>
  )
}

// export default connect(mapStateToProps)(App);
export default App;
