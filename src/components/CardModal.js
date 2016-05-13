import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';


const CardModal = React.createClass({

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.front).focus();
  },

  render() {
    let {card, onDelete} = this.props;

    return (<div className="modal">
      <h1> { onDelete ? 'Edit': 'New' } Card </h1>
      <label>Card Front: </label>
      <textarea ref='front' defaultValue={card.front}></textarea>
      <label>Card Back: </label>
      <textarea ref='back' defaultValue={card.back}></textarea>
      <p>
        <button onClick={this.onSave}> Save Card </button>

        <Link className='btn' to={`/deck/${card.deckId}`}> Cancel </Link>
        {onDelete ?
          <button onClick={this.onDelete} className='delete'> Delete Card </button> :
          null
        }
      </p>

    </div>
    )

  },

  onDelete(e) {
    this.props.onDelete(this.props.card.id);
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  },

  onSave(evt) {
    var front = ReactDOM.findDOMNode(this.refs.front);
    var back = ReactDOM.findDOMNode(this.refs.back);

    var toSave = Object.assign({}, this.props.card, {
      front: front.value,
      back: back.value
    })
    this.props.onSave(toSave);

    browserHistory.push(`/deck/${this.props.card.deckId}`);

  }
})


export default CardModal;
