//client/components/PlayTournament.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import SmallWoodenButton from './buttons/woodenButton';
import TournamentInfo from './TournamentInfo';
import $ from 'jquery';

var querystring = require('querystring');
class PlayTournament extends React.Component {
constructor() {
      super();
      let backgroundImage = '../../images/inside_bg.jpg';
      let backgroundButtonImage = '../../images/button.png';
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
	  
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
	        this.changePage('home');
	      }
	     
	    }
    changePage(page){
    	$("#play_tournaments_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    getData(ev){
	    axios.get('/getAllActiveTournaments')
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="play_tournaments_div" style={this.state.style}>
		     <center>
		     	<WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME">
		     	</WoodenButton>
		     	<br />
		     			<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Name</th>				            
				            <th className='button-col'>Start date</th>
				            <th className='button-col'>End date</th>
				            <th className='button-col'></th>
				            <th className='button-col'></th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(tour){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{tour.name}</td>
				                <td className='button-col'>{tour.start_date.substring(0,10)}</td>
				                <td className='button-col'>{tour.end_date.substring(0,10)}</td>
				                <td className='button-col'>
					                <button id="" onClick={() => {
							                	
							                	axios.post('/getGameTypeByName',
											        querystring.stringify({
											          name: tour.game_type,
											        }), {
											          headers: {
											            "Content-Type": "application/x-www-form-urlencoded"
											          }
											        }).then(function(response) {
											        	 window.localStorage.setItem('tour_id',tour._id);
											        	 window.localStorage.setItem('gt',response.data[0]._id);
									                	 window.localStorage.setItem('diggits',response.data[0].diggits);
									                	 window.localStorage.setItem('total_time',response.data[0].total_time);
								                		 window.location.reload();
											      });
				
							                	
					                		}
					                	} 
					                	>PLAY
			     					</button>
			     				</td>
			     				<td className='button-col'>	
			     							<button id="" onClick={() => {
							                	
							                	window.localStorage.setItem('tour_id',tour._id);
							                	$("#play_tournaments_div").css('display','none');
    											$("#tournament_info_div").css('display','block');
							                	
					                		}
					                	} 
					                	>INFO
			     					</button>
				                </td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
				</center>				
		   	</Thumbnail>	
		   	<TournamentInfo />   	
   		</div>
      )
   }
}
export default PlayTournament;