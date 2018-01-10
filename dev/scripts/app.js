import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './exerciseForm';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfAXV9F7xqOalWzBPFRXzfnb6G1H7oBlw",
  authDomain: "workout-app-4f669.firebaseapp.com",
  databaseURL: "https://workout-app-4f669.firebaseio.com",
  projectId: "workout-app-4f669",
  storageBucket: "",
  messagingSenderId: "701827082182"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      workout: []
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          loggedIn: true
        })
      }
    });
    const workoutApp = firebase.database().ref('/workout-app/users/amie');
    workoutApp.on('value', (snapshot) => {
      const workout = [];
      let workoutInfo = snapshot.val();
      for (let exercise in workoutInfo) {
        console.log(exercise);
        // let newFood = foods[food];
        // newFood.id = food;
        // workout.push(newFood);
      }
      this.setState({
        workout
      })
    });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        this.setState({
          loggedIn: true
        })
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false
        })
      });
  }

  addItem(item) {
    const workoutApp = firebase.database().ref('/workout-app/users/amie');
    workoutApp.push(item);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Workout App</h1>
          
          {this.state.user ? <h3>{`Welcome, ${this.state.user.displayName.split(' ')[0]}!`}</h3>: ''}

          {this.state.loggedIn ? <a href="" onClick={this.logout}>Logout</a> : <a href="" onClick={this.login}>Login</a>}
        </header>

        <ExerciseForm submitForm={this.addItem} />

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
