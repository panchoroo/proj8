import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './components/exerciseForm';
import WorkoutItem from './components/workoutItem';
import ExerciseItem from './components/exerciseItem';

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
      allWorkouts: [],
      allDates:[],
      toggleAdd: false,
      toggleDate: false,
      dateString: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleAddFunction = this.toggleAddFunction.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  componentDidMount() {
    this.getDate();
    console.log('date set', this.state.dateString)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const workoutApp = firebase.database().ref(`/users/${user.uid}`);

        workoutApp.on('value', (snapshot) => {
          const allWorkouts = [];
          const allDates = [];

          let workoutInfo = snapshot.val();
          for (let date in workoutInfo) {
            const workoutsOnDate = [];
            const workouts = workoutInfo[date];
            allDates.push(date);
            for (let ex in workouts) {
              let exercise = workouts[ex];
              exercise['key'] = ex;
              workoutsOnDate.push(exercise);
            }
            allWorkouts.push(workoutsOnDate);
          }
          allWorkouts.reverse();
          allDates.reverse();
          console.log('date set', this.state.dateString)
          
          this.setState({
            user,
            loggedIn: true,
            allWorkouts,
            allDates
          })
        });
      }
    });    
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        // console.log('all workouts', this.state.allWorkouts);
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false,
          allWorkouts: [],
          allDates: []
        })
      });
  }

  getDate() {
    const newDate = new Date();
    let dateString = '';
    // Get the month, day, and year  
    dateString += (newDate.getMonth() + 1) + '-';
    dateString += newDate.getDate() + '-';
    dateString += newDate.getFullYear(); 
    console.log('dateString',dateString);
    this.setState({
      dateString
    })
  }

  addItem(item) {
    let date = this.state.dateString;
    const newItem = {
      currentItem: item.currentItem,
      currentDescription: item.currentDescription,
      currentReps: item.currentReps
    }
    console.log('date additem', date)
    console.log('item additem', item.currentItem)
    console.log(`/users/${this.state.user.uid}/${date}/`)
    // const workoutApp = firebase.database().ref(`/users/${this.state.user.uid}/${date}`);
    const workoutApp = firebase.database().ref(`/users/TgYMXxNaP5UNT1HqtZCXgAKACLn1/1-16-2018`);
    
    workoutApp.push(newItem);
  }

  toggleAddFunction(e) {
    e.preventDefault();
    let toggleAdd = true;
    if (this.state.toggleAdd) {
      toggleAdd = false;
    }
    this.setState({
      toggleAdd
    })
  }

  deleteItem(date, index) {
    firebase.database().ref(`/users/${this.state.user.uid}/${date}/${index}`).remove();
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

        <button onClick={this.toggleAddFunction}>Add Exercise</button>
        {this.state.toggleAdd ? <ExerciseForm submitForm={this.addItem} date={this.state.dateString} allWorkouts={this.state.allWorkouts}/> : ''} 

        <section className='workouts'>
          <ul className='workoutsByDate'>
            {this.state.allDates.map((eachDate, index) => {
              return <WorkoutItem item={this.state.allWorkouts} date={eachDate} key={eachDate} index={index} delete= {this.deleteItem}/>
            })}
          </ul>
        </section>

      </div>
    )
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));
