import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';


class ShortPet extends Component {
    render() {
        return (
            <div class='pets'>
                <p key={this.props._id}>

                    <p> Artist | Song Name</p>
                    {this.props.name} | {this.props.type}
                </p>
                <img class='gifs' src={this.props.source} /*src={logo}*/ className="App-logo" alt="logo" />
                <br></br>

                {this.props.countup}

            </div >

        );
    }
}

export default ShortPet;