import React, { Component } from 'react';
import '../App.css';

class ShortPet extends Component {
    render() {
        return (
            <p key={this.props._id}>
                {this.props.name} | {this.props.type}
            </p>
        );
    }
}

export default ShortPet;