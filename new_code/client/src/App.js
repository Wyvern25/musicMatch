import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { _loadPets, _deletePet, _createPet, _updatePet } from './services/PetService';
import { _signUp, _login } from './services/AuthService';
import Pet from './components/Pet';
import ShortPet from './components/ShortPet';
import Form from './components/Form';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pets: [{ _id: 1, name: 'fido' }, { _id: 2, name: 'snowflake' }],
      name: 'Welcome',
      edit_id: '',
      logged_in: false,
      show_sign_up: false,
      show_log_in: false

    }

    // this.editPet = this.editPet.bind(this);
  }

  // deletePet() {
  //   alert('hi');
  // }

  getToken = () => {
    return localStorage.getItem('token');
  }

  deletePet = (event) => {

    //in button below add a data attribute with the pet's id

    var id = event.target.getAttribute('data-id');

    return _deletePet(id, this.getToken()).then(deletedPetId => {

      let pets = this.state.pets.filter(pet => pet._id !== deletedPetId)

      this.setState({ pets })
    })

  }

  createPet = (event) => {
    event.preventDefault();

    let name = event.target.children[0].value;
    let type = event.target.children[1].value;

    return _createPet(name, type, this.getToken()).then(rj => {
      let pets = [...this.state.pets, rj];
      this.setState({ pets })
    })
  }

  updatePet = (event) => {
    event.preventDefault();

    let form = event.target;

    let updatedId = this.state.edit_id;
    let name = form.children[0].value;
    let type = form.children[1].value;

    return _updatePet(updatedId, name, type, this.getToken()).then(updatedPet => {

      let pets = this.state.pets.map(oldPet => {
        //if the pet in this.state.pets is not the pet we updated then leave it alone
        if (oldPet._id !== updatedId) return oldPet;
        else return updatedPet;
      })

      this.setState({ pets })
    })
  }

  editPet = (event) => {
    event.preventDefault();

    let name = event.target.getAttribute('data-name');
    let type = event.target.getAttribute('data-type');

    this.setState({
      edit_id: event.target.getAttribute('data-id')
    }, function () {

      let form = document.querySelector('#editForm');

      form.children[0].value = name;
      form.children[1].value = type;

    })


  }

  hideEditForm = (event) => {
    event.preventDefault();

    this.setState({ edit_id: "" })
  }

  signUp = (event) => {
    event.preventDefault();

    let inputs = event.target.children;

    let username = inputs[0].value;
    let password = inputs[1].value;
    let passwordConf = inputs[2].value;

    if (password === passwordConf) {

      return _signUp(username, password).then(res => {
        // this.setState({ userID })
        console.log(res);
        alert(res.message)
      });

    } else {
      alert('your password and password confirmation have to match!')
    }

  }

  login = (event) => {
    event.preventDefault();

    let inputs = event.target.children;

    let username = inputs[0].value;
    let password = inputs[1].value;

    return _login(username, password).then(res => {
      if (res.token) {
        this.setState({ logged_in: true }, function () {
          localStorage.setItem('token', res.token);
          this.setState({ name: username })
        });
      } else {
        alert('you were not logged in')
      }
    });
  }

  logout = (event) => {
    event.preventDefault();

    this.setState({ logged_in: false }, function () {
      localStorage.removeItem('token');
    });
    this.setState({
      name: '',
      show_log_in: false
    })
  }

  show_log_in = (event) => {
    event.preventDefault();
    if (this.state.show_log_in == false) {
      this.setState({ show_log_in: true })
    } else { this.setState({ show_log_in: false }) }
    this.setState({ show_sign_up: false })
  }

  show_sign_up = (event) => {
    event.preventDefault();
    if (this.state.show_sign_up == false) {
      this.setState({ show_sign_up: true })
    } else { this.setState({ show_sign_up: false }) }
    this.setState({ show_log_in: false })
  }


  componentDidMount() {
    return _loadPets()
      .then(resultingJSON => this.setState({ pets: resultingJSON }))
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state.edit_id}
          </p>

          <h1>{this.state.name}</h1>

          {!this.state.logged_in &&
            <div>

              <div>
                <form id="showsignup" onSubmit={this.show_sign_up}>
                  <button>Sign Up</button>
                </form>

              </div>

              {this.state.show_sign_up &&
                <div>
                  <h2>Sign Up</h2>

                  <form id="signUpForm" onSubmit={this.signUp}>
                    <input type="text" name="username" placeholder="put in a username" />
                    <input type="password" name="password" placeholder="put in a password" />
                    <input type="password" name="password" placeholder="confirm your password" />

                    <button>Confirm</button>
                  </form>
                  <br></br>
                </div>}



              <div>
                <form id="showlogin" onSubmit={this.show_log_in}>
                  <button>Log In</button>
                </form>

              </div>


              {this.state.show_log_in &&
                <div>
                  <h2>Log In</h2>

                  <form id="logInForm" onSubmit={this.login}>
                    <input type="text" name="username" placeholder="put in a username" />
                    <br></br>
                    <input type="password" name="password" placeholder="put in a password" />
                    <br></br>
                    <button>Confirm</button>
                  </form>
                  <br></br>
                </div>}

              <br /><br /><br />
            </div>}

          {this.state.logged_in &&

            <div>
              <h2>Sign Out</h2>

              <form id="logOutForm" onSubmit={this.logout}>
                <button>Log Out</button>
              </form>

              <br /><br /><br />
            </div>}

          {this.state.logged_in && <Form func={this.createPet} submitButton="make pet" />}

          {(this.state.edit_id !== "") && <Form cssId="editForm" func={this.updatePet} submitButton="update pet" />}

          {(this.state.edit_id !== "") && <a href="#" onClick={this.hideEditForm}>hide edit form</a>}

          {this.state.logged_in && this.state.pets.map((x) => <Pet _id={x._id} name={x.name} type={x.type} delete={this.deletePet} edit={this.editPet} />)}

          {!this.state.logged_in && this.state.pets.map((x) => <ShortPet _id={x._id} name={x.name} type={x.type} />)}


          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;