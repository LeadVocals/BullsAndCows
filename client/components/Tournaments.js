//client/components/GameTypes.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import AddTournament from './AddTournament';
import UpdateTournament from './UpdateTournament';
import DeleteTournament from './DeleteTournament';
import $ from 'jquery';

var querystring = require('querystring');
class Tournaments extends React.Component {
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
		  		},
		  		data: []    
	  		}
	  this.getData = this.getData.bind(this);
	  
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
	        this.changePage('home');
	      }
	      
	    }
    changePage(page){
    	$("#tournaments_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    
    getData(ev){
	    axios.get('/getAllTournaments')
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="tournaments_div" style={this.state.style}>
		     	<center><WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME"></WoodenButton> <br /></center>
		   	
		   		
		   		<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Name</th>
				            <th className='button-col'>Game Type</th>
				            <th className='button-col'>Start</th>
				            <th className='button-col'>End</th>
				            <th className='button-col'>Update</th>
				            <th className='button-col'>Delete</th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(tour){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{tour.name}</td>
				                <td className='button-col'>{tour.game_type}</td>
				                <td className='button-col'>{tour.start_date.substring(0,10)}</td>
				                <td className='button-col'>{tour.end_date.substring(0,10)}</td>
				                <td className='button-col'><UpdateTournament tournament={tour} /></td>
				                <td className='button-col'><DeleteTournament id={tour._id} tournament={tour} /></td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
				<center><AddTournament /></center>

		   	</Thumbnail>
   		</div>
      )
   }
}
export default Tournaments;