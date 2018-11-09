import React, { Component } from 'react';
import api from '../services/api';

import Like from '../../src/like.svg'

export default class Tweet extends Component {
  handleLike = async () => {
    const { _id } = this.props.tweet;
    console.log(_id);
    await api.post(`/like/${_id}`);
  }

  render() {
    const { tweet } = this.props;
    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={Like} alt="Like" />
          {tweet.likes}
        </button>
      </li>
    );
  }
}