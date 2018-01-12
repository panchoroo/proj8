import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './components/exerciseForm';
import WorkoutItem from './components/workoutItem';

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
          for (let date in workoutInfo) {
            console.log('date', date);
            const workoutsOnDate = workoutInfo[date];
            for (let ex in workoutsOnDate) {
              console.log('ex', workoutsOnDate[ex]);
              let exercise = workoutsOnDate[ex];
              workout.push(exercise);
            }
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
        const workout = [];
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
    const newDate = new Date();
    let dateString = '';
    // Get the month, day, and year  
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

            {this.state.loggedIn ? <a href='' onClick={this.logout}>Log out</a> : <a href='' onClick={this.login}>Log in</a>}
          </div>
          
        </header>

        <ExerciseForm submitForm={this.addItem} />

        <section className='workouts'>
          <ul className='workoutsByDate'>
            {console.log('workout before', this.state.workout)}
            {this.state.workout.map((eachDate) => {
              return <WorkoutItem item={eachDate} date={eachDate} key={eachDate} />
              // delete= { this.deleteItem } edit={this.editItem}
            })}
          </ul>
        </section>

      </div>
    )
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));
