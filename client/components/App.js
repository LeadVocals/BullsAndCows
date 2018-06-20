//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
import Home from './Home';
import Settings from './Settings';
import Games from './Games';
import Game from './Game';
import Highscore from './Highscore';

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
      <Highscore></Highscore>
      </div>
    );
  }
}