//client/components/Settings.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import $ from 'jquery';

var querystring = require('querystring');
class Game extends React.Component {
constructor() {
      super();
      let backgroundImage = '../../images/inside_bg.jpg';
      this.onClick = this.onClick.bind(this);
      this.tick = this.tick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.timer = '';
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
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
		  		},
		  		data: [],
		  		game_id: '',
		  		total_time: 0,
		  		seconds_remains: 0,
		  		tries: 0,
		  		checked_number: '',
		  		modalIsOpen: false,
		  		messageFromServer: ''
	  		}
	  
    }
    openModal() {
	    this.setState({
	      modalIsOpen: true
	    });
	  }
	closeModal() {
	    this.setState({
	      modalIsOpen: false,
	      messageFromServer: ''
	    });
	    window.localStorage.setItem('gt',0);
 		window.localStorage.setItem('diggits',0);
 		window.localStorage.setItem('total_time',0);
	    window.location.reload();
	  }
    
    handleInputChange(e){
    	if(e.target.id=='checked_number'){
    		this.setState({
				checked_number:e.target.value
			});
    	}    	
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
 			window.localStorage.setItem('gt',0);
 			window.localStorage.setItem('diggits',0);
 			window.localStorage.setItem('total_time',0);
	        window.location.reload();
	      }
	     if (e.target.id == "check_it_button") {
 			this.checkNumber(this);
	      }
	    }
	componentDidMount() {
		this.setState({
			total_time:window.localStorage.getItem('total_time'),
			seconds_remains:window.localStorage.getItem('total_time')
			});
	    this.generateNumber(this);
	    this.timer = setInterval(this.tick, 1000);
	  }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    
    tick(){
    	let second_var = 1;
        this.setState({
			seconds_remains:this.state.seconds_remains-1
		});
		if(this.state.seconds_remains==0){
			alert('GAME OVER!');
			window.localStorage.setItem('gt',0);
 			window.localStorage.setItem('diggits',0);
 			window.localStorage.setItem('total_time',0);
		}
    }
		checkNumber(ev){
			let is_current_number = /^\d+$/.test(this.state.checked_number);
			if(String(this.state.checked_number).length!=window.localStorage.getItem('diggits') || !is_current_number){
				alert('PLEASE ENTER '+window.localStorage.getItem('diggits')+' DIGIT NUMBER!');
				return;
			}
			axios.post('/check_number',
		      querystring.stringify({
		        game_id: this.state.game_id,
		        number: this.state.checked_number,
		        esplaced_time: (this.state.total_time-this.state.seconds_remains)
		      }), {
		        headers: {
		          "Content-Type": "application/x-www-form-urlencoded"
		        }
		      }).then(function(response) {
		      	if(response.data.success=='1'){
		      		ev.inputElement.click();
		      		ev.setState({
			         messageFromServer: 'SUCCESS! YOU RECOGNIZE IT FOR '+ response.data.total_time + ' SECONDS AND ' + response.data.tries + ' TRIES!'
			       });		      		
		      	}else{
		      		var triString = ev.state.checked_number + '-' + response.data.bulls + 'B,' + response.data.cows + 'C &emsp;';
					$("#tries").html(triString + $("#tries").html());
		      	}
			});
		}

	   generateNumber(ev){
		    axios.post('/generate_number',
		      querystring.stringify({
		        user_id: window.localStorage.getItem('user_id'),
		        diggits: window.localStorage.getItem('diggits')
		      }), {
		        headers: {
		          "Content-Type": "application/x-www-form-urlencoded"
		        }
		      }).then(function(response) {
		      	ev.setState({game_id: response.data.game_id});
			});
	  }
	    
render() {
      return (
        <div>
        
        	<div ref={input => this.inputElement = input} onClick={this.openModal}></div>
	         <Modal
	           isOpen={this.state.modalIsOpen}
	           onAfterOpen={this.afterOpenModal}
	           onRequestClose={this.closeModal}
	           contentLabel="SUCCESS"
	           className="Modal">
	<div className='button-center'>
	              <h3>{this.state.messageFromServer}</h3>
	              <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
	                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>OK</Button>
	              </Link>
	            </div>
          </Modal>
        
          
		     <Thumbnail id="game_div" style={this.state.style}>
		     <center>
		     	<h3>TYPE AND CHECK <label>{this.state.seconds_remains}</label></h3>
		     	<input type="number" id="checked_number" value={this.state.checked_number} onChange={this.handleInputChange} /><br />
		     	<WoodenButton id="check_it_button" style="width:25% !important" onClick={this.onClick} value="CHECK IT">
		     	</WoodenButton><br />
		     	<div id="tries">

				</div>
		     	<WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="EXIT">
		     	</WoodenButton>
		     	</center>
		   	</Thumbnail>
   		</div>
      )
   }
}
export default Game;