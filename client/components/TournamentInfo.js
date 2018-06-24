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
class TournamentInfo extends React.Component {
constructor() {
      super();
      let backgroundImage = '../../images/inside_bg.jpg';
      this.onClick = this.onClick.bind(this);
      this.getData = this.getData.bind(this);
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
		  		},
		  		data: []
	  		}
	  
    }
    onClick(e) {
 		if (e.target.id == "play_tournaments_button") {
	        this.changePage('play_tournaments');
	      }
	    }
    changePage(page){
    	$("#tournament_info_div").css('display','none');
    	window.localStorage.setItem('tour_id',0);
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    
    getData(ev){
	    axios.get('/getTournamentScores?tour_id='+window.localStorage.getItem('tour_id'))
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="tournament_info_div" style={this.state.style}>
		     	<center>
		     	<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Username</th>
				            <th className='button-col'>Number</th>
				            <th className='button-col'>Tries</th>
				            <th className='button-col'>Total time</th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(game){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{game.username}</td>
				                <td className='button-col'>{game.gen_number}</td>
				                <td className='button-col'>{game.tries}</td>
				                <td className='button-col'>{game.total_time} s</td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
		     	
		     	<WoodenButton id="play_tournaments_button" style="width:25% !important" onClick={this.onClick} value="BACK"></WoodenButton>
		     	</center>
		   	</Thumbnail>
   		</div>
      )
   }
}
export default TournamentInfo;