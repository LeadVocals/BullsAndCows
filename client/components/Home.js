//client/components/Home.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Thumbnail } from 'react-bootstrap'
import WoodenButton from './buttons/woodenButton';
import RegisterUser from './RegisterUser';
import UserLogin from './UserLogin';
import Game from './Game';
import $ from 'jquery';

class Home extends React.Component {
constructor(){
  super();
  let backgroundImage = '../../images/background.jpg';
  this.state={
	  		style:{
	  			'fontSize': '16px',
	  			'backgroundImage': 'url('+backgroundImage+')',
	  			'display': 'block',
	  			'backgroundSize':'cover',
	  			'width':'100%',
	  			'maxWidth':'500px',
	  			'height':'666px',
	  			'maxHeight':'666px'
	  		}
  		}
  	this.onClick = this.onClick.bind(this);
 }
 
 	onClick(e) {
 		if (e.target.id == "settings_button") {
	        this.changePage('settings');
	      }
	     if (e.target.id == "new_game_button") {
	        this.changePage('games');
	      } 
	      if (e.target.id == "highscore_button"){
	      	this.changePage('highscore');
	      }
	    }
    changePage(page){
    	$("#home_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
 
 render(){
 	let loginButton = <UserLogin />;
 	let registerButton = <RegisterUser />;
 	
 	if(typeof(window.localStorage.getItem('user_id'))!='undefined' && window.localStorage.getItem('user_id')!=null && window.localStorage.getItem('user_id')!=0){
 		loginButton = <WoodenButton value="LOGOUT" id="logout_button" onClick={this.onClick}></WoodenButton>;
 		registerButton = '';
 	}
 	if(typeof(window.localStorage.getItem('gt'))!='undefined' && window.localStorage.getItem('gt')!=null && window.localStorage.getItem('gt')!=0){
 		$("#game_div").css('display','block');
 		return (<Game />)
 	}else{
 		return (<Thumbnail id="home_div" style={this.state.style}>
   		{loginButton}{registerButton}<br />
   		<WoodenButton id="settings_button" style="width:25% !important" onClick={this.onClick} value="SETTINGS"></WoodenButton><br />
   		<WoodenButton id="new_game_button" style="width:25% !important" onClick={this.onClick} value="NEW GAME"></WoodenButton><br />
   		<WoodenButton id="highscore_button" style="width:25% !important" onClick={this.onClick} value="HIGHSCORE"></WoodenButton>
   	</Thumbnail>)
 	}
   
 }
}
export default Home;