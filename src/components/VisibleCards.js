import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (props, {params: {deckId}}) => ({
  deckId
});
const Cards = ({deckId}) => {
  return (<div>
    Deck will display here <strong>test {deckId}</strong>
  </div>);
}

export default connect(mapStateToProps)(Cards);
