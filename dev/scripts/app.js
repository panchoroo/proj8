import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './components/exerciseForm';

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
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const workoutApp = firebase.database().ref(`/users/${user.uid}`);

        workoutApp.on('value', (snapshot) => {
          const workout = [];
          let workoutInfo = snapshot.val();
          for (let exercise in workoutInfo) {
            console.log('exercise', exercise);
            // let ex = foods[food];
            // newFood.id = food;
            // workout.push(newFood);
          }
          this.setState({
            user,
            loggedIn: true,
            workout
          })
        });
      }
    });    
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        const workoutApp = firebase.database().ref(`/users/${user.uid}`)

        const workout = [];
        workoutApp.on('value', (snapshot) => {
          const workout = [];
          let workoutInfo = snapshot.val();
          for (let workouts in workoutInfo) {
            console.log('workouts', workouts);
            for (let w in workouts){
              workout.push(w);
            }
          }
        });
        this.setState({
          user,
          loggedIn: true,
          workout
        })
        console.log('workout', this.state.workout)
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false,
          workout: []
        })
      });
  }

  addItem(item) {
    // console.log('user add item', this.state.user)
    const newDate = new Date();
    let dateString = '';
    // Get the month, day, and year.  
    dateString += (newDate.getMonth() + 1) + '-';
    dateString += newDate.getDate() + '-';
    dateString += newDate.getFullYear(); 
    console.log(dateString);
    const workoutApp = firebase.database().ref(`/users/${this.state.user.uid}/${dateString}`);
    workoutApp.push(item);
  }

  render() {
    return (
      <div>
        <header className='flex'>
          <h1>💪 Workout App</h1>
          
          <div className="flex">
            {this.state.user ? <h3>{`Welcome, ${this.state.user.displayName.split(' ')[0]}!`}</h3>: ''}

            {this.state.loggedIn ? <a href="" onClick={this.logout}>Log out</a> : <a href="" onClick={this.login}>Log in</a>}
          </div>
          
        </header>

        <ExerciseForm submitForm={this.addItem} />

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
