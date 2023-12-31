import React, { Component } from 'react';
var firebase = require('firebase');


var config = {
 
    // apiKey: "AIzaSyCOBsZ5IfUnjiRNN2nF_TpehDcPMetcmjk",
    // authDomain: "sqlserver-project-c63df.firebaseapp.com",
    // databaseURL: "https://sqlserver-project-c63df-default-rtdb.firebaseio.com",
    // projectId: "sqlserver-project-c63df",
    // storageBucket: "sqlserver-project-c63df.appspot.com",
    // messagingSenderId: "700516941494",
    // appId: "1:700516941494:web:f8f1d64756077c0aaab017",
    // measurementId: "G-5XJHQ6KBJ4"
  };
  firebase.initializeApp(config);


class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');

      //Write a welcome message for user
      lout.classList.remove('hide');
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome "+ user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');

    //Write a thanks message for user
    lout.classList.add('hide');
  }

  google(){
    console.log("I am in google method");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });

    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });

  }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log out</button><br />
        <button onClick={this.google} id="google" className="google">Sign In with Google</button>
      </div>
    );
  }
}


export default Authen;
