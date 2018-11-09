import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import Tweet from '../components/Tweet';
import twitterLogo from '../../src/twitter.svg';
import './Timeline.css';

class Timeline extends Component {
  state = {
    newTwitter: '',
    tweets: []
  }
  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    this.setState({ tweets: response.data }) 
  }

  handleInputChange = e => {
    this.setState({ newTwitter: e.target.value });
  }

  handleNewTweet = async e => {
    if(e.keyCode !== 13) return;
    const author = localStorage.getItem('@goTwitter:username');
    const content = this.state.newTwitter;
    this.setState({ newTwitter: ''})
    await api.post('tweets', { author, content });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');
    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets]})
    })
    
    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet
      )})
    })

  }

  render() {

    return(
      <div className="timeline-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form>
          <textarea 
            placeholder="O que esta acontencendo?"
            value={this.state.newTwitter}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
          />
        </form>
        <ul className="tweet-list">
          {
            this.state.tweets.map(tweet => (
              <Tweet key={tweet._id} tweet={tweet}/>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Timeline;