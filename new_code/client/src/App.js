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
      name: '',
      edit_id: '',
      logged_in: false,
      show_sign_up: false,
      show_log_in: false,
      countup: 0,
      //imgColors: ['blue'['green', 'red', 'orange'], 'black'['white', 'grey']],
      purpleRain: "I never meant to cause you any sorrow I never meant to cause you any pain I only wanted to one time to see you laughing I only wanted to see you Laughing in the purple rain Purple rain, purple rain Purple rain, purple rain Purple rain, purple rain I only wanted to see you Bathing in the purple rain I never wanted to be your weekend lover I only wanted to be some kind of friend Baby, I could never steal you from another It's such a shame our friendship had to end Purple rain, purple rain Purple rain, purple rain Purple rain, purple rain I only wanted to see you Underneath the purple rain Honey, I know, I know I know times are changing It's time we all reach out For something new, that means you too You say you want a…",
      vermillion: "She seems dressed in all the rings Of past fatalaties So fragile yet so devious She continues to see it Climatic hands that press Her temples and my chest Enter the night that she came home Forever Oh (She's the only one that makes me sad) She is everything and more The solemn hypnotic My Dahlia bathed in possession She is home to me I get nervous, perverse, when I see her it's worse But the stress is astounding It's now or never she's coming home Forever Oh (she's the only one that makes me sad) (Coming alive, she's coming alive) Hard to say what caught my attention Vixen crazy, aphid attraction Carve my name in my face to recognize Such a pheromone cult to terrorize I won't let this build up inside of me I won't let this build up inside of me I won't let this…",
      myAge: "I took her out, it was a Friday night I wore cologne to get the feeling right We started making out and she took off my pants But then I turned on the TV And that's about the time she walked away from me Nobody likes you when you're twenty three And I'm still more amused by TV shows What the hell is A.D.D.? My friends say I should act my age What's my age again, what's my age again? Then later on, on the drive home I called her mom from a pay phone I said I was the cops And your husband's in jail The state looks down on sodomy And that's about the time that bitch hung up on me Nobody likes you when you're twenty three And I'm still more amused by prank phone calls What the hell is call ID? My friends say I should act my age What's my age again, what's my age…",
      dummyData: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], [234234, 345535, 12212, 98998, 5654645]],
      dummyLinks: ['https://media0.giphy.com/media/f50TuQCGUAYH6/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media1.giphy.com/media/3nfqWYzKrDHEI/giphy.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=giphy.webp',
        'https://media1.giphy.com/media/ahZZZZFGLGhvq/giphy.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=giphy.webp',
        'https://media3.giphy.com/media/12M8qP3VZ2t9Hq/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media0.giphy.com/media/BCnVuGI1PhLIk/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media0.giphy.com/media/wR7LHlfuRUjHW/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media1.giphy.com/media/nfecRCYP9PjO/giphy.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=giphy.webp',
        'https://media3.giphy.com/media/rmcyMhjLgSy7m/giphy.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=giphy.webp',
        'https://media2.giphy.com/media/WYBano4Ss5tba/giphy.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=giphy.webp',
        'https://media1.giphy.com/media/pjpWzzg1rLpVS/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media3.giphy.com/media/x7cwP4C2zmZX2/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media0.giphy.com/media/z3ZbOJQFm3MeQ/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media1.giphy.com/media/bxlLaYqgzrRug/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media0.giphy.com/media/Vn4Ofa3hpsQVi/200.webp?cid=790b7611cf1004654aa0f4f44c279eb4523ef5c8a97cdc47&rid=200.webp',
        'https://media3.giphy.com/media/BAWymSReovQK4/giphy.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=giphy.webp',
        'https://media0.giphy.com/media/z5jELT6R0Fu5W/200.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=200.webp',
        'https://media0.giphy.com/media/2JAatOVkTgSXK/200.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=200.webp',
        'https://media0.giphy.com/media/BQhJeCwC8LZfy/200.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=200.webp',
        'https://media3.giphy.com/media/o7SIEhe8XbkT6/giphy.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=giphy.webp',
        'https://media0.giphy.com/media/yLykXDjLduAtG/200.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=200.webp',
        'https://media2.giphy.com/media/Zz87iUH6uWTW8/giphy.webp?cid=790b7611b1c172898cc519db1ad2991c3e9291eb5b0e2351&rid=giphy.webp'



      ]
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
      let placeholder = this.state.purpleRain.split(' ')
      let dummyData = [...this.state.dummyData, this.state.dummyData[0]];
      this.setState({ pets, dummyData })
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
    let password = inputs[2].value;
    let passwordConf = inputs[4].value;

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
    let password = inputs[2].value;


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
      name: 'Welcome',
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
  /*
    wordCounter = (event) => {
      if (this.state.countup < 5) {
        this.setState({
          countup: this.state.countup + 1
        });
      } else {
        this.setState({
          countup: 0
        });
        return this.state.countup
      }
      //return this.countup;
    }
  */
  wordCounter = (event) => {
    //if (this.state.countup < this.state.dummyData[1].length - 1) {
    if (this.state.countup < 150) {

      this.setState({
        countup: this.state.countup + 1
      });
    } else {
      this.setState({
        countup: 0
      });
      //return this.state.dummyData[1][this.state.countup]
    }
    //return this.countup;
  }

  lyrics = (event) => {
    this.setState({
      dummyData: [this.state.purpleRain.split(' '), this.state.vermillion.split(' '), this.state.myAge.split(' ')]
    })
  }


  componentDidMount() {
    this.lyrics();
    setInterval(this.wordCounter, 1000);
    return _loadPets()
      .then(resultingJSON => this.setState({ pets: resultingJSON }))

  }

  /*
  componentDidMount () {
    setInterval((function() {
      this.setState({
        currentImage: this.getRandomImageId()
      });
    })(), 5000)
  }
*/







  render() {
    return (
      <div className="App">
        <header>
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state.edit_id}
          </p> */}
          {/* <h1>{this.state.countup + 1}</h1> */}

          <h1>Welcome {this.state.name}</h1>
          <p>{this.state.countup % this.state.dummyData.length}</p>

          <div class='nav'>

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
                      <br></br>
                      <input type="password" name="password" placeholder="put in a password" />
                      <br></br>
                      <input type="password" name="password" placeholder="confirm your password" />
                      <br></br>
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

            {this.state.logged_in && <Form func={this.createPet} submitButton="Create Lyric Gif" />}

            {(this.state.edit_id !== "") && this.state.logged_in && <Form cssId="editForm" func={this.updatePet} submitButton="Update Lyric Gif" />}

            {(this.state.edit_id !== "") && this.state.logged_in && <a href="#" onClick={this.hideEditForm}>hide edit form</a>}




          </div>

          {this.state.logged_in && this.state.pets.map((x, index) => <Pet
            _id={x._id}
            name={x.name}
            type={x.type}
            delete={this.deletePet}
            edit={this.editPet}
            source={this.state.dummyLinks[(this.state.countup + Math.floor(Math.random() * this.state.dummyLinks.length)) % this.state.dummyLinks.length]}
            countup={this.state.dummyData[index][this.state.countup % this.state.dummyData[index].length]} />)}
          {/* countup={this.state.countup} />)} */}
          {/* {!this.state.logged_in && this.state.pets.map((x, index) => <ShortPet _id={x._id} name={x.name} type={x.type} countup={index} />)} */}
          {/* {!this.state.logged_in && this.state.pets.map((x) => <ShortPet _id={x._id} name={x.name} type={x.type} countup={this.state.countup} />)} */}
          {!this.state.logged_in && this.state.pets.map((x, index) => <ShortPet
            _id={x._id}
            name={x.name}
            type={x.type}
            source={this.state.dummyLinks[(this.state.countup + Math.floor(Math.random() * this.state.dummyLinks.length)) % this.state.dummyLinks.length]}
            countup={this.state.dummyData[index][this.state.countup % this.state.dummyData[index].length]} />)}
          {/* countup={this.state.countup} />)} */}




        </header>
      </div>
    );
  }
}

export default App;

/*
1         1   1
2         2   2
3         3   1
4         4   2
5         1   1
1         2   2
2         3   1
3         4   2
4         1   1
5         2   2
*/