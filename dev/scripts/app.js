import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

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
// add twitter also?

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          loggedIn: true
        })
      } else {
        console.log('User is logged out');
      }
    });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.log(user);
        this.setState({
          loggedIn: true
        })
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        console.log('Logging out user');
        this.setState({
          loggedIn: false
        })
      });
  }

  render() {
    return (
      <div>
        <h1>Workout App</h1>
        <a href="" onClick={this.login}>Login</a>
        <a href="" onClick={this.logout}>Logout</a>
        <p>User logged {this.state.loggedIn ? 'in' : 'out'}</p>
        {/* <p>User logged in</p> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
