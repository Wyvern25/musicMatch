import React, { Component } from 'react';
import '../App.css';

class Form extends Component {
  render() {
    return (
      <form id={this.props.cssId} onSubmit={this.props.func}>
        <input type="text" name="pet" placeholder="Artist" />
        <input type="text" name="type" placeholder="Song" />

        <button>{this.props.submitButton}</button>
      </form>
    );
  }
}

export default Form;