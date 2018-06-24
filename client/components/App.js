//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from './Home';
import Settings from './Settings';
import Games from './Games';
import Game from './Game';
import Highscore from './Highscore';
import PlayTournament from './PlayTournament';

export default class App extends React.Component {
constructor() {
    super();
  }
render() {
    return (
    	<div>
      <Home></Home>
      <Settings></Settings>
      <Games></Games>
      <PlayTournament></PlayTournament>
      <Highscore></Highscore>
      </div>
    );
  }
}