import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';

class Pet extends Component {
  render() {
    return (
      <div class='pets'>
        <p key={this.props._id}>
          <p> Artist | Song Name</p>
          {this.props.name} | {this.props.type}
          <br></br>
          <button onClick={this.props.delete} data-id={this.props._id}>x</button>
          | <a onClick={this.props.edit} href="#" data-id={this.props._id} data-name={this.props.name} data-type={this.props.type}>edit</a>
        </p>
        <img class='gifs' src={this.props.source} /*src={logo}*/ className="App-logo" alt="logo" />
        <br></br>

        {this.props.countup}
      </div>
    );
  }
}

export default Pet;