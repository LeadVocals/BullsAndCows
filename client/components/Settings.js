//client/components/Settings.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import $ from 'jquery';
import GameTypes from './GameTypes';
import Users from './Users';
import Tournaments from './Tournaments';

var querystring = require('querystring');
class Settings extends React.Component {
constructor() {
      super();
      let backgroundImage = '../../images/inside_bg.jpg';
      this.onClick = this.onClick.bind(this);
	  this.state={
		  		style:{
		  			'fontSize': '16px',
		  			'backgroundImage': 'url('+backgroundImage+')',
		  			'display': 'none',
		  			'backgroundSize':'cover',
		  			'width':'100%',
		  			'maxWidth':'500px',
		  			'height':'666px',
		  			'maxHeight':'666px'
		  		}
	  		}
	  
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
	        this.changePage('home');
	      }
	     if(e.target.id == 'game_types_button'){
	     	this.changePage('game_types');
	     }
	     if(e.target.id == 'users_button'){
	     	this.changePage('users');
	     }
	     if(e.target.id == 'users_button'){
	     	this.changePage('users');
	     }
	     if(e.target.id == 'tournaments_button'){
	     	this.changePage('tournaments');
	     }
	    }
    changePage(page){
    	$("#settings_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="settings_div" style={this.state.style}>
		     <center>
		     	<br />
		     	<WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME"></WoodenButton> <br />
		   		<WoodenButton id="users_button" style="width:25% !important" onClick={this.onClick} value="USERS"></WoodenButton> <br />
		   		<WoodenButton id="game_types_button" style="width:25% !important" onClick={this.onClick} value="GAME TYPES"></WoodenButton> <br />
		   		<WoodenButton id="tournaments_button" style="width:25% !important" onClick={this.onClick} value="TOURNAMENTS"></WoodenButton> <br />
		   	</center>
		   	</Thumbnail>
		   	<GameTypes />
		   	<Users />
		   	<Tournaments />
   		</div>
      )
   }
}
export default Settings;